import React from "react"

import axios from "axios"
import { Box, Divider, HStack, Pressable, Text, VStack } from "native-base"
import Image from "next/image"
import { useRouter } from "next/router"
import { MdAccountCircle, MdBook, MdHome, MdLogout, MdTextSnippet, MdTranslate } from "react-icons/md"

import Logo from "../../public/images/logo.png"

export function LateralMenu() {
  const router = useRouter()
  const logout = () => {
    router.push("/login")
    axios.post("/api/auth/logout").catch(() => {
      router.push("/login")
    })
  }
  return (
    <VStack
      h={"100vh"}
      w={"200px"}
      bg={"#D02C23"}
    >
      <VStack>
        <Box
          w={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Pressable
            onPress={() => {
              router.push("/home")
            }}
          >
            <Image
              src={Logo}
              alt="Logo"
              width={100}
              height={100}
            />
          </Pressable>
          <Text
            fontSize={"18px"}
            fontWeight={"600"}
            color={"white"}
          >
            Nihongo Gaido
          </Text>
        </Box>

        <Divider
          bgColor="#fff"
          width={"100%"}
          h={"1px"}
        />
      </VStack>
      <VStack
        w={"100%"}
        h={"460px"}
        alignItems={"center"}
        justifyContent={"space-around"}
      >
        <Box
          justifyContent={"flex-start"}
          w={"65%"}
          h={"28%"}
          p={"10px"}
        >
          <Pressable
            onPress={() => {
              router.push("/home")
            }}
          >
            <HStack
              flexDirection={"row"}
              alignItems={"center"}
            >
              <MdHome
                size={20}
                color={"white"}
              />
              <Text
                ml={"2px"}
                fontSize={"16px"}
                fontWeight={"400"}
                color={"white"}
              >
                Home
              </Text>
            </HStack>
          </Pressable>
          <Pressable
            mt={"10px"}
            onPress={() => {
              router.push("/grammar")
            }}
          >
            <HStack
              flexDirection={"row"}
              alignItems={"center"}
            >
              <MdBook
                size={20}
                color={"white"}
              />
              <Text
                ml={"2px"}
                fontSize={"16px"}
                fontWeight={"400"}
                color={"white"}
              >
                Gramática
              </Text>
            </HStack>
          </Pressable>
          <Pressable
            mt={"10px"}
            onPress={() => {
              router.push("/vocabulary")
            }}
          >
            <HStack
              flexDirection={"row"}
              alignItems={"center"}
            >
              <MdTranslate
                size={20}
                color={"white"}
              />
              <Text
                ml={"2px"}
                fontSize={"16px"}
                fontWeight={"400"}
                color={"white"}
              >
                Vocabulário
              </Text>
            </HStack>
          </Pressable>
          <Pressable
            mt={"10px"}
            onPress={() => {
              router.push("/text")
            }}
          >
            <HStack
              flexDirection={"row"}
              alignItems={"center"}
            >
              <MdTextSnippet
                size={20}
                color={"white"}
              />
              <Text
                ml={"2px"}
                fontSize={"16px"}
                fontWeight={"400"}
                color={"white"}
              >
                Textos
              </Text>
            </HStack>
          </Pressable>
        </Box>
        <Box
          justifyContent={"flex-start"}
          w={"65%"}
          h={"28%"}
          p={"10px"}
        >
          <Pressable
            onPress={() => {
              router.push("//profile")
            }}
          >
            <HStack
              flexDirection={"row"}
              alignItems={"center"}
            >
              <MdAccountCircle
                size={20}
                color={"white"}
              />
              <Text
                ml={"2px"}
                fontSize={"16px"}
                fontWeight={"400"}
                color={"white"}
              >
                Perfil
              </Text>
            </HStack>
          </Pressable>
          <Pressable
            mt={"10px"}
            onPress={logout}
          >
            <HStack
              flexDirection={"row"}
              alignItems={"center"}
            >
              <MdLogout
                size={20}
                color={"white"}
              />
              <Text
                ml={"2px"}
                fontSize={"16px"}
                fontWeight={"400"}
                color={"white"}
              >
                Logout
              </Text>
            </HStack>
          </Pressable>
        </Box>
      </VStack>
    </VStack>
  )
}
