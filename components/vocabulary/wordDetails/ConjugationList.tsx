import React, { useState } from "react"

import { Column, Pressable, Row, Text } from "native-base"
import { MdDelete, MdEdit } from "react-icons/md"

import { useConjugations } from "../../../utils/api/conjugation"
import DataEmpty from "../../DataEmpty"
import ModalDeleteConjugation from "./ModalDeleteConjugation"
import ModalUpdateConjugation from "./ModalUpdateConjugation"

interface IConjugationListProps {
  wordId: number
}

export default function ConjugationList(props: IConjugationListProps) {
  const { data: conjugation, isLoading: conjugationIsLoading } = useConjugations(props.wordId)

  const [modalUpdateVisible, setModalUpdateVisible] = useState(false)
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false)

  function handleUpdateConjugation(conjugationId: number) {
    setModalUpdateVisible(true)
  }

  function handleDeleteConjugation(conjugationId: number) {
    setModalDeleteVisible(true)
  }

  if (conjugationIsLoading) {
    return <Text>Carregando...</Text>
  }

  if (!conjugation) {
    return <DataEmpty message="Sem conjugações" />
  }

  return (
    <Column
      w={"100%"}
      p={4}
      _dark={{ bg: "gray.700" }}
      _light={{ bg: "white" }}
    >
      <Row
        justifyContent={"flex-end"}
        alignItems={"center"}
        space={6}
      >
        <Pressable
          onPress={() => {
            handleUpdateConjugation(conjugation.id)
          }}
        >
          <MdEdit
            size={25}
            color="#39B59F"
          />
        </Pressable>
        <Pressable
          onPress={() => {
            handleDeleteConjugation(conjugation.id)
          }}
        >
          <MdDelete
            size={25}
            color="#39B59F"
          />
        </Pressable>
      </Row>
      <Row
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Column space={4}>
          <Text fontWeight={"bold"}>Presente: {conjugation.present}</Text>
          <Text fontWeight={"bold"}>Negativa: {conjugation.negative}</Text>
          <Text fontWeight={"bold"}>Passado: {conjugation.past}</Text>
          <Text fontWeight={"bold"}>Forma Te: {conjugation.te_form}</Text>
        </Column>
        <Column space={4}>
          <Text fontWeight={"bold"}>Potencial: {conjugation.potential}</Text>
          <Text fontWeight={"bold"}>Volitiva: {conjugation.volitional}</Text>
          <Text fontWeight={"bold"}>Causativa: {conjugation.causative}</Text>
          <Text fontWeight={"bold"}>Passiva: {conjugation.passive}</Text>
        </Column>
        <Column space={4}>
          <Text fontWeight={"bold"}>Passiva Causativa: {conjugation.causative_passive}</Text>
          <Text fontWeight={"bold"}>Condicional: {conjugation.conditional}</Text>
          <Text fontWeight={"bold"}>Imperativa: {conjugation.imperative}</Text>
        </Column>
      </Row>

      <ModalDeleteConjugation
        isOpen={modalDeleteVisible}
        onClose={() => {
          setModalDeleteVisible(false)
        }}
        conjugationId={conjugation.id}
        wordId={props.wordId}
      />

      <ModalUpdateConjugation
        isOpen={modalUpdateVisible}
        onClose={() => {
          setModalUpdateVisible(false)
        }}
        conjugationId={conjugation.id}
        wordId={props.wordId}
      />
    </Column>
  )
}
