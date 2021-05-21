import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {GenreResponseProps} from '../models'
import {api} from "../services/api";

interface GenresProviderProps {
    children: ReactNode
}

interface GenresContextData {
    setSelectedGenreId: (id: number) => void,
    genres: GenreResponseProps[],
    selectedGenreId: number,
    selectedGenre: GenreResponseProps
}

const GenresContext = createContext<GenresContextData>({} as GenresContextData);

export function GenresProvider(props: GenresProviderProps) {
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
    const [genres, setGenres] = useState<GenreResponseProps[]>([]);
    const [selectedGenreId, setSelectedGenreId] = useState(1);

    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {
            setGenres(response.data);
        });
    }, []);

    useEffect(() => {
        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
            setSelectedGenre(response.data);
        })
    }, [selectedGenreId]);

    return (
        <GenresContext.Provider value={{
            setSelectedGenreId, genres, selectedGenreId, selectedGenre
        }}>
            {props.children}

        </GenresContext.Provider>
    )
}

export function useGenres() {
    return useContext(GenresContext);
}