import React, { useState } from 'react';
import axios from 'axios';

import {
    Box, 
    Column, 
    Row, 
    Pressable, 
} from "native-base"

import { GetServerSidePropsContext } from "next"
import { BaseLayout } from "../../components/home/BaseLayout"
import { redirectIfNoCredentials } from "../../utils"
import { Input } from 'native-base';
import { MdSearch, MdChangeCircle } from 'react-icons/md';
import DictionaryKanji from '../../components/dictionary/DictionaryKanji';
import DictionaryWord from '../../components/dictionary/DictionaryWord';

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
    return redirectIfNoCredentials({ req, res })
}

export default function Dictionary() {
    const [search, setSearch] = useState("")
    const [results, setResults] = useState(null)    
    const [isCurrentComponent, setCurrentComponent] = useState(true)
    
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

    const getCurrentComponent = () => {
        if (isCurrentComponent) {
            return <DictionaryKanji results={results} />;
        } else {
            return <DictionaryWord search={search} />;
        }
    }
    return (
        <BaseLayout title="Dicionário">
            <Column
                justifyContent={"center"}
                alignItems={"center"}
                w={"100%"}
                flex={2}
            >
                <Row
                    width={"100%"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Input
                        variant="filled"
                        placeholder="Pesquisar"
                        fontSize={"18px"}
                        value={search}
                        onChangeText={setSearch}
                        w={"90%"}
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
                    <Pressable
                        onPress={() => {
                            setSearch("");
                            setCurrentComponent(!isCurrentComponent);
                        }}
                        _light={{
                            bg: "white",
                        }}
                        _dark={{
                            bg: "#262626",
                        }}
                        _pressed={{
                            opacity: 0.5
                        }}
                        p={"10px"}
                        borderRadius={10}
                    >
                        <MdChangeCircle size={20} color="#D02C23" />
                    </Pressable>
                </Row>
                {getCurrentComponent()}
            </Column>
        </BaseLayout>
    )
}