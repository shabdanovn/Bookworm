import React, {useEffect, useState} from 'react';
import './PostPage.scss'
import MainLayout from "../../Components/MainLayout/MainLayout";
import cn from "classnames";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import {API_URL} from "../../../utils/constants";
import savedLogo from "../../../images/saved.svg";
import boy from "../../../images/boy.jpg";
import saveLogo from "../../../images/save.svg";
import {useTranslation} from "react-i18next";
import H2 from "../../Components/H2/H2";
import H3 from "../../Components/H3/H3";
import {useTheme} from "../../../hooks/useTheme";
import {PostType} from "../../../types/posts";
import {useGeneralContext} from "../../../hooks/useGeneralContext";
import PostComments from "./PostComments/PostComments";

const post:PostType = {
    img: '',
    id: 1,
    userId: 1,
    description: 'The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn\'t distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.',
    username: 'Shabdanov Nurs'
}

const PostPage = () => {
    const {id} = useParams()
    const {t} = useTranslation()
    const {isDark} = useTheme()
    const navigate = useNavigate()
    const {showComments, setShowComments, setBookId} = useGeneralContext()
    const [isSaved, setIsSaved] = useState<boolean>(false)

    useEffect(() => {
        setShowComments(false)
    }, []);

    const commentsClick = () => setShowComments(!showComments)

    if(showComments) window.scrollTo(0, document.body.scrollHeight+50)
    else window.scrollTo(0,0)

    return (
        <MainLayout>
            <div className={cn('post-page', {dark: isDark})}>
                <H3 onClick={() => navigate(`/friend/${post.userId}`)} text={post.username}/>
                <div className={cn('post-page__content')}>
                    <div className={cn('post-img-action-group')}>
                        {/*<img src={book.book && book.book.img ? `${API_URL}/${book.book.img}` : bookLogo} alt={'Book image'}/>*/}
                        <img className={cn('post-image')} src={post.img ? post.img : boy}/>
                        <div className={cn('buttons')}>
                            <button onClick={commentsClick}>{t('book-page.comments')}</button>
                            <div>
                                <img src={isSaved ? savedLogo : saveLogo} alt={'Save logo'}/>
                            </div>
                        </div>
                    </div>
                    <div className={cn('book-descr')}>
                        <p className={cn('descr-title')}>Post</p>
                        <p>{post.description}</p>
                    </div>
                </div>
            </div>
            {showComments && <PostComments postId={id ? +id: 1} />}
        </MainLayout>
    )
};

export default PostPage;
