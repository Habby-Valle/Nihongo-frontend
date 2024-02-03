import React from "react"

import { Box } from "native-base"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"

import { BaseLayout } from "../../../../components/home/BaseLayout"
import TextTranslateDetail from "../../../../components/text/TextTranslate/TextTranslateDetail"
import { redirectIfNoCredentials } from "../../../../utils"
import { useText } from "../../../../utils/api/text"

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  return redirectIfNoCredentials({ req, res })
}

export default function TextDetail() {
  const router = useRouter()
  const textId = parseInt(router.query.textId?.toString() || "")
  const { data: text } = useText(textId)

  return (
    <BaseLayout title={`${text?.title}`}>
      <Box w={"100%"}>
        <TextTranslateDetail textId={textId} />
      </Box>
    </BaseLayout>
  )
}
