import React, { useEffect, useState } from "react"

import { Button, Column, Modal, useToast } from "native-base"
import { useForm } from "react-hook-form"

import { updateConjugation, useConjugations } from "../../../utils/api/conjugation"
import Input from "../../Input"
import { IConjugationFormInput } from "./ModalAddConjugation"

interface IModalUpdateConjugationProps {
  isOpen: boolean
  wordId: number
  conjugationId: number
  onClose: () => void
}

export default function ModalUpdateConjugation(props: IModalUpdateConjugationProps) {
  const { data: originalConjugation, mutate: conjugationRevalidate } = useConjugations(props.wordId)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IConjugationFormInput>()

  const [saving, setSaving] = useState(false)

  const toast = useToast()

  useEffect(() => {
    if (originalConjugation) {
      setValue("present", originalConjugation.present)
      setValue("past", originalConjugation.past)
      setValue("negative", originalConjugation.negative)
      setValue("teForm", originalConjugation.te_form)
      setValue("potential", originalConjugation.potential)
      setValue("passive", originalConjugation.passive)
      setValue("causative", originalConjugation.causative)
      setValue("imperative", originalConjugation.imperative)
      setValue("volitional", originalConjugation.volitional)
      setValue("conditional", originalConjugation.conditional)
      setValue("causativePassive", originalConjugation.causative_passive)
    }
  }, [originalConjugation, setValue])

  function setOriginalValues() {
    if (originalConjugation) {
      setValue("present", originalConjugation.present)
      setValue("past", originalConjugation.past)
      setValue("negative", originalConjugation.negative)
      setValue("teForm", originalConjugation.te_form)
      setValue("potential", originalConjugation.potential)
      setValue("passive", originalConjugation.passive)
      setValue("causative", originalConjugation.causative)
      setValue("imperative", originalConjugation.imperative)
      setValue("volitional", originalConjugation.volitional)
      setValue("conditional", originalConjugation.conditional)
      setValue("causativePassive", originalConjugation.causative_passive)
    }
  }

  const japaneseRegex = /^$|^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u002B\u002A\u007E\u002F.]+$/;

  const onSubmit = async (data: IConjugationFormInput) => {
    setSaving(true)

    try {
      if (!props.conjugationId) return

      const updatedConjugation = await updateConjugation(props.conjugationId, props.wordId, {
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
      })

      if (updatedConjugation) {
        toast.show({
          title: "Success",
          description: `Conjugation updated`,
          placement: "top",
          duration: 2000,
        })
        conjugationRevalidate()
        props.onClose()
        setSaving(false)
      }
    } catch (error) {
      toast.show({
        title: "Something went wrong",
        duration: 3000,
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
        <Modal.Header _text={{ color: "#D02C23" }}>Update conjugation</Modal.Header>
        <Modal.Body>
          <Column>
            <Input
              label="Present"
              name="present"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
              patternError="Structure must be in Japanese"
              pattern={japaneseRegex}
            />
            <Input
              label="Past"
              name="past"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
              patternError="Structure must be in Japanese"
              pattern={japaneseRegex}
            />
            <Input
              label="Negative"
              name="negative"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
              patternError="Structure must be in Japanese"
              pattern={japaneseRegex}
            />
            <Input
              label="Te form"
              name="teForm"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
              patternError="Structure must be in Japanese"
              pattern={japaneseRegex}
            />
            <Input
              label="Potential"
              name="potential"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
              patternError="Structure must be in Japanese"
              pattern={japaneseRegex}
            />
            <Input
              label="Passive"
              name="passive"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
              patternError="Structure must be in Japanese"
              pattern={japaneseRegex}
            />
            <Input
              label="Causative"
              name="causative"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
              patternError="Structure must be in Japanese"
              pattern={japaneseRegex}
            />
            <Input
              label="Imperative"
              name="imperative"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
              patternError="Structure must be in Japanese"
              pattern={japaneseRegex}
            />
            <Input
              label="Volitional"
              name="volitional"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
              patternError="Structure must be in Japanese"
              pattern={japaneseRegex}
            />
            <Input
              label="Conditional"
              name="conditional"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
              patternError="Structure must be in Japanese"
              pattern={japaneseRegex}
            />
            <Input
              label="Causative passive"
              name="causativePassive"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
              patternError="Structure must be in Japanese"
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
                props.onClose()
                setOriginalValues()
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
