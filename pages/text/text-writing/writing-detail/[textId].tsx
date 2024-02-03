import React from "react"

import { Box } from "native-base"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"

import { BaseLayout } from "../../../../components/home/BaseLayout"
import TextWritingDetail from "../../../../components/text/TextWriting/TextWritingDetail"
import { redirectIfNoCredentials } from "../../../../utils"
import { useTextWriting } from "../../../../utils/api/text"

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  return redirectIfNoCredentials({ req, res })
}

export default function WritingDetail() {
  const router = useRouter()
  const textId = parseInt(router.query.textId?.toString() || "")
  const { data: text } = useTextWriting(textId)

  return (
    <BaseLayout title={`${text?.title}`}>
      <Box w={"100%"}>
        <TextWritingDetail textId={textId} />
      </Box>
    </BaseLayout>
  )
}
