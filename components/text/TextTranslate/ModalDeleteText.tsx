import React, { useState } from "react"

import { Button, Modal, useToast } from "native-base"
import { useRouter } from "next/router"

import { deleteText, useTexts } from "../../../utils/api/text"

interface IModalDeleteTextProps {
  isOpen: boolean
  onClose: () => void
  textId: number
}

export default function ModalDeleteText(props: IModalDeleteTextProps) {
  const { mutate: textsRevalidate } = useTexts()
  const [saving, setSaving] = useState(false)
  const toast = useToast()
  const router = useRouter()

  async function deleteTextFunc() {
    setSaving(true)

    try {
      if (props.textId === null) return
      await deleteText(props.textId)

      toast.show({
        title: "Success",
        description: `Excluir text successfully!`,
        placement: "top",
        duration: 2000,
      })

      textsRevalidate()
      props.onClose()
      router.replace("/text/text-translate")
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
        <Modal.Header _text={{ color: "#D02C23" }}>Excluir Text</Modal.Header>
        <Modal.Body>Are you sure you want to delete this text?</Modal.Body>
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
