import React from 'react';
import Main from "./Pages/MainPage/Main";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./Pages/RegistrationPage/Signin/SignInPage";
import SignUpPage from "./Pages/RegistrationPage/Signup/SignUpPage";
import Books from "./Pages/BooksPage/Books";
import CreateChallenge from "./Pages/CreateChallengePage/CreateChallenge";
import BookPage from "./Pages/BooksPage/BookPage/BookPage";
import NoFoundPage from "./Pages/404/404";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import EditProfilePage from "./Pages/ProfilePage/EditProfilePage/EditProfilePage";
import MyBooksPage from "./Pages/MyBooksPage/MyBooksPage";
import SavedBooksPage from "./Pages/SavedBooksPage/SavedBooksPage";
import MessagesPage from "./Pages/MessagesPage/MessagesPage";
import useAlan from "./hooks/useAlan";
import PostsPage from "./Pages/PostsPage/PostsPage";
import ChallengesPage from "./Pages/ChallengesPage/ChallengesPage";
import PostPage from "./Pages/PostsPage/PostPage/PostPage";
import CreatePost from "./Pages/CreatePostPage/CreatePost";
import FollowersPage from "./Pages/FriendsPage/FollowersPage/FollowersPage";
import CreateBookPost from "./Pages/CreateBookPage/CreateBookPost";
import FollowingsPage from "./Pages/FriendsPage/FollowingsPage/FollowingsPage";
import ChallengePage from "./Pages/ChallengesPage/ChallengePage/ChallengePage";
import CreateReadingBook from "./Pages/CreateReadingBookPage/CreateReadingBook";
import SavedPostsPage from "./Pages/SavedPostsPage/SavedPostsPage";
import MyPostsPage from "./Pages/MyPostsPage/MyPostsPage";
import MyChallengesPage from "./Pages/MyChallengesPage/MyChallengesPage";

function App() {
    useAlan()
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path={'sign-in'} element={<SignInPage/>}/>
            <Route path={'sign-up'} element={<SignUpPage/>}/>
            <Route path={'books'} element={<Books/>}/>
            <Route path='books/:id' element={<BookPage/>}/>
            <Route path={'create-post'} element={<CreateBookPost/>}/>
            <Route path={'edit-post/:id'} element={<CreateBookPost/>}/>
            <Route path={'profile-page'} element={<ProfilePage/>}/>
            <Route path={'profile-page/profile-edit'} element={<EditProfilePage/>}/>
            <Route path={'profile-page/my-books'} element={<MyBooksPage/>}/>
            <Route path={'saved-books'} element={<SavedBooksPage/>}/>
            <Route path={'messages-page'} element={<MessagesPage/>}/>
            <Route path={'posts'} element={<PostsPage/>}/>
            <Route path={'create-post-post'} element={<CreatePost/>}/>
            <Route path={'posts/:id'} element={<PostPage/>}/>
            <Route path={'saved-posts'} element={<SavedPostsPage/>}/>
            <Route path={'profile-page/my-posts'} element={<MyPostsPage/>}/>
            <Route path={'challenges'} element={<ChallengesPage/>}/>
            <Route path={'my-created-challenges'} element={<MyChallengesPage/>}/>
            <Route path={'challenges-in'} element={<MyChallengesPage/>}/>
            <Route path={'challenges/:id'} element={<ChallengePage/>}/>
            <Route path={'create-challenge'} element={<CreateChallenge/>}/>
            <Route path={'followers'} element={<FollowersPage/>}/>
            <Route path={'followings'} element={<FollowingsPage/>}/>
            <Route path={'profile-page/edit-reading-book'} element={<CreateReadingBook/>}/>
            <Route path={"*"} element={<NoFoundPage/>}/>
        </Routes>
    );
}

export default App;
