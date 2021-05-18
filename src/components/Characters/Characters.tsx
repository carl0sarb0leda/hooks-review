import React, { useReducer } from 'react';
import generalService from 'api/general/generalService';
import { useAsyncFetch } from 'components/Hooks/useAsyncFetch';

type CharacterData = {
    id: number
    name: string
    status: string
}

// type InfoData = {
//     count: number
//     next: string
//     pages: number
//     prev: string
// }

// type JSONResponse = {
//     results: Array<CharacterData>
//     info?: InfoData
// }

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
    // const [characters, setCharacters] = useState<Array<CharacterData>>([])
    // const [info, setInfo] = useState<InfoData>()
    const [items, dispatch] = useReducer(favouriteReducer, initialState)

    //Fetching using axios
    const getCharacters = useAsyncFetch(generalService.getCharacters)

    // Handlers

    const handleOnClick = (favourite: CharacterData) => {
        dispatch({
            type: 'ADD_TO_FAVOURITE',
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
            return <pre>{getCharacters.error}</pre>
        }
        if (getCharacters.isResolved) {
            return (
                <>
                    <h3>{getCharacters.value.info.count}🤓</h3>
                    {getCharacters.value.results.map((character: CharacterData) => (
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