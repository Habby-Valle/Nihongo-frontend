import React from "react"

import { Column, Text } from "native-base"

interface IToastProps {
  title: string
  message: string
  bg: string
}

export default function Toast({ title, message, bg }: IToastProps) {
  return (
    <Column
      bg={bg}
      px="2"
      py="1"
      rounded="sm"
      mb={5}
    >
      <Text
        fontSize="md"
        color="white"
        fontWeight="bold"
      >
        {title}
      </Text>
      <Text
        fontSize="sm"
        color="white"
      >
        {message}
      </Text>
    </Column>
  )
}
