import React, {lazy, Suspense} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom";
import useAlan from "./hooks/useAlan";

import Loader from "./Pages/Components/Loader/Loader";
const Main = lazy(() => import("./Pages/MainPage/Main"))
const SignInPage = lazy(() => import("./Pages/RegistrationPage/Signin/SignInPage"));
const SignUpPage = lazy(() => import("./Pages/RegistrationPage/Signup/SignUpPage"));
const Books = lazy(() => import("./Pages/BooksPage/Books"));
const CreateChallenge = lazy(() => import("./Pages/CreateChallengePage/CreateChallenge"));
const BookPage = lazy(() => import("./Pages/BooksPage/BookPage/BookPage"));
const NoFoundPage = lazy(() => import("./Pages/404/404"));
const ProfilePage = lazy(() => import("./Pages/ProfilePage/ProfilePage"));
const EditProfilePage = lazy(() => import("./Pages/ProfilePage/EditProfilePage/EditProfilePage"));
const MyBooksPage = lazy(() => import("./Pages/MyBooksPage/MyBooksPage"));
const SavedBooksPage = lazy(() => import("./Pages/SavedBooksPage/SavedBooksPage"));
const MessagesPage = lazy(() => import("./Pages/MessagesPage/MessagesPage"));
const PostsPage = lazy(() => import("./Pages/PostsPage/PostsPage"));
const ChallengesPage = lazy(() => import("./Pages/ChallengesPage/ChallengesPage"));
const PostPage = lazy(() => import("./Pages/PostsPage/PostPage/PostPage"));
const CreatePost = lazy(() => import("./Pages/CreatePostPage/CreatePost"));
const FollowersPage = lazy(() => import("./Pages/FriendsPage/FollowersPage/FollowersPage"));
const CreateBookPost = lazy(() => import("./Pages/CreateBookPage/CreateBookPost"));
const FollowingsPage = lazy(() => import("./Pages/FriendsPage/FollowingsPage/FollowingsPage"));
const ChallengePage = lazy(() => import("./Pages/ChallengesPage/ChallengePage/ChallengePage"));
const CreateReadingBook = lazy(() => import("./Pages/CreateReadingBookPage/CreateReadingBook"));
const SavedPostsPage = lazy(() => import("./Pages/SavedPostsPage/SavedPostsPage"));
const MyPostsPage = lazy(() => import("./Pages/MyPostsPage/MyPostsPage"));
const MyChallengesPage = lazy(() => import("./Pages/MyChallengesPage/MyChallengesPage"));
const UserProfilePage = lazy(() => import("./Pages/UserProfilePage/UserProfilePage"));

function App() {
    useAlan()
    return (
        <Suspense fallback={<Loader />}>
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
                <Route path={'user-profile-page/:id'} element={<UserProfilePage/>}/>
                <Route path={"*"} element={<NoFoundPage/>}/>
            </Routes>
        </Suspense>
    );
}

export default App;
