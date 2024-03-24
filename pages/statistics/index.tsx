import React from "react"

import { Column, Row } from "native-base"
import { GetServerSidePropsContext } from "next"

import { BaseLayout } from "../../components/home/BaseLayout"
import { redirectIfNoCredentials } from "../../utils"
import WordByLevelChart from "../../components/statistics/WordByLevelChart"
import GrammarByLevelChart from "../../components/statistics/GrammarByLevelChart"
import WordByCategoriesChart from "../../components/statistics/WordByCategoriesChart"

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
    return redirectIfNoCredentials({ req, res })
}

export default function Statistics() {
    return (
        <BaseLayout title="Estatistícas">
            <Column
                justifyContent={"center"}
                alignItems={"center"}
                w={"100%"}
                flex={2}
                space={4}
            >
                <Row 
                    justifyContent={"center"} 
                    alignItems={"flex-end"}
                    space={4}
                >
                    <WordByLevelChart />
                    <GrammarByLevelChart />
                </Row>
                <Row 
                    justifyContent={"center"} 
                    alignItems={"flex-end"}
                    space={4}
                >
                    <WordByCategoriesChart />
                </Row>
            </Column>
        </BaseLayout>
    )
}