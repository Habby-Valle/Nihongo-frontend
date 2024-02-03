import React, { useState } from "react"

import { Button, Modal, useToast } from "native-base"

import { deleteExample, useExamples } from "../../../utils/api/example"

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
        title: "Success",
        description: `Delete sentence successfully!`,
        placement: "top",
        duration: 2000,
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
        <Modal.Header _text={{ color: "#D02C23" }}>Delete example</Modal.Header>
        <Modal.Body>Are you sure you want to delete this example?</Modal.Body>
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
              onPress={deleteExampleFunc}
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
