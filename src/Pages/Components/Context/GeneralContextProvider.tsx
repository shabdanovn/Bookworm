import React, {createContext, ReactChild, ReactNode, useMemo, useState} from 'react';

export type GeneralContextType = {
    bookId: number|null;
    setBookId: (id:number) => void
    showComments: boolean;
    setShowComments: (theme: boolean) => void;
}

export const GeneralContext = createContext<GeneralContextType>({
    bookId: null,
    showComments: false,
    setBookId: ()=> console.log('no theme provider for bookId'),
    setShowComments: (theme:boolean)=> console.log('no theme provider')
});

interface GeneralContextProviderProps{
    children: ReactChild | ReactNode
}

const GeneralContextProvider = ({children}:GeneralContextProviderProps) => {
    const [showComments, setShowComments] = useState<boolean>(false)
    const [bookId, setBookId] = useState<number|null>(null)

    const value = useMemo<GeneralContextType>(() => ({
        showComments, setShowComments,
        bookId, setBookId}
        ), [showComments, bookId]);

    return (
        <GeneralContext.Provider value={value}>
            {children}
        </GeneralContext.Provider>
    );
};

export default GeneralContextProvider;
