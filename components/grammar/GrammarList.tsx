import React, { useMemo, useState } from "react"
import { ListRenderItemInfo } from "react-native"

import { Box, Column, Divider, FlatList, Heading, Pressable, Row, Text } from "native-base"
import { useRouter } from "next/router"

import { IGrammarList, useGrammars } from "../../utils/api/grammar"
import DataEmpty from "../DataEmpty"
import Error from "../Error"
import GrammarSkeleton from "./GrammarSkeleton"
import ModalDeleteGrammar from "./ModalDeleteGrammar"
import ModalUpdateGrammar from "./ModalUpdateGrammar"
import { IGrammarsFilters } from "./SearchGrammar"

interface IGrammarListProps {
  filters?: IGrammarsFilters
}

export default function GrammarList(props: IGrammarListProps) {
  const {
    data: grammars,
    error: grammarsError,
    isLoading: grammarsIsLoading,
    isValidating: grammarsIsValidating,
  } = useGrammars()

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

  const filteredGrammars = useMemo(() => {
    if (grammars === undefined) return []

    const filters = props.filters

    if (filters === undefined) return grammars

    if (Object.values(filters).every((v) => v === null)) return grammars

    let _filteredGrammars = grammars

    if (filters.searchText !== null) {
      _filteredGrammars = _filteredGrammars.filter(
        (grammar) =>
          grammar.grammar.toLocaleLowerCase().includes(filters.searchText?.toLocaleLowerCase() ?? "") ||
          grammar.structure.toLocaleLowerCase().includes(filters.searchText?.toLocaleLowerCase() ?? ""),
      )
    }

    if (filters.level !== null) {
      _filteredGrammars = _filteredGrammars.filter((grammar) => grammar.level === filters.level)
    }

    if (filters.month !== null) {
      // eslint-disable-next-line array-callback-return
      _filteredGrammars = _filteredGrammars.filter((grammar) => {
        if (
          new Date(grammar.created_at).getFullYear() === filters.month?.year &&
          new Date(grammar.created_at).getMonth() + 1 === filters.month?.month
        )
          return true
      })
    }

    return _filteredGrammars
  }, [grammars, props.filters])

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

  if (grammarsIsLoading || grammarsIsValidating) {
    return (
      <Box p={5}>
        <GrammarSkeleton />
      </Box>
    )
  }

  if (grammarsError) {
    return (
      <Box p={5}>
        <Error message={"Erro ao carregar as gramáticas"} />
      </Box>
    )
  }

  return (
    <Box
      p={5}
      w={"100%"}
    >
      <FlatList
        data={filteredGrammars}
        ListHeaderComponent={header}
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
