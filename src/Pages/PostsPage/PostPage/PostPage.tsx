import React, {MouseEvent, useEffect, useRef, useState} from 'react';
import './PostPage.scss'
import MainLayout from "../../Components/MainLayout/MainLayout";
import cn from "classnames";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import {API_URL} from "../../../utils/constants";
import savedLogo from "../../../images/saved.svg";
import avatar from "../../../images/avatar.svg";
import saveLogo from "../../../images/save.svg";
import {useTranslation} from "react-i18next";
import H3 from "../../Components/H3/H3";
import {useTheme} from "../../../hooks/useTheme";
import {PostType} from "../../../types/posts";
import {useGeneralContext} from "../../../hooks/useGeneralContext";
import PostComments from "./PostComments/PostComments";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getPost, getSavedPosts, removeSavedPost, savePost} from "../../../redux/slices/posts.slice";
import NotAuthedModal from "../../Components/ModalWindows/NotAuthedModal/NotAuthedModal";
import useModal from "../../../hooks/useModal";
import {toast, ToastContainer} from "react-toastify";

const PostPage = () => {
    const {id} = useParams()
    const {t} = useTranslation()
    const {isDark} = useTheme()
    const navigate = useNavigate()
    const {showComments, setShowComments} = useGeneralContext()
    const {setModalContent, open, close} = useModal()
    const {isLoading, post: postInfo, savedPosts} = useAppSelector(state => state.posts)
    const {isLoggedIn, user} = useAppSelector(state => state.auth)
    const [isSaved, setIsSaved] = useState<boolean>(false)
    const [post, setPost] = useState<PostType>(postInfo)
    const commentsRef = useRef<null | HTMLDivElement>(null)
    const dispatch = useAppDispatch()

    useEffect(() => {
        setShowComments(false)
        if(id) dispatch(getPost(+id))
        if(savedPosts.length === 0 && user) dispatch(getSavedPosts(user.id))
        if(id && savedPosts.find(item => item.id === +id))
            setIsSaved(true)
    }, []);

    useEffect(() => {
        setPost(postInfo)
    }, [postInfo]);

    useEffect(() => {
        if(id && savedPosts.find(item => item.id === +id))
            setIsSaved(true)
    }, [savedPosts]);

    const commentsClick = () => setShowComments(!showComments)

    if(showComments) commentsRef.current?.scrollIntoView({behavior: "smooth"})
    else window.scrollTo(0,0)

    const saveHandle = (e: MouseEvent<HTMLImageElement>) => {
        if(!isLoggedIn) {
            setModalContent(<NotAuthedModal close={close}/>)
            open()
        }else {
            if(id){
                if(isSaved) {
                    dispatch(removeSavedPost({userId: user.id, postId: +id}))
                    setIsSaved(false)
                    toast('📰 Post is unsaved!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                else {
                    dispatch(savePost({userId: user.id, postId: +id}))
                    setIsSaved(true)
                    toast('📰 Post is saved!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }
        }
    }

    return (
        <MainLayout>
            <div className={cn('post-page', {dark: isDark})}>
                {/*{isLoading*/}
                {/*    ? <Loader />*/}
                {/*    : <>*/}
                        <H3 onClick={() => navigate(`/friend/${post.userId}`)} text={post.user?.username || "---"}/>
                        <div className={cn('post-page__content')}>
                            <div className={cn('post-img-action-group')}>
                                <img className={cn('post-image')} src={post.img ? `${API_URL}/${post.img}` : avatar} alt={'Post image'}/>
                                <div className={cn('buttons')}>
                                    <button onClick={commentsClick}>{t('book-page.comments')}</button>
                                    <div onClick={saveHandle}>
                                        <img src={isSaved ? savedLogo : saveLogo} alt={'Save logo'}/>
                                    </div>
                                </div>
                            </div>
                            <div className={cn('book-descr')}>
                                <p className={cn('descr-title')}>Post</p>
                                <p>{post.description}</p>
                            </div>
                        </div>
                {/*    </>*/}
                {/*}*/}
                <ToastContainer/>
            </div>
            {showComments && <PostComments  postId={post.id} ref={commentsRef}/>}
        </MainLayout>
    )
};

export default PostPage;
