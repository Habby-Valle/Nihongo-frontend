import React, { useState } from "react"
import { ListRenderItemInfo } from "react-native"

import { Box, Button, Column, Divider, FlatList, Pressable, Row, Text } from "native-base"
import { MdAdd, MdList } from "react-icons/md"

import { ISentenceList } from "../../utils/api/sentence"
import DataEmpty from "../DataEmpty"
import ModalAddSentence from "./modal/ModalAddSentence"
import ModalSentence from "./modal/ModalSentence"

interface ISentenceListProps {
  sentences: ISentenceList[] | undefined
  grammarId: number | null
}

export default function SentenceList(props: ISentenceListProps) {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalAddVisible, setModalAddVisible] = useState(false)
  const [sentenceId, setSentenceId] = useState<number | null>(null)

  const handleChangeSentenceId = (id: number) => {
    setSentenceId(id)
    setModalVisible(true)
  }

  const handleAddSentence = () => {
    setModalAddVisible(true)
  }

  function header() {
    return (
      <Row
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"100%"}
        mb={5}
      >
        <Text
          fontSize={20}
          fontWeight={700}
        >
          Sentenças ({props.sentences?.length})
        </Text>
        <Button
          onPress={handleAddSentence}
          bg={"#D02C23"}
          _hover={{ bg: "#ae251e" }}
          _pressed={{ bg: "#ae251e" }}
          size={"md"}
          startIcon={
            <MdAdd
              size={25}
              color="white"
            />
          }
        >
          Add
        </Button>
      </Row>
    )
  }

  function items({ item }: ListRenderItemInfo<ISentenceList>) {
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
            {item.sentence}
          </Text>
          <Pressable
            onPress={() => {
              handleChangeSentenceId(item.id)
            }}
          >
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
          {item.translate}
        </Text>
        {item.annotation && (
          <Text
            fontSize={16}
            fontWeight={500}
          >
            {item.annotation}
          </Text>
        )}
      </Column>
    )
  }

  return (
    <Box w={"50%"}>
      <FlatList
        data={props.sentences}
        renderItem={items}
        ListHeaderComponent={header}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<DataEmpty message="No sentences" />}
        ItemSeparatorComponent={() => (
          <Divider
            bg={"none"}
            mt={2}
          />
        )}
      />
      <ModalSentence
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(false)
        }}
        sentenceId={sentenceId}
        grammarId={props.grammarId}
      />
      <ModalAddSentence
        isOpen={modalAddVisible}
        onClose={() => {
          setModalAddVisible(false)
        }}
        grammarId={props.grammarId}
      />
    </Box>
  )
}
