import React, { useState } from "react"

import { Button, Column, Modal, useToast } from "native-base"
import { useForm } from "react-hook-form"

import { createExample, useExamples } from "../../../utils/api/example"
import Input from "../../Input"
import Textarea from "../../Textarea"
import Toast from "../../Toast"

interface IModalAddExampleProps {
  isOpen: boolean
  wordId: number
  onClose: () => void
}

export interface IExampleFormInput {
  example: string
  meaning: string
  annotation: string
}

export default function ModalAddExample(props: IModalAddExampleProps) {
  const { mutate: examplesRevalidate } = useExamples(props.wordId)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IExampleFormInput>()

  const [saving, setSaving] = useState(false)

  const toast = useToast()

  const japaneseRegex = /[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFFEF]/

  const clearInputs = () => {
    setValue("example", "")
    setValue("meaning", "")
    setValue("annotation", "")
  }

  const onSubmit = async (data: IExampleFormInput) => {
    setSaving(true)

    try {
      const newExample = await createExample(props.wordId, {
        example: data.example,
        meaning: data.meaning,
        annotation: data.annotation,
        wordId: props.wordId,
      })

      if (newExample) {
        toast.show({
          placement: "top",
          render: () => {
            return (
              <Toast
                title="Sucesso"
                message="Exemplo adicionado com sucesso!"
                bg="#4BB543"
              />
            )
          },
        })
      }
      examplesRevalidate()
      clearInputs()
      props.onClose()
    } catch (error) {
      toast.show({
        placement: "top",
        render: () => {
          return (
            <Toast
              title="Erro"
              message="Erro ao adicionar exemplo!"
              bg="#D02C23"
            />
          )
        },
      })
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
        <Modal.Header _text={{ color: "#D02C23" }}>Adicionar novo exemplo</Modal.Header>
        <Modal.Body>
          <Column>
            <Input
              label="Exemplo"
              name="example"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
              patternError="Exemplo deve estar em japonês!"
              pattern={japaneseRegex}
            />

            <Input
              label="Tradução"
              name="meaning"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
            />

            <Textarea
              label="Anotação"
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
