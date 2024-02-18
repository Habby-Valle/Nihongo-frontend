import React from "react"

import { GetServerSidePropsContext } from "next"

import { BaseLayout } from "../../components/home/BaseLayout"
import WordToday from "../../components/home/WordToday"
import { redirectIfNoCredentials } from "../../utils"

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  return redirectIfNoCredentials({ req, res })
}

export default function Home() {
  return (
    <BaseLayout title="Home">
      <WordToday />
    </BaseLayout>
  )
}
