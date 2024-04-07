import React from "react"

import { Column, Skeleton } from "native-base"

export default function GrammarSkeleton() {
  return (
    <Column
      space={2}
      w={"100%"}
    >
      <Skeleton
        height={30}
        startColor={"#39B59F"}
        endColor={"#F2F2F2"}
      />
      <Skeleton height={30} />
      <Skeleton height={30} />
      <Skeleton height={30} />
      <Skeleton height={30} />
      <Skeleton height={30} />
      <Skeleton height={30} />
      <Skeleton height={30} />
      <Skeleton height={30} />
    </Column>
  )
}
