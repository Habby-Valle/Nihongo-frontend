import useSWR from "swr"

import { fetcchSimple } from "./user"

interface IResultsList {
    id: string
    id_term: string
    term: string
    reading: string
    translates: string[]
    classification: string
    frequency: string
    extra: string[]
    extra_II: string[]
}

export function useResults(term: string) {
    interface ResultsResponse {
        results: IResultsList[]
    }

    const { data, error, isLoading, isValidating, mutate } = useSWR<ResultsResponse>(`/api/dictionary/${term}`, fetcchSimple)

    return {
        data: data?.results,
        error,
        isLoading,
        isValidating,
        mutate,
    }
}