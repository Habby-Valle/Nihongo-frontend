import React from "react"

import { Box, Column, Image, Row, Text } from "native-base"

interface IKanjiImages {
  urls: string[]
}

export default function KanjiImage({ urls }: IKanjiImages) {
  return (
    <Column space="10px">
      <Text fontSize={"20px"}>Escrita</Text>
      <Row
        space="10px"
        flexWrap={"wrap"}
      >
        {urls?.map((url, index) => (
          <Box
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
            <Image
              key={index}
              source={{ uri: url }}
              alt="Kanji"
              w={"100px"}
              h={"100px"}
            />
          </Box>
        ))}
      </Row>
    </Column>
  )
}
