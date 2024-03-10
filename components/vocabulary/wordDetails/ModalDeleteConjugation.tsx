import React, { useState } from "react"

import { Button, Modal, useToast } from "native-base"

import { deleteConjugation, useConjugations } from "../../../utils/api/conjugation"
import Toast from "../../Toast"

interface IModalDeleteConjugationProps {
  isOpen: boolean
  onClose: () => void
  conjugationId: number
  wordId: number
}

export default function ModalDeleteConjugation(props: IModalDeleteConjugationProps) {
  const { mutate: conjugationRevalidate } = useConjugations(props.wordId)
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  async function deleteConjugationFunc() {
    setSaving(true)

    try {
      if (props.wordId === null) return
      await deleteConjugation(props.conjugationId, props.wordId)

      toast.show({
        placement: "top",
        render: () => {
          return (
            <Toast
              title="Conjugação excluída"
              message="A conjugação foi excluída com sucesso"
              bg="#4B5563"
            />
          )
        },
      })

      conjugationRevalidate()
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
        <Modal.Header _text={{ color: "#D02C23" }}>Excluir conjugação</Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir essa conjugação?</Modal.Body>
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
              onPress={deleteConjugationFunc}
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
