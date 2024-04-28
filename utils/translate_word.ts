import axios from "axios";

export function translateWord(word: string | string[]) {
    if (typeof word === 'string') {
        return tranlasteApi(word);
    }
    return Promise.all(word.map((w) => tranlasteApi(w)));
}

async function tranlasteApi(word: string) {

    const encodedParams = new URLSearchParams();
    encodedParams.set('from', 'en');
    encodedParams.set('to', 'pt');
    encodedParams.set('text', word);
    
    const options = {
        method: 'POST',
        url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            "X-RapidAPI-Key": `${process.env.NEXT_PUBLIC_RAPIDAPI_KEY}`,
            'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
        },
        data: encodedParams,
    };

    try {
        const response = await axios.request(options);
        return response.data.trans;
    } catch (error) {
        console.error(error);
        return error
    }
}