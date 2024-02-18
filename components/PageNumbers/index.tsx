import React from "react"

import { Button, Row } from "native-base"

type PageNumber = number | "..."

function generatePageNumber(currentPage: number, totalPages: number) {
  const visiblePages = 5
  const pageNumbers: PageNumber[] = [1]
  if (currentPage - visiblePages > 2) {
    pageNumbers.push("...")
  }

  for (
    let i = Math.max(2, currentPage - visiblePages);
    i <= Math.min(totalPages - 1, currentPage + visiblePages);
    i++
  ) {
    pageNumbers.push(i)
  }

  if (currentPage + visiblePages < totalPages - 1) {
    pageNumbers.push("...")
  }

  pageNumbers.push(totalPages)

  return pageNumbers
}

interface IPageNumbersProps {
  totalPages: number
  currentPage: number
  onPageChange?: (newPage: number) => void
}

export default function PageNumbers(props: IPageNumbersProps) {
  const pagesNumbers = generatePageNumber(props.currentPage, props.totalPages)

  const handlePageChange = (selectedPageNumber: PageNumber) => {
    if (selectedPageNumber !== "..." && props.onPageChange !== undefined) {
      props.onPageChange(selectedPageNumber)
    }
  }

  return (
    <Row
      space={2}
      alignSelf={"center"}
    >
      {pagesNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          h={"24px"}
          w={"24px"}
          isDisabled={pageNumber === "..."}
          bg={"#D02C23"}
          _hover={{ bg: "#ae251e" }}
          _pressed={{ bg: "#ae251e" }}
          onPress={() => handlePageChange(pageNumber)}
          isPressed={pageNumber === props.currentPage}
        >
          {pageNumber}
        </Button>
      ))}
    </Row>
  )
}
