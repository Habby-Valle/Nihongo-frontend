import React, { useState } from "react"

import { Button, Modal, useToast } from "native-base"
import { useRouter } from "next/router"

import { deleteTextWriting, useTextWritings } from "../../../utils/api/text"
import Toast from "../../Toast"

interface IModalDeleteTextProps {
  isOpen: boolean
  onClose: () => void
  textId: number
}

export default function ModalDeleteTextWriting(props: IModalDeleteTextProps) {
  const { mutate: textsRevalidate } = useTextWritings()
  const [saving, setSaving] = useState(false)
  const toast = useToast()
  const router = useRouter()

  async function deleteTextFunc() {
    setSaving(true)

    try {
      if (props.textId === null) return
      await deleteTextWriting(props.textId)

      toast.show({
        placement: "top",
        render: () => {
          return (
            <Toast
              title="Sucesso"
              message="Texto excluído com sucesso"
              bg="#4BB543"
            />
          )
        },
      })

      textsRevalidate()
      props.onClose()
      router.replace("/text/text-writing")
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
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header _text={{ color: "#D02C23" }}>Excluir texto</Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir este texto?</Modal.Body>
        <Modal.Footer>
          <Button.Group
            variant="ghost"
            space={2}
          >
            <Button
              onPress={props.onClose}
              variant="ghost"
              colorScheme="blueGray"
            >
              Cancelar
            </Button>
            <Button
              bg={"#D02C23"}
              _hover={{ bg: "#ae251e" }}
              _pressed={{ bg: "#ae251e" }}
              onPress={deleteTextFunc}
              isLoading={saving}
              _text={{ color: "white" }}
            >
              Excluir
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
