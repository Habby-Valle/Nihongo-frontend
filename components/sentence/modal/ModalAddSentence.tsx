import React, { useState } from "react"

import { Button, Column, Modal, useToast } from "native-base"
import { useForm } from "react-hook-form"

import { createSentence, useSentences } from "../../../utils/api/sentence"
import Input from "../../Input"
import Textarea from "../../Textarea"

interface IModalAddSentenceProps {
  isOpen: boolean
  onClose: () => void
  grammarId: number | null
}

export interface ISentenceFormInput {
  sentence: string
  translate: string
  annotation: string
}

export default function ModalAddSentence(props: IModalAddSentenceProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ISentenceFormInput>()

  const toast = useToast()

  const { mutate: sentenceRevalidate } = useSentences(props.grammarId || undefined)

  const [saving, setSaving] = useState(false)
  const japaneseRegex = /[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFFEF]/
  const clearInputs = () => {
    setValue("sentence", "")
    setValue("translate", "")
    setValue("annotation", "")
  }
  const onSubmit = async (data: ISentenceFormInput) => {
    setSaving(true)

    try {
      if (!props.grammarId) return

      const newSentence = await createSentence({
        sentence: data.sentence,
        translate: data.translate,
        annotation: data.annotation,
        grammar: props.grammarId,
      })

      if (newSentence) {
        toast.show({
          title: "Success",
          description: `Sentence added`,
          placement: "top",
          duration: 2000,
        })
      }
      sentenceRevalidate()
      clearInputs()
      props.onClose()
    } catch (error) {
      alert(error)
    } finally {
      setSaving(false)
    }
  }
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <Modal.Content
        maxWidth="400px"
        _light={{
          bg: "#F2F2F2",
        }}
        _dark={{
          bg: "#333333",
        }}
      >
        <Modal.CloseButton />
        <Modal.Header _text={{ color: "#D02C23" }}>Add new sentence</Modal.Header>
        <Modal.Body>
          <Column>
            <Input
              label="Sentence"
              name="sentence"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not in the type
              errors={errors}
              patternError="Sentence must be in Japanese"
              pattern={japaneseRegex}
            />

            <Input
              label="Translate"
              name="translate"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not in the type
              errors={errors}
            />

            <Textarea
              label="Annotation"
              name="annotation"
              register={register}
            />
          </Column>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                clearInputs()
                props.onClose()
              }}
            >
              Cancel
            </Button>
            <Button
              bg={"#D02C23"}
              _hover={{ bg: "#ae251e" }}
              _pressed={{ bg: "#ae251e" }}
              isLoading={saving}
              onPress={() => {
                handleSubmit(onSubmit)()
              }}
            >
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
