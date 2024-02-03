import React, { useState } from "react"

import { Button, Column, Row, Text } from "native-base"
// @ts-expect-error: react-html-renderer does not have types
import HTMLRenderer from "react-html-renderer"

import { useText } from "../../../utils/api/text"
import Error from "../../Error"
import ModalDeleteText from "./ModalDeleteText"

interface ITextDetailProps {
  textId: number
  onEdit: () => void
}

export default function Translate(props: ITextDetailProps) {
  const [modalDeleteText, setModalDeleteText] = useState<boolean>(false)

  const { data: text, error: textError, isLoading: textLoading } = useText(props.textId)

  if (textError) {
    return <Error message={textError.message} />
  }

  if (textLoading) {
    return <Text>Loading...</Text>
  }

  return (
    <Column
      width={"100%"}
      px={3}
      py={2}
      space={4}
    >
      <Row
        justifyContent={"space-around"}
        alignItems={"flex-start"}
        mt={"10px"}
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
          <Text
            fontWeight={600}
            fontSize={15}
            textAlign={"center"}
          >
            Original
          </Text>
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
            Translate
          </Text>
          <HTMLRenderer
            html={text?.translate ?? "<p>oba</p>"}
            components={{ h1: Paragraph, p: Paragraph }}
          />
        </Column>
      </Row>
      <Row
        justifyContent={"space-around"}
        alignItems={"flex-start"}
        mt={"10px"}
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
          <Text
            fontWeight={600}
            fontSize={15}
            textAlign={"center"}
          >
            Annotation
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
              bg={"#D02C23"}
              _hover={{ bg: "#ae251e" }}
              _pressed={{ bg: "#ae251e" }}
              onPress={props.onEdit}
            >
              Edit text
            </Button>
            <Button
              variant={"ghost"}
              colorScheme={"red"}
              onPress={() => {
                setModalDeleteText(true)
              }}
            >
              Delete text
            </Button>
          </Row>
        </Column>
      </Row>

      <ModalDeleteText
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
