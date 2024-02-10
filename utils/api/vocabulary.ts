import axios from "axios"
import useSWR from "swr"

import { ICategoryList } from "./category"
import { TypeLevel, TypeWord } from "./types"
import { fetcchSimple } from "./user"

export interface IWordList {
  id: number
  word: string
  reading: string
  meaning: string
  type: TypeWord
  level: TypeLevel
  category: ICategoryList
  annotation: string
  created_by: number
  created_at: string
  updated_at: string
}

export interface IWordCreate {
  word: string
  reading: string
  meaning: string
  type: TypeWord
  level: TypeLevel
  category: number
  annotation?: string
  created_by?: number
}

export interface IWordUpdate {
  word?: string
  reading?: string
  meaning?: string
  type?: TypeWord
  level?: TypeLevel
  category?: number
  annotation?: string
}

export function useWords() {
  interface WordReponse {
    results: IWordList[]
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<WordReponse>("/api/words", fetcchSimple)

  return {
    data: data?.results,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}

export function useWord(wordId: number | undefined) {
  interface WordReponse {
    word: IWordList
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<WordReponse>(`/api/word/${wordId}`, fetcchSimple)

  return {
    data: data?.word,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}

export async function createWord({ word, reading, meaning, type, level, category, annotation }: IWordCreate) {
  interface IWordReponse {
    message: string
  }

  try {
    const res = await axios.post<IWordReponse>("/api/words", { word, reading, meaning, type, level, category, annotation })
    return res.data.message
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function updateWord(wordId: number, { word, reading, meaning, type, level, category, annotation }: IWordUpdate) {
  interface IWordReponse {
    message: string
  }

  try {
    const res = await axios.patch<IWordReponse>(`/api/word/${wordId}`, {
      word,
      reading,
      meaning,
      type,
      level,
      category,
      annotation,
    })
    return res.data.message
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function deleteWord(wordId: number) {
  interface IWordResponse {
    message: string
  }

  try {
    const res = await axios.delete<IWordResponse>(`/api/word/${wordId}`)
    return res.data.message
  } catch (error: any) {
    throw new Error(error.message)
  }
}
