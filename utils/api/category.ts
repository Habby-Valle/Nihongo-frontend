import axios from "axios"
import useSWR from "swr"

import { fetcchSimple } from "./user"

export interface ICategoryList {
  id: number
  name: string
  isCreatedByUser: boolean
  created_by: number
  created_at: string
  updated_at: string
}

export interface ICategory {
  name: string
}

export function useCategories() {
  interface CategoriesResponse {
    results: ICategoryList[]
  }
  const { data, error, isLoading, isValidating, mutate } = useSWR<CategoriesResponse>("/api/categories", fetcchSimple)
  return {
    data: data?.results,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}

export async function createCategory(data: ICategory) {
  interface ICategoryResponse {
    message: string
  }

  try {
    const response = await axios.post<ICategoryResponse>("/api/categories", data)

    return response.data.message
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function updateCategory(id: number, { name }: ICategory) {
  interface ICategoryResponse {
    message: string
  }

  try {
    const response = await axios.patch<ICategoryResponse>(`/api/category/${id}`, { name })

    return response.data.message
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function deleteCategory(id: number) {
  interface ICategoryResponse {
    message: string
  }

  try {
    const response = await axios.delete<ICategoryResponse>(`/api/category/${id}`)

    return response.data.message
  } catch (error: any) {
    throw new Error(error.message)
  }
}
