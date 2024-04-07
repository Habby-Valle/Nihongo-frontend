import React, { useState } from "react"
import { ListRenderItemInfo } from "react-native"

import { Box, Button, Column, Divider, FlatList, Heading, Pressable, Row, Text } from "native-base"
import { useRouter } from "next/router"

import { IGrammarList } from "../../utils/api/grammar"
import DataEmpty from "../DataEmpty"
import PageNumbers from "../PageNumbers"

interface IGrammarListProps {
  grammars: IGrammarList[]
  page: number
  setPage: (page: number) => void
  numPages: number
  revalidate: () => void
}

export default function GrammarList(props: IGrammarListProps) {
  const router = useRouter()
  function header() {
    return (
      <Row
        justifyContent={"space-around"}
        p={5}
        bg={"#39B59F"}
      >
        <Heading
          size={"sm"}
          color={"#f2f2f2"}
          w={"300px"}
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
          bg={"#39B59F"}
          _hover={{ bg: "#1ca088" }}
          _pressed={{ bg: "#1ca088" }}
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
          bg={"#39B59F"}
          _hover={{ bg: "#1ca088" }}
          _pressed={{ bg: "#1ca088" }}
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
        <Column w={"300px"}>
          <Pressable
            onPress={() => {
              router.push(`/grammar/sentences/${item.id}`)
            }}
            _hover={{
              textDecoration: "underline",
              _light: { color: "#262626" },
              _dark: { color: "#f2f2f2f2" },
            }}
          >
            <Text>{item.grammar}</Text>
          </Pressable>
        </Column>
        <Column w={"150px"}>
          <Text>{item.structure}</Text>
        </Column>
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
        ItemSeparatorComponent={() => <Divider bg={"#39B59F"} />}
        ListEmptyComponent={() => <DataEmpty message={"No grammar found"} />}
        renderItem={items}
        keyExtractor={(item) => item.id.toString()}
      />
    </Box>
  )
}
