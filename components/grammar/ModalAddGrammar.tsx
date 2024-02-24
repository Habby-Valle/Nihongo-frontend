import React, { useState } from "react"

import { Button, Column, Modal, useToast } from "native-base"
import { useForm } from "react-hook-form"

import { createGrammar } from "../../utils/api/grammar"
import { levelOptions } from "../../utils/options"
import Input from "../Input"
import Select from "../Select"
import Textarea from "../Textarea"

interface IModalAddGrammarProps {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
}

export interface IGrammarFormInput {
  grammar: string
  structure: string
  level: string
  explain: string
}

export default function ModalAddGrammar(props: IModalAddGrammarProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IGrammarFormInput>()

  const [saving, setSaving] = useState(false)
  const japaneseRegex = /^$|^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u002B\u002A\u007E\u002F.]+$/

  const toast = useToast()

  const clearInputs = () => {
    setValue("grammar", "")
    setValue("structure", "")
    setValue("level", "")
    setValue("explain", "")
  }
  const onSubmit = async (data: IGrammarFormInput) => {
    setSaving(true)

    try {
      const newGrammar = await createGrammar({
        grammar: data.grammar,
        structure: data.structure,
        level: data.level,
        explain: data.explain,
      })

      if (newGrammar) {
        props.onSave()
        toast.show({
          title: "Success",
          description: `Grammar added`,
          placement: "top",
          duration: 2000,
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
        <Modal.Header _text={{ color: "#D02C23" }}>Adicionar nova gramática</Modal.Header>
        <Modal.Body>
          <Column>
            <Input
              label="Gramática"
              name="grammar"
              type="text"
              register={register}
              // @ts-expect-error: errors type is not compatible with InputProps
              errors={errors}
            />
            <Input
              label="Estrutura"
              name="structure"
              type="text"
              register={register}
              // @ts-expect-error: errors type is not compatible with InputProps
              errors={errors}
              patternError="A estrutura deve conter apenas caracteres japoneses"
              pattern={japaneseRegex}
            />
            <Select
              label="Nível"
              name="level"
              register={register}
              // @ts-expect-error: errors type is not compatible with InputProps
              errors={errors}
              options={levelOptions}
            />

            <Textarea
              label="Explicação"
              name="explain"
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
