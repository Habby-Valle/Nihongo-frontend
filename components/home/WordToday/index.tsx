import React from "react"

import { Column, Divider, Row, Text } from "native-base"
import Link from "next/link"

import { useWordToday } from "../../../utils/api/vocabulary"
import Error from "../../Error"

export default function WordToday() {
  const { data: word, isLoading: wordIsLoading, error: wordError } = useWordToday()
  if (wordIsLoading) {
    return <Text>Carregando...</Text>
  }

  if (wordError) {
    return <Error message={wordError.message} />
  }

  return (
    <Column
      space={4}
      width="100%"
    >
      <Text
        fontSize="xl"
        fontWeight="bold"
      >
        Palavra do dia
      </Text>
      <Divider />
      {word === null ? (
        <>
          <Text>Nenhuma palavra para hoje</Text>
          <Text>Adicione palavras ao seu vocabulário para que possamos sugerir uma palavra do dia.</Text>
        </>
      ) : (
        <Column
          borderRadius={10}
          py={"20px"}
          px={"15px"}
          width="30%"
          space={4}
          borderWidth={1}
          _light={{
            bg: "white",
            borderColor: "#262626",
          }}
          _dark={{
            bg: "#262626",
            borderColor: "white",
          }}
        >
          <Row>
            <Text
              fontSize="2xl"
              fontWeight="bold"
            >
              {word?.word} - {word?.reading}
            </Text>
          </Row>
          <Row>
            <Text fontSize="lg">{word?.meaning}</Text>
          </Row>
          <Link href={`/vocabulary/details/${word?.id}`}>Mais detalhes</Link>
        </Column>
      )}
    </Column>
  )
}
