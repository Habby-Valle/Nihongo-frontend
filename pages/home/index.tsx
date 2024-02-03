import React from "react"

import { GetServerSidePropsContext } from "next"

import { BaseLayout } from "../../components/home/BaseLayout"
import { redirectIfNoCredentials } from "../../utils"

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  return redirectIfNoCredentials({ req, res })
}

export default function Home() {
  return (
    <BaseLayout title="Home">
      <h1>Home</h1>
    </BaseLayout>
  )
}
