import React, { useRef, useState } from "react"

import { Button, Column, FormControl, Input, Row, useToast } from "native-base"

import { createText, useTexts } from "../../../utils/api/text"
import Toast from "../../Toast"
import TextEditor from "../TextEditor"

export default function Translate() {
  const [text, setText] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [translate, setTranslate] = useState<string>("")
  const [annotation, setAnnotation] = useState<string>("")

  const [isTitleValid, setIsTitleValid] = useState<boolean>(false)
  const [isTextValid, setIsTextValid] = useState<boolean>(false)
  const [isTranslateValid, setIsTranslateValid] = useState<boolean>(false)

  const [saving, setSaving] = useState<boolean>(false)

  const [titleErrorMessage, setTitleErrorMessage] = useState<string>("")
  const [textErrorMessage, setTextErrorMessage] = useState<string>("")
  const [translateErrorMessage, setTranslateErrorMessage] = useState<string>("")

  const [AddAnnotation, setAddAnnotation] = useState<boolean>(false)

  const annotationRef = useRef(null)
  const japaneseRegex = /^$|^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u002B\u002A\u007E\u002F.]+$/
  const toast = useToast()
  const { mutate: textsRevalidate } = useTexts()

  const handleTitle = (text: string) => {
    setTitle(text)

    if (text.trim().length === 0) {
      setIsTitleValid(false)
      setTitleErrorMessage("Título é obrigatório")
    } else if (!japaneseRegex.test(text)) {
      setIsTitleValid(false)
      setTitleErrorMessage("Título deve ser em japonês")
    } else {
      setIsTitleValid(true)
      setTitleErrorMessage("")
    }
  }

  const handleText = (text: string) => {
    setText(text)

    if (text.trim().length === 0) {
      setIsTextValid(false)
      setTextErrorMessage("Texto é obrigatório")
    } else {
      setIsTextValid(true)
      setTextErrorMessage("")
    }
  }

  const handleTranslate = (text: string) => {
    setTranslate(text)

    if (text.trim().length === 0) {
      setIsTranslateValid(false)
      setTranslateErrorMessage("Tradução é obrigatória")
    } else if (text.length <= 16) {
      setIsTranslateValid(false)
      setTranslateErrorMessage("Tradução deve ter mais de 16 caracteres")
    } else {
      setIsTranslateValid(true)
      setTranslateErrorMessage("")
    }
  }

  const handleAnnotation = (text: string) => {
    setAnnotation(text)
  }

  const clearInputs = () => {
    setTitle("")
    setText("")
    setTranslate("")
    setAnnotation("")
  }

  async function save() {
    setSaving(true)
    try {
      const newText = await createText({
        title,
        text,
        translate,
        annotation,
      })

      if (newText) {
        toast.show({
          placement: "top",
          render: () => {
            return (
              <Toast
                title="Texto adicionado com sucesso!"
                message="O texto foi adicionado com sucesso."
                bg="#4BB543"
              />
            )
          },
        })
      }
      clearInputs()
      textsRevalidate()
    } catch (error) {
      alert(error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Column
      space={4}
      w={"70%"}
      p={"10px"}
      rounded={"md"}
      _dark={{
        bg: "gray.700",
      }}
      _light={{
        bg: "gray.100",
      }}
    >
      <Column space={4}>
        <FormControl isInvalid={!isTitleValid}>
          <FormControl.Label
            _text={{
              fontWeight: "bold",
              fontSize: "lg",
            }}
            key="title-label"
            testID="title-label"
          >
            Título
          </FormControl.Label>
          <Input
            placeholder={"Title"}
            shadow={1}
            _focus={{ borderColor: "#D02C23" }}
            _hover={{ borderColor: "#D02C23" }}
            focusOutlineColor={"#D02C23"}
            _light={{
              bg: "white",
            }}
            _dark={{
              bg: "#262626",
            }}
            onChangeText={handleTitle}
            value={title}
            fontSize={"lg"}
            testID="title-input"
          />

          <FormControl.ErrorMessage
            _text={{
              fontWeight: "bold",
              fontSize: "lg",
            }}
            key="title-error-message"
            testID="title-error-message"
          >
            {titleErrorMessage}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={!isTextValid}>
          <FormControl.Label
            _text={{
              fontWeight: "bold",
              fontSize: "lg",
            }}
          >
            Conteúdo
          </FormControl.Label>
          <TextEditor
            content={text}
            onContentChanged={handleText}
          />

          <FormControl.ErrorMessage
            _text={{
              fontWeight: "bold",
              fontSize: "lg",
            }}
          >
            {textErrorMessage}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isInvalid={!isTranslateValid}>
          <FormControl.Label
            _text={{
              fontWeight: "bold",
              fontSize: "lg",
            }}
          >
            Tradução
          </FormControl.Label>
          <TextEditor
            content={translate}
            onContentChanged={handleTranslate}
          />

          <FormControl.ErrorMessage
            _text={{
              fontWeight: "bold",
              fontSize: "lg",
            }}
          >
            {translateErrorMessage}
          </FormControl.ErrorMessage>
        </FormControl>
        {AddAnnotation && (
          <FormControl>
            <FormControl.Label
              _text={{
                fontWeight: "bold",
                fontSize: "lg",
              }}
            >
              Anotação
            </FormControl.Label>
            <TextEditor
              content={annotation}
              onContentChanged={handleAnnotation}
              ref={annotationRef}
            />
          </FormControl>
        )}
      </Column>
      <Row
        space={4}
        justifyContent={"space-between"}
      >
        <Button
          onPress={save}
          w={"40%"}
          bg={"#D02C23"}
          _hover={{ bg: "#ae251e" }}
          _pressed={{ bg: "#ae251e" }}
          isDisabled={!isTitleValid || !isTextValid || !isTranslateValid}
          isLoading={saving}
        >
          Salvar
        </Button>
        <Button
          onPress={() => {
            setAddAnnotation(!AddAnnotation)
          }}
          w={"40%"}
          bg={"#D02C23"}
          _hover={{ bg: "#ae251e" }}
          _pressed={{ bg: "#ae251e" }}
        >
          {AddAnnotation ? "Esconder anotação" : "Add anotação"}
        </Button>
      </Row>
    </Column>
  )
}
