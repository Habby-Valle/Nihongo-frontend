import React from "react"

import { Box } from "native-base"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"

import { BaseLayout } from "../../../components/home/BaseLayout"
import SentenceMain from "../../../components/sentence/SentencesMain"
import { redirectIfNoCredentials } from "../../../utils"

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  return redirectIfNoCredentials({ req, res })
}

export default function Sentence() {
  const router = useRouter()
  const grammarId = parseInt(router.query.grammarId?.toString() || "")
  return (
    <BaseLayout title="Sentenças">
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        w={"100%"}
        flex={2}
      >
        <SentenceMain grammarId={grammarId} />
      </Box>
    </BaseLayout>
  )
}
