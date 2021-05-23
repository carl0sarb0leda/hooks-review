import React, { useRef, useCallback } from 'react';

interface SearchProps {
    setSearch: (value: string) => void,
}

export const Search = ({ setSearch }: SearchProps) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (inputRef.current?.value) {
            setSearch(inputRef.current.value)
        }
    }, [setSearch])

    return (
        <div>
            <input ref={inputRef} onChange={handleOnChange} />
        </div>
    );
}