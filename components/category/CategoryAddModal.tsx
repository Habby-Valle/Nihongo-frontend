import React, { useState } from "react"

import { Button, Column, Modal, useToast } from "native-base"
import { useForm } from "react-hook-form"

import { createCategory, useCategories } from "../../utils/api/category"
import Input from "../Input"
import Toast from "../Toast"

interface IModalAddCategoryProps {
  isOpen: boolean
  onClose: () => void
}

interface IFormInput {
  category: string
}

export default function CategoryAddModal(props: IModalAddCategoryProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInput>()

  const { mutate: categoriesRevalidate } = useCategories()

  const [saving, setSaving] = useState(false)

  const toast = useToast()

  const clearInputs = () => {
    setValue("category", "")
  }

  const onSubmit = async (data: IFormInput) => {
    console.log(data.category)
    setSaving(true)

    try {
      const newCategory = await createCategory({
        name: data.category,
      })

      if (newCategory) {
        toast.show({
          placement: "top",
          render: () => {
            return (
              <Toast
                title="Sucesso"
                message="Categoria adicionada com sucesso"
                bg="#4BB543"
              />
            )
          },
        })
      }
      categoriesRevalidate()
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
        <Modal.Header _text={{ color: "#39B59F" }}>Adicionar nova categoria</Modal.Header>
        <Modal.Body>
          <Column>
            <Input
              label="Categoria"
              name="category"
              type="text"
              register={register}
              // @ts-expect-error: patternError is not a valid prop
              errors={errors}
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
