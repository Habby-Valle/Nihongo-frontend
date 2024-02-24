import React, { useState } from "react"
import { ListRenderItemInfo } from "react-native"

import { Box, Button, Column, Divider, FlatList, Heading, Pressable, Row, Text } from "native-base"
import { useRouter } from "next/router"

import { IGrammarList } from "../../utils/api/grammar"
import DataEmpty from "../DataEmpty"
import PageNumbers from "../PageNumbers"
import ModalDeleteGrammar from "./ModalDeleteGrammar"
import ModalUpdateGrammar from "./ModalUpdateGrammar"

interface IGrammarListProps {
  grammars: IGrammarList[]
  page: number
  setPage: (page: number) => void
  numPages: number
}

export default function GrammarList(props: IGrammarListProps) {
  const [grammarId, setGrammarId] = useState<number | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false)
  const router = useRouter()

  const handleChangeGrammarId = (id: number) => {
    setGrammarId(id)
    setModalVisible(true)
  }

  const handleChangeDeleteGrammarId = (id: number) => {
    setGrammarId(id)
    setModalDeleteVisible(true)
  }

  function header() {
    return (
      <Row
        justifyContent={"space-around"}
        p={5}
        bg={"#D02C23"}
      >
        <Heading
          size={"sm"}
          color={"#f2f2f2"}
          w={"150px"}
        >
          Gramática
        </Heading>
        <Heading
          size={"sm"}
          color={"#f2f2f2"}
          w={"150px"}
        >
          Estrutura
        </Heading>
        <Heading
          size={"sm"}
          color={"#f2f2f2"}
          w={"150px"}
        >
          Nível
        </Heading>
        <Heading
          size={"sm"}
          color={"#f2f2f2"}
          w={"110px"}
        >
          Ação
        </Heading>
      </Row>
    )
  }

  function footer() {
    return (
      <Row
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        py={"10px"}
      >
        <Button
          bg={"#D02C23"}
          _hover={{ bg: "#ae251e" }}
          _pressed={{ bg: "#ae251e" }}
          size={"md"}
          onPress={() => {
            props.setPage(props.page - 1)
          }}
          isDisabled={props.page === 1}
        >
          Anterior
        </Button>
        <PageNumbers
          totalPages={props.numPages ?? 1}
          currentPage={props.page}
          onPageChange={(newPage) => {
            props.setPage(newPage)
          }}
        />
        <Button
          bg={"#D02C23"}
          _hover={{ bg: "#ae251e" }}
          _pressed={{ bg: "#ae251e" }}
          size={"md"}
          onPress={() => {
            props.setPage(props.page + 1)
          }}
          isDisabled={props.page === (props.numPages ?? 1)}
        >
          Próximo
        </Button>
      </Row>
    )
  }

  function items({ item }: ListRenderItemInfo<IGrammarList>) {
    return (
      <Row
        justifyContent={"space-around"}
        p={5}
        _light={{
          bg: "white",
        }}
        _dark={{
          bg: "#262626",
        }}
      >
        <Column w={"150px"}>
          <Pressable
            onPress={() => {
              router.push(`/grammar/sentences/${item.id}`)
            }}
          >
            <Text>{item.grammar}</Text>
          </Pressable>
        </Column>
        <Column w={"150px"}>
          <Text>{item.structure}</Text>
        </Column>
        <Column w={"150px"}>
          <Text>{item.level}</Text>
        </Column>
        <Row
          justifyContent={"space-around"}
          w={"110px"}
        >
          <Pressable
            onPress={() => {
              handleChangeGrammarId(item.id)
            }}
            _light={{
              bg: "#F2F2F2",
            }}
            _dark={{
              bg: "#333333",
            }}
            w={"40px"}
            h={"20px"}
            alignItems={"center"}
            rounded={"md"}
            shadow={1}
          >
            <Text color={"#D02C23"}>Editar</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              handleChangeDeleteGrammarId(item.id)
            }}
            _light={{
              bg: "#F2F2F2",
            }}
            _dark={{
              bg: "#333333",
            }}
            w={"60px"}
            h={"20px"}
            alignItems={"center"}
            rounded={"md"}
            shadow={1}
          >
            <Text>Excluir</Text>
          </Pressable>
        </Row>
      </Row>
    )
  }

  return (
    <Box
      p={5}
      w={"100%"}
    >
      <FlatList
        data={props.grammars}
        ListHeaderComponent={header}
        ListFooterComponent={footer}
        ItemSeparatorComponent={() => <Divider bg={"#D02C23"} />}
        ListEmptyComponent={() => <DataEmpty message={"No grammar found"} />}
        renderItem={items}
        keyExtractor={(item) => item.id.toString()}
      />
      <ModalUpdateGrammar
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(false)
        }}
        grammarId={grammarId}
      />
      <ModalDeleteGrammar
        isOpen={modalDeleteVisible}
        onClose={() => {
          setModalDeleteVisible(false)
        }}
        grammarId={grammarId}
      />
    </Box>
  )
}
