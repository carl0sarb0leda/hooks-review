import React, { useEffect, useState, useCallback, useReducer } from 'react';

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

const initialState = {
    favourites: []
}

const favouriteReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'ADD_TO_FAVOURITE':
            return {
                ...state,
                favourites: [...state.favourites, action.payload]
            }
        default:
            return state
    }
}

export const Characters = () => {
    const [characters, setCharacters] = useState<Array<CharacterData>>([])
    const [info, setInfo] = useState<InfoData>()
    const [items, dispatch] = useReducer(favouriteReducer, initialState)

    //Fetching using async-await
    const fetchCharacters = useCallback(async () => {
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

    // Handlers

    const handleOnClick = (favourite: CharacterData) => {
        dispatch({
            type: 'ADD_TO_FAVOURITE',
            payload: favourite
        })
    }

    useEffect(() => {
        fetchCharacters()
    }, [fetchCharacters])

    return (
        <div>
            {items.favourites.map((favourite: CharacterData) => (
                <li key={favourite.id}>
                    {favourite.name}
                </li>
            ))}
            <h3>{info?.count}</h3>
            {!characters?.length ? 'Loading...' :
                characters.map((character: CharacterData) => (
                    <div key={character.id} >
                        <h2>
                            {`${character.name}-${character.status}`}
                        </h2>
                        <button onClick={() => handleOnClick(character)}>
                            Add to Favourites
                        </button>
                    </div>
                ))}
        </div>
    );
}