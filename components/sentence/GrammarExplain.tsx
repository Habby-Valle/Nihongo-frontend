import React, { useState } from "react"

import { Column, Text, Row, Pressable } from "native-base"

import { IGrammarList } from "../../utils/api/grammar"
import ModalUpdateGrammar from "../grammar/ModalUpdateGrammar"
import ModalDeleteGrammar from "../grammar/ModalDeleteGrammar"
import { MdDelete, MdEdit } from "react-icons/md"

interface IGrammarExplainProps {
  grammar: IGrammarList | undefined
  revalidate: () => void
}

export default function GrammarExplain(props: IGrammarExplainProps) {

  const [grammarId, setGrammarId] = useState<number | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false)

  const handleChangeGrammarId = (id: number) => {
    setGrammarId(id)
    setModalVisible(true)
  }

  const handleChangeDeleteGrammarId = (id: number) => {
    setGrammarId(id)
    setModalDeleteVisible(true)
  }
  return (
    <Column maxWidth={"50%"}>
      <Row space={2}>
        <Text
          fontSize={20}
          fontWeight={700}
          textAlign={"left"}
          mb={2}
        >
          {props.grammar?.grammar} - {props.grammar?.structure} ({props.grammar?.level})
        </Text>
        <Row
          justifyContent={"space-between"}
          alignItems={"center"}
          space={2}
        >
          <Pressable
            onPress={() => handleChangeGrammarId(props.grammar?.id || 0)}
          >
            <MdEdit size={20} color={'#D02C23'} />
          </Pressable>
          <Pressable
            onPress={() => handleChangeDeleteGrammarId(props.grammar?.id || 0)}
          >
            <MdDelete size={20} color={'#D02C23'} />
          </Pressable>
        </Row>
      </Row>
      <Text
        fontSize={"14px"}
        fontWeight={500}
        textAlign={"left"}
        mb={2}
      >
        {props.grammar?.explain}
      </Text>

      <ModalUpdateGrammar
        isOpen={modalVisible}
        onReload={async () => {
          await props.revalidate()
        }}
        onClose={() => {
          setModalVisible(false)
        }}
        grammarId={grammarId}
      />
      <ModalDeleteGrammar
        isOpen={modalDeleteVisible}
        onReload={async () => {
          await props.revalidate()
        }}
        onClose={() => {
          setModalDeleteVisible(false)
        }}
        grammarId={grammarId}
      />
    </Column>
  )
}
