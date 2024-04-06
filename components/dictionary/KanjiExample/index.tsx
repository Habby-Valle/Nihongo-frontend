import React from "react"

import { Column, Text, Row, Pressable } from "native-base"
import { MdFavorite, MdSave } from "react-icons/md"

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
        >
          <MdFavorite
            size={20}
            color="#D02C23"
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
