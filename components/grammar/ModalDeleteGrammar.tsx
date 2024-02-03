import React, { useState } from "react"

import { Button, Modal, useToast } from "native-base"

import { deleteGrammar, useGrammars } from "../../utils/api/grammar"

interface IModalDeleteGrammarProps {
  isOpen: boolean
  onClose: () => void
  grammarId: number | null
}

export default function ModalDeleteGrammar(props: IModalDeleteGrammarProps) {
  const { mutate: grammarsRevalidate } = useGrammars()
  const [saving, setSaving] = useState(false)

  const toast = useToast()

  async function deleteGrammarFunc() {
    setSaving(true)

    try {
      if (props.grammarId === null) return
      await deleteGrammar(props.grammarId)

      toast.show({
        title: "Success",
        description: `Delete grammar successfully!`,
        placement: "top",
        duration: 2000,
      })

      grammarsRevalidate()
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
        <Modal.Header _text={{ color: "#D02C23" }}>Delete Grammar</Modal.Header>
        <Modal.Body>Are you sure you want to delete this grammar?</Modal.Body>
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
              Cancel
            </Button>
            <Button
              bg={"#D02C23"}
              _hover={{ bg: "#ae251e" }}
              _pressed={{ bg: "#ae251e" }}
              onPress={deleteGrammarFunc}
              isLoading={saving}
              _text={{ color: "white" }}
            >
              Delete
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
