import React, { useState } from "react"

import { Button, Modal, useToast } from "native-base"

import { deleteSentence } from "../../../utils/api/sentence"
import Toast from "../../Toast"

interface IModalDeleteSentenceProps {
  isOpen: boolean
  onClose: () => void
  onReload: () => void
  sentenceId: number | null
}

export default function ModalDeleteSentence(props: IModalDeleteSentenceProps) {
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  async function deleteSentenceFunc() {
    setSaving(true)

    try {
      if (props.sentenceId === null) return
      await deleteSentence(props.sentenceId)

      toast.show({
        placement: "top",
        render: () => {
          return (
            <Toast
              title="Sucesso"
              message="Sentença excluída com sucesso"
              bg="#4BB543"
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
        <Modal.Header _text={{ color: "#D02C23" }}>Excluir sentença</Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir esta sentença?</Modal.Body>
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
              onPress={deleteSentenceFunc}
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
