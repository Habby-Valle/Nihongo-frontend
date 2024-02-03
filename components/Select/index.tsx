import React from "react"

import { Column, Text } from "native-base"
import { FieldError, UseFormRegister } from "react-hook-form"

import Style from "../../styles/Home.module.css"

interface ISelectProps {
  label: string
  name: string
  register: UseFormRegister<any>
  errors: Record<string, FieldError>
  options: any
}

export default function Select({ label, name, register, errors, options }: ISelectProps) {
  return (
    <Column space={2}>
      <Text
        fontSize="md"
        fontWeight="bold"
      >
        {label}
      </Text>
      <select
        className={Style.inputs}
        {...register(name, { required: true })}
        defaultValue=""
      >
        <option
          value=""
          disabled
          hidden
        >
          Level
        </option>
        {options.map((option: any) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      {errors?.[name]?.type === "required" && <Text color={"red.500"}>{`${label} is required.`}</Text>}
    </Column>
  )
}
