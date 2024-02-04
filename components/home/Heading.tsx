import React, { useState } from "react"

import { Box, HStack, Icon, IconButton, Pressable, Text, useColorMode } from "native-base"
import Image from "next/image"
import { useRouter } from "next/router"
import { MdArrowBack, MdDarkMode, MdLightMode } from "react-icons/md"

import { WhoIam, useProfile } from "../../utils/api/user"

interface IHeadingProps {
  title: string
}

export function Heading({ title }: IHeadingProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const { toggleColorMode } = useColorMode()
  const { data: userInfo } = WhoIam()

  const { data: profile } = useProfile(userInfo?.id)

  const router = useRouter()

  return (
    <Box
      bg="#D02C23"
      h={"60px"}
      p={9}
      justifyContent="center"
      width={"100%"}
    >
      <HStack
        justifyContent="space-between"
        alignItems="center"
        flexDirection={"row"}
      >
        <IconButton
          onPress={() => {
            router.back()
          }}
          icon={
            <Icon color={"white"}>
              <MdArrowBack size={24} />
            </Icon>
          }
          p={1}
          rounded={20}
        />
        <Text
          color="white"
          fontSize={20}
          fontWeight="bold"
        >
          {title}
        </Text>
        <HStack alignItems={"center"}>
          <IconButton
            w={10}
            h={10}
            onPress={() => {
              setTheme(theme === "dark" ? "light" : "dark")
              toggleColorMode()
            }}
            icon={
              <Icon color={"white"}>{theme === "dark" ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}</Icon>
            }
            p={1}
            rounded={20}
          />
          <Pressable
            alignItems="center"
            justifyContent="space-between"
            flexDirection={"row"}
            w={140}
            onPress={() => {
              router.push("/profile")
            }}
          >
            <Box style={{ borderRadius: 50, overflow: "hidden" }}>
              <Image
                loading={"eager"}
                src={`https://nihongo-gaido-4ec2db96e424.herokuapp.com/${profile?.avatar}`}
                alt="Avatar"
                width={30}
                height={30}
                objectFit="cover"
              />
            </Box>
            <Text
              color="white"
              fontSize={18}
            >
              {userInfo?.username}
            </Text>
          </Pressable>
        </HStack>
      </HStack>
    </Box>
  )
}
