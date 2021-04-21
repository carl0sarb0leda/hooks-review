import React, { useEffect, useState, useCallback } from 'react';

type CharacterData = {
    id: number
    name: string
    status: string
}

type InfoData = {
    count: number
    next: string
    pages: number
    prev: string
}

type JSONResponse = {
    results: Array<CharacterData>
    info?: InfoData
}

export const Characters = () => {
    const [characters, setCharacters] = useState<Array<CharacterData>>([])
    const [info, setInfo] = useState<InfoData>()

    //Fetching usinf async-await
    const fetchCharacteres = useCallback(async () => {
        const response = await window.fetch('https://rickandmortyapi.com/api/character')
        const { results, info }: JSONResponse = await response.json()
        if (response.ok) {
            setCharacters(results)
            setInfo(info)
        } else {
            const error = new Error('Server error')
            return Promise.reject(error)
        }
    }, [])

    useEffect(() => {
        fetchCharacteres()
    }, [fetchCharacteres])

    return (
        <div>
            <h3>{info?.count}</h3>
            {!characters?.length ? 'Loading...' :
                characters.map((character: CharacterData, index) => (
                    <h2 key={index}>
                        {`${character.name}-${character.status}`}
                    </h2>
                ))}
        </div>
    );
}