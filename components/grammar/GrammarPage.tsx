import React, { useState } from "react"

import { Box } from "native-base"

import { useGrammars } from "../../utils/api/grammar"
import Error from "../Error"
import GrammarList from "./GrammarList"
import GrammarSkeleton from "./GrammarSkeleton"
import SearchGrammar from "./SearchGrammar"

export default function GrammarPage() {
  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState("")

  const {
    data: grammars,
    metadata: grammarsMetadata,
    error: grammarsError,
    isLoading: grammarsIsLoading,
  } = useGrammars(page, searchText)

  function renderContent() {
    if (grammarsIsLoading) {
      return <GrammarSkeleton />
    }
    if (grammarsError) {
      return <Error message={grammarsError.message} />
    }
    return (
      <GrammarList
        grammars={grammars || []}
        page={page || 1}
        setPage={setPage}
        numPages={grammarsMetadata?.num_pages || 1}
      />
    )
  }

  return (
    <>
      <SearchGrammar
        searchText={searchText}
        setSeachText={setSearchText}
      />
      {renderContent()}
    </>
  )
}
