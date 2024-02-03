import axios from "axios"
import useSWR from "swr"

import { fetcchSimple } from "./user"

export interface ITextList {
  id: number
  title: string
  text: string
  translate: string
  annotation: string
  created_at: string
  created_by: number
  updated_at: string
}

export interface ITextCreate {
  title: string
  text: string
  translate: string
  annotation: string
}

export interface ITextUpdate {
  title?: string
  text?: string
  translate?: string
  annotation?: string
}

export interface ITextWritingList {
  id: number
  title: string
  text: string
  annotation: string
  created_at: string
  created_by: number
  updated_at: string
}

export interface ITextWritingCreate {
  title: string
  text: string
  annotation: string
}

export interface ITextWritingUpdate {
  title?: string
  text?: string
  annotation?: string
}

export function useTexts() {
  interface ITextResponse {
    results: ITextList[]
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<ITextResponse>(`/api/text`, fetcchSimple)

  return {
    data: data?.results,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}

export function useText(id: number) {
  interface ITextResponse {
    text: ITextList
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<ITextResponse>(`/api/text/${id}`, fetcchSimple)

  return {
    data: data?.text,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}

export async function createText({ title, text, translate, annotation }: ITextCreate) {
  interface ITextResponse {
    message: string
  }
  try {
    const res = await axios.post<ITextResponse>(`/api/text`, { title, text, translate, annotation })
    return res.data.message
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function updateText(id: number, { title, text, translate, annotation }: ITextUpdate) {
  interface ITextResponse {
    message: string
  }
  try {
    const res = await axios.patch<ITextResponse>(`/api/text/${id}`, { title, text, translate, annotation })
    return res.data.message
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function deleteText(id: number) {
  interface ITextResponse {
    message: string
  }
  try {
    const res = await axios.delete<ITextResponse>(`/api/text/${id}`)
    return res.data.message
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export function useTextWritings() {
  interface ITextWritingResponse {
    results: ITextWritingList[]
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<ITextWritingResponse>(
    `/api/text/writing`,
    fetcchSimple,
  )

  return {
    data: data?.results,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}

export function useTextWriting(id: number) {
  interface ITextWritingResponse {
    text_writing: ITextWritingList
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<ITextWritingResponse>(
    `/api/text/writing/${id}`,
    fetcchSimple,
  )

  return {
    data: data?.text_writing,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}

export async function createTextWriting({ title, text, annotation }: ITextWritingCreate) {
  interface ITextWritingResponse {
    message: string
  }
  try {
    const res = await axios.post<ITextWritingResponse>(`/api/text/writing`, { title, text, annotation })
    return res.data.message
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function updateTextWriting(id: number, { title, text, annotation }: ITextWritingUpdate) {
  interface ITextWritingResponse {
    message: string
  }
  try {
    const res = await axios.patch<ITextWritingResponse>(`/api/text/writing/${id}`, { title, text, annotation })
    return res.data.message
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function deleteTextWriting(id: number) {
  interface ITextWritingResponse {
    message: string
  }
  try {
    const res = await axios.delete<ITextWritingResponse>(`/api/text/writing/${id}`)
    return res.data.message
  } catch (error: any) {
    throw new Error(error.message)
  }
}
