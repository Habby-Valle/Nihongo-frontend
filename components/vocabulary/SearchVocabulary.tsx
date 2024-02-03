import React, { useState } from "react"

import { Column, Input, Row } from "native-base"
import { MdSearch } from "react-icons/md"

import FilterByLevel from "../grammar/FilterByLevel"
import FilterByCategory from "./FilterByCategory"
import FilterByType from "./FilterByType"

export interface IVocabularyFilters {
  searchText: string | null
  category: string | null
  level: string | null
  type: string | null
}

interface ISearchVocabularyProps {
  onFiltersChanged?: (filters: IVocabularyFilters) => void
}

export default function SearchVocabulary(props: ISearchVocabularyProps) {
  const [filters, setFilters] = useState<IVocabularyFilters>({
    searchText: null,
    category: null,
    level: null,
    type: null,
  })

  function handleFilterChanged(filters: IVocabularyFilters) {
    setFilters(filters)

    if (props.onFiltersChanged !== undefined) {
      props.onFiltersChanged(filters)
    }
  }

  return (
    <Row
      justifyContent={"space-between"}
      alignItems={"center"}
      p={5}
      width={"100%"}
    >
      <Column space={"20px"}>
        <Input
          placeholder="Search word, reading and meaning"
          _light={{
            bg: "white",
          }}
          _dark={{
            bg: "#262626",
          }}
          w={"700px"}
          size={"md"}
          onChangeText={(text) => {
            handleFilterChanged({ ...filters, searchText: text })
          }}
          value={filters.searchText ?? ""}
          InputRightElement={
            <MdSearch
              size={25}
              color="#D02C23"
            />
          }
        />
        <Column width={"200px"}>
          <FilterByCategory
            onCategorySelected={(category) => {
              handleFilterChanged({ ...filters, category })
            }}
          />
        </Column>
      </Column>
      <Column
        space={"20px"}
        alignItems={"flex-end"}
      >
        <FilterByLevel
          onLevelSelected={(level) => {
            handleFilterChanged({ ...filters, level })
          }}
        />
        <FilterByType
          onTypeSelected={(type) => {
            handleFilterChanged({ ...filters, type })
          }}
        />
      </Column>
    </Row>
  )
}
