import React, { useState } from "react"

import { Button, Modal, useToast } from "native-base"

import { deleteExample, useExamples } from "../../../utils/api/example"
import Toast from "../../Toast"

interface IModalDeleteExampleProps {
  isOpen: boolean
  onClose: () => void
  exampleId: number
  wordId: number
}

export default function ModalDeleteExample(props: IModalDeleteExampleProps) {
  const { mutate: examplesRevalidate } = useExamples(props.wordId)
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  async function deleteExampleFunc() {
    setSaving(true)

    try {
      if (props.wordId === null) return
      await deleteExample(props.exampleId, props.wordId)

      toast.show({
        placement: "top",
        render: () => {
          return (
            <Toast
              title="Exemplo excluído"
              message="O exemplo foi excluído com sucesso."
              bg="#4B5563"
            />
          )
        },
      })

      examplesRevalidate()
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
        <Modal.Header _text={{ color: "#D02C23" }}>Excluir exemplo</Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir este exemplo?</Modal.Body>
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
              onPress={deleteExampleFunc}
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
