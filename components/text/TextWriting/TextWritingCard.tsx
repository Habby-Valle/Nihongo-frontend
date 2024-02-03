import React from "react"

import { Box, Column, Pressable, Text } from "native-base"
import { useRouter } from "next/router"
import { MdBook } from "react-icons/md"

export default function TextWritingCard() {
  const router = useRouter()
  return (
    <Pressable
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
      onPress={() => {
        router.push("/text/text-writing")
      }}
    >
      <Column space={2}>
        <Box
          justifyContent={"center"}
          alignItems={"center"}
        >
          <MdBook
            size={50}
            color={"white"}
          />
        </Box>
        <Text
          textAlign={"center"}
          fontSize={"xl"}
          fontWeight={"bold"}
        >
          Writing
        </Text>
        <Text
          textAlign={"justify"}
          fontSize={"sm"}
          fontWeight={"400"}
        >
          Here you can practice your writing skills.
        </Text>
      </Column>
    </Pressable>
  )
}
