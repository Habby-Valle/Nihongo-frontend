import React, { useState } from "react"

import { Button, Column, Input, Row } from "native-base"
import { MdAdd, MdSearch } from "react-icons/md"

import FilterByLevel from "./FilterByLevel"
import FilterByMonth, { IGrammarFilterMonth } from "./FilterByMonth"
import ModalAddGrammar from "./ModalAddGrammar"

export interface IGrammarsFilters {
  searchText: string | null
  level: string | null
  month: IGrammarFilterMonth | null
}

interface ISearchGrammarProps {
  onFiltersChanged?: (filters: IGrammarsFilters) => void
}

export default function SearchGrammar(props: ISearchGrammarProps) {
  const [modalVisible, setModalVisible] = useState(false)
  const [filters, setFilters] = useState<IGrammarsFilters>({
    searchText: null,
    level: null,
    month: null,
  })

  function handleFilterChanged(filters: IGrammarsFilters) {
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
      w={"100%"}
    >
      <Column space={"20px"}>
        <Input
          placeholder="Search grammar"
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
          <FilterByLevel
            onLevelSelected={(level) => {
              handleFilterChanged({ ...filters, level })
            }}
          />
        </Column>
      </Column>
      <Column
        space={"20px"}
        alignItems={"flex-end"}
      >
        <FilterByMonth
          onMonthSelected={(month) => {
            handleFilterChanged({ ...filters, month })
          }}
        />
        <Button
          bg={"#D02C23"}
          onPress={() => {
            setModalVisible(true)
          }}
          _hover={{ bg: "#ae251e" }}
          _pressed={{ bg: "#ae251e" }}
          size={"md"}
          w={"140px"}
          startIcon={
            <MdAdd
              size={25}
              color="white"
            />
          }
        >
          Add grammar
        </Button>
      </Column>
      <ModalAddGrammar
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(false)
        }}
      />
    </Row>
  )
}
