import React from "react";
import { Column, Text } from "native-base";

interface IKanjiReading {
    reading: string
    romaji: string
    type: string
}

export default function KanjiReading({reading, romaji, type}:IKanjiReading) {
    return (
        <Column space="10px">
            <Text
                fontSize={"20px"}
            >
                {type}
            </Text>
            <Text
                fontSize={"18px"}
            >
                {reading} - {romaji}
            </Text>
        </Column>
    )
}