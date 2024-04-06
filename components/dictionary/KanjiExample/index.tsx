import React, { useState, useEffect } from "react"

import { Column, Text, Row, Pressable } from "native-base"
import { MdFavorite, MdSave } from "react-icons/md"
import { v4 as uuidv4 } from 'uuid';

export interface IExample {
  japanese: string
  meaning: {
    english: string
  }
  audio: {
    mp3: string
  }
}

export default function KanjiExample({ japanese, meaning, audio }: IExample) {
  const [isFavorite, setIsFavorite] = useState(false)

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
            color= { isFavorite ? "#D02C23" : "#000"}
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
        >
          <MdSave
            size={20}
            color="#D02C23"
          />
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
