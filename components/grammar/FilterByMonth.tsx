import React, { useMemo, useState } from "react"

import { Select } from "native-base"
import { MdAdd } from "react-icons/md"

import { useGrammars } from "../../utils/api/grammar"

export interface IGrammarFilterMonth {
  year: number
  month: number
  description: string
}

interface IFilterMonthProps {
  onMonthSelected?: (selectedMonth: IGrammarFilterMonth | null) => void
}

export default function FilterByMonth(props: IFilterMonthProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>()
  const { data: grammars, error: grammarsError, isLoading: grammarsIsLoading } = useGrammars()

  const uniqueMonth = useMemo(
    () =>
      grammars?.reduce((months: IGrammarFilterMonth[], grammar) => {
        const createdAt = new Date(grammar.created_at)
        const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(createdAt)
        const monthNumber = createdAt.getMonth() + 1
        const month = monthNumber.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })
        const year = createdAt.getFullYear()
        const description = `${month} - ${monthName.charAt(0).toUpperCase() + monthName.slice(1)}/${year}`

        if (months.filter((m) => m.description === description).length === 0) {
          months.push({
            description,
            month: monthNumber,
            year,
          })
        }

        return months
      }, []),
    [grammars],
  )

  function handleSelectMonth(monthDescription: string) {
    setSelectedMonth(monthDescription)

    const selectedMonth =
      monthDescription === ""
        ? null
        : uniqueMonth
          ? uniqueMonth.find((m) => m.description === monthDescription) ?? null
          : null

    if (props.onMonthSelected !== undefined) {
      props.onMonthSelected(selectedMonth)
    }
  }

  return (
    <Select
      isDisabled={!grammars || grammarsError !== undefined || grammarsIsLoading}
      size={"md"}
      shadow={1}
      _light={{
        bg: "white",
      }}
      _dark={{
        bg: "#262626",
      }}
      selectedValue={selectedMonth}
      minWidth={200}
      accessibilityLabel="Escolha um mês"
      placeholder="Escolha um mês"
      onValueChange={handleSelectMonth}
      _selectedItem={{
        bg: "cyan.600",
        endIcon: <MdAdd size={5} />,
      }}
      mt={1}
      w={"200px"}
    >
      <Select.Item
        label="Mês"
        value="month"
      />
      {uniqueMonth?.sort().map((month, index) => (
        <Select.Item
          label={month.description}
          value={month.description}
          key={index}
        />
      )) ?? []}
    </Select>
  )
}
