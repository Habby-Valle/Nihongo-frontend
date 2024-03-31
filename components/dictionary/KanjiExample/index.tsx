import React from "react"

import { Column, Text } from "native-base"

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
      <Text fontSize={"18px"}>{japanese}</Text>
      <Text fontSize={"16px"}>{meaning.english}</Text>

      <audio
        src={audio.mp3}
        controls
      />
    </Column>
  )
}
