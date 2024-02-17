import React from "react"
import { ListRenderItemInfo } from "react-native"

import { Box, Column, Divider, FlatList, Pressable, Text } from "native-base"
import { useRouter } from "next/router"

import { ITextWritingList, useTextWritings } from "../../../utils/api/text"
import DataEmpty from "../../DataEmpty"
import Error from "../../Error"

export default function TranslateList() {
  const { data: texts, error: textsError, isLoading: textsLoading } = useTextWritings()

  const router = useRouter()

  function headers() {
    return (
      <Column
        width={"100%"}
        px={3}
        py={2}
      >
        <Text
          fontWeight={600}
          fontSize={20}
          textAlign={"left"}
        >
          Texts
        </Text>
      </Column>
    )
  }

  function item({ item }: ListRenderItemInfo<ITextWritingList>) {
    return (
      <Pressable
        onPress={() => {
          router.push(`/text/text-writing/writing-detail/${item.id}`)
        }}
      >
        <Box
          width={"100%"}
          px={3}
          py={2}
          textDecoration={"underline"}
        >
          <Text>{item.title}</Text>
        </Box>
      </Pressable>
    )
  }

  if (textsError) {
    return <Error message={textsError.message} />
  }

  if (textsLoading) {
    return <Text>Carregando...</Text>
  }

  return (
    <Box
      w={"22%"}
      _dark={{
        bg: "gray.700",
      }}
      _light={{
        bg: "white",
      }}
      rounded={10}
    >
      <FlatList
        data={texts}
        renderItem={item}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={headers}
        ListEmptyComponent={<DataEmpty message={"No texts found"} />}
        ItemSeparatorComponent={() => <Divider bg={"#D02C23"} />}
      />
    </Box>
  )
}
