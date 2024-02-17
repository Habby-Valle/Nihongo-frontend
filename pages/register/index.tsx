import React, { useState } from "react"

import { AxiosError } from "axios"
import Cookies from "cookies"
import { Button, Center, Column, FormControl, Input, Pressable, Row, Text, useToast } from "native-base"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import Image from "next/image"
import { MdRemoveRedEye } from "react-icons/md"

import Logo from "../../public/images/logo.png"
import { IUserCreate, doRegister } from "../../utils/api/user"
import { emailIsValid, getPasswordValidationErrorMessage, nameIsValid, usernameIsValid } from "../../utils/validation"

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

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [isFirstNameValid, setIsFirstNameValid] = useState(true)
  const [isLastNameValid, setIsLastNameValid] = useState(true)
  const [isUsernameValid, setIsUsernameValid] = useState(true)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true)

  const [passwordErrorMessage, setPasswordErrorMessage] = useState("")

  const [saving, setSaving] = useState(false)

  const router = useRouter()
  const toast = useToast()

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }

  const handleChangeName = (text: string) => {
    setFirstName(text)
    setIsFirstNameValid(nameIsValid(text))
  }

  const handleChangeLastName = (text: string) => {
    setLastName(text)
    setIsLastNameValid(nameIsValid(text))
  }

  const handleChangeUsername = (text: string) => {
    setUsername(text)
    setIsUsernameValid(usernameIsValid(text))
  }

  const handleChangeEmail = (text: string) => {
    setEmail(text)
    setIsEmailValid(emailIsValid(text))
  }

  const handleChangeSenha = (text: string) => {
    setPassword(text)
    setIsPasswordValid(getPasswordValidationErrorMessage(text) === "")
    setPasswordErrorMessage(getPasswordValidationErrorMessage(text))
  }

  const handleChangeConfirmarSenha = (text: string) => {
    setConfirmPassword(text)
    setIsConfirmPasswordValid(getPasswordValidationErrorMessage(text) === "")
    setPasswordErrorMessage(getPasswordValidationErrorMessage(text))
    if (text !== password) {
      setIsConfirmPasswordValid(false)
      setPasswordErrorMessage("As senhas não coincidem.")
    }
  }

  const register = async () => {
    setSaving(true)

    try {
      const user: IUserCreate = {
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        password,
      }

      const userRegistered = await doRegister(user)

      if (!userRegistered) throw new Error("Something went wrong")

      toast.show({
        title: "Conta criada!",
        description: `Usuário ${userRegistered.username} registrado com sucesso!`,
        placement: "top",
        duration: 2000,
      })

      if (userRegistered) {
        router.push("/login")
      }
    } catch (err: any) {
      if (err instanceof AxiosError || err instanceof Error) {
        toast.show({
          title: "Error",
          description: err.message,
          placement: "top",
          duration: 2000,
        })
      } else {
        toast.show({
          title: "Error",
          description: "Aconteceu algum erro! Tente novamente!",
          placement: "top",
          duration: 2000,
        })
      }
    } finally {
      setSaving(false)
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
        <title>Nihongo Gaido - Criar conta</title>
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
        h={"80vh"}
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
        <Row
          justifyContent={"space-between"}
          width={"80%"}
        >
          <Column
            width={"40%"}
            space={"8px"}
          >
            <FormControl
              isRequired
              isInvalid={!isFirstNameValid}
            >
              <FormControl.Label _text={{ color: "#D02C23", fontWeight: "600" }}>Nome</FormControl.Label>
              <Input
                value={firstName}
                onChangeText={handleChangeName}
                placeholder="Nome"
                shadow={1}
                _focus={{ borderColor: "#D02C23" }}
                _hover={{ borderColor: "#D02C23" }}
                focusOutlineColor={"#D02C23"}
              />
              <FormControl.ErrorMessage>Nome inválido</FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={!isLastNameValid}
            >
              <FormControl.Label _text={{ color: "#D02C23", fontWeight: "600" }}>Sobrenome</FormControl.Label>
              <Input
                value={lastName}
                onChangeText={handleChangeLastName}
                placeholder="Sobrenome"
                shadow={1}
                _focus={{ borderColor: "#D02C23" }}
                _hover={{ borderColor: "#D02C23" }}
                focusOutlineColor={"#D02C23"}
              />
              <FormControl.ErrorMessage>Sobrenome inválido</FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={!isUsernameValid}
            >
              <FormControl.Label _text={{ color: "#D02C23", fontWeight: "600" }}>Username</FormControl.Label>
              <Input
                value={username}
                onChangeText={handleChangeUsername}
                placeholder="Username"
                shadow={1}
                _focus={{ borderColor: "#D02C23" }}
                _hover={{ borderColor: "#D02C23" }}
                focusOutlineColor={"#D02C23"}
              />
              <FormControl.ErrorMessage>Username inválido</FormControl.ErrorMessage>
            </FormControl>
          </Column>
          <Column
            width={"40%"}
            space={"8px"}
          >
            <FormControl
              isRequired
              isInvalid={!isEmailValid}
            >
              <FormControl.Label _text={{ color: "#D02C23", fontWeight: "600" }}>Email</FormControl.Label>
              <Input
                value={email}
                onChangeText={handleChangeEmail}
                placeholder="Email"
                shadow={1}
                _focus={{ borderColor: "#D02C23" }}
                _hover={{ borderColor: "#D02C23" }}
                focusOutlineColor={"#D02C23"}
              />
              <FormControl.ErrorMessage>Email inválido</FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={!isPasswordValid}
            >
              <FormControl.Label _text={{ color: "#D02C23", fontWeight: "600" }}>Senha</FormControl.Label>
              <Input
                value={password}
                onChangeText={handleChangeSenha}
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                shadow={1}
                _focus={{ borderColor: "#D02C23" }}
                _hover={{ borderColor: "#D02C23" }}
                focusOutlineColor={"#D02C23"}
                InputRightElement={
                  <Pressable onPress={handleState}>
                    <MdRemoveRedEye
                      size={20}
                      color="#D02C23"
                    />
                  </Pressable>
                }
              />
              <FormControl.ErrorMessage>{passwordErrorMessage}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={!isConfirmPasswordValid}
            >
              <FormControl.Label _text={{ color: "#D02C23", fontWeight: "600" }}>Confirmar senha</FormControl.Label>
              <Input
                value={confirmPassword}
                onChangeText={handleChangeConfirmarSenha}
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                shadow={1}
                _focus={{ borderColor: "#D02C23" }}
                _hover={{ borderColor: "#D02C23" }}
                focusOutlineColor={"#D02C23"}
                InputRightElement={
                  <Pressable onPress={handleState}>
                    <MdRemoveRedEye
                      size={20}
                      color="#D02C23"
                    />
                  </Pressable>
                }
              />
              <FormControl.ErrorMessage>{passwordErrorMessage}</FormControl.ErrorMessage>
            </FormControl>
          </Column>
        </Row>
        <Column
          space={"8px"}
          width={"80%"}
          mt={"8px"}
        >
          <Column width={"100%"}>
            <Row>
              <Text mr={"6px"}>Já tem uma conta?</Text>
              <Pressable
                onPress={() => {
                  router.push("/register")
                }}
              >
                <Text
                  fontWeight={"600"}
                  color={"#D02C23"}
                  onPress={() => {
                    router.push("/login")
                  }}
                >
                  login
                </Text>
              </Pressable>
            </Row>
          </Column>
        </Column>
        <Column
          w={"40%"}
          justifyContent={"flex-end"}
          alignItems={"flex-end"}
          width={"80%"}
        >
          <Button
            w={"90px"}
            bg={"#D02C23"}
            _hover={{ bg: "#ae251e" }}
            onPress={register}
            isLoading={saving}
            isDisabled={
              !isFirstNameValid ||
              !isLastNameValid ||
              !isUsernameValid ||
              !isEmailValid ||
              !isPasswordValid ||
              !isConfirmPasswordValid ||
              firstName.trim() === "" ||
              lastName.trim() === "" ||
              username.trim() === "" ||
              email.trim() === "" ||
              password.trim() === "" ||
              confirmPassword.trim() === ""
            }
          >
            Criar conta
          </Button>
        </Column>
      </Column>
    </Center>
  )
}
