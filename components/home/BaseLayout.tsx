import React, { FunctionComponent, useContext, useEffect } from "react"

import { Box, Column, Pressable, Row, ScrollView } from "native-base"
import Head from "next/head"
import { MdArrowBack, MdArrowForward } from "react-icons/md"

import { LateralMenuContext } from "../../contexts/LateralMenuContext"
import { Heading } from "./Heading"
import { LateralMenu } from "./LateralMenu"

interface Props {
  children: React.ReactNode
  title: string
}

export const BaseLayout: FunctionComponent<Props> = ({ children, title }) => {
  const { isClose, toggleMenu } = useContext(LateralMenuContext)
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
        {isClose !== true && <LateralMenu />}
        <ButtonMenuLateral
          toggleMenu={toggleMenu}
          Icon={
            isClose ? (
              <MdArrowForward
                size={20}
                color={"#fff"}
              />
            ) : (
              <MdArrowBack
                size={20}
                color={"#fff"}
              />
            )
          }
        />
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
        {isClose === true && (
          <ButtonMenuLateral
            left={"20px"}
            toggleMenu={toggleMenu}
            Icon={
              <MdArrowForward
                size={20}
                color={"#fff"}
              />
            }
          />
        )}
        <ScrollView h={"500px"}>
          <Column
            flex={1}
            p={"20px"}
            space={4}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {children}
          </Column>
        </ScrollView>
      </Column>
    </Row>
  )
}

interface ButtonMenuLateralProps {
  toggleMenu: () => void
  Icon: React.ReactNode
  left?: string
}

function ButtonMenuLateral({ toggleMenu, Icon, left }: ButtonMenuLateralProps) {
  return (
    <Pressable
      position={"absolute"}
      top={"350px"}
      left={left ? left : "140px"}
      borderWidth={1}
      p={"10px"}
      borderRadius={"50%"}
      borderColor={"#ffff"}
      onPress={toggleMenu}
      _hover={{
        bg: "#a1211a",
      }}
      zIndex={99990}
    >
      {Icon}
    </Pressable>
  )
}
