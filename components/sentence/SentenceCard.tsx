import React from "react"

import { Column, Pressable, Row, Text } from "native-base"
import { MdList } from "react-icons/md"

import { ISentenceList } from "../../utils/api/sentence"

interface ISentenceCardProps {
  sentence: ISentenceList
  handleChangeSentenceId: (id: number) => void
}

export default function SentenceCard(item: ISentenceCardProps) {
  return (
    <Column
      w={"100%"}
      p={"10px"}
      _light={{ bg: "white" }}
      _dark={{ bg: "gray.700" }}
      rounded={"md"}
    >
      <Row justifyContent={"space-between"}>
        <Text
          fontSize={20}
          fontWeight={700}
        >
          {item.sentence.sentence}
        </Text>
        <Pressable onPress={() => item.handleChangeSentenceId(item.sentence.id)}>
          <MdList
            size={24}
            color={"#D02C23"}
          />
        </Pressable>
      </Row>
      <Text
        fontSize={16}
        fontWeight={500}
      >
        {item.sentence.translate}
      </Text>
      {item.sentence.annotation && (
        <Text
          fontSize={16}
          fontWeight={500}
        >
          {item.sentence.annotation}
        </Text>
      )}
    </Column>
  )
}
