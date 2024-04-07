import React, { Suspense, lazy, memo, useState } from "react"

import { Badge, Box, Button, Divider, FlatList, Pressable, Row, Spinner, Text, useToast } from "native-base"
import { useRouter } from "next/router"
import { MdAdd, MdFileCopy, MdList, MdOutlineFileCopy } from "react-icons/md"

import { IWordList } from "../../utils/api/vocabulary"
import DataEmpty from "../DataEmpty"
import PageNumbers from "../PageNumbers"
import CategoryAddModal from "../category/CategoryAddModal"

const ModalAddWord = lazy(async () => await import("./ModalAddWord"))
const ModalVocabulary = lazy(async () => await import("./ModalVocabulary"))

interface IWordListProps {
  words: IWordList[]
  page: number
  setPage: (page: number) => void
  numPages: number
  revalidate: () => void
}

export default function WordList(props: IWordListProps) {
  const [isModalAddWordOpen, setIsModalAddWordOpen] = useState(false)
  const [isModalAddCategoryOpen, setIsModalAddCategoryOpen] = useState(false)
  const [wordId, setWordId] = useState<number | null>(null)
  const [isModalVocabularyOpen, setIsModalVocabularyOpen] = useState(false)

  const router = useRouter()
  const toast = useToast()

  const handleChangeWordId = (wordId: number | null) => {
    setWordId(wordId)
    setIsModalVocabularyOpen(true)
  }
  function header() {
    return (
      <Row
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"100%"}
        mb={5}
        p={"10px"}
      >
        <Text
          fontSize={20}
          fontWeight={700}
        >
          Total de palavras ({props.words?.length})
        </Text>
        <Row
          justifyContent={"space-between"}
          w={"30%"}
        >
          <Button
            onPress={() => {
              setIsModalAddWordOpen(true)
            }}
            bg={"#39B59F"}
            _hover={{ bg: "#1ca088" }}
            _pressed={{ bg: "#1ca088" }}
            size={"md"}
            startIcon={
              <MdAdd
                size={25}
                color="white"
              />
            }
          >
            Add Palavra
          </Button>
          <Button
            onPress={() => {
              setIsModalAddCategoryOpen(true)
            }}
            bg={"#39B59F"}
            _hover={{ bg: "#1ca088" }}
            _pressed={{ bg: "#1ca088" }}
            size={"md"}
            startIcon={
              <MdAdd
                size={25}
                color="white"
              />
            }
          >
            Add Categoria
          </Button>
        </Row>
      </Row>
    )
  }

  function footer() {
    return (
      <Row
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p={"10px"}
      >
        <Button
          bg={"#39B59F"}
          _hover={{ bg: "#1ca088" }}
          _pressed={{ bg: "#1ca088" }}
          size={"md"}
          onPress={() => {
            props.setPage(props.page - 1)
          }}
          isDisabled={props.page === 1}
        >
          Anterior
        </Button>
        <PageNumbers
          totalPages={props.numPages ?? 1}
          currentPage={props.page}
          onPageChange={(newPage) => {
            props.setPage(newPage)
          }}
        />
        <Button
          bg={"#39B59F"}
          _hover={{ bg: "#1ca088" }}
          _pressed={{ bg: "#1ca088" }}
          size={"md"}
          onPress={() => {
            props.setPage(props.page + 1)
          }}
          isDisabled={props.page === (props.numPages ?? 1)}
        >
          Próximo
        </Button>
      </Row>
    )
  }

  const RenderItem = memo(({ item }: { item: IWordList }) => {
    const [isCopied, setIsCopied] = useState(false)
    const CopyIcon = isCopied ? MdFileCopy : MdOutlineFileCopy

    const handleCopyToClipboard = async (texts: string[]) => {
      setIsCopied(true)
      try {
        await navigator.clipboard.writeText(texts.join("\n"))
        toast.show({
          title: "Copiado para a área de transferência",
          placement: "top",
          duration: 2000,
        })
      } catch (error) {
        toast.show({
          title: "Erro ao copiar para a área de transferência",
          placement: "top",
          duration: 200,
        })
      } finally {
        setTimeout(() => {
          setIsCopied(false)
        }, 200)
      }
    }

    return (
      <Pressable
        onPress={() => {
          router.push(`/vocabulary/details/${item.id}`)
        }}
      >
        <Box
          p={5}
          _light={{ bg: "white" }}
          _dark={{ bg: "gray.700" }}
          rounded={"md"}
          mx={2}
          mb={2}
          w={"220px"}
          shadow={2}
        >
          <Row justifyContent={"space-between"}>
            <Text
              fontSize={20}
              fontWeight={700}
            >
              {item.word} - {item.reading}
            </Text>
            <Pressable
              onPress={() => {
                handleCopyToClipboard([item.word, item.reading, item.meaning])
              }}
            >
              <CopyIcon
                size={24}
                color={"#39B59F"}
              />
            </Pressable>
          </Row>
          <Divider />
          <Text
            fontSize={15}
            fontWeight={500}
          >
            {item.meaning}
          </Text>
          <Row justifyContent={"space-between"}>
            <Pressable
              onPress={() => {
                handleChangeWordId(item.id)
              }}
            >
              <MdList
                size={24}
                color={"#39B59F"}
              />
            </Pressable>
            <Badge
              justifyContent={"center"}
              alignItems={"center"}
              w={"20px"}
              h={"20px"}
              backgroundColor={"#39B59F"}
              _text={{
                color: "white",
                fontSize: "12px",
              }}
            >
              {item.examples_count}
            </Badge>
          </Row>
        </Box>
      </Pressable>
    )
  })

  RenderItem.displayName = "WordItem"

  return (
    <Box
      w={"100%"}
      p={5}
    >
      <FlatList
        w={"100%"}
        data={props.words}
        ListHeaderComponent={header}
        ListFooterComponent={footer}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<DataEmpty message="Não há palvras" />}
        ItemSeparatorComponent={() => <Box mt={2} />}
        numColumns={4}
        windowSize={10}
      />
      <Suspense fallback={<Spinner />}>
        <ModalAddWord
          isOpen={isModalAddWordOpen}
          onSave={async () => {
            await props.revalidate()
          }}
          onClose={() => {
            setIsModalAddWordOpen(false)
          }}
        />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <ModalVocabulary
          isOpen={isModalVocabularyOpen}
          revalidate={props.revalidate}
          onClose={() => {
            setIsModalVocabularyOpen(false)
          }}
          wordId={wordId}
        />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <CategoryAddModal
          isOpen={isModalAddCategoryOpen}
          onClose={() => {
            setIsModalAddCategoryOpen(false)
          }}
        />
      </Suspense>
    </Box>
  )
}
