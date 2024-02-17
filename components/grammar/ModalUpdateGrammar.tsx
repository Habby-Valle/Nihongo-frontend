import React, { useEffect, useState } from "react"

import { Button, Column, Modal, useToast } from "native-base"
import { useForm } from "react-hook-form"

import { updateGrammar, useGrammar, useGrammars } from "../../utils/api/grammar"
import { levelOptions } from "../../utils/options"
import Error from "../Error"
import Input from "../Input"
import Select from "../Select"
import Textarea from "../Textarea"
import { IGrammarFormInput } from "./ModalAddGrammar"

interface IModalUpdateGrammarProps {
  isOpen: boolean
  onClose: () => void
  grammarId: number | null
}

export default function ModalUpdateGrammar(props: IModalUpdateGrammarProps) {
  const { mutate: grammarsRevalidate } = useGrammars()

  const { data: originalGrammar } = useGrammar(props.grammarId || 0)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IGrammarFormInput>()

  const [saving, setSaving] = useState(false)
  const japaneseRegex = /^$|^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u002B\u002A\u007E\u002F.]+$/

  const toast = useToast()

  useEffect(() => {
    if (originalGrammar) {
      setValue("grammar", originalGrammar.grammar)
      setValue("structure", originalGrammar.structure)
      setValue("level", originalGrammar.level)
      setValue("explain", originalGrammar.explain)
    }
  }, [originalGrammar, setValue])

  const onSubmit = async (data: IGrammarFormInput) => {
    setSaving(true)

    try {
      if (!props.grammarId) return

      const updatedGrammar = await updateGrammar(props.grammarId, {
        grammar: data.grammar,
        structure: data.structure,
        level: data.level,
        explain: data.explain,
      })

      if (updatedGrammar) {
        toast.show({
          title: "Success",
          description: `Gramática atualizada!`,
          placement: "top",
          duration: 2000,
        })
      }
      grammarsRevalidate()
      props.onClose()
    } catch (error) {
      toast.show({
        title: "Error",
        description: `Erro ao atualizar gramática!`,
        placement: "top",
        duration: 2000,
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
        <Modal.Header _text={{ color: "#D02C23" }}>Atualizar gramática</Modal.Header>
        <Modal.Body>
          <Column>
            <Input
              label="Gramática"
              name="grammar"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
            />
            <Input
              label="Estrutura"
              name="structure"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
              patternError="A estrutura deve conter apenas caracteres japoneses"
              pattern={japaneseRegex}
            />
            <Select
              label="Nível"
              name="level"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
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
