import React from "react"

import { Box, Column, Pressable, Text } from "native-base"
import { useRouter } from "next/router"
import { MdTranslate } from "react-icons/md"

export default function TextTranslateCard() {
  const router = useRouter()
  return (
    <Pressable
      onPress={() => {
        router.push("/text/text-translate")
      }}
      p={"10px"}
      _hover={{
        bg: "gray.500",
      }}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      rounded={"md"}
      _dark={{
        borderColor: "gray.700",
        bg: "gray.700",
      }}
      _light={{
        borderColor: "gray.100",
        bg: "gray.100",
      }}
      h={"200px"}
      w={"200px"}
    >
      <Column space={2}>
        <Box
          justifyContent={"center"}
          alignItems={"center"}
        >
          <MdTranslate
            size={50}
            color={"white"}
          />
        </Box>
        <Text
          textAlign={"center"}
          fontSize={"xl"}
          fontWeight={"bold"}
        >
          Translate
        </Text>
        <Text
          textAlign={"justify"}
          fontSize={"sm"}
          fontWeight={"400"}
        >
          Here you can translate a text from one language to another.
        </Text>
      </Column>
    </Pressable>
  )
}
