import axios from "axios"
import useSWR from "swr"
import { IMetadata } from "./vocabulary"
import { fetcchSimple } from "./user"

export interface IGrammarList {
  id: number
  grammar: string
  structure: string
  level: string
  explain: string
  created_by: number
  created_at: string
  updated_at: string
}

export interface IGrammarCreate {
  grammar: string
  structure: string
  level: string
  explain: string
}

export interface IGrammarUpdate {
  grammar?: string
  structure?: string
  level?: string
  explain?: string
}

export function useGrammars(page?: number, page_size?: number) {
  interface GrammarsResponse {
    metadata: IMetadata
    results: IGrammarList[]
  }
  const url = page_size ? `/api/grammar?page=${page}&page_size=${page_size}` : `/api/grammar?page=${page}`
  const { data, error, isLoading, isValidating, mutate } = useSWR<GrammarsResponse>(url, fetcchSimple)
  return {
    data: data?.results,
    metadata: data?.metadata,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}

export function useGrammar(id: number) {
  interface IGrammarResponse {
    grammar: IGrammarList
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<IGrammarResponse>(`/api/grammar/${id}`, fetcchSimple)
  return {
    data: data?.grammar,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}

export async function createGrammar({ grammar, structure, level, explain }: IGrammarCreate) {
  interface IGrammarResponse {
    grammar: IGrammarList
  }

  try {
    const res = await axios.post<IGrammarResponse>(`/api/grammar`, { grammar, structure, level, explain })

    return res.data?.grammar
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function updateGrammar(id: number, { grammar, structure, level, explain }: IGrammarUpdate) {
  interface IGrammarResponse {
    grammar: IGrammarList
  }

  try {
    const res = await axios.patch<IGrammarResponse>(`/api/grammar/${id}`, { grammar, structure, level, explain })

    return res.data?.grammar
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function deleteGrammar(id: number) {
  interface IGrammarResponse {
    message: "grammar deleted"
  }

  try {
    const res = await axios.delete<IGrammarResponse>(`/api/grammar/${id}`)

    return res.data?.message
  } catch (error: any) {
    throw new Error(error.message)
  }
}
