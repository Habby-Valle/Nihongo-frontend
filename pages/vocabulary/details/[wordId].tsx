import React from "react"

import { Box } from "native-base"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"

import { BaseLayout } from "../../../components/home/BaseLayout"
import WordDetailsAndExamples from "../../../components/vocabulary/wordDetails/WordDetailsAndExamples"
import { redirectIfNoCredentials } from "../../../utils"

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  return redirectIfNoCredentials({ req, res })
}

export default function WordDetails() {
  const router = useRouter()
  const wordId = parseInt(router.query.wordId?.toString() || "")
  return (
    <BaseLayout title="Detalhes da palavra">
      <Box
        w={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <WordDetailsAndExamples wordId={wordId} />
      </Box>
    </BaseLayout>
  )
}
