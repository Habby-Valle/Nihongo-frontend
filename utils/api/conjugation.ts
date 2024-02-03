import axios from "axios"
import useSWR from "swr"

import { fetcchSimple } from "./user"
import { IWordList } from "./vocabulary"

export interface IConjugationList {
  id: number
  word: IWordList
  present: string
  past: string
  negative: string
  te_form: string
  volitional: string
  passive: string
  causative: string
  potential: string
  imperative: string
  conditional: string
  causative_passive: string
}

interface IConjugationCreate {
  wordId: number
  present: string
  past: string
  negative: string
  te_form: string
  volitional: string
  passive: string
  causative: string
  potential: string
  imperative: string
  conditional: string
  causative_passive: string
}

interface IConjugationUpdate {
  present?: string
  past?: string
  negative?: string
  te_form?: string
  volitional?: string
  passive?: string
  causative?: string
  potential?: string
  imperative?: string
  conditional?: string
  causative_passive?: string
}

export function useConjugations(wordId: number) {
  interface IConjugationResponse {
    conjugation: IConjugationList
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<IConjugationResponse>(
    `/api/conjugation/${wordId}`,
    fetcchSimple,
  )

  return {
    data: data?.conjugation,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}

export function useConjugation(conjugationId: number, wordId: number) {
  interface IConjugationResponse {
    conjugation: IConjugationList
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<IConjugationResponse>(
    `/api/conjugation/detail/${wordId}/${conjugationId}`,
    fetcchSimple,
  )

  return {
    data: data?.conjugation,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}

export async function createConjugation(wordId: number, data: IConjugationCreate) {
  interface IConjugationResponse {
    message: string
  }

  try {
    const response = await axios.post<IConjugationResponse>(`/api/conjugation/${wordId}`, data)
    return response.data.message
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function updateConjugation(conjugationId: number, wordId: number, data: IConjugationUpdate) {
  interface IConjugationResponse {
    message: string
  }

  try {
    const response = await axios.patch<IConjugationResponse>(`/api/conjugation/detail/${wordId}/${conjugationId}`, data)
    return response.data.message
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function deleteConjugation(conjugationId: number, wordId: number) {
  interface IConjugationResponse {
    message: string
  }

  try {
    const response = await axios.delete<IConjugationResponse>(`/api/conjugation/detail/${wordId}/${conjugationId}`)
    return response.data.message
  } catch (error: any) {
    throw new Error(error.message)
  }
}
