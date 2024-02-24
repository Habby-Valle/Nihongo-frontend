import React, { useState } from "react"

import { Spinner } from "native-base"

import { useWords } from "../../utils/api/vocabulary"
import Error from "../Error"
import SearchVocabulary from "./SearchVocabulary"
import WordList from "./VocabularyList"

export default function VocabularyPage() {
  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState("")
  const {
    data: words,
    metadata: wordsMetadata,
    error: wordsError,
    isLoading: wordsIsLoading,
    mutate: wordsRevalidate,
  } = useWords(page, searchText)

  function renderContent() {
    if (wordsIsLoading) return <Spinner />

    if (wordsError) return <Error message={wordsError.message} />
    return (
      <WordList
        words={words || []}
        page={page}
        setPage={setPage}
        numPages={wordsMetadata?.num_pages || 1}
        revalidate={wordsRevalidate}
      />
    )
  }

  return (
    <>
      <SearchVocabulary
        searchText={searchText}
        setSearchText={setSearchText}
      />
      {renderContent()}
    </>
  )
}
