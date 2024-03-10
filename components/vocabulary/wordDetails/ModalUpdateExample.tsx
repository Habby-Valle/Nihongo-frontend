import React, { useEffect, useState } from "react"

import { Button, Column, Modal, useToast } from "native-base"
import { useForm } from "react-hook-form"

import { updateExample, useExample, useExamples } from "../../../utils/api/example"
import Input from "../../Input"
import Textarea from "../../Textarea"
import Toast from "../../Toast"
import { IExampleFormInput } from "./ModalAddExample"

interface IModalAddExampleProps {
  isOpen: boolean
  wordId: number
  exampleId: number
  onClose: () => void
}

export default function ModalUpdatExample(props: IModalAddExampleProps) {
  const { mutate: examplesRevalidate } = useExamples(props.wordId)
  const { data: originalExample } = useExample(props.exampleId, props.wordId)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IExampleFormInput>()

  const [saving, setSaving] = useState(false)

  const toast = useToast()

  const japaneseRegex = /^$|^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u002B\u002A\u007E\u002F.]+$/

  useEffect(() => {
    if (originalExample) {
      setValue("example", originalExample.example)
      setValue("meaning", originalExample.meaning)
      setValue("annotation", originalExample.annotation)
    }
  }, [originalExample, setValue])

  function setOriginalValues() {
    if (originalExample) {
      setValue("example", originalExample.example)
      setValue("meaning", originalExample.meaning)
      setValue("annotation", originalExample.annotation)
    }
  }

  function clearInputs() {
    setValue("example", "")
    setValue("meaning", "")
    setValue("annotation", "")
  }

  const onSubmit = async (data: IExampleFormInput) => {
    setSaving(true)

    try {
      const updatedExample = await updateExample(props.exampleId, props.wordId, {
        example: data.example,
        meaning: data.meaning,
        annotation: data.annotation,
      })

      if (updatedExample) {
        toast.show({
          placement: "top",
          render: () => {
            return (
              <Toast
                title="Sucesso"
                message="Exemplo atualizado!"
                bg="#4B5563"
              />
            )
          },
        })
      }
      examplesRevalidate()
      props.onClose()
      clearInputs()
      setSaving(false)
    } catch (error) {
      toast.show({
        placement: "top",
        render: () => {
          return (
            <Toast
              title="Erro"
              message="Erro ao atualizar exemplo!"
              bg="#D02C23"
            />
          )
        },
      })
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
        <Modal.Header _text={{ color: "#D02C23" }}>Atualizar exemplo</Modal.Header>
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
                setOriginalValues()
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
