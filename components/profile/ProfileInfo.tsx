import React, { useEffect, useState } from "react"
import { ListRenderItemInfo } from "react-native"

import format from "date-fns/format"
import { Box, Button, Column, Divider, FlatList, Row, Text, useToast } from "native-base"
import Image from "next/image"

import { WhoIam, updateProfileAvatar } from "../../utils/api/user"
import { applyPhoneMask } from "../../utils/validation"
import DataEmpty from "../DataEmpty"
import Error from "../Error"
import { IExample } from "../dictionary/KanjiExample"
import KanjiExample from "../dictionary/KanjiExample"
import ModalProfile from "./ModalProfile"
import ProfileSkeleton from "./ProfileSkeleton"

export default function ProfileInfo() {
  const [modalVisible, setModalVisible] = useState(false)
  const [favoritesKanjiLive, setFavoritesKanjiLive] = useState<IExample[]>([])
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

  useEffect(() => {
    const favoritesWordsKL = localStorage.getItem("favorites")
    if (favoritesWordsKL) {
      setFavoritesKanjiLive(JSON.parse(favoritesWordsKL))
    } else {
      setFavoritesKanjiLive([])
    }
  }, [])

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

  function itemKanjiLive({ item }: ListRenderItemInfo<IExample>) {
    return (
      <KanjiExample
        japanese={item.japanese}
        meaning={{ english: item.meaning.english }}
        audio={{ mp3: item.audio.mp3 }}
      />
    )
  }

  return (
    <Column
      space="10px"
      borderWidth={1}
      borderRadius={10}
      p={5}
      _light={{
        bg: "white",
        borderColor: "#262626",
      }}
      _dark={{
        bg: "#262626",
        borderColor: "white",
      }}
    >
      <Row justifyContent={"space-between"}>
        <Row alignItems={"flex-end"}>
          <Box
            borderColor={"#D02C23"}
            borderWidth={"3px"}
            style={{ width: 150, height: 150, borderRadius: 10, overflow: "hidden" }}
          >
            {userProfile?.avatar ? (
              <Image
                src={`${cleanAPI_URL}${userProfile.avatar}`}
                alt="Avatar"
                width={200}
                height={200}
                objectFit="cover"
              />
            ) : null}
          </Box>
          <Text
            fontSize={"24px"}
            fontWeight={"bold"}
            ml={5}
            mt={2}
          >
            {userProfile?.user.username}
          </Text>
        </Row>
        <Column space="10px">
          <Text
            fontSize={"16px"}
            fontWeight={"bold"}
          >
            Atualizar avatar
          </Text>
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
        </Column>
      </Row>
      <Divider my={5} />
      <Column>
        <Text
          fontSize={"16px"}
          fontWeight={"bold"}
        >
          Informações:
        </Text>

        <Text
          fontSize={"16px"}
          fontWeight={"600"}
        >
          Nome: {`${userProfile?.user.first_name} ${userProfile?.user.last_name}`}
        </Text>
        <Text
          fontSize={"16px"}
          fontWeight={"600"}
        >
          Email: {userProfile?.user.email ?? "Email não disponível"}
        </Text>
        <Text
          fontSize={"16px"}
          fontWeight={"600"}
        >
          Telefone: {applyPhoneMask(userProfile?.phone) ?? "Telefone não disponível"}
        </Text>
        <Text
          fontSize={"16px"}
          fontWeight={"600"}
        >
          Data de nascimento:{" "}
          {userProfile?.date_of_birth
            ? format(new Date(userProfile.date_of_birth), "dd-MM-yyyy")
            : "Data não disponível"}
        </Text>
      </Column>
      <Divider my={5} />
      <Column>
        <Text
          fontSize={"16px"}
          fontWeight={"bold"}
          mb={2}
        >
          Palavras favoritas(Kanjilive):
        </Text>
        <FlatList
          data={favoritesKanjiLive}
          renderItem={itemKanjiLive}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<DataEmpty message="Não há favoritos" />}
          ItemSeparatorComponent={() => (
            <Divider
              bg={"none"}
              mt={4}
            />
          )}
        />
      </Column>

      <ModalProfile
        isOpen={modalVisible}
        onClose={() => {
          setModalVisible(false)
        }}
      />
    </Column>
  )
}
