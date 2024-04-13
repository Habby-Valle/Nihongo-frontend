import React, { useState } from "react"

import { Button, Column, Row, Text } from "native-base"
// @ts-expect-error: react-html-renderer does not have types
import HTMLRenderer from "react-html-renderer"

import { useTextWriting } from "../../../utils/api/text"
import Error from "../../Error"
import ModalDeleteTextWriting from "./ModalDeleteTextWriting"

interface IWritinglProps {
  textId: number
  onEdit: () => void
}

export default function WritingView(props: IWritinglProps) {
  const [modalDeleteText, setModalDeleteText] = useState<boolean>(false)

  const { data: text, error: textError, isLoading: textLoading } = useTextWriting(props.textId)

  if (textError) {
    return <Error message={textError.message} />
  }

  if (textLoading) {
    return <Text>Carregando...</Text>
  }

  return (
    <Column
      width={"100%"}
      px={3}
      py={2}
      space={4}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Column
        space={4}
        _dark={{
          bg: "gray.700",
        }}
        _light={{
          bg: "white",
        }}
        p={"10px"}
        rounded={"md"}
        w={"45%"}
      >
        <HTMLRenderer
          html={text?.text}
          components={{ h1: Paragraph, p: Paragraph }}
        />
      </Column>
      <Column
        space={4}
        _dark={{
          bg: "gray.700",
        }}
        _light={{
          bg: "white",
        }}
        p={"10px"}
        rounded={"md"}
        w={"45%"}
      >
        <Text
          fontWeight={600}
          fontSize={15}
          textAlign={"center"}
        >
          Anotações
        </Text>
        <HTMLRenderer
          html={text?.annotation || "<p>Nenhuma anotação disponível</p>"}
          components={{ h1: Paragraph, p: Paragraph }}
        />
        <Row
          justifyContent={"space-around"}
          alignItems={"flex-start"}
          mt={"10px"}
        >
          <Button
            bg={"#39B59F"}
            _hover={{ bg: "#1ca088" }}
            _pressed={{ bg: "#1ca088" }}
            onPress={props.onEdit}
          >
            Atualizar texto
          </Button>
          <Button
            variant={"ghost"}
            colorScheme={"red"}
            onPress={() => {
              setModalDeleteText(true)
            }}
          >
            Excluir texto
          </Button>
        </Row>
      </Column>
      <ModalDeleteTextWriting
        isOpen={modalDeleteText}
        onClose={() => {
          setModalDeleteText(false)
        }}
        textId={props.textId}
      />
    </Column>
  )
}

function Paragraph(props: any) {
  return (
    <Text
      fontSize={16}
      fontWeight={500}
    >
      {props.children}
    </Text>
  )
}
