import {GenreType} from "../../../types/books";

interface IGenresList{
    genres: GenreType[]
    setGenresList: (arr:any)=> void
    t?: any
}

export const GenresList = ({genres, setGenresList, t}:IGenresList)=>{
    let value = ''
    let label = ''
    const newArr = genres.map((genre:GenreType) => {
        value = t(`genres.${genre.name}`)
        label = t(`genres.${genre.name}`)
        return {value, label}
    })
    setGenresList([{value: t(`genres.All`), label: t(`genres.All`)}, ...newArr])
}