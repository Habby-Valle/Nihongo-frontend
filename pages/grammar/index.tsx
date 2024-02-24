import React from "react"

import { Box } from "native-base"
import { GetServerSidePropsContext } from "next"

import GrammarPage from "../../components/grammar/GrammarPage"
import { BaseLayout } from "../../components/home/BaseLayout"
import { redirectIfNoCredentials } from "../../utils"

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  return redirectIfNoCredentials({ req, res })
}

export default function Grammar() {
  return (
    <BaseLayout title="Grámatica">
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        w={"100%"}
        flex={2}
      >
        <GrammarPage />
      </Box>
    </BaseLayout>
  )
}
