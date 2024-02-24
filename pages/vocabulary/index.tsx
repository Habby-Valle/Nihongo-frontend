import React, { useState } from "react"

import { Box } from "native-base"
import { GetServerSidePropsContext } from "next"

import { BaseLayout } from "../../components/home/BaseLayout"
import VocabularyPage from "../../components/vocabulary/VocabularyPage"
import { redirectIfNoCredentials } from "../../utils"

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  return redirectIfNoCredentials({ req, res })
}

export default function Vocabulary() {
  return (
    <BaseLayout title="Vocabulário">
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        w={"100%"}
        flex={2}
      >
        <VocabularyPage />
      </Box>
    </BaseLayout>
  )
}
