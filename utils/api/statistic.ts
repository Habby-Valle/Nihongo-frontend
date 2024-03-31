import useSWR from "swr"

import { fetcchSimple } from "./user"

interface IWordByCategory {
  category_name: string
  words_count: number
}

interface IWordByLevel {
  level_name: string
  words_count: number
}

interface IGrammarByLevel {
  level_name: string
  grammar_count: number
}

export function useWordByCategory() {
  interface IWordByCategoryResponse {
    words_by_category: IWordByCategory[]
  }
  const { data, error, isLoading, isValidating, mutate } = useSWR<IWordByCategoryResponse>(
    "/api/statistics",
    fetcchSimple,
  )
  return {
    data: data?.words_by_category,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}

export function useWordByLevel() {
  interface IWordByLevelResponse {
    words_by_level: IWordByLevel[]
  }
  const { data, error, isLoading, isValidating, mutate } = useSWR<IWordByLevelResponse>("/api/statistics", fetcchSimple)
  return {
    data: data?.words_by_level,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}

export function useGrammarByLevel() {
  interface IGrammarByLevelResponse {
    grammar_by_level: IGrammarByLevel[]
  }
  const { data, error, isLoading, isValidating, mutate } = useSWR<IGrammarByLevelResponse>(
    "/api/statistics",
    fetcchSimple,
  )
  return {
    data: data?.grammar_by_level,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}
