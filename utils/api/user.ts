import axios, { AxiosError } from "axios"
import useSWR from "swr"

export const fetcchSimple = async (url: string) => await axios.get(url).then((res) => res.data)

export interface IUser {
  id: number
  first_name: string
  last_name: string
  username: string
  email: string
  is_active: boolean
}

export interface IUserCreate {
  first_name: string
  last_name: string
  username: string
  email: string
  password: string
}

export interface IProfile {
  id: number
  user: IUser
  phone: string
  date_of_birth: string
  avatar: string
  date_created: string
}

export interface IProfileUpdate {
  phone?: string
  date_of_birth?: string
  avatar?: string
  username?: string
  email?: string
  first_name?: string
  last_name?: string
}

export function WhoIam() {
  interface IResponse {
    user: IUser
    profile: IProfile
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<IResponse>("/api/whoami/", fetcchSimple)

  return {
    data: data?.user,
    profile: data?.profile,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}

export async function doLogin(username: string, password: string) {
  interface ILoginResponse {
    user: IUser
  }

  const response = await axios.post<ILoginResponse>("/api/auth/login/", { username, password })
  if (response.status < 200 || response.status >= 300) {
    return
  }

  return response.data?.user
}

export async function doRegister(user: IUserCreate) {
  interface IResponse {
    message: string
    user: IUser
  }

  const response = await axios.post<IResponse>("/api/user", {
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    email: user.email,
    password: user.password,
  })

  if (response.status < 200 || response.status >= 300) {
    return
  }

  return response.data?.user
}

export function useProfile(userId: number | undefined) {
  interface IResponse {
    profile: IProfile
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<IResponse>(`/api/profile/${userId}`, fetcchSimple)

  return {
    data: data?.profile,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}

export async function updateProfileAvatar(userId: number | undefined, avatar: File) {
  interface IUpdateResponse {
    profile: IProfile
  }

  try {
    const formData = new FormData()

    formData.append("avatar", avatar)

    const res = await axios.patch<IUpdateResponse>(`/api/profile/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return res.data?.profile
  } catch (error) {
    if (error instanceof AxiosError) {
      window.alert(error.response?.data?.error)
    } else {
      window.alert(error)
    }
  }
}

export async function updateProfile(
  userId: number | undefined,
  { avatar, date_of_birth, email, first_name, last_name, phone, username }: IProfileUpdate,
) {
  interface IUpdateResponse {
    profile: IProfile
  }

  try {
    const response = await axios.patch<IUpdateResponse>(`/api/profile/${userId}`, {
      avatar,
      date_of_birth,
      email,
      first_name,
      last_name,
      phone,
      username,
    })
    if (response.status < 200 || response.status >= 300) {
      return
    }
    return response.data?.profile
  } catch (err) {
    console.log(err)
  }
}
