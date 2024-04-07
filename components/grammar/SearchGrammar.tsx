import React, { useState } from "react"

import { Button, Column, Input, Row } from "native-base"
import { MdAdd, MdSearch } from "react-icons/md"

import ModalAddGrammar from "./ModalAddGrammar"

interface ISearchGrammarProps {
  searchText: string
  setSeachText: (text: string) => void
  mutate: () => void
}

export default function SearchGrammar(props: ISearchGrammarProps) {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <Row
      justifyContent={"space-between"}
      alignItems={"flex-end"}
      p={5}
      w={"100%"}
    >
      <Column space={"20px"}>
        <Input
          placeholder="Buscar gramática, estrutura e nível..."
          _light={{
            bg: "white",
          }}
          _dark={{
            bg: "#262626",
          }}
          w={"700px"}
          size={"md"}
          onChangeText={(text) => props.setSeachText(text)}
          value={props.searchText}
          InputRightElement={
            <MdSearch
              size={25}
              color="#39B59F"
            />
          }
        />
      </Column>
      <Column
        space={"20px"}
        alignItems={"flex-end"}
      >
        <Button
          bg={"#39B59F"}
          onPress={() => {
            setModalVisible(true)
          }}
          _hover={{ bg: "#1ca088" }}
          _pressed={{ bg: "#1ca088" }}
          size={"md"}
          w={"140px"}
          startIcon={
            <MdAdd
              size={25}
              color="white"
            />
          }
        >
          Add Gramática
        </Button>
      </Column>
      <ModalAddGrammar
        isOpen={modalVisible}
        onSave={async () => {
          await props.mutate()
        }}
        onClose={() => {
          setModalVisible(false)
        }}
      />
    </Row>
  )
}
