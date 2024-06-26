import React, { useState } from "react"

import { Button, Column, Modal, useToast } from "native-base"
import { useForm } from "react-hook-form"

import { ICategoryList, useCategories } from "../../utils/api/category"
import { TypeLevel, TypeWord } from "../../utils/api/types"
import { createWord } from "../../utils/api/vocabulary"
import { levelOptions, typeWordsOptions } from "../../utils/options"
import Input from "../Input"
import Select from "../Select"
import Textarea from "../Textarea"
import Toast from "../Toast"

interface IModalAddWordProps {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
}

export interface IVocabularyFormInput {
  word: string
  reading: string
  meaning: string
  type: TypeWord
  level: TypeLevel
  category: string
  annotation?: string
}

export default function ModalAddWord(props: IModalAddWordProps) {
  const { data: categories } = useCategories()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IVocabularyFormInput>()

  const toast = useToast()
  const [saving, setSaving] = useState(false)
  const japaneseRegex = /^$|^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u002B\u002A\u007E\u002F.]+$/

  const clearInputs = () => {
    setValue("word", "")
    setValue("reading", "")
    setValue("meaning", "")
    setValue("type", "Unknown")
    setValue("level", "Unknown")
    setValue("category", "")
    setValue("annotation", "")
  }

  const onSubmit = async (data: IVocabularyFormInput) => {
    console.log(data)
    setSaving(true)

    try {
      const newWord = await createWord({
        word: data.word,
        reading: data.reading,
        meaning: data.meaning,
        type: data.type,
        level: data.level,
        category: parseInt(data.category),
        annotation: data.annotation,
      })

      if (newWord) {
        props.onSave()
        toast.show({
          placement: "top",
          render: () => {
            return (
              <Toast
                title="Sucesso"
                message="Palavra adicionada com sucesso!"
                bg="#4B5563"
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
        <Modal.Header _text={{ color: "#39B59F" }}>Adicionar nova palavra</Modal.Header>
        <Modal.Body>
          <Column>
            <Input
              label="Palavra"
              name="word"
              type="text"
              register={register}
              // @ts-expect-error: levelOptions is not assignable to type
              errors={errors}
              patternError="A palavra deve estar em japonês"
              pattern={japaneseRegex}
            />

            <Input
              label="Leitura"
              name="reading"
              type="text"
              register={register}
              // @ts-expect-error: levelOptions is not assignable to type
              errors={errors}
              patternError="A leitura deve estar em japonês"
              pattern={japaneseRegex}
            />

            <Input
              label="Significado"
              name="meaning"
              type="text"
              register={register}
              // @ts-expect-error: levelOptions is not assignable to type
              errors={errors}
            />

            <Select
              label="Tipo"
              name="type"
              register={register}
              // @ts-expect-error: levelOptions is not assignable to type
              errors={errors}
              options={typeWordsOptions}
            />

            <Select
              label="Nível"
              name="level"
              register={register}
              // @ts-expect-error: levelOptions is not assignable to type
              errors={errors}
              options={levelOptions}
            />

            <Select
              label="Categoria"
              name="category"
              register={register}
              // @ts-expect-error: levelOptions is not assignable to type
              errors={errors}
              options={categories?.map((category: ICategoryList) => {
                return {
                  label: category.name,
                  value: category.id,
                }
              })}
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
              bg={"#39B59F"}
              _hover={{ bg: "#1ca088" }}
              _pressed={{ bg: "#1ca088" }}
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
