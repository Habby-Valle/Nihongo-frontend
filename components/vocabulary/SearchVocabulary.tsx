import React from "react"

import { Column, Input, Row } from "native-base"
import { MdSearch } from "react-icons/md"

import FilterByLevel from "../grammar/FilterByLevel"
import FilterByCategory from "./FilterByCategory"
import FilterByType from "./FilterByType"

interface ISearchVocabularyProps {
  searchText: string
  setSearchText: (searchText: string) => void
}

export default function SearchVocabulary(props: ISearchVocabularyProps) {
  return (
    <Row
      justifyContent={"space-between"}
      alignItems={"center"}
      p={5}
      width={"100%"}
    >
      <Column space={"20px"}>
        <Input
          placeholder="Buscar palavra, leitura ou significado"
          _light={{
            bg: "white",
          }}
          _dark={{
            bg: "#262626",
          }}
          w={"700px"}
          size={"md"}
          onChangeText={(text) => {
            props.setSearchText(text)
          }}
          value={props.searchText}
          InputRightElement={
            <MdSearch
              size={25}
              color="#D02C23"
            />
          }
        />
        <Column width={"200px"}>
          <FilterByCategory onCategorySelected={() => console.log("Category selected")} />
        </Column>
      </Column>
      <Column
        space={"20px"}
        alignItems={"flex-end"}
      >
        <FilterByLevel onLevelSelected={() => console.log("Level selected")} />
        <FilterByType onTypeSelected={() => console.log("Type selected")} />
      </Column>
    </Row>
  )
}
