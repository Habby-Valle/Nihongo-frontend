import React from "react"

import { Row } from "native-base"
import { GetServerSidePropsContext } from "next"

import { BaseLayout } from "../../../components/home/BaseLayout"
import WritingCreate from "../../../components/text/TextWriting/WritingCreate"
import WritingList from "../../../components/text/TextWriting/WritingList"
import { redirectIfNoCredentials } from "../../../utils"

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  return redirectIfNoCredentials({ req, res })
}

export default function TextWriting() {
  return (
    <BaseLayout title="Escrita">
      <Row
        justifyContent={"space-around"}
        alignItems={"flex-start"}
        mt={"10px"}
        w={"100%"}
      >
        <WritingCreate />
        <WritingList />
      </Row>
    </BaseLayout>
  )
}
