import React from "react"

import { Select } from "native-base"

import { useCategories } from "../../utils/api/category"
import { useWords } from "../../utils/api/vocabulary"

interface IFilterByCategoryProps {
  onCategorySelected?: (selectedCategory: string | null) => void
}

export default function FilterByCategory(props: IFilterByCategoryProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>()

  const { data: categories, error: categoriesError, isLoading: categoriesIsLoading } = useCategories()

  const { data: words, error: wordsError, isLoading: wordsIsLoading } = useWords()

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category)

    const selectedCategory = category === "category" ? null : category

    if (props.onCategorySelected !== undefined) {
      props.onCategorySelected(selectedCategory)
    }
  }

  return (
    <Select
      isDisabled={
        !categories ||
        categoriesError !== undefined ||
        categoriesIsLoading ||
        !words ||
        wordsError !== undefined ||
        wordsIsLoading
      }
      size={"md"}
      _light={{
        bg: "white",
      }}
      _dark={{
        bg: "#262626",
      }}
      selectedValue={selectedCategory}
      onValueChange={handleSelectCategory}
      minWidth={200}
      shadow={1}
      accessibilityLabel="Select category"
      placeholder="Select category"
      mt={1}
      w={"200px"}
      _selectedItem={{
        w: "20%",
      }}
    >
      <Select.Item
        label="Category"
        value="category"
      />
      {categories?.map((category, index) => (
        <Select.Item
          label={category.name}
          value={category.name}
          key={index}
        />
      )) ?? []}
    </Select>
  )
}
