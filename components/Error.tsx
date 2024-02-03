import React from "react"

import { Column, Text } from "native-base"
import { MdError } from "react-icons/md"

interface IErrorProps {
  message: string
}

export default function Error({ message }: IErrorProps) {
  return (
    <Column
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
      mt={10}
    >
      <MdError
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
