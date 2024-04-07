import React, { useEffect, useRef, useState } from "react"

import format from "date-fns/format"
import { Button, Column, FormControl, Input, Modal, Row, useToast } from "native-base"

import { WhoIam, updateProfile, useProfile } from "../../utils/api/user"
import { emailIsValid, nameIsValid, removePhoneFormatting, usernameIsValid } from "../../utils/validation"
import Error from "../Error"
import Toast from "../Toast"

interface ModalProfileProps {
  isOpen: boolean
  onClose: () => void
}

export default function ModalProfile({ isOpen, onClose }: ModalProfileProps) {
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const { data: userInfo, error: userError } = WhoIam()

  const { data: originalProfile, error: originalProfileError, mutate: originalProfileMutate } = useProfile(userInfo?.id)

  const [saving, setSaving] = useState(false)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [dateBirth, setDateBirth] = useState("")

  const [isFirstNameValid, setIsFirstNameValid] = useState(true)
  const [isLastNameValid, setIsLastNameValid] = useState(true)
  const [isUsernameValid, setIsUsernameValid] = useState(true)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isDateBirthValid] = useState(true)
  const [isPhoneValid, setIsPhoneValid] = useState(true)

  const toast = useToast()

  const someInfoChanged =
    firstName !== originalProfile?.user.first_name ||
    lastName !== originalProfile?.user.last_name ||
    username !== originalProfile?.user.username ||
    email !== originalProfile?.user.email ||
    phone !== originalProfile?.phone ||
    dateBirth !== originalProfile?.date_of_birth

  useEffect(() => {
    if (originalProfile) {
      setFirstName(originalProfile?.user.first_name)
      setLastName(originalProfile?.user.last_name)
      setUsername(originalProfile?.user.username)
      setEmail(originalProfile?.user.email)
      setPhone(originalProfile?.phone)
      setDateBirth(originalProfile?.date_of_birth)
    }
  }, [originalProfile])

  function setOriginalValues() {
    if (originalProfile) {
      setFirstName(originalProfile?.user.first_name)
      setLastName(originalProfile?.user.last_name)
      setUsername(originalProfile?.user.username)
      setEmail(originalProfile?.user.email)
      setPhone(originalProfile?.phone)
      setDateBirth(originalProfile?.date_of_birth)
    }
  }

  const handleNameChange = (name: string) => {
    setFirstName(name)
    setIsFirstNameValid(nameIsValid(name))
  }

  const handleLastNameChange = (lastname: string) => {
    setLastName(lastname)
    setIsLastNameValid(nameIsValid(lastname))
  }

  const handleUsernameChange = (username: string) => {
    setUsername(username)
    setIsUsernameValid(usernameIsValid(username))
  }

  const handleEmailChange = (email: string) => {
    setEmail(email)
    setIsEmailValid(emailIsValid(email))
  }

  const handlePhoneChange = (newPhone: string) => {
    const value = newPhone.replace(/\D/g, "")

    let formattedPhone = ""
    let isInvalid = false
    if (value.length <= 10) {
      formattedPhone = `(${value.slice(0, 2)}) ${value.slice(2)}`
      isInvalid = true
    } else if (value.length <= 11) {
      formattedPhone = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`
      isInvalid = false
    } else {
      formattedPhone = phone
      isInvalid = true
    }
    setPhone(formattedPhone)
    setIsPhoneValid(isInvalid)
    validatePhone(formattedPhone)
  }

  const validatePhone = (phone: string) => {
    if (phone.length >= 15) {
      setIsPhoneValid(true)
    } else {
      setIsPhoneValid(false)
    }
  }

  if (originalProfileError) {
    return <Error message="Error loading profile" />
  }

  if (userError) {
    return <Error message="Error loading user" />
  }

  async function save() {
    setSaving(true)

    try {
      const telefoneSemFormatacao = removePhoneFormatting(phone)
      const dataNascimentoFormatada = format(new Date(dateBirth), "yyyy-MM-dd")
      const userId = userInfo?.id

      const profileUpdated = await updateProfile(userId, {
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        phone: telefoneSemFormatacao,
        date_of_birth: dataNascimentoFormatada,
      })

      if (profileUpdated) {
        toast.show({
          placement: "top",
          render: () => {
            return (
              <Toast
                title="Sucesso"
                message="Perfil atualizado com sucesso"
                bg="#4BB543"
              />
            )
          },
        })

        originalProfileMutate()
        setSaving(false)
        onClose()
      }
      onClose()
    } catch (error) {
      toast.show({
        placement: "top",
        render: () => {
          return (
            <Toast
              title="Error"
              message="Erro ao atualizar perfil"
              bg="#39B59F"
            />
          )
        },
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
    >
      <Modal.Content
        maxWidth={"500px"}
        _light={{
          bg: "#F2F2F2",
        }}
        _dark={{
          bg: "#333333",
        }}
      >
        <Modal.CloseButton />
        <Modal.Header _text={{ color: "#39B59F" }}>Atualizar perfil</Modal.Header>
        <Modal.Body>
          <Row
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Column
              width={"40%"}
              space={"8px"}
            >
              <FormControl
                isRequired
                isInvalid={!isFirstNameValid}
              >
                <FormControl.Label _text={{ color: "#39B59F", fontWeight: "600" }}>Nome</FormControl.Label>
                <Input
                  value={firstName}
                  onChangeText={handleNameChange}
                  placeholder="Nome"
                  shadow={1}
                  _focus={{ borderColor: "#39B59F" }}
                  _hover={{ borderColor: "#39B59F" }}
                  focusOutlineColor={"#39B59F"}
                  _light={{
                    bg: "white",
                  }}
                  _dark={{
                    bg: "#262626",
                  }}
                />
                <FormControl.ErrorMessage>Nome inválido</FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!isLastNameValid}
              >
                <FormControl.Label _text={{ color: "#39B59F", fontWeight: "600" }}>Sobrenome</FormControl.Label>
                <Input
                  value={lastName}
                  onChangeText={handleLastNameChange}
                  placeholder="Sobrenome"
                  shadow={1}
                  _focus={{ borderColor: "#39B59F" }}
                  _hover={{ borderColor: "#39B59F" }}
                  focusOutlineColor={"#39B59F"}
                  _light={{
                    bg: "white",
                  }}
                  _dark={{
                    bg: "#262626",
                  }}
                />
                <FormControl.ErrorMessage>Sobrenome inválido</FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!isUsernameValid}
              >
                <FormControl.Label _text={{ color: "#39B59F", fontWeight: "600" }}>Username</FormControl.Label>
                <Input
                  value={username}
                  onChangeText={handleUsernameChange}
                  placeholder="Username"
                  shadow={1}
                  _focus={{ borderColor: "#39B59F" }}
                  _hover={{ borderColor: "#39B59F" }}
                  focusOutlineColor={"#39B59F"}
                  _light={{
                    bg: "white",
                  }}
                  _dark={{
                    bg: "#262626",
                  }}
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
                <FormControl.Label _text={{ color: "#39B59F", fontWeight: "600" }}>Email</FormControl.Label>
                <Input
                  value={email}
                  onChangeText={handleEmailChange}
                  placeholder="Email"
                  shadow={1}
                  _focus={{ borderColor: "#39B59F" }}
                  _hover={{ borderColor: "#39B59F" }}
                  focusOutlineColor={"#39B59F"}
                  _light={{
                    bg: "white",
                  }}
                  _dark={{
                    bg: "#262626",
                  }}
                />
                <FormControl.ErrorMessage>Email inválido</FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!isPhoneValid}
              >
                <FormControl.Label _text={{ color: "#39B59F", fontWeight: "600" }}>Telefone</FormControl.Label>
                <Input
                  value={phone}
                  onChangeText={handlePhoneChange}
                  mask="+55 (99) 99999-9999"
                  placeholder="Telefone"
                  shadow={1}
                  _focus={{ borderColor: "#39B59F" }}
                  _hover={{ borderColor: "#39B59F" }}
                  focusOutlineColor={"#39B59F"}
                  _light={{
                    bg: "white",
                  }}
                  _dark={{
                    bg: "#262626",
                  }}
                />
                <FormControl.ErrorMessage>Telefone inválido</FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!isDateBirthValid}
              >
                <FormControl.Label _text={{ color: "#39B59F", fontWeight: "600" }}>
                  Data de nascimento
                </FormControl.Label>
                <Input
                  value={dateBirth}
                  onChangeText={(text) => {
                    setDateBirth(text)
                  }}
                  placeholder="Data de nascimento"
                  shadow={1}
                  _focus={{ borderColor: "#39B59F" }}
                  _hover={{ borderColor: "#39B59F" }}
                  focusOutlineColor={"#39B59F"}
                  _light={{
                    bg: "white",
                  }}
                  _dark={{
                    bg: "#262626",
                  }}
                />
                <FormControl.ErrorMessage>Data de nascimento inválida</FormControl.ErrorMessage>
              </FormControl>
            </Column>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setOriginalValues()
                onClose()
              }}
            >
              Cancelar
            </Button>
            <Button
              bg={"#39B59F"}
              _hover={{ bg: "#1ca088" }}
              _pressed={{ bg: "#1ca088" }}
              onPress={save}
              isLoading={saving}
              isDisabled={
                !someInfoChanged ||
                !isFirstNameValid ||
                !isLastNameValid ||
                !isUsernameValid ||
                !isEmailValid ||
                !isPhoneValid ||
                !isDateBirthValid
              }
            >
              Salvar
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
