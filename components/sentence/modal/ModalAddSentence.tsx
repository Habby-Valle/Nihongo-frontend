import React, { useState } from "react"

import { Button, Column, Modal, useToast } from "native-base"
import { useForm } from "react-hook-form"

import { createSentence } from "../../../utils/api/sentence"
import Input from "../../Input"
import Textarea from "../../Textarea"
import Toast from "../../Toast"

interface IModalAddSentenceProps {
  isOpen: boolean
  onSave: () => void
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
        props.onSave()
        toast.show({
          placement: "top",
          render: () => {
            return (
              <Toast
                title="Sentença adicionada com sucesso!"
                message="A sentença foi adicionada com sucesso."
                bg="#4BB543"
              />
            )
          },
        })
      }
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
        <Modal.Header _text={{ color: "#D02C23" }}>Adicionar nova sentença</Modal.Header>
        <Modal.Body>
          <Column>
            <Input
              label="Frase"
              name="sentence"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not in the type
              errors={errors}
              patternError="A frase deve estar em japonês!"
              pattern={japaneseRegex}
            />

            <Input
              label="Tradução"
              name="translate"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not in the type
              errors={errors}
            />

            <Textarea
              label="Anotações"
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
