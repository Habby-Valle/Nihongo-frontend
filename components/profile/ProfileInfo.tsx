import React, { useState } from "react"

import format from "date-fns/format"
import { Box, Button, Column, Row, Text, useToast } from "native-base"
import Image from "next/image"

import { WhoIam, updateProfileAvatar, useProfile } from "../../utils/api/user"
import { applyPhoneMask } from "../../utils/validation"
import Error from "../Error"
import ModalProfile from "./ModalProfile"
import ProfileSkeleton from "./ProfileSkeleton"

export default function ProfileInfo() {
  const [modalVisible, setModalVisible] = useState(false)
  const { data: userInfo, error: userInfoError, mutate: userRevalidate } = WhoIam()
  const [image, setImage] = useState<File>()
  const [saving, setSaving] = useState(false)
  const toast = useToast()
  const {
    data: profile,
    error: profileError,
    isLoading: profileLoading,
    isValidating: profileValidating,
    mutate: profileRevalidate,
  } = useProfile(userInfo?.id)

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
      profileRevalidate()
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

  if (profileLoading || profileValidating) {
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

  if (userInfoError || profileError) {
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
            <Image
              src={`https://nihongo-gaido-4ec2db96e424.herokuapp.com/${profile?.avatar}`}
              alt="Avatar"
              width={100}
              height={100}
              objectFit="cover"
            />
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
              Save
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
            {profile?.user.first_name ?? "Nome não disponível"}
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
            {profile?.user.last_name ?? "Sobrenome não disponível"}
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
            {profile?.user.username}
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
            {profile?.user.email ?? "Email não disponível"}
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
            {applyPhoneMask(profile?.phone) ?? "Telefone não disponível"}
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
            {profile?.date_of_birth ? format(new Date(profile.date_of_birth), "dd-MM-yyyy") : "Data não disponível"}
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
            Change profile
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
