import React from "react"

import { Box, Text as Textt } from "native-base"
import { GetServerSidePropsContext } from "next"

import { BaseLayout } from "../../components/home/BaseLayout"
import TextOptions from "../../components/text/TextOptions"
import { redirectIfNoCredentials } from "../../utils"

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  return redirectIfNoCredentials({ req, res })
}

export default function Text() {
  return (
    <BaseLayout title="Textos escritos">
      <Box w={"100%"}>
        <Textt
          textAlign={"center"}
          fontSize={"xl"}
          fontWeight={"bold"}
        >
          Escolha uma opção
        </Textt>
        <TextOptions />
      </Box>
    </BaseLayout>
  )
}
