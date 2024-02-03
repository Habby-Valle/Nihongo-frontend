import React, { useState } from "react"

import { Column } from "native-base"

import WritingUpdate from "./WritingUpdate"
import WritingView from "./WritingView"

enum TextWritingComponent {
  WritingView,
  WritingUpdate,
}

interface IWritingDetailProps {
  textId: number
}

export default function TextWritingDetail(props: IWritingDetailProps) {
  const [currentComponent, setCurrentComponent] = useState<TextWritingComponent>(TextWritingComponent.WritingView)

  function getTextTranslateComponent() {
    switch (currentComponent) {
      case TextWritingComponent.WritingView:
        return (
          <WritingView
            textId={props.textId}
            onEdit={() => {
              setCurrentComponent(TextWritingComponent.WritingUpdate)
            }}
          />
        )

      case TextWritingComponent.WritingUpdate:
        return (
          <Column
            justifyContent={"center"}
            alignItems={"center"}
          >
            <WritingUpdate
              textId={props.textId}
              onBack={() => {
                setCurrentComponent(TextWritingComponent.WritingView)
              }}
            />
          </Column>
        )
    }
  }
  return <>{getTextTranslateComponent()}</>
}
