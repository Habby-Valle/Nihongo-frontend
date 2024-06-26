import axios from "axios"
import useSWR from "swr"

import { fetcchSimple } from "./user"
import { IMetadata } from "./vocabulary"

export interface ISentenceList {
  id: number
  sentence: string
  translate: string
  annotation: string
  grammar: number
  created_by: number
  created_at: string
  updated_at: string
}

export interface ISentenceCreate {
  sentence: string
  translate: string
  annotation: string
  grammar: number
  created_by?: number
}

export interface ISentenceUpdate {
  sentence?: string
  translate?: string
  annotation?: string
}

export function useSentences(grammarId: number | undefined, page?: number, page_size?: number) {
  interface SentenceReponse {
    metadata: IMetadata
    results: ISentenceList[]
  }
  const url = page_size
    ? `/api/sentences/${grammarId}?page=${page}&page_size=${page_size}`
    : `/api/sentences/${grammarId}?page=${page}`
  const { data, error, isLoading, isValidating, mutate } = useSWR<SentenceReponse>(url, fetcchSimple)

  return {
    data: data?.results,
    metadata: data?.metadata,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}

export function useSentence(sentenceId: number | undefined) {
  interface SentenceReponse {
    sentence: ISentenceList
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<SentenceReponse>(
    `/api/sentence/${sentenceId}`,
    fetcchSimple,
  )

  return {
    data: data?.sentence,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}

export async function createSentence({ sentence, translate, annotation, grammar, created_by }: ISentenceCreate) {
  interface ISentenceResponse {
    message: string
  }

  try {
    const res = await axios.post<ISentenceResponse>(`/api/sentences/${grammar}`, {
      sentence,
      translate,
      annotation,
      grammar,
      created_by,
    })
    return res.data.message
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function updateSentence(id: number, { sentence, translate, annotation }: ISentenceUpdate) {
  interface ISentenceResponse {
    message: string
  }

  try {
    const res = await axios.patch<ISentenceResponse>(`/api/sentence/${id}`, { sentence, translate, annotation })
    return res.data.message
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function deleteSentence(id: number) {
  interface ISentenceResponse {
    message: string
  }

  try {
    const res = await axios.delete<ISentenceResponse>(`/api/sentence/${id}`)
    return res.data.message
  } catch (error: any) {
    throw new Error(error.message)
  }
}
