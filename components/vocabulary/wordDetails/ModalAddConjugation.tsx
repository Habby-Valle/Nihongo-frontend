import React, { useState } from "react"

import { Button, Column, Modal, useToast } from "native-base"
import { useForm } from "react-hook-form"

import { createConjugation, useConjugations } from "../../../utils/api/conjugation"
import Input from "../../Input"
import Toast from "../../Toast"

interface IModalAddConjugationProps {
  isOpen: boolean
  wordId: number
  onClose: () => void
}

export interface IConjugationFormInput {
  present: string
  past: string
  negative: string
  teForm: string
  potential: string
  passive: string
  causative: string
  imperative: string
  volitional: string
  conditional: string
  causativePassive: string
}

export default function ModalAddConjugation(props: IModalAddConjugationProps): JSX.Element {
  const { mutate: conjugationRevalidate } = useConjugations(props.wordId)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IConjugationFormInput>()

  const [saving, setSaving] = useState(false)

  const toast = useToast()

  const japaneseRegex = /^$|^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u002B\u002A\u007E\u002F.]+$/

  const clearInputs = () => {
    setValue("present", "")
    setValue("past", "")
    setValue("negative", "")
    setValue("teForm", "")
    setValue("potential", "")
    setValue("passive", "")
    setValue("causative", "")
    setValue("imperative", "")
    setValue("volitional", "")
    setValue("conditional", "")
    setValue("causativePassive", "")
  }

  const onSubmit = async (data: IConjugationFormInput) => {
    setSaving(true)

    try {
      const newConjugation = await createConjugation(props.wordId, {
        present: data.present,
        past: data.past,
        negative: data.negative,
        te_form: data.teForm,
        potential: data.potential,
        passive: data.passive,
        causative: data.causative,
        imperative: data.imperative,
        volitional: data.volitional,
        conditional: data.conditional,
        causative_passive: data.causativePassive,
        wordId: props.wordId,
      })

      if (newConjugation !== undefined) {
        toast.show({
          placement: "top",
          render: () => {
            return (
              <Toast
                title="Conjugação adicionada com sucesso"
                message="A conjugação foi adicionada com sucesso"
                bg="#4BB543"
              />
            )
          },
        })
      }
      await conjugationRevalidate()
      clearInputs()
    } catch (error) {
      toast.show({
        placement: "top",
        render: () => {
          return (
            <Toast
              title="Erro ao adicionar conjugação"
              message="Ocorreu um erro ao adicionar a conjugação"
              bg="#39B59F"
            />
          )
        },
      })
    } finally {
      setSaving(false)
      props.onClose()
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
        <Modal.Header _text={{ color: "#39B59F" }}>Add conjugation</Modal.Header>
        <Modal.Body>
          <Column>
            <Input
              label="Presente"
              name="present"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
              patternError="A estrutura deve estar em japonês"
              pattern={japaneseRegex}
            />
            <Input
              label="Passado"
              name="past"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
              patternError="A estrutura deve estar em japonês"
              pattern={japaneseRegex}
            />
            <Input
              label="Negativa"
              name="negative"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
              patternError="A estrutura deve estar em japonês"
              pattern={japaneseRegex}
            />
            <Input
              label="Forma Te"
              name="teForm"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
              patternError="A estrutura deve estar em japonês"
              pattern={japaneseRegex}
            />
            <Input
              label="Potencial"
              name="potential"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
              patternError="A estrutura deve estar em japonês"
              pattern={japaneseRegex}
            />
            <Input
              label="Passiva"
              name="passive"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
              patternError="A estrutura deve estar em japonês"
              pattern={japaneseRegex}
            />
            <Input
              label="Causativa"
              name="causative"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
              patternError="A estrutura deve estar em japonês"
              pattern={japaneseRegex}
            />
            <Input
              label="Imparativa"
              name="imperative"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
              patternError="A estrutura deve estar em japonês"
              pattern={japaneseRegex}
            />
            <Input
              label="Volicional"
              name="volitional"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
              patternError="A estrutura deve estar em japonês"
              pattern={japaneseRegex}
            />
            <Input
              label="Condicional"
              name="conditional"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
              patternError="A estrutura deve estar em japonês"
              pattern={japaneseRegex}
            />
            <Input
              label="Causativa Passiva"
              name="causativePassive"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
              patternError="A estrutura deve estar em japonês"
              pattern={japaneseRegex}
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
              bg={"#39B59F"}
              _hover={{ bg: "#1ca088" }}
              _pressed={{ bg: "#1ca088" }}
              isLoading={saving}
              onPress={() => {
                void handleSubmit(onSubmit)()
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
