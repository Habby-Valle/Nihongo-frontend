import React from 'react'
import { Column, Divider, Text } from 'native-base'
import KanjiReading from '../KanjiReading'
import KanjiExample from '../KanjiExample'
import KanjiImage from '../KanjiImage'
import VideoKanji from '../VideoKanji'
import MessageDefault from '../MessageDefault'
import { IExample } from '../KanjiExample'

interface IDictionaryKanji {
    results: any
}

export default function DictionaryKanji({ results }: IDictionaryKanji) {
    return (
        <Column flex={1} space="10px" width="100%" p="5px">
            { results ? (
                <>
                    <Text
                        fontSize={"20px"}
                    >
                        Significado
                    </Text>
                    <Text
                        fontSize={"18px"}
                    >
                        {(results as any)?.kanji?.meaning?.english}
                    </Text>
                    <Divider />
                    <KanjiReading reading={(results as any)?.kanji?.onyomi?.katakana} romaji={(results as any)?.kanji?.onyomi.romaji} type={"Onyomi"} />
                    <Divider />
                    <KanjiReading reading={(results as any)?.kanji?.kunyomi?.hiragana} romaji={(results as any)?.kanji?.kunyomi?.romaji} type={"Kunyomi"} />
                    <Divider />
                    <Text
                        fontSize={"20px"}
                    >
                        Exemplos
                    </Text>
                    { (results as any)?.examples?.map((example: IExample, index: number) => (
                        <KanjiExample 
                            key={index}
                            japanese={example.japanese} 
                            meaning={{ english: example.meaning.english }}
                            audio={{ mp3: example.audio.mp3 }}
                        />
                    ))}
                    <Divider />
                    <KanjiImage urls={(results as any)?.kanji?.strokes?.images} />
                    <Divider />
                    <VideoKanji url={(results as any)?.kanji?.video?.mp4} />
                </>
            ): (
                <MessageDefault message={" Pesquise um kanji para ver mais informações"} />
            )}
        </Column>
    )
}