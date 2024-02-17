import React, { useState } from "react"

import { Button, Modal, useToast } from "native-base"

import { deleteWord, useWords } from "../../utils/api/vocabulary"

interface IModalDeleteWordProps {
  isOpen: boolean
  onClose: () => void
  wordId: number | null
}

export default function ModalDeleteWord(props: IModalDeleteWordProps) {
  const { mutate: wordsRevalidate } = useWords()
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  async function deleteWordFunc() {
    setSaving(true)

    try {
      if (props.wordId === null) return
      await deleteWord(props.wordId)

      toast.show({
        title: "Success",
        description: `Delete sentence successfully!`,
        placement: "top",
        duration: 2000,
      })

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
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header _text={{ color: "#D02C23" }}>Delete word</Modal.Header>
        <Modal.Body>Are you sure you want to delete this word?</Modal.Body>
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
              Delete
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
