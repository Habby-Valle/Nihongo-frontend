import React, { useState, useEffect } from "react"

import { Column, Row, Text, Pressable, useToast, Spinner } from "native-base"
import { MdFavorite, MdSave } from "react-icons/md"
import { createWord } from "../../../utils/api/vocabulary"

import { IResultsList } from "../../../utils/api/dictionary"
import Toast from "../../Toast"

interface IResultCard {
  item: IResultsList
}

export default function ResultCard({ item }: IResultCard) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [saving, setSaving] = useState(false)
  const toast = useToast()
  // const [meaningTransleted, setMeaningTransleted] = useState<any[]>([])


  const verifyInFavorites = (termId: string) => {
    const localFavorites = localStorage.getItem("favorites_dictionary")
    if (localFavorites === null) return false

    const favorites = JSON.parse(localFavorites)
    const favorite = favorites.find((favorite: IResultsList) => favorite.id === termId)
    if (favorite) return true

    return false
  }

  useEffect(() => {
    const inFavorites = verifyInFavorites(item.id)
    if (inFavorites) {
      setIsFavorite(true)
    }
  }, [])

  // useEffect(() => {
  //   async function fetchTranslation() {
  //     const translates = item.translates.map(async (translate) => {
  //       const translated = await translateWord(translate);
  //       return translated;
  //     });

  //     const translated = await Promise.all(translates);
  //     setMeaningTransleted(translated);
  //   }

  //   fetchTranslation();
  // },[item.translates])

  const handleFavorite = (word: IResultsList) => {
    setIsFavorite(!isFavorite)

    if (!isFavorite) {
      const wordObject = {
        id: item.id_term,
        term: item.term,
        reading: item.reading,
        classification: item.classification,
        translates: item.translates,
      }

      const localFavorites = localStorage.getItem("favorites_dictionary")
      if (localFavorites === null) {
        localStorage.setItem("favorites_dictionary", JSON.stringify([wordObject]))
        return
      }

      if (localFavorites) {
        const favorites = JSON.parse(localFavorites)
        favorites.push(wordObject)
        localStorage.setItem("favorites_dictionary", JSON.stringify(favorites))
      }
    } else {
      const favorites = localStorage.getItem("favorites_dictionary")

      if (favorites) {
        const favoritesObject = JSON.parse(favorites)
        const favorite = favoritesObject.findIndex((favorite: IResultsList) => favorite.id === word.id_term)

        if (favorite !== -1) {
          favoritesObject.splice(favorite, 1)
          localStorage.setItem("favorites_dictionary", JSON.stringify(favoritesObject))
        }
      }
    }
  }

  const handleSaveWord = async (word: IResultsList) => {
    setSaving(true)
    try {
      const newWord = await createWord({
        word: word.term,
        reading: word.reading,
        meaning: word.translates.join(", "),
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
      w={"100%"}
      py={"5px"}
    >
      <Row
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text
          fontSize={"20px"}
          fontWeight={700}
        >
          {item.term} {item.reading !== "" ? `- ${item.reading}` : ""}
        </Text>

        <Row
          space={5}
        >
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
              handleFavorite(item)
            }}
          >
            <MdFavorite color={isFavorite ? "#39B59F" : "#000"} />
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
              handleSaveWord(item)
            }}
          >
            {saving ? <Spinner size="sm" /> : <MdSave color="#39B59F"/>}
          </Pressable>
        </Row>
      </Row>
      <Row>
        <Text>{item.classification}</Text>
      </Row>
      <Row>
        <Text
          fontSize={"15px"}
          fontWeight={500}
        >
          {item.translates.join(", ")}
        </Text>
      </Row>
    </Column>
  )
}
