import React, { FunctionComponent } from "react"

import { Box, Column, Row, ScrollView } from "native-base"
import Head from "next/head"

import { Heading } from "./Heading"
import { LateralMenu } from "./LateralMenu"

interface Props {
  children: React.ReactNode
  title: string
}

export const BaseLayout: FunctionComponent<Props> = ({ children, title }) => {
  return (
    <Row
      bg={"#F6F6F6"}
      w={"100%"}
      flex={1}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <Column>
        <LateralMenu />
      </Column>
      <Column
        flex={3}
        _light={{
          bg: "#f2f2f2",
        }}
        _dark={{
          bg: "#333333",
        }}
      >
        <Heading title={title} />
        <ScrollView h={"500px"}>
          <Box
            flex={1}
            p={"20px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {children}
          </Box>
        </ScrollView>
      </Column>
    </Row>
  )
}
