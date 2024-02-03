import React, { useState } from "react"

import { Button, Modal, useToast } from "native-base"

import { deleteSentence, useSentences } from "../../../utils/api/sentence"

interface IModalDeleteSentenceProps {
  isOpen: boolean
  onClose: () => void
  sentenceId: number | null
  grammarId: number | null
}

export default function ModalDeleteSentence(props: IModalDeleteSentenceProps) {
  const { mutate: sentencesRevalidates } = useSentences(props.grammarId || undefined)
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  async function deleteSentenceFunc() {
    setSaving(true)

    try {
      if (props.sentenceId === null) return
      await deleteSentence(props.sentenceId)

      toast.show({
        title: "Success",
        description: `Delete sentence successfully!`,
        placement: "top",
        duration: 2000,
      })

      sentencesRevalidates()
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
        <Modal.Header _text={{ color: "#D02C23" }}>Delete sentence</Modal.Header>
        <Modal.Body>Are you sure you want to delete this sentence?</Modal.Body>
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
              onPress={deleteSentenceFunc}
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
