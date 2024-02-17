import React from "react"

import { Column, Text } from "native-base"

import { IGrammarList } from "../../utils/api/grammar"

interface IGrammarExplainProps {
  grammar: IGrammarList | undefined
}

export default function GrammarExplain(props: IGrammarExplainProps) {
  return (
    <Column
      maxWidth={"50%"}
    >
      <Text
        fontSize={20}
        fontWeight={700}
        textAlign={"left"}
        mb={2}
      >
        {props.grammar?.grammar} - {props.grammar?.structure} ({props.grammar?.level})
      </Text>
      <Text
        fontSize={"14px"}
        fontWeight={500}
        textAlign={"left"}
        mb={2}
      >
        {props.grammar?.explain}
      </Text>
    </Column>
  )
}
