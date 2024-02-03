import React, { useState } from "react"

import { Box } from "native-base"
import { GetServerSidePropsContext } from "next"

import { BaseLayout } from "../../components/home/BaseLayout"
import SearchVocabulary, { IVocabularyFilters } from "../../components/vocabulary/SearchVocabulary"
import WordList from "../../components/vocabulary/VocabularyList"
import { redirectIfNoCredentials } from "../../utils"

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  return redirectIfNoCredentials({ req, res })
}

export default function Vocabulary() {
  const [filters, setFilters] = useState<IVocabularyFilters>()
  return (
    <BaseLayout title="Vocabulary">
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        w={"100%"}
        flex={2}
      >
        <SearchVocabulary onFiltersChanged={setFilters} />
        <WordList filters={filters} />
      </Box>
    </BaseLayout>
  )
}
