import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { Column, Text } from "native-base"
import { useWordByCategory } from "../../../utils/api/statistic";

export default function WordByCategoriesChart() {
    const { data: wordsByCategory } = useWordByCategory()
    return (
        <Column
            borderWidth={1}
            px={"5px"}
            _light={{
                bg: "white",
            }}
            _dark={{
                bg: "#262626",
            }}
            borderRadius={10}
        >
            <Text fontSize="xl" textAlign="left">Palavras por categoria</Text>
            <BarChart
                width={1026}
                height={400}
                data={wordsByCategory}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category_name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="words_count" fill="#8884d8" />
            </BarChart>
        </Column>

    )
}