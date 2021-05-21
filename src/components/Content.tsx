import {MovieCard} from "./MovieCard";
import {useEffect, useState} from "react";
import {api} from "../services/api";
import {MovieProps} from "../models";
import {useGenres} from "../hooks/useGenres";


export function Content() {
    const [movies, setMovies] = useState<MovieProps[]>([]);
    const {selectedGenreId,} = useGenres();

    useEffect(() => {
        api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
            setMovies(response.data);
        });
    }, [selectedGenreId]);

    return (
        <div className="wrapper">
            <div className="content">
                <main>
                    <div className="movies-list">
                        {movies.map(movie => (
                            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster}
                                       runtime={movie.Runtime} rating={movie.Ratings[0].Value}/>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}