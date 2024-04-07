import React, { useState } from "react"

import { Button, Modal, useToast } from "native-base"

import { deleteGrammar } from "../../utils/api/grammar"
import Toast from "../Toast"

interface IModalDeleteGrammarProps {
  isOpen: boolean
  onClose: () => void
  onReload: () => void
  grammarId: number | null
}

export default function ModalDeleteGrammar(props: IModalDeleteGrammarProps) {
  const [saving, setSaving] = useState(false)

  const toast = useToast()

  async function deleteGrammarFunc() {
    setSaving(true)

    try {
      if (props.grammarId === null) return
      await deleteGrammar(props.grammarId)

      toast.show({
        placement: "top",
        render: () => {
          return (
            <Toast
              title="Sucesso"
              message="Gramática excluída com sucesso"
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
        <Modal.Header _text={{ color: "#39B59F" }}>Excluir gramática</Modal.Header>
        <Modal.Body>Você tem certeza que quer excluir essa gramática?</Modal.Body>
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
              bg={"#39B59F"}
              _hover={{ bg: "#1ca088" }}
              _pressed={{ bg: "#1ca088" }}
              onPress={deleteGrammarFunc}
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
