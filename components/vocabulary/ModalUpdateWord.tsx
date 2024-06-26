import React, { useEffect, useState } from "react"

import { Button, Column, Modal, useToast } from "native-base"
import { useForm } from "react-hook-form"

import { ICategoryList, useCategories } from "../../utils/api/category"
import { updateWord, useWord } from "../../utils/api/vocabulary"
import { levelOptions, typeWordsOptions } from "../../utils/options"
import Input from "../Input"
import Select from "../Select"
import Textarea from "../Textarea"
import Toast from "../Toast"
import { IVocabularyFormInput } from "./ModalAddWord"

interface IModalAddWordProps {
  isOpen: boolean
  onClose: () => void
  onReload: () => void
  wordId: number | null
}

export default function ModalUpdateWord(props: IModalAddWordProps) {
  const { data: originalWord } = useWord(props.wordId || 0)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IVocabularyFormInput>()

  const { data: categories } = useCategories()

  const toast = useToast()
  const [saving, setSaving] = useState(false)
  const japaneseRegex = /^$|^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u002B\u002A\u007E\u002F.]+$/

  useEffect(() => {
    if (originalWord) {
      setValue("word", originalWord.word)
      setValue("reading", originalWord.reading)
      setValue("meaning", originalWord.meaning)
      setValue("type", originalWord.type)
      setValue("level", originalWord.level)
      setValue("category", originalWord.category.id.toString())
      setValue("annotation", originalWord.annotation)
    }
  }, [originalWord, setValue])

  function clearInputs() {
    setValue("word", "")
    setValue("reading", "")
    setValue("meaning", "")
    setValue("category", "")
    setValue("annotation", "")
  }

  const onSubmit = async (data: IVocabularyFormInput) => {
    setSaving(true)

    try {
      if (!props.wordId) return

      const updatedWord = await updateWord(props.wordId, {
        word: data.word,
        reading: data.reading,
        meaning: data.meaning,
        type: data.type,
        level: data.level,
        category: parseInt(data.category),
        annotation: data.annotation,
      })

      if (updatedWord) {
        props.onReload()
        toast.show({
          placement: "top",
          render: () => {
            return (
              <Toast
                title="Palavra atualizada!"
                message="Palavra atualizada com sucesso!"
                bg="#4B5563"
              />
            )
          },
        })
      }
      props.onClose()
      clearInputs()
    } catch (error) {
      toast.show({
        placement: "top",
        render: () => {
          return (
            <Toast
              title="Erro ao atualizar palavra!"
              message="Ocorreu um erro ao atualizar a palavra, tente novamente."
              bg="#39B59F"
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
        <Modal.Header _text={{ color: "#39B59F" }}> Atualizar palavra</Modal.Header>
        <Modal.Body>
          <Column>
            <Input
              label="Palavra"
              name="word"
              type="text"
              register={register}
              // @ts-expect-error: levelOptions is not assignable to type
              errors={errors}
              patternError="Palavra must be in Japanese"
              pattern={japaneseRegex}
            />

            <Input
              label="Leitura"
              name="reading"
              type="text"
              register={register}
              // @ts-expect-error: levelOptions is not assignable to type
              errors={errors}
              patternError="Reading must be in Japanese"
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
                props.onClose()
                clearInputs()
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
