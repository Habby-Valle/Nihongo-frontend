import React from "react"

import { Column, Divider, FlatList, Row, Text } from "native-base"
import Link from "next/link"

import { IWordList, useWords } from "../../../utils/api/vocabulary"
import Error from "../../Error"

export default function WordsRecents() {
  const { data: words, isLoading: wordIsLoading, error: wordError } = useWords(1)
  const wordsRecents = words?.slice(0, 5)
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
        Palavras adicionadas recentemente
      </Text>
      <Divider />
      {wordsRecents === null ? (
        <>
          <Text>Não há palavras recentes</Text>
        </>
      ) : (
        <FlatList
          data={wordsRecents}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <WordRecentCard word={item} />}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <Row px={4} />}
        />
      )}
    </Column>
  )
}

interface IWordRecentCard {
  word: IWordList
}

function WordRecentCard({ word }: IWordRecentCard) {
  return (
    <Row
      borderRadius={10}
      py={"20px"}
      px={"15px"}
      width="90%"
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
      <Column>
        <Row>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            numberOfLines={1}
            ellipsizeMode="head"
          >
            {word?.word} - {word?.reading}
          </Text>
        </Row>
        <Row>
          <Text fontSize="lg">{word?.meaning}</Text>
        </Row>
        <Link href={`/vocabulary/details/${word?.id}`}>Mais detalhes</Link>
      </Column>
    </Row>
  )
}
