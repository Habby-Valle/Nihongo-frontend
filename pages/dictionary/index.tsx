import React, { useState } from 'react';
import axios from 'axios';

import { Box, Column, Row, Image, Text, Divider} from "native-base"
import { GetServerSidePropsContext } from "next"
import { BaseLayout } from "../../components/home/BaseLayout"
import { redirectIfNoCredentials } from "../../utils"
import { Input } from 'native-base';
import { MdSearch } from 'react-icons/md';

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
    return redirectIfNoCredentials({ req, res })
}

export default function Dictionary() {
    const [search, setSearch] = useState("")
    const [results, setResults] = useState(null)

    const searchWord = async () => {
        const options = {
            method: 'GET',
            url: `https://kanjialive-api.p.rapidapi.com/api/public/kanji/${search}`,
            headers: {
                'X-RapidAPI-Key': '586932d73amshb48bfa47a9cae7ep1b66ebjsn552f0a56a7f3',
                'X-RapidAPI-Host': 'kanjialive-api.p.rapidapi.com'
            }
        }

        try {
            const response = await axios.request(options);
            setResults(response.data);
        } catch (error) {
            console.error(error);
            setResults(null);
        }

    }

    const handleSearch = () => {
        searchWord();
    }
    return (
        <BaseLayout title="Dicionário">
            <Column
                justifyContent={"center"}
                alignItems={"center"}
                w={"100%"}
                flex={2}
            >
                <Input
                    variant="filled"
                    placeholder="Pesquisar"
                    fontSize={"18px"}
                    value={search}
                    onChangeText={setSearch}
                    w={"100%"}
                    _light={{
                        bg: "white",
                    }}
                    _dark={{
                        bg: "#262626",
                    }}
                    InputLeftElement={<Box p={"10px"}>
                        <MdSearch size={20} color="#D02C23" />
                    </Box>}
                    onSubmitEditing={handleSearch}
                />
                <Column flex={1} space="10px">
                    { results && (
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
                            { (results as any)?.examples.map((example: IExample, index: number) => (
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
                    )}
                </Column>
            </Column>
        </BaseLayout>
    )
}


interface IKanjiImages {
    urls: string[]
}

interface IKanjiVideo {
    url: string
}

interface IKanjiReading {
    reading: string
    romaji: string
    type: string
}

interface IExample {
    japanese: string
    meaning: {
        english: string
    }
    audio: {
        mp3: string
    }
}

function KanjiImage({ urls }: IKanjiImages) {
    return (
        <Column space="10px">
            <Text
                fontSize={"20px"}
            >
                Escrita
            </Text>
            <Row space="10px" flexWrap={'wrap'}>
                {urls?.map((url, index) => (
                    <Box
                        borderWidth={1}
                        borderRadius={10}
                        p={5}
                        _light={{
                            bg: "white",
                            borderColor: "#262626",
                        }}
                        _dark={{
                        bg: "#262626",
                        borderColor: "white",
                        }}
                    >
                        <Image
                            key={index}
                            source={{ uri: url }}
                            alt="Kanji"
                            w={"100px"}
                            h={"100px"}
                        />
                    </Box>
                ))}
            </Row>
        </Column>
    );
}

function VideoKanji({ url }: IKanjiVideo) {
    return (
        <Column space="10px">
            <Text
                fontSize={"20px"}
            >
                Vídeo
            </Text>
            <Box
                borderWidth={1}
                borderRadius={10}
                justifyContent={"center"}
                alignItems={"center"}
                p={5}
                _light={{
                    bg: "white",
                    borderColor: "#262626",
                }}
                _dark={{
                    bg: "#262626",
                    borderColor: "white",
                }}
            >
                <video
                    src={url}
                    style={{ width: 1000, height: 200 }}
                    autoPlay={true}
                    loop={true}
                />
            </Box>
        </Column>
    )
}

function KanjiReading({reading, romaji, type}:IKanjiReading) {
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
function KanjiExample({ japanese, meaning, audio}:IExample){
    return (
        <Column
            space="10px"
            borderWidth={1}
            borderRadius={10}
            p={5}
            _light={{
                bg: "white",
                borderColor: "#262626",
            }}
            _dark={{
            bg: "#262626",
            borderColor: "white",
            }}
        >
            <Text
                fontSize={"18px"}
            >
                {japanese}
            </Text>
            <Text
                fontSize={"16px"}
            >
                {meaning.english}
            </Text>

            <audio
                src={audio.mp3}
                controls
            />
            
        </Column>
    )
}