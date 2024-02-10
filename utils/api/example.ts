import axios from "axios"
import useSWR from "swr"

import { fetcchSimple } from "./user"

export interface IExampleList {
  id: number
  example: string
  meaning: string
  annotation: string
  wordId: number
  created_at: string
  updated_at: string
  created_by: number
}

export interface IExampleCreate {
  example: string
  meaning: string
  annotation: string
  wordId: number
}

export interface IExampleUpdate {
  example?: string
  meaning?: string
  annotation?: string
}

export function useExamples(wordId: number) {
  interface IExampleResponse {
    results: IExampleList[]
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<IExampleResponse>(
    `/api/example/${wordId}`,
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

export function useExample(exampleId: number, wordId: number) {
  interface IExampleResponse {
    example: IExampleList
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<IExampleResponse>(
    `/api/example/detail/${wordId}/${exampleId}`,
    fetcchSimple,
  )

  return {
    data: data?.example,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}

export async function createExample(id: number, { example, meaning, annotation, wordId }: IExampleCreate) {
  interface IExampleResponse {
    message: string
  }

  try {
    const res = await axios.post<IExampleResponse>(`/api/example/${id}`, {
      example,
      meaning,
      annotation,
      wordId,
    })

    return res.data.message
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function updateExample(
  exampleId: number,
  wordId: number,
  { example, meaning, annotation }: IExampleUpdate,
) {
  interface IExampleResponse {
    message: string
  }

  try {
    const res = await axios.patch<IExampleResponse>(`/api/example/detail/${wordId}/${exampleId}`, {
      example,
      meaning,
      annotation,
    })

    return res.data.message
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function deleteExample(exampleId: number, wordId: number) {
  interface IExampleResponse {
    message: string
  }

  try {
    const res = await axios.delete<IExampleResponse>(`/api/example/detail/${wordId}/${exampleId}`)

    return res.data.message
  } catch (error: any) {
    throw new Error(error.message)
  }
}
