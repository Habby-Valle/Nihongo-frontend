import React, { useState } from "react"

import { AxiosError } from "axios"
import Cookies from "cookies"
import { Button, Center, Column, FormControl, Input, Pressable, Row, Text, useToast } from "native-base"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import Image from "next/image"
import { MdRemoveRedEye } from "react-icons/md"

import Toast from "../../components/Toast"
import Logo from "../../public/images/logo.png"
import { doLogin } from "../../utils/api/user"

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const cookies = new Cookies(req, res)

  if (cookies.get("auth-token")) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default function Login() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [sendingLogin, setSendingLogin] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()
  const toast = useToast()

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }

  const login = async () => {
    setSendingLogin(true)
    if (userName && password) {
      try {
        const user = await doLogin(userName, password)

        if (!user) throw new Error("Please, verify your credentials")

        router.push("/home")
        toast.show({
          placement: "top",
          render: () => {
            return (
              <Toast
                title={`Seja bem-vindo, ${user.username}!`}
                message="Login efetuado com sucesso!"
                bg="emerald.500"
              />
            )
          },
        })
      } catch (error) {
        if (error instanceof AxiosError || error instanceof Error) {
          toast.show({
            placement: "top",
            render: () => {
              return (
                <Toast
                  title="Error"
                  message="Please, verify your credentials"
                  bg="red.500"
                />
              )
            },
          })
        } else {
          toast.show({
            placement: "top",
            render: () => {
              return (
                <Toast
                  title="Error"
                  message="An unexpected error occurred"
                  bg="red.500"
                />
              )
            },
          })
        }
      } finally {
        setSendingLogin(false)
      }
    }
  }

  return (
    <Center
      borderWidth={1}
      h={"100vh"}
      _light={{
        bg: "white",
      }}
      _dark={{
        bg: "#333333",
      }}
    >
      <Head>
        <title>Nihongo Gaido - Login</title>
      </Head>
      <Column
        borderRadius={"5px"}
        shadow={3}
        p={6}
        borderWidth={1}
        w={"60%"}
        justifyContent={"center"}
        alignItems={"center"}
        borderColor={"#D02C23"}
        _light={{
          bg: "white",
        }}
        _dark={{
          bg: "#262626",
        }}
      >
        <Column
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image
            src={Logo}
            alt="Logo"
            width={150}
            height={150}
            priority
          />
          <Text
            fontSize={"18px"}
            fontWeight={"600"}
            color={"#D02C23"}
          >
            Nihongo Gaido
          </Text>
        </Column>
        <Column
          width={"40%"}
          space={"8px"}
        >
          <FormControl>
            <FormControl.Label _text={{ color: "#D02C23", fontWeight: "600" }}>Username</FormControl.Label>
            <Input
              value={userName}
              onChangeText={(text) => {
                setUserName(text)
              }}
              placeholder="Username"
              shadow={1}
              _focus={{ borderColor: "#D02C23" }}
              _hover={{ borderColor: "#D02C23" }}
              focusOutlineColor={"#D02C23"}
              _light={{
                bg: "white",
              }}
              _dark={{
                bg: "#262626",
              }}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label _text={{ color: "#D02C23", fontWeight: "600" }}>Senha</FormControl.Label>
            <Input
              value={password}
              onChangeText={(text) => {
                setPassword(text)
              }}
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              shadow={1}
              _focus={{ borderColor: "#D02C23" }}
              _hover={{ borderColor: "#D02C23" }}
              focusOutlineColor={"#D02C23"}
              _light={{
                bg: "white",
              }}
              _dark={{
                bg: "#262626",
              }}
              InputRightElement={
                <Pressable onPress={handleState}>
                  <MdRemoveRedEye
                    size={20}
                    color="#D02C23"
                  />
                </Pressable>
              }
            />
          </FormControl>
        </Column>
        <Column
          space={"8px"}
          width={"40%"}
          mt={"8px"}
        >
          <Column width={"100%"}>
            <Row>
              <Text mr={"6px"}>Não tem uma conta?</Text>
              <Pressable
                onPress={() => {
                  router.push("/register")
                }}
              >
                <Text
                  fontWeight={"600"}
                  color={"#D02C23"}
                  onPress={() => {
                    router.push("/register")
                  }}
                >
                  Registre-se
                </Text>
              </Pressable>
            </Row>
          </Column>
          <Column width={"100%"}>
            <Row>
              <Text mr={"6px"}>Esqueceu sua senha?</Text>
              <Text
                fontWeight={"600"}
                color={"#D02C23"}
                onPress={() => {
                  router.push("/forgot-password")
                }}
              >
                Mude
              </Text>
            </Row>
          </Column>
        </Column>
        <Column
          w={"40%"}
          justifyContent={"flex-end"}
          alignItems={"flex-end"}
        >
          <Button
            w={"90px"}
            bg={"#D02C23"}
            _hover={{ bg: "#ae251e" }}
            _pressed={{ bg: "#ae251e" }}
            onPress={login}
            isLoading={sendingLogin}
          >
            Login
          </Button>
        </Column>
      </Column>
    </Center>
  )
}
