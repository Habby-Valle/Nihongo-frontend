import React from "react"

import { Column } from "native-base"

import { useGrammar } from "../../utils/api/grammar"
import Error from "../Error"
import GrammarExplain from "./GrammarExplain"
import GrammarExplainSkeleton from "./GrammarExplainSkeleton"
import SentenceList from "./SentenceList"
import SentenceSkeleton from "./SentenceSkeleton"

interface ISentenceMainProps {
  grammarId: number
}

export default function SentenceMain(props: ISentenceMainProps) {
  const { data: grammar, error: grammarError, isLoading: grammarIsLoading, mutate: grammarRevalidate } = useGrammar(props.grammarId)

  if (grammarError) return <Error message="Error loading grammar" />
  if (grammarIsLoading) {
    return (
      <Column
        justifyContent={"center"}
        alignItems={"center"}
        space={"30px"}
      >
        <GrammarExplainSkeleton />
        <SentenceSkeleton />
      </Column>
    )
  }

  return (
    <Column
      justifyContent={"center"}
      alignItems={"center"}
      space={"30px"}
      w={"100%"}
    >
      <GrammarExplain grammar={grammar} revalidate={grammarRevalidate} />
      <SentenceList grammarId={props.grammarId} />
    </Column>
  )
}
