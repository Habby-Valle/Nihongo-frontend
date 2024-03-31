import React from 'react';
import { useResults } from '../../../utils/api/dictionary';
import Error from '../../Error';
import MessageDefault from '../MessageDefault';
import { Column } from 'native-base';

export default function DictionaryWord({ search }: { search: string}) {
    const {
        data: resultsData,
        error: resultsError,
        isLoading: resultsIsLoading,
    } = useResults(search)

    // if (resultsError){
    //     return <Error message={resultsError.message} />
    // }
    return (
        <Column flex={1} space="10px" width="100%" p="5px">
            <MessageDefault message={"Pesquise por palavras em japonês e inglês(A versão em português ainda está em desenvolvimento)"} />
        </Column>
    )
}