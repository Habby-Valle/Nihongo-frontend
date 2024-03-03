import React, { useState } from "react"

import { Button, Column, Divider, Pressable, Row, Text } from "native-base"
import { MdAdd } from "react-icons/md"

import { IWordList, useWord } from "../../../utils/api/vocabulary"
import Error from "../../Error"
import ConjugationList from "./ConjugationList"
import ExampleList from "./ExampleList"
import ModalAddConjugation from "./ModalAddConjugation"
import ModalAddExample from "./ModalAddExample"

interface IWordDetailsProps {
  wordId: number
}

enum WordExampleAndConjugation {
  ExampleList,
  ConjugationList,
}

export default function WordDetailsAndExamples(props: IWordDetailsProps) {
  const [selectedTab, setSelectedTab] = useState<WordExampleAndConjugation>(WordExampleAndConjugation.ExampleList)

  const {
    data: word,
    error: wordError,
    isLoading: wordIsLoading,
    isValidating: wordIsValidating,
  } = useWord(props.wordId)

  if (wordError !== undefined) {
    return <Error message={wordError.message} />
  }

  if (word === undefined || wordIsLoading || wordIsValidating) {
    return <Text>Carregando...</Text>
  }

  function getCurrentTab() {
    switch (selectedTab) {
      case WordExampleAndConjugation.ExampleList:
        return <ExampleList wordId={props.wordId} />
      case WordExampleAndConjugation.ConjugationList:
        return <ConjugationList wordId={props.wordId} />

      default:
        return <ExampleList wordId={props.wordId} />
    }
  }

  return (
    <Column
      justifyContent={"center"}
      alignItems={"center"}
      space={5}
      w={"100%"}
    >
      <Header word={word} />
      <Column width={"100%"}>
        <TabHeader
          setSelectedTab={setSelectedTab}
          word={word}
        />
        {getCurrentTab()}
      </Column>
    </Column>
  )
}

interface IHeaderProps {
  word: IWordList
}

interface IExample {
  example: string;
  translate: string;
}

function Header({ word }: IHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [examples, setExamples] = useState<IExample[]>(); 
  const [isLoading, setLoading] = useState(false)
  console.log("Examples: ", examples)
  function getInfos(content: string) {
    const examples = content.split("\n\n")
    const exampleList: IExample[] = [];
    examples.forEach((e) => {
        const [index, exampleTranslation] = e.split(".")
        const [example, translation] = exampleTranslation?.split("\n")
        .map(str => str.replace("Tradução: ", " ").replace("(", " ").trim())
        
        exampleList.push({
            example: example.trim(),
            translate: translation.trim()
          });
    })

    setExamples(exampleList)
  }

  async function handleGenarateExamples() {
    setLoading(true)
    const prompt = `Crie 3 frases de exemplo para ${word.word} e suas traduções em português.`

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.20,
        max_tokens: 500,
        top_p: 1,
      })
    })
      .then(response => response.json())
      .then((data) => {
        getInfos(data.choices[0].message.content)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <Row
      w={"100%"}
      justifyContent={"space-between"}
    >
      <Column
        width={"50%"}
        borderWidth={1}
        _light={{ bg: "white", borderColor: "black" }}
        _dark={{ bg: "gray.700", borderColor: "white" }}
        rounded={10}
        padding={5}
      >
        <Text
          textAlign={"center"}
          fontSize={20}
          fontWeight={"bold"}
        >
          {word.word} - {word.reading}
        </Text>
        <Divider />
        <Text>Significado: {word.meaning}</Text>
        <Text>Tipo: {word.type}</Text>
        <Text>Nível: {word.level}</Text>
        <Text>Categoria: {word.category?.name}</Text>
        {word.annotation && <Text>Anotações: {word.annotation}</Text>}
      </Column>
      <Column justifyContent={"space-between"}>
        <Button
          bg={"#D02C23"}
          _hover={{ bg: "#ae251e" }}
          _pressed={{ bg: "#ae251e" }}
          size={"md"}
          w={"140px"}
          startIcon={
            <MdAdd
              size={25}
              color="white"
            />
          }
          onPress={() => {
            setIsOpen(true)
          }}
          disabled={!["Verb - Group 1", "Verb - Group 2", "Verb - Group 3"].includes(word.type)}
          opacity={["Verb - Group 1", "Verb - Group 2", "Verb - Group 3"].includes(word.type) ? 1 : 0.5}
        >
          <Text color={"white"}>Conjugação</Text>
        </Button>

        <Button
          bg={"#D02C23"}
          onPress={() => {
            setIsModalOpen(true)
          }}
          _hover={{ bg: "#ae251e" }}
          _pressed={{ bg: "#ae251e" }}
          size={"md"}
          w={"140px"}
          startIcon={
            <MdAdd
              size={25}
              color="white"
            />
          }
        >
          <Text color={"white"}>Exemplo</Text>

        </Button>
        <Button
          bg={"#D02C23"}
          onPress={handleGenarateExamples}
          isLoading={isLoading}
          _hover={{ bg: "#ae251e" }}
          _pressed={{ bg: "#ae251e" }}
          size={"md"}
          w={"140px"}
          startIcon={
            <MdAdd
              size={25}
              color="white"
            />
          }
        >
          <Text color={"white"}>Gerar exemplos</Text>
        </Button>
      </Column>

      <ModalAddConjugation
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
        wordId={word.id}
      />

      <ModalAddExample
        isOpen={isModalOpen}
        wordId={word.id}
        onClose={() => {
          setIsModalOpen(false)
        }}
      />
    </Row>
  )
}

interface ITabHeaderProps {
  setSelectedTab: (tab: WordExampleAndConjugation) => void
  word: IWordList
}

function TabHeader({ setSelectedTab, word }: ITabHeaderProps) {
  const [isConjugationPressed, setIsConjugationPressed] = useState<boolean>(false)
  const [isExamplePressed, setIsExamplePressed] = useState<boolean>(true)

  function handleConjugationTab() {
    setIsConjugationPressed(true)
    setIsExamplePressed(false)
    setSelectedTab(WordExampleAndConjugation.ConjugationList)
  }

  function handleExampleTab() {
    setIsExamplePressed(true)
    setIsConjugationPressed(false)
    setSelectedTab(WordExampleAndConjugation.ExampleList)
  }
  return (
    <Row justifyContent={"flex-start"}>
      <Pressable
        onPress={handleExampleTab}
        _light={{ bg: "white", borderColor: "black" }}
        _dark={{ bg: "gray.700", borderColor: "white" }}
        h={"25px"}
        padding={5}
        justifyContent={"center"}
        _pressed={{ bg: "gray.400" }}
        isPressed={isExamplePressed}
      >
        <Text
          fontWeight={"bold"}
          fontSize={15}
        >
          Exemplos
        </Text>
      </Pressable>
      {["Verb - Group 1", "Verb - Group 2", "Verb - Group 3"].includes(word.type) && (
        <Pressable
          onPress={handleConjugationTab}
          _light={{ bg: "white", borderColor: "black" }}
          _dark={{ bg: "gray.700", borderColor: "white" }}
          h={"25px"}
          padding={5}
          justifyContent={"center"}
          borderLeftWidth={1}
          _pressed={{ bg: "gray.400" }}
          isPressed={isConjugationPressed}
        >
          <Text
            fontWeight={"bold"}
            fontSize={15}
          >
            Conjugações
          </Text>
        </Pressable>
      )}
    </Row>
  )
}
