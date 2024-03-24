import React, { useState } from "react"

import { Button, Modal, useToast } from "native-base"

import { deleteWord } from "../../utils/api/vocabulary"
import Toast from "../Toast"

interface IModalDeleteWordProps {
  isOpen: boolean
  onClose: () => void
  onReload: () => void
  wordId: number | null
}

export default function ModalDeleteWord(props: IModalDeleteWordProps) {
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  async function deleteWordFunc() {
    setSaving(true)

    try {
      if (props.wordId === null) return
      await deleteWord(props.wordId)

      toast.show({
        placement: "top",
        render: () => {
          return (
            <Toast
              title="Palavra excluída"
              message="A palavra foi excluída com sucesso."
              bg="#4B5563"
            />
          )
        },
      })

      props.onReload()
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
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header _text={{ color: "#D02C23" }}>Excluir palavra</Modal.Header>
        <Modal.Body>Você tem certeza que deseja excluir essa palavra?</Modal.Body>
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
              onPress={deleteWordFunc}
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
