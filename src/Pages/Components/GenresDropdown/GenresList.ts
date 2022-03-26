import {GenreType} from "../../../types/books";

interface IGenresList{
    genres: GenreType[]
    setGenresList: (arr:any)=> void
}

export const GenresList = ({genres, setGenresList}:IGenresList)=>{
    let value = ''
    let label = ''
    const newArr = genres.map((genre:GenreType) => {
        value = genre.name
        label = genre.name
        return {value, label}
    })
    setGenresList([{value: "---", label: "---"}, ...newArr])
}