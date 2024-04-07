import React, { useState, useEffect } from "react"

import { Column, Row, Text, Pressable } from "native-base"
import { MdFavorite, MdSave } from "react-icons/md"

import { IResultsList } from "../../../utils/api/dictionary"

interface IResultCard {
  item: IResultsList
}

export default function ResultCard({ item }: IResultCard) {
  const [isFavorite, setIsFavorite] = useState(false)

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
            <MdFavorite color={isFavorite ? "#D02C23" : "#000"} />
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
          >
            <MdSave />
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
