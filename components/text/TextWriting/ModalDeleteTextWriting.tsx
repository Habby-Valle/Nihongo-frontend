import React, { useState } from "react"

import { Button, Modal, useToast } from "native-base"
import { useRouter } from "next/router"

import { deleteTextWriting, useTextWritings } from "../../../utils/api/text"

interface IModalDeleteTextProps {
  isOpen: boolean
  onClose: () => void
  textId: number
}

export default function ModalDeleteTextWriting(props: IModalDeleteTextProps) {
  const { mutate: textsRevalidate } = useTextWritings()
  const [saving, setSaving] = useState(false)
  const toast = useToast()
  const router = useRouter()

  async function deleteTextFunc() {
    setSaving(true)

    try {
      if (props.textId === null) return
      await deleteTextWriting(props.textId)

      toast.show({
        title: "Success",
        description: `Delete text successfully!`,
        placement: "top",
        duration: 2000,
      })

      textsRevalidate()
      props.onClose()
      router.replace("/text/text-writing")
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
        <Modal.Header _text={{ color: "#D02C23" }}>Delete Text</Modal.Header>
        <Modal.Body>Are you sure you want to delete this text?</Modal.Body>
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
              onPress={deleteTextFunc}
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
