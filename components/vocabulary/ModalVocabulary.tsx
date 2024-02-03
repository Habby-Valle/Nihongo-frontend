import React, { useState } from "react"

import { Box, Button, Column, Modal } from "native-base"

import ModalDeleteWord from "./ModalDeleteWord"
import ModalUpdateWord from "./ModalUpdateWord"

interface ModalVocabularyProps {
  isOpen: boolean
  onClose: () => void
  wordId: number | null
}

export default function ModalVocabulary(props: ModalVocabularyProps) {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false)
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header _text={{ color: "#D02C23" }}>Word options</Modal.Header>
        <Modal.Body>
          <Box>
            <Column space={"10px"}>
              <Button
                colorScheme="danger"
                onPress={() => {
                  setModalDeleteVisible(true)
                  props.onClose()
                }}
              >
                Delete
              </Button>
              <Button
                colorScheme="warning"
                onPress={() => {
                  setModalVisible(true)
                  props.onClose()
                }}
              >
                Edit
              </Button>
            </Column>
          </Box>
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
              Cancel
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
      <ModalUpdateWord
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(false)
        }}
        wordId={props.wordId}
      />

      <ModalDeleteWord
        isOpen={modalDeleteVisible}
        onClose={() => {
          setModalDeleteVisible(false)
        }}
        wordId={props.wordId}
      />
    </Modal>
  )
}
