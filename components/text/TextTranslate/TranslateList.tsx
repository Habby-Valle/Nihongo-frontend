import React from "react"
import { ListRenderItemInfo } from "react-native"

import { Box, Column, Divider, FlatList, Pressable, Text } from "native-base"
import { useRouter } from "next/router"

import { ITextList, useTexts } from "../../../utils/api/text"
import DataEmpty from "../../DataEmpty"
import Error from "../../Error"

export default function TranslateList() {
  const { data: texts, error: textsError, isLoading: textsLoading } = useTexts()

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
          Textos
        </Text>
      </Column>
    )
  }

  function item({ item }: ListRenderItemInfo<ITextList>) {
    return (
      <Pressable
        onPress={() => {
          router.push(`/text/text-translate/text-detail/${item.id}`)
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
        ListEmptyComponent={<DataEmpty message={"Nenhum texto encontrado"} />}
        ItemSeparatorComponent={() => <Divider bg={"#39B59F"} />}
      />
    </Box>
  )
}
