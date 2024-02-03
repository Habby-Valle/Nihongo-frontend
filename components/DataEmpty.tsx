import React from "react"

import { Column, Text } from "native-base"
import { MdSentimentNeutral } from "react-icons/md"

interface IDataEmptyProps {
  message: string
}

export default function DataEmpty({ message }: IDataEmptyProps) {
  return (
    <Column
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      mt={10}
    >
      <MdSentimentNeutral
        size={50}
        color="#bfbfbf"
      />
      <Text
        color="#bfbfbf"
        fontWeight={600}
      >
        {message}
      </Text>
    </Column>
  )
}
