import React, { useEffect, useState } from "react"

import { Button, Column, FormControl, Input, Row, Toast } from "native-base"
import { useRouter } from "next/router"

import { updateTextWriting, useTextWriting, useTextWritings } from "../../../utils/api/text"
import TextEditor from "../TextEditor"

interface ITranslateUpdateProps {
  textId: number
  onBack?: () => void
}

export default function WritingUpdate(props: ITranslateUpdateProps) {
  const [text, setText] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [annotation, setAnnotation] = useState<string>("")

  const [isTitleValid, setIsTitleValid] = useState<boolean>(false)
  const [isTextValid, setIsTextValid] = useState<boolean>(false)

  const [saving, setSaving] = useState<boolean>(false)

  const [titleErrorMessage, setTitleErrorMessage] = useState<string>("")
  const [textErrorMessage, setTextErrorMessage] = useState<string>("")

  const { mutate: textsRevalidate } = useTextWritings()
  const { data: originalText } = useTextWriting(props.textId)

  const [AddAnnotation, setAddAnnotation] = useState<boolean>(!!originalText?.annotation)
  const japaneseRegex = /^$|^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u002B\u002A\u007E\u002F.]+$/

  const router = useRouter()

  useEffect(() => {
    if (originalText) {
      setTitle(originalText.title)
      setText(originalText.text)
      setAnnotation(originalText.annotation)
    }
  }, [originalText])

  function setOriginalValues() {
    if (originalText) {
      setTitle(originalText.title)
      setText(originalText.text)
      setAnnotation(originalText.annotation)
    }
  }

  const someInfoChanged =
    title !== originalText?.title || text !== originalText?.text || annotation !== originalText?.annotation

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

  const handleAnnotation = (text: string) => {
    setAnnotation(text)
  }

  const clearInputs = () => {
    setTitle("")
    setText("")
    setAnnotation("")
  }

  async function save() {
    setSaving(true)
    try {
      const updatedText = await updateTextWriting(props.textId, {
        title,
        text,
        annotation,
      })

      if (updatedText) {
        Toast.show({
          title: "Success",
          description: `Texto atualizado com sucesso!`,
          placement: "top",
          duration: 2000,
        })
      }
      clearInputs()
      router.replace(`/text/text-writing`)
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
            Contéudo
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
        {AddAnnotation && (
          <FormControl>
            <FormControl.Label
              _text={{
                fontWeight: "bold",
                fontSize: "lg",
              }}
            >
              Anotações
            </FormControl.Label>
            <TextEditor
              content={annotation}
              onContentChanged={handleAnnotation}
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
          w={"20%"}
          bg={"#D02C23"}
          _hover={{ bg: "#ae251e" }}
          _pressed={{ bg: "#ae251e" }}
          isDisabled={!isTitleValid || !isTextValid}
          isLoading={saving}
        >
          Salvar
        </Button>

        <Button
          onPress={() => {
            setAddAnnotation((prevState) => !prevState)
          }}
          w={"20%"}
          bg={"#D02C23"}
          _hover={{ bg: "#ae251e" }}
          _pressed={{ bg: "#ae251e" }}
        >
          {AddAnnotation ? "Esconder anotação" : "Mostrar anotação"}
        </Button>

        <Button
          onPress={setOriginalValues}
          w={"20%"}
          bg={"#D02C23"}
          _hover={{ bg: "#ae251e" }}
          _pressed={{ bg: "#ae251e" }}
          isDisabled={!someInfoChanged || !isTitleValid || !isTextValid}
        >
          Cancelar
        </Button>

        <Button
          onPress={props.onBack}
          w={"20%"}
          bg={"#D02C23"}
          _hover={{ bg: "#ae251e" }}
          _pressed={{ bg: "#ae251e" }}
        >
          Voltar
        </Button>
      </Row>
    </Column>
  )
}
