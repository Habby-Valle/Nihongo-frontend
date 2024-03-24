import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { Column, Text } from "native-base";
import { useWordByLevel } from "../../../utils/api/statistic";

const COLORS = ['#3375af', '#0c7a66', '#13e96c', '#ff7c24', '#ff2e63', '#ff2ea8'];

export default function WordByLevelChart() {
    const { data: wordsByLevel } = useWordByLevel();

    const data = wordsByLevel?.map(item => ({
        name: item.level_name,
        value: item.words_count
    }));

    return (
        <Column
            borderWidth={1}
            borderRadius={10}
            px={"5px"}
            _light={{
                bg: "white",
            }}
            _dark={{
                bg: "#262626",
            }}
        >
            <Text fontSize="xl" textAlign="left">Palavras por nível</Text>
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </Column>
    );
}
