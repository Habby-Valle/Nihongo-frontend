import React from "react"

import { Column, Input, Row } from "native-base"
import { MdSearch } from "react-icons/md"

interface ISearchVocabularyProps {
  searchText: string
  setSearchText: (searchText: string) => void
}

export default function SearchVocabulary(props: ISearchVocabularyProps) {
  return (
    <Row
      justifyContent={"space-between"}
      alignItems={"flex-start"}
      p={5}
      width={"100%"}
    >
      <Column space={"20px"}>
        <Input
          placeholder="Buscar palavra, leitura, significado ou nível"
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
        {/* <Column width={"200px"}>
          <FilterByCategory onCategorySelected={() => console.log("Category selected")} />
        </Column> */}
      </Column>
      {/* <Column
        space={"20px"}
        alignItems={"flex-end"}
      >
        <FilterByType onTypeSelected={() => console.log("Type selected")} />
      </Column> */}
    </Row>
  )
}
