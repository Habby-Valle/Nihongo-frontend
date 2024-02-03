import React from "react"

import { Column, Skeleton } from "native-base"

export default function GrammarExplainSkeleton() {
  return (
    <Column
      space={2}
      w={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Skeleton
        w={"50%"}
        p={"10px"}
      />
      <Skeleton
        w={"50%"}
        p={"10px"}
      />
      <Skeleton
        w={"50%"}
        p={"10px"}
      />
    </Column>
  )
}
