import React, { useState } from "react"
import { ListRenderItemInfo } from "react-native"

import { Box, Column, FlatList, Pressable, Row, Text } from "native-base"
import { MdArrowDropDown, MdArrowDropUp, MdDelete, MdEdit } from "react-icons/md"

import { IExampleList, useExamples } from "../../../utils/api/example"
import DataEmpty from "../../DataEmpty"
import Error from "../../Error"
import ModalDeleteExample from "./ModalDeleteExample"
import ModalUpdatExample from "./ModalUpdateExample"

interface IExampleListProps {
  wordId: number
}

export default function ExampleList(props: IExampleListProps) {
  const {
    data: examples,
    error: examplesError,
    isLoading: examplesIsLoading,
    isValidating: examplesIsValidating,
  } = useExamples(props.wordId)

  const [exampleId, setExampleId] = useState<number>(0)
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false)
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false)

  // Use an array to store the expanded state for each item
  const [isExpanded, setIsExpanded] = useState<boolean[]>(Array(examples?.length).fill(false))

  function handleUpdateExample(exampleId: number) {
    setExampleId(exampleId)
    setModalUpdateVisible(true)
  }

  function handleDeleteExample(exampleId: number) {
    setExampleId(exampleId)
    setModalDeleteVisible(true)
  }

  function toggleExpand(index: number) {
    const newExpandedState = [...isExpanded]
    newExpandedState[index] = !newExpandedState[index]
    setIsExpanded(newExpandedState)
  }

  function items({ item, index }: ListRenderItemInfo<IExampleList>) {
    return (
      <Box>
        <Row
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Row
            width={"100%"}
            justifyContent={"space-between"}
            _light={{ bg: "white", borderColor: "black" }}
            _dark={{ bg: "gray.700", borderColor: "white" }}
            p={4}
            borderWidth={1}
            rounded={10}
          >
            <Text>{item.example}</Text>
            <Row
              w={"10%"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Pressable
                onPress={() => {
                  handleUpdateExample(item.id)
                }}
              >
                <MdEdit
                  size={25}
                  color="#D02C23"
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  handleDeleteExample(item.id)
                }}
              >
                <MdDelete
                  size={25}
                  color="#D02C23"
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  toggleExpand(index)
                }}
              >
                {isExpanded[index] ? (
                  <MdArrowDropUp
                    size={25}
                    color="#D02C23"
                  />
                ) : (
                  <MdArrowDropDown
                    size={25}
                    color="#D02C23"
                  />
                )}
              </Pressable>
            </Row>
          </Row>
        </Row>
        {isExpanded[index] && (
          <Column
            width={"80%"}
            _light={{ bg: "white", borderColor: "black" }}
            _dark={{ bg: "gray.700", borderColor: "white" }}
            p={4}
            space={2}
          >
            <Text
              fontSize={15}
              fontWeight={"bold"}
            >
              {item.meaning}
            </Text>
            <Text>{!item.annotation ? "No annotation" : item.annotation}</Text>
            <Text>{new Date(item.createdAt).toLocaleDateString("pt-BR")}</Text>
          </Column>
        )}
      </Box>
    )
  }

  if (examplesError !== undefined) {
    return <Error message={examplesError.message} />
  }

  if (examples === undefined || examplesIsLoading || examplesIsValidating) {
    return <Text>Loading...</Text>
  }

  return (
    <Box
      _light={{ bg: "white", borderColor: "black" }}
      _dark={{ bg: "gray.700", borderColor: "white" }}
    >
      <FlatList
        ListEmptyComponent={<DataEmpty message={"No examples found"} />}
        data={examples}
        renderItem={items}
        keyExtractor={(item) => item.id.toString()}
      />

      <ModalUpdatExample
        isOpen={modalUpdateVisible}
        onClose={() => {
          setModalUpdateVisible(false)
        }}
        exampleId={exampleId}
        wordId={props.wordId}
      />

      <ModalDeleteExample
        isOpen={modalDeleteVisible}
        onClose={() => {
          setModalDeleteVisible(false)
        }}
        exampleId={exampleId}
        wordId={props.wordId}
      />
    </Box>
  )
}
