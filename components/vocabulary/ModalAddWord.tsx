import React, { useState } from "react"

import { Button, Column, Modal, useToast } from "native-base"
import { useForm } from "react-hook-form"

import { ICategoryList, useCategories } from "../../utils/api/category"
import { TypeLevel, TypeWord } from "../../utils/api/types"
import { createWord, useWords } from "../../utils/api/vocabulary"
import { levelOptions, typeWordsOptions } from "../../utils/options"
import Input from "../Input"
import Select from "../Select"

interface IModalAddWordProps {
  isOpen: boolean
  onClose: () => void
}

export interface IVocabularyFormInput {
  word: string
  reading: string
  meaning: string
  type: TypeWord
  level: TypeLevel
  category: string
}

export default function ModalAddWord(props: IModalAddWordProps) {
  const { mutate: wordsRevalidate } = useWords()

  const { data: categories, mutate: categoriesRevalidate } = useCategories()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IVocabularyFormInput>()

  const toast = useToast()
  const [saving, setSaving] = useState(false)
  const japaneseRegex = /^$|^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u002B\u002A\u007E\u002F.]+$/;

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
      })

      if (newWord) {
        toast.show({
          title: "Success",
          description: `Word added`,
          placement: "top",
          duration: 2000,
        })
      }
      categoriesRevalidate()
      wordsRevalidate()
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
        <Modal.Header _text={{ color: "#D02C23" }}>Add new word</Modal.Header>
        <Modal.Body>
          <Column>
            <Input
              label="Word"
              name="word"
              type="text"
              register={register}
              // @ts-expect-error: levelOptions is not assignable to type
              errors={errors}
              patternError="Word must be in Japanese"
              pattern={japaneseRegex}
            />

            <Input
              label="Reading"
              name="reading"
              type="text"
              register={register}
              // @ts-expect-error: levelOptions is not assignable to type
              errors={errors}
              patternError="Reading must be in Japanese"
              pattern={japaneseRegex}
            />

            <Input
              label="Meaning"
              name="meaning"
              type="text"
              register={register}
              // @ts-expect-error: levelOptions is not assignable to type
              errors={errors}
            />

            <Select
              label="Type"
              name="type"
              register={register}
              // @ts-expect-error: levelOptions is not assignable to type
              errors={errors}
              options={typeWordsOptions}
            />

            <Select
              label="Level"
              name="level"
              register={register}
              // @ts-expect-error: levelOptions is not assignable to type
              errors={errors}
              options={levelOptions}
            />

            <Select
              label="Category"
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
