import React from "react"

import { Column, Skeleton } from "native-base"

export default function ProfileSkeleton() {
  return (
    <Column
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Skeleton
        w={"600px"}
        h={"400px"}
        startColor={"#39B59F"}
        endColor={"#F2F2F2"}
      />
    </Column>
  )
}
