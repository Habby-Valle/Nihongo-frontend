import React from "react"

import { Button, Row } from "native-base"

interface ILoadMoreProps {
  setCnt: (cntr: number) => void
  cnt: number
  numPages: number
}

export default function LoadMore({ setCnt, cnt, numPages }: ILoadMoreProps) {
  return (
    <Row py={"10px"}>
      <Button
        width={"100%"}
        bg={"#D02C23"}
        _hover={{ bg: "#ae251e" }}
        _pressed={{ bg: "#ae251e" }}
        size={"md"}
        onPress={() => {
          setCnt(cnt + 1)
        }}
        isDisabled={numPages === cnt}
      >
        Carregar mais
      </Button>
    </Row>
  )
}
