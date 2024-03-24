import React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { Column, Text } from "native-base"
import { useGrammarByLevel } from "../../../utils/api/statistic"

export default function GrammarByLevelChart() {
    const { data: grammarByLevel } = useGrammarByLevel()
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
            <Text fontSize="xl" textAlign="left">Gramática por nível</Text>
            <BarChart
                width={600}
                height={400}
                data={grammarByLevel}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="level_name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="grammars_count" fill="#8884d8" />
            </BarChart>
        </Column>

    )
}