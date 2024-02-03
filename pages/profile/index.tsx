import React from "react"

import { Box } from "native-base"
import { GetServerSidePropsContext } from "next"

import { BaseLayout } from "../../components/home/BaseLayout"
import ProfileInfo from "../../components/profile/ProfileInfo"
import { redirectIfNoCredentials } from "../../utils"

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  return redirectIfNoCredentials({ req, res })
}

export default function Profile() {
  return (
    <BaseLayout title="Profile">
      <Box w={"100%"}>
        <ProfileInfo />
      </Box>
    </BaseLayout>
  )
}
