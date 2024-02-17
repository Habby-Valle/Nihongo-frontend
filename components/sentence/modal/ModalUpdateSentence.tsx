import React, { useEffect, useState } from "react"

import { Button, Column, Modal, useToast } from "native-base"
import { useForm } from "react-hook-form"

import { updateSentence, useSentence, useSentences } from "../../../utils/api/sentence"
import Input from "../../Input"
import Textarea from "../../Textarea"
import { ISentenceFormInput } from "./ModalAddSentence"

interface IModalUpdateSentenceProps {
  isOpen: boolean
  onClose: () => void
  sentenceId: number | null
  grammarId: number | null
}

export default function ModalUpdateSentence(props: IModalUpdateSentenceProps) {
  const { mutate: sentencesRevalidate } = useSentences(props.grammarId || 0)
  const { data: originalSentence } = useSentence(props.sentenceId || 0)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ISentenceFormInput>()

  const [saving, setSaving] = useState(false)
  const japaneseRegex = /^$|^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u002B\u002A\u007E\u002F.]+$/

  const toast = useToast()

  useEffect(() => {
    if (originalSentence) {
      setValue("sentence", originalSentence.sentence)
      setValue("translate", originalSentence.translate)
      setValue("annotation", originalSentence.annotation)
    }
  }, [originalSentence, setValue])

  const onSubmit = async (data: ISentenceFormInput) => {
    setSaving(true)

    try {
      if (!props.sentenceId) return

      const updatedSentence = await updateSentence(props.sentenceId, {
        sentence: data.sentence,
        translate: data.translate,
        annotation: data.annotation,
      })

      if (updatedSentence) {
        toast.show({
          title: "Success",
          description: `Sentence updated`,
          placement: "top",
          duration: 3000,
        })
        sentencesRevalidate()
        props.onClose()
      }
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
        <Modal.Header _text={{ color: "#D02C23" }}>Update sentence</Modal.Header>
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
                props.onClose()
              }}
            >
              Cancelar
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
              Salvar
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
