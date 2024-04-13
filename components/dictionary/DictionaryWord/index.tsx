import React, { memo } from "react"

import { Column, Divider, FlatList, Spinner, Text } from "native-base"

import { IResultsList, useResults } from "../../../utils/api/dictionary"
import DataEmpty from "../../DataEmpty"
import Error from "../../Error"
import MessageDefault from "../MessageDefault"
import ResultCard from "../ResultCard"

export default function DictionaryWord({ search }: { search: string }) {
  const { data: resultsData, error: resultsError, isLoading: resultsIsLoading } = useResults(search)
  const RenderItem = memo(({ item }: { item: IResultsList }) => {
    return <ResultCard item={item} />
  })

  RenderItem.displayName = "ResultItem"

  return (
    <Column
      flex={1}
      space="10px"
      width="100%"
      p="5px"
    >
      {resultsData ? (
        <FlatList
          data={resultsData}
          renderItem={({ item }) => <RenderItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<DataEmpty message="Nenhum resultado encontrado" />}
          ItemSeparatorComponent={() => <Divider mt={2} />}
        />
      ) : resultsIsLoading ? (
        <Column
          justifyContent={"center"}
          alignItems={"center"}
          p={"20px"}
          space={"10px"}
          flex={1}
        >
          <Spinner
            size={80}
            color={"#39B59F"}
          />
          <Text
            fontSize="md"
            textAlign="center"
            mt="5px"
          >
            Carregando...Levará um tempo para carregar os resultados
          </Text>
        </Column>
      ) : resultsError ? (
        <Error message={resultsError.message} />
      ) : (
        <MessageDefault
          message={"Pesquise por palavras em japonês e inglês(A versão em português ainda está em desenvolvimento)"}
        />
      )}
    </Column>
  )
}
