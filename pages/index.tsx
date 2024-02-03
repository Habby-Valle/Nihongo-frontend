import React from "react"

import Cookies from "cookies"
import { GetServerSidePropsContext } from "next"

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const cookies = new Cookies(req, res)

  if (!cookies.get("auth-token")) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  return {
    redirect: {
      destination: "/home",
      permanent: false,
    },
  }
}

export default function Index() {
  return <></>
}
