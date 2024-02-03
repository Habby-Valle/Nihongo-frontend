import React from "react"

import { Column, Text } from "native-base"
import { FieldError, UseFormRegister } from "react-hook-form"

import Style from "../../styles/Home.module.css"

interface IInputProps {
  label: string
  name: string
  type: string
  register: UseFormRegister<any>
  errors: Record<string, FieldError>
  patternError?: string
  pattern?: RegExp
}

export default function Input({ label, name, type, register, errors, patternError, pattern }: IInputProps) {
  return (
    <Column space={2}>
      <Text
        fontSize="md"
        fontWeight="bold"
      >
        {label}
      </Text>
      <input
        className={Style.inputs}
        type={type}
        placeholder={label.toLowerCase()}
        {...register(name, { required: true, pattern })}
      />
      {errors?.[name]?.type === "required" && <Text color={"red.500"}>{`${label} is required.`}</Text>}
      {errors?.[name]?.type === "pattern" && (
        <Text color={"red.500"}>{patternError || `${label} must be in Japanese.`}</Text>
      )}
    </Column>
  )
}
