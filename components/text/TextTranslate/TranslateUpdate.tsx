import React, { useEffect, useState } from "react"

import { Button, Column, FormControl, Input, Row, Toast } from "native-base"
import { useRouter } from "next/router"

import { updateText, useText, useTexts } from "../../../utils/api/text"
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
  const japaneseRegex = /^$|^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u002B\u002A\u007E\u002F.]+$/;

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
      setTitleErrorMessage("Title is required")
    } else if (!japaneseRegex.test(text)) {
      setIsTitleValid(false)
      setTitleErrorMessage("Title must be in Japanese")
    } else {
      setIsTitleValid(true)
      setTitleErrorMessage("")
    }
  }

  const handleText = (text: string) => {
    setText(text)

    if (text.trim().length === 0) {
      setIsTextValid(false)
      setTextErrorMessage("Text is required")
    } else {
      setIsTextValid(true)
      setTextErrorMessage("")
    }
  }

  const handleTranslate = (text: string) => {
    setTranslate(text)

    if (text.trim().length === 0) {
      setIsTranslateValid(false)
      setTranslateErrorMessage("Translate is required")
    } else if (text.length <= 16) {
      setIsTranslateValid(false)
      setTranslateErrorMessage("Translate must be at least 10 characters")
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
        Toast.show({
          title: "Success",
          description: `Text updated`,
          placement: "top",
          duration: 20000,
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
            Title
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
            Text
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
            Translate
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
              Annotation
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
          isDisabled={!isTitleValid || !isTextValid || !isTranslateValid}
          isLoading={saving}
        >
          Save
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
          {AddAnnotation ? "Hide Annotation" : "Show Annotation"}
        </Button>

        <Button
          onPress={setOriginalValues}
          w={"20%"}
          bg={"#D02C23"}
          _hover={{ bg: "#ae251e" }}
          _pressed={{ bg: "#ae251e" }}
          isDisabled={!someInfoChanged || !isTitleValid || !isTextValid || !isTranslateValid}
        >
          Cancel
        </Button>

        <Button
          onPress={props.onBack}
          w={"20%"}
          bg={"#D02C23"}
          _hover={{ bg: "#ae251e" }}
          _pressed={{ bg: "#ae251e" }}
        >
          Back
        </Button>
      </Row>
    </Column>
  )
}
