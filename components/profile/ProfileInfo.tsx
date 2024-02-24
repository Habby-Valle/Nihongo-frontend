import React, { useState } from "react"

import format from "date-fns/format"
import { Box, Button, Column, Row, Text, useToast } from "native-base"
import Image from "next/image"

import Default from "../../public/images/default.jpg"
import { WhoIam, updateProfileAvatar } from "../../utils/api/user"
import { applyPhoneMask } from "../../utils/validation"
import Error from "../Error"
import ModalProfile from "./ModalProfile"
import ProfileSkeleton from "./ProfileSkeleton"

export default function ProfileInfo() {
  const [modalVisible, setModalVisible] = useState(false)
  const {
    data: userInfo,
    profile: userProfile,
    isLoading: profileLoading,
    error: userInfoError,
    mutate: userRevalidate,
  } = WhoIam()
  const [image, setImage] = useState<File>()
  const [saving, setSaving] = useState(false)
  const toast = useToast()

  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const cleanAPI_URL = API_URL?.endsWith("/") ? API_URL.slice(0, -1) : API_URL

  const urlImage = userProfile?.avatar ? `${cleanAPI_URL}${userProfile.avatar}` : Default

  async function handleUpdateProfileAvatar() {
    setSaving(true)
    try {
      if (!image) return

      const avatarUpdated = await updateProfileAvatar(userInfo?.id, image)
      if (avatarUpdated) {
        toast.show({
          title: "Success",
          description: `Avatar profile updated`,
          placement: "top",
          duration: 2000,
        })
      }

      userRevalidate()
    } catch (error) {
      toast.show({
        title: "Error",
        description: error,
        placement: "top",
        duration: 2000,
      })
    } finally {
      setSaving(false)
    }
  }

  if (profileLoading) {
    return (
      <Box
        justifyContent="center"
        alignItems="center"
        w={"100%"}
      >
        <ProfileSkeleton />
      </Box>
    )
  }

  if (userInfoError) {
    return <Error message="Error loading profile" />
  }

  return (
    <Box
      justifyContent={"center"}
      alignItems={"center"}
      w={"100%"}
    >
      <Column
        justifyContent={"space-around"}
        w={"600px"}
        h={"400px"}
        borderWidth={1}
        borderRadius={9}
        borderColor="#D02C23"
        py={5}
        px={8}
        space={"1px"}
        _light={{
          bg: "white",
        }}
        _dark={{
          bg: "#262626",
        }}
      >
        <Row
          w={210}
          alignItems="flex-end"
          justifyContent="space-between"
          p={5}
        >
          <Box
            borderColor={"#D02C23"}
            borderWidth={"3px"}
            style={{ width: 100, height: 100, borderRadius: 50, overflow: "hidden" }}
          >
            {userProfile?.avatar ? (
              <Image
                src={urlImage}
                alt="Avatar"
                width={100}
                height={100}
                objectFit="cover"
              />
            ) : (
              <Image
                src={Default}
                alt="Avatar"
                width={100}
                height={100}
                objectFit="cover"
              />
            )}
          </Box>
          <Column
            space={"12px"}
            p={"12px"}
          >
            <label>Change profile avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selectedImage = e.target.files

                if (selectedImage) {
                  setImage(selectedImage[0])
                }
              }}
            />
            <Button
              onPress={handleUpdateProfileAvatar}
              bg={"#D02C23"}
              _hover={{ bg: "#ae251e" }}
              _pressed={{ bg: "#ae251e" }}
              isLoading={saving}
            >
              Salvar
            </Button>
          </Column>
        </Row>
        <Column p={5}>
          <Text color="#D02C23">
            <Text
              color="#D02C23"
              fontWeight="bold"
            >
              Nome:{" "}
            </Text>
            {userProfile?.user.first_name !== "" ? userProfile?.user.first_name : "Nome não disponível"}
          </Text>
          <Text
            color="#D02C23"
            mt={"4px"}
          >
            <Text
              color="#D02C23"
              fontWeight="bold"
            >
              Sobrenome:{" "}
            </Text>
            {userProfile?.user.last_name !== "" ? userProfile?.user.last_name : "Sobrenome não disponível"}
          </Text>
          <Text
            color="#D02C23"
            mt={"4px"}
          >
            <Text
              color="#D02C23"
              fontWeight="bold"
            >
              Username:{" "}
            </Text>
            {userProfile?.user.username}
          </Text>
          <Text
            color="#D02C23"
            mt={"4px"}
          >
            <Text
              color="#D02C23"
              fontWeight="bold"
            >
              Email:{" "}
            </Text>
            {userProfile?.user.email ?? "Email não disponível"}
          </Text>
          <Text
            color="#D02C23"
            mt={"4px"}
          >
            <Text
              color="#D02C23"
              fontWeight="bold"
            >
              Telefone:{" "}
            </Text>
            {applyPhoneMask(userProfile?.phone) ?? "Telefone não disponível"}
          </Text>
          <Text
            color="#D02C23"
            mt={"4px"}
          >
            <Text
              color="#D02C23"
              fontWeight="bold"
            >
              Data de Nascimento:{" "}
            </Text>
            {userProfile?.date_of_birth
              ? format(new Date(userProfile.date_of_birth), "dd-MM-yyyy")
              : "Data não disponível"}
          </Text>
        </Column>
        <Row justifyContent={"flex-end"}>
          <Button
            bg={"#D02C23"}
            _hover={{ bg: "#ae251e" }}
            _pressed={{ bg: "#ae251e" }}
            onPress={() => {
              setModalVisible(true)
            }}
          >
            Atualizar perfil
          </Button>
        </Row>
        <ModalProfile
          isOpen={modalVisible}
          onClose={() => {
            setModalVisible(false)
          }}
        />
      </Column>
    </Box>
  )
}
