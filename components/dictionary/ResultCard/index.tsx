import React from 'react';
import { IResultsList } from '../../../utils/api/dictionary'
import { Row, Column, Text } from 'native-base';

interface IResultCard {
    item: IResultsList
}

export default function ResultCard({ item }: IResultCard){
    return (
        <Column w={"100%"} py={"5px"}>
            <Row>
                <Text 
                    fontSize={"20px"}
                    fontWeight={700}
                >
                    {item.term} {item.reading !== "" ? `- ${item.reading}`: '' }
                </Text>
            </Row>
            <Row>
                <Text>{item.classification}</Text>
            </Row>
            <Row>
                <Text
                    fontSize={"15px"}
                    fontWeight={500}
                >
                    {item.translates.join(', ')}
                </Text>
            </Row>
        </Column>
    )
}