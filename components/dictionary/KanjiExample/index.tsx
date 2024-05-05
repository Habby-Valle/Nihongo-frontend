import React, { useEffect, useState } from "react"

import { Column, Pressable, Row, Text, useToast, Spinner } from "native-base"
import { MdFavorite, MdSave } from "react-icons/md"
import { v4 as uuidv4 } from "uuid"
import { translateWord } from "../../../utils/translate_word"
import { createWord } from "../../../utils/api/vocabulary"
import Toast from "../../Toast"

export interface IExample {
  japanese: string
  meaningTransleted?: string
  meaning: {
    english: string
  }
  audio: {
    mp3: string
  }
}

export default function KanjiExample({ japanese, meaning, audio }: IExample) {
  const [isFavorite, setIsFavorite] = useState(false)
  // const [meaningTransleted, setMeaningTransleted] = useState()
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  const verifyInFavorites = (japanese: string) => {
    const localFavorites = localStorage.getItem("favorites")
    if (localFavorites === null) return false

    const favorites = JSON.parse(localFavorites)
    const favorite = favorites.find((favorite: IExample) => favorite.japanese === japanese)
    if (favorite) return true

    return false
  }

  useEffect(() => {
    const inFavorites = verifyInFavorites(japanese)
    if (inFavorites) {
      setIsFavorite(true)
    }
  }, [])

//   useEffect(() => {
//     async function fetchTranslation() {
//         const translated = await translateWord(meaning.english);
//         setMeaningTransleted(translated);
//     }

//     fetchTranslation();
// }, [meaning.english]);
  const handleFavorite = (example: IExample) => {
    setIsFavorite(!isFavorite)
    if (!isFavorite) {
      const exampleObject = {
        id: uuidv4(),
        japanese: example.japanese,
        meaning: example.meaning,
        audio: example.audio,
      }

      const localFavorites = localStorage.getItem("favorites")
      if (localFavorites === null) {
        localStorage.setItem("favorites", JSON.stringify([exampleObject]))
        return
      }

      if (localFavorites) {
        const favorites = JSON.parse(localFavorites)
        favorites.push(exampleObject)
        localStorage.setItem("favorites", JSON.stringify(favorites))
      }
    } else {
      const favorites = localStorage.getItem("favorites")
      if (favorites) {
        const favoritesObject = JSON.parse(favorites)
        const favorite = favoritesObject.findIndex((favorite: IExample) => favorite.japanese === example.japanese)

        if (favorite !== -1) {
          favoritesObject.splice(favorite, 1)
          localStorage.setItem("favorites", JSON.stringify(favoritesObject))
        }
      }
    }
  }

  const handleSaveWord = async (example: IExample) => {
    const word = example.japanese.split('（')[0]
    const readingMatch = example.japanese.match(/（([^）]+)）/)
    const reading = readingMatch ? readingMatch[1] : null

    setSaving(true)
    try {
      const newWord = await createWord({
        word: word,
        reading: reading ? reading : word,
        meaning: example.meaning.english,
      })

      if (newWord) {
        toast.show({
          placement: "top",
          render: () => {
            return (
              <Toast
                title="Sucesso"
                message="Palavra adicionada com sucesso!"
                bg="#4B5563"
              />
            )
          },
        })
      }
    } catch (error) {
      alert(error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Column
      space="10px"
      borderWidth={1}
      borderRadius={10}
      p={5}
      _light={{
        bg: "white",
        borderColor: "#262626",
      }}
      _dark={{
        bg: "#262626",
        borderColor: "white",
      }}
    >
      <Row
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <Text fontSize={"18px"}>{japanese}</Text>
        <Pressable
          _light={{
            bg: "white",
          }}
          _dark={{
            bg: "#262626",
          }}
          _pressed={{
            opacity: 0.5,
          }}
          p={"10px"}
          borderRadius={10}
          onPress={() => {
            handleFavorite({ japanese, meaning, audio })
          }}
        >
          <MdFavorite
            size={20}
            color={isFavorite ? "#39B59F" : "#000"}
          />
        </Pressable>
        <Pressable
          _light={{
            bg: "white",
          }}
          _dark={{
            bg: "#262626",
          }}
          _pressed={{
            opacity: 0.5,
          }}
          p={"10px"}
          borderRadius={10}
          onPress={() => {
            handleSaveWord({ japanese, meaning, audio })
          }}
        >
          {saving ? <Spinner /> : <MdSave size={20} color="#39B59F"/>}
        </Pressable>
      </Row>
      <Text fontSize={"16px"}>{meaning.english}</Text>
      <audio
        src={audio.mp3}
        controls
      />
    </Column>
  )
}
