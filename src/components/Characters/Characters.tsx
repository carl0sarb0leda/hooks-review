import React, { useReducer, useState, useMemo } from 'react';
import generalService from 'api/general/generalService';
import { useAsyncFetch } from 'components/Hooks/useAsyncFetch';
import { Search } from 'components';
import { State, Action, CharacterData } from 'types/components';


const favouriteReducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'ADD_FAVOURITE':
            return {
                ...state,
                favourites: [...state.favourites, action.payload]
            }
        default:
            return state
    }
}

export const Characters = () => {
    // const [characters, setCharacters] = useState<Array<CharacterData>>([])
    // const [info, setInfo] = useState<InfoData>()

    const [items, dispatch] = useReducer(favouriteReducer, {
        favourites: []
    })
    const [search, setSearch] = useState<string>('')

    //Fetching using axios
    const {
        error: getCharactersError,
        value: getCharactersValue,
        ...getCharacters
    } = useAsyncFetch(generalService.getCharacters)

    //Functions
    const filteredValues = useMemo(() => {
        let filteredCharacters = getCharactersValue?.results.filter(
            (character: CharacterData) => {
                return character.name.toLowerCase().includes(search.toLowerCase())
            }
        )
        return filteredCharacters
    }, [getCharactersValue, search])

    // Handlers
    const handleOnClick = (favourite: CharacterData) => {
        dispatch({
            type: 'ADD_FAVOURITE',
            payload: favourite
        })
    }

    // useEffect(() => {
    //Fetching using async-await
    // const fetchCharacters = async () => {
    //     const response = await window.fetch('https://rickandmortyapi.com/api/character')
    //     const { results, info }: JSONResponse = await response.json()
    //     if (response.ok) {
    //         setCharacters(results)
    //         setInfo(info)
    //     } else {
    //         const error = new Error('Server error')
    //         return Promise.reject(error)
    //     }
    // }
    // fetchCharacters()

    // }, [])

    const Characters = () => {
        if (getCharacters.isLoading) {
            return <div>'Loading...'</div>
        }
        if (getCharacters.isRejected) {
            return <pre>{getCharactersError}</pre>
        }
        if (getCharacters.isResolved) {
            return (
                <>
                    <h3>{getCharactersValue.info.count}🦖</h3>
                    {filteredValues.map((character: CharacterData) => (
                        <div key={character.id} >
                            <h2>
                                {`${character.name}-${character.status}`}
                            </h2>
                            <button onClick={() => handleOnClick(character)}>
                                Add to Favourites
                        </button>
                        </div>
                    ))}
                </>
            )
        }
        return null
    }
    return (
        <div>
            {items.favourites.map((favourite: CharacterData) => (
                <li key={favourite.id}>
                    {favourite.name}
                </li>
            ))}
            <Search setSearch={setSearch} />
            <Characters />
            {/* {!characters?.length ? 'Loading...' :
                characters.map((character: CharacterData) => (
                    <div key={character.id} >
                        <h2>
                            {`${character.name}-${character.status}`}
                        </h2>
                        <button onClick={() => handleOnClick(character)}>
                            Add to Favourites
                        </button>
                    </div>
                ))} */}
        </div>
    );
}