import React, { useState } from "react"

import { Column } from "native-base"

import TranslateUpdate from "./TranslateUpdate"
import TranslateView from "./TranslateView"

enum TextTranslateComponent {
  TranslateView,
  TranslateUpdate,
}

interface ITextDetailProps {
  textId: number
}

export default function TextTranslateDetail(props: ITextDetailProps) {
  const [currentComponent, setCurrentComponent] = useState<TextTranslateComponent>(TextTranslateComponent.TranslateView)

  function getTextTranslateComponent() {
    switch (currentComponent) {
      case TextTranslateComponent.TranslateView:
        return (
          <TranslateView
            textId={props.textId}
            onEdit={() => {
              setCurrentComponent(TextTranslateComponent.TranslateUpdate)
            }}
          />
        )

      case TextTranslateComponent.TranslateUpdate:
        return (
          <Column
            justifyContent={"center"}
            alignItems={"center"}
          >
            <TranslateUpdate
              textId={props.textId}
              onBack={() => {
                setCurrentComponent(TextTranslateComponent.TranslateView)
              }}
            />
          </Column>
        )
    }
  }
  return <>{getTextTranslateComponent()}</>
}
