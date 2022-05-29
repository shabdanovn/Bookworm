import React, {SyntheticEvent, useEffect, useState} from 'react';
import MainLayout from "../Components/MainLayout/MainLayout";
import cn from "classnames";
import './Books.scss'
import BookItem from "../Components/BookItem/BookItem";
import Searchbar from "../Components/Searchbar/Searchbar";
import BooksList from "../Components/BooksList/BooksList";
import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {getAllBooks, getSavedBooks} from "../../redux/slices/books.slice";
import {BookType} from "../../types/books";
import GenresDropdown from "../Components/GenresDropdown/GenresDropdown";
import Loader from "../Components/Loader/Loader";
import {useTheme} from "../../hooks/useTheme";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import adabiyat from '../../images/adabiyat.png'
import adabiyat1 from '../../images/adabiyat1.jpg'
import manas from '../../images/manas.jpg'
import physics from '../../images/physics.png'
import teacher from '../../images/teacher.jpg'
import jomoktor from '../../images/jomoktor.jpg'
import history from '../../images/history.jpg'
import sword from '../../images/sword.jpg'


const kyrgyzBooks: BookType[] = [
    {id: 30, title: 'Кыргыз эл жомоктору', author: "Мурат Темирбеков",
        conditions: "Free", cost: '', state: '8', notes: "Жаны алынган китеп, кайрадан сатып атам",
        image: jomoktor,
        user: {
            username: 'shabdanovn',
            phone: '0700100101',
            city: {
                id: 1,
                name: 'Bishkek'
            }
        },
        genres: [
            {id: 1, name: 'Classic'}
        ]
    },
    {id: 31, title: 'Манас', author: "Мурат Темирбеков",
        conditions: "", cost: '250сом', state: '6', notes: "Жаны алынган китеп, кайрадан сатып атам",
        image: manas,
        user: {
            username: 'shabdanovn',
            phone: '0700100101',
            city: {
                id: 1,
                name: 'Bishkek'
            }
        },
        genres: [
            {id: 1, name: 'Classic'}
        ]
    },
    {id: 32, title: 'Кыргыз адабияты', author: "Мурат Темирбеков",
        conditions: "Free", cost: '', state: '8', notes: "Жаны алынган китеп, кайрадан сатып атам",
        image: adabiyat,
        user: {
            username: 'shabdanovn',
            phone: '0700100101',
            city: {
                id: 1,
                name: 'Bishkek'
            }
        },
        genres: [
            {id: 1, name: 'Education'}
        ]
    },
    {id: 33, title: 'Физика 7 класс', author: "Мурат Темирбеков",
        conditions: "", cost: '200сом', state: '5', notes: "Баламдын китеби, кайрадан сатып атам же алмашам",
        image: physics,
        user: {
            username: 'shabdanovn',
            phone: '0700100101',
            city: {
                id: 1,
                name: 'Bishkek'
            }
        },
        genres: [
            {id: 1, name: 'Education'}
        ]
    },
    {id: 34, title: 'Кыргыз адабияты', author: "Мурат Темирбеков",
        conditions: "", cost: '120сом', state: '8', notes: "Жаны алынган китеп, кайрадан сатып атам",
        image: adabiyat1,
        user: {
            username: 'shabdanovn',
            phone: '0700100101',
            city: {
                id: 1,
                name: 'Bishkek'
            }
        },
        genres: [
            {id: 1, name: 'Education'}
        ]
    },
    {id: 35, title: 'Биринчи мугалим', author: "Чынгыз Айтматов",
        conditions: "Free", cost: '', state: '8', notes: "Жаны алынган китеп, кайрадан сатып атам",
        image: teacher,
        user: {
            username: 'shabdanovn',
            phone: '0700100101',
            city: {
                id: 1,
                name: 'Bishkek'
            }
        },
        genres: [
            {id: 1, name: 'Classic'}
        ]
    },
    {id: 36, title: 'Тарых 6 класс', author: "Чынгыз Тилеков",
        conditions: "", cost: '120сом', state: '8', notes: "Жаны алынган китеп, кайрадан сатып атам",
        image: history,
        user: {
            username: 'shabdanovn',
            phone: '0700100101',
            city: {
                id: 1,
                name: 'Bishkek'
            }
        },
        genres: [
            {id: 1, name: 'Education'}
        ]
    },
    {id: 37, title: 'Сынган кылыч', author: "Тологон Касымбеков",
        conditions: "", cost: '700сом', state: '10', notes: "Жаны алынган китеп, кайрадан сатып атам",
        image: sword,
        user: {
            username: 'shabdanovn',
            phone: '0700100101',
            city: {
                id: 1,
                name: 'Bishkek'
            }
        },
        genres: [
            {id: 1, name: 'Classic'}
        ]
    }
]

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography fontSize='24px'>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



const Books = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const {books:booksList, isLoading} = useAppSelector(state => state.books)
    const {isLoggedIn, user} = useAppSelector(state => state.auth)
    const [books, setBooks] = useState<BookType[]>(booksList)
    const {isDark} = useTheme()

    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        if(booksList.length===0) dispatch(getAllBooks())
        if(isLoggedIn) dispatch(getSavedBooks(user.id))
        console.log('asd')
    },[])

    useEffect(() => {
        setBooks(booksList)
    },[booksList])


    return (
        <MainLayout>
             <div className={cn('books-page')}>
                    <div className={cn('helpers')}>
                        <Searchbar setBooks={setBooks} placeholder={'books.searchbar'}/>
                        <GenresDropdown setBooks={setBooks}/>
                    </div>

                     <Box sx={{ width: '100%' }}>
                         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                             <Tabs value={value} onChange={handleChange}
                                   aria-label="basic tabs example"
                             >
                                 <Tab sx={{fontWeight: '600'}} label={t('books.all-books')} {...a11yProps(0)} />
                                 <Tab sx={{fontWeight: '600'}} label={t('books.kyrgyz-books')} {...a11yProps(1)} />
                             </Tabs>
                         </Box>
                         <TabPanel value={value} index={0}>
                             <div className={cn('bookslist')}>
                                 <BooksList>
                                     {isLoading
                                         ? <Loader/>
                                         : books && books.map(book => {
                                         return <BookItem key={book.id} book={book}/>
                                     })
                                     }
                                 </BooksList>
                                 {books.length===0 &&
                                     <p className={cn('no-found', {dark: isDark})}>{t('books.no-found')}</p>}
                             </div>
                         </TabPanel>
                         <TabPanel value={value} index={1}>
                             <div className={cn('bookslist')}>
                                 <BooksList>
                                     {isLoading
                                         ? <Loader/>
                                         : books && books.filter(book => book.language === 'kyrgyz').map(book => {
                                            return <BookItem key={book.id} book={book}/>
                                         })
                                     }
                                 </BooksList>
                                 {books.length===0 &&
                                     <p className={cn('no-found', {dark: isDark})}>{t('books.no-found')}</p>}
                             </div>
                         </TabPanel>
                     </Box>


                </div>
        </MainLayout>
    );
};

export default Books;
