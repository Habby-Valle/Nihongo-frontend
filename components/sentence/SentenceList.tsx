import React, { useState } from "react"
import { ListRenderItemInfo } from "react-native"

import { Button, Column, Divider, FlatList, Row, Text } from "native-base"
import { MdAdd } from "react-icons/md"

import { ISentenceList, useSentences } from "../../utils/api/sentence"
import DataEmpty from "../DataEmpty"
import Error from "../Error"
import LoadMore from "../LoadMore"
import SentenceCard from "./SentenceCard"
import ModalAddSentence from "./modal/ModalAddSentence"
import ModalSentence from "./modal/ModalSentence"

interface ISentenceListProps {
  grammarId: number
  index?: number
}

interface IPageProps {
  index: number
  grammarId: number
  handleChangeSentenceId: (id: number) => void
}

function Page({ index, grammarId, handleChangeSentenceId }: IPageProps) {
  const { data: sentences, error: sentencesError, isLoading: sentencesIsLoading } = useSentences(grammarId, index)

  function items({ item }: ListRenderItemInfo<ISentenceList>) {
    return (
      <SentenceCard
        sentence={item}
        handleChangeSentenceId={handleChangeSentenceId}
      />
    )
  }

  if (sentencesIsLoading) return <Text>Carregando...</Text>
  if (sentencesError) return <Error message="Error loading sentences" />

  return (
    <>
      <FlatList
        data={sentences}
        renderItem={items}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<DataEmpty message="No sentences" />}
        ItemSeparatorComponent={() => (
          <Divider
            bg={"none"}
            mt={2}
          />
        )}
      />
    </>
  )
}

export default function SentenceList(props: ISentenceListProps) {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalAddVisible, setModalAddVisible] = useState(false)
  const [sentenceId, setSentenceId] = useState<number | null>(null)
  const [cnt, setCnt] = useState(1)
  const { data: sentences, metadata: sentencesMetadata } = useSentences(props.grammarId, cnt)
  const pages = []

  const handleChangeSentenceId = (id: number) => {
    setSentenceId(id)
    setModalVisible(true)
  }

  const handleAddSentence = () => {
    setModalAddVisible(true)
  }

  for (let i = 0; i < cnt; i++) {
    pages.push(
      <Page
        key={i}
        index={i + 1}
        grammarId={props.grammarId}
        handleChangeSentenceId={handleChangeSentenceId}
      />,
    )
  }

  return (
    <Column
      w={"50%"}
      space={"10px"}
    >
      <Row
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"100%"}
        mb={5}
      >
        <Text
          fontSize={20}
          fontWeight={700}
        >
          Sentenças ({sentences?.length})
        </Text>
        <Button
          onPress={handleAddSentence}
          bg={"#D02C23"}
          _hover={{ bg: "#ae251e" }}
          _pressed={{ bg: "#ae251e" }}
          size={"md"}
          startIcon={
            <MdAdd
              size={25}
              color="white"
            />
          }
        >
          Add
        </Button>
      </Row>
      {pages}
      {sentences !== undefined && sentences.length > 0 && (
        <LoadMore
          setCnt={setCnt}
          cnt={cnt}
          numPages={sentencesMetadata?.num_pages || 1}
        />
      )}
      <ModalSentence
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(false)
        }}
        sentenceId={sentenceId}
        grammarId={props.grammarId}
      />
      <ModalAddSentence
        isOpen={modalAddVisible}
        onClose={() => {
          setModalAddVisible(false)
        }}
        grammarId={props.grammarId}
      />
    </Column>
  )
}
