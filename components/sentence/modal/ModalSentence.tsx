import React, { useState } from "react"

import { Box, Button, Column, Modal } from "native-base"

import ModalDeleteSentence from "./ModalDeleteSentence"
import ModalUpdateSentence from "./ModalUpdateSentence"

interface ModalSentenceProps {
  isOpen: boolean
  onClose: () => void
  revalidate: () => void
  sentenceId: number | null
  grammarId: number | null
}

export default function ModalSentence(props: ModalSentenceProps) {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false)
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header _text={{ color: "#D02C23" }}>Opções da sentença</Modal.Header>
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
                Excluir
              </Button>
              <Button
                colorScheme="warning"
                onPress={() => {
                  setModalVisible(true)
                  props.onClose()
                }}
              >
                Atualizar
              </Button>
              {/* <Button
                colorScheme="info"
                onPress={() => {}}
                disabled
              >
                Ver
              </Button> */}
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
              Cancelar
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
      <ModalUpdateSentence
        isOpen={modalVisible}
        onReload={async () => {
          await props.revalidate()
        }}
        onClose={() => {
          setModalVisible(false)
        }}
        sentenceId={props.sentenceId}
        grammarId={props.grammarId}
      />
      <ModalDeleteSentence
        isOpen={modalDeleteVisible}
        onReload={async () => {
          await props.revalidate()
        }}
        onClose={() => {
          setModalDeleteVisible(false)
        }}
        sentenceId={props.sentenceId}
      />
    </Modal>
  )
}
