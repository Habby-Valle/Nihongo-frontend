import React from "react";
import { Box, Column, Text } from "native-base";

interface IKanjiVideo {
    url: string
}

export default function VideoKanji({ url }: IKanjiVideo) {
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