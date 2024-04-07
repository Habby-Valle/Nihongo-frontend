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
        bg={"#39B59F"}
        _hover={{ bg: "#1ca088" }}
        _pressed={{ bg: "#1ca088" }}
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
