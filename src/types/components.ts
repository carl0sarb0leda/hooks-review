export type CharacterData = {
    id: number
    name: string
    status: string
}
export type InfoData = {
    count: number
    next: string
    pages: number
    prev: string
}
export type JSONResponse = {
    results: Array<CharacterData>
    info?: InfoData
}
export type Action = {
    type: 'ADD_FAVOURITE'
    payload: CharacterData
}
export type State = {
    favourites: Array<CharacterData>
}
