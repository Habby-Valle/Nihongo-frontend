import React from 'react'
import { Column, Text } from 'native-base'

export default function MessageDefault({ message }: { message: string }) {
    return (
        <Column
            padding={5}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Text
                fontSize={"20px"}
            >
                { message }
            </Text>
        </Column>
    )
}