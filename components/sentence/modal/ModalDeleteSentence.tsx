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
        description: `Sentença excluída com sucesso!`,
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
        <Modal.Header _text={{ color: "#D02C23" }}>Excluir sentença</Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir esta sentença?
        </Modal.Body>
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
