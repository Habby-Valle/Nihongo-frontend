import React, { useEffect, useState } from "react"

import { Button, Column, FormControl, Input, Row, useToast } from "native-base"
import { useRouter } from "next/router"

import { updateText, useText, useTexts } from "../../../utils/api/text"
import Toast from "../../Toast"
import TextEditor from "../TextEditor"

interface ITranslateUpdateProps {
  textId: number
  onBack?: () => void
}

export default function TranslateUpdate(props: ITranslateUpdateProps) {
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

  const { mutate: textsRevalidate } = useTexts()
  const { data: originalText } = useText(props.textId)

  const [AddAnnotation, setAddAnnotation] = useState<boolean>(!!originalText?.annotation)
  const japaneseRegex = /^$|^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u002B\u002A\u007E\u002F.]+$/
  const toast = useToast()
  const router = useRouter()

  useEffect(() => {
    if (originalText) {
      setTitle(originalText.title)
      setText(originalText.text)
      setTranslate(originalText.translate)
      setAnnotation(originalText.annotation)
    }
  }, [originalText])

  function setOriginalValues() {
    if (originalText) {
      setTitle(originalText.title)
      setText(originalText.text)
      setTranslate(originalText.translate)
      setAnnotation(originalText.annotation)
    }
  }

  const someInfoChanged =
    title !== originalText?.title ||
    text !== originalText?.text ||
    translate !== originalText?.translate ||
    annotation !== originalText?.annotation

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
      setTranslateErrorMessage("Tradução deve ter pelo menos 10 caracteres")
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
      const updatedText = await updateText(props.textId, {
        title,
        text,
        translate,
        annotation,
      })

      if (updatedText) {
        toast.show({
          placement: "top",
          render: () => {
            return (
              <Toast
                title="Texto atualizado!"
                message="O texto foi atualizado com sucesso."
                bg="#4BB543"
              />
            )
          },
        })
      }
      clearInputs()
      router.replace(`/text/text-translate`)
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
            _focus={{ borderColor: "#39B59F" }}
            _hover={{ borderColor: "#39B59F" }}
            focusOutlineColor={"#39B59F"}
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
          bg={"#39B59F"}
          _hover={{ bg: "#1ca088" }}
          _pressed={{ bg: "#1ca088" }}
          isDisabled={!isTitleValid || !isTextValid || !isTranslateValid}
          isLoading={saving}
        >
          Salvar
        </Button>

        <Button
          onPress={() => {
            setAddAnnotation((prevState) => !prevState)
          }}
          w={"20%"}
          bg={"#39B59F"}
          _hover={{ bg: "#1ca088" }}
          _pressed={{ bg: "#1ca088" }}
        >
          {AddAnnotation ? "Esconder anotação" : "Mostrar anotação"}
        </Button>

        <Button
          onPress={setOriginalValues}
          w={"20%"}
          bg={"#39B59F"}
          _hover={{ bg: "#1ca088" }}
          _pressed={{ bg: "#1ca088" }}
          isDisabled={!someInfoChanged || !isTitleValid || !isTextValid || !isTranslateValid}
        >
          Cancelar
        </Button>

        <Button
          onPress={props.onBack}
          w={"20%"}
          bg={"#39B59F"}
          _hover={{ bg: "#1ca088" }}
          _pressed={{ bg: "#1ca088" }}
        >
          Voltar
        </Button>
      </Row>
    </Column>
  )
}
