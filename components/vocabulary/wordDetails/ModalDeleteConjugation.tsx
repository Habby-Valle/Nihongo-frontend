import React, { useState } from "react"

import { Button, Modal, useToast } from "native-base"

import { deleteConjugation, useConjugations } from "../../../utils/api/conjugation"

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
        title: "Success",
        description: `Delete conjugation successfully!`,
        placement: "top",
        duration: 2000,
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
        <Modal.Header _text={{ color: "#D02C23" }}>Delete conjugation</Modal.Header>
        <Modal.Body>Are you sure you want to delete this conjugation?</Modal.Body>
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
              onPress={deleteConjugationFunc}
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
