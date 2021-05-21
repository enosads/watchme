import {Button} from "./Button";
import {useGenres} from "../hooks/useGenres";


export function SideBar() {
    const {setSelectedGenreId, genres, selectedGenreId} = useGenres();

    function handleClickButton(id: number) {
        setSelectedGenreId(id);
    }

    return (
        <nav className="sidebar">
            <span>Watch<p>Me</p></span>

            <div className="buttons-container">
                {genres.map(genre => (
                    <Button
                        key={String(genre.id)}
                        title={genre.title}
                        iconName={genre.name}
                        onClick={() => handleClickButton(genre.id)}
                        selected={selectedGenreId === genre.id}
                    />
                ))}
            </div>

        </nav>
    );
}