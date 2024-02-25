import React, { useState } from "react"

import { Box, Column, Icon, IconButton, Pressable, Row, Text, useColorMode } from "native-base"
import Image from "next/image"
import { useRouter } from "next/router"
import { MdArrowBack, MdDarkMode, MdLightMode } from "react-icons/md"

import { WhoIam } from "../../utils/api/user"

interface IHeadingProps {
  title: string
}

export function Heading({ title }: IHeadingProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const { toggleColorMode } = useColorMode()
  const { data: userInfo, profile: userProfile } = WhoIam()

  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const cleanAPI_URL = API_URL?.endsWith("/") ? API_URL.slice(0, -1) : API_URL

  const router = useRouter()
  return (
    <Row
      bg="#D02C23"
      w={"100%"}
      px={9}
      py={"10px"}
      alignItems="center"
      justifyContent="space-between"
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

      <Row
        alignItems="center"
        space={2}
      >
        <IconButton
          onPress={() => {
            setTheme(theme === "dark" ? "light" : "dark")
            toggleColorMode()
          }}
          icon={<Icon color={"white"}>{theme === "dark" ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}</Icon>}
          p={1}
          rounded={20}
        />

        <Pressable
          alignItems="center"
          flexDirection={"row"}
          onPress={() => {
            router.push("/profile")
          }}
          style={{ borderRadius: 50, overflow: "hidden" }}
          borderWidth={1}
        >
          {userProfile?.avatar ? (
            <Image
              src={`${cleanAPI_URL}${userProfile.avatar}`}
              alt="Avatar"
              width={30}
              height={30}
              objectFit="cover"
            />
          ) : null}
        </Pressable>
        <Text
          color="white"
          fontSize={18}
        >
          {userInfo?.username}
        </Text>
      </Row>
    </Row>
  )
}
