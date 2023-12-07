import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePostForm from "../../Post/Form/CreatePostForm";
import Post from "../../Post/Elements/Post";
import { getPosts } from "../../../store/posts";
import { getFriends } from "../../../store/friends";

function FakePosts() {
    console.log("FakePosts Page");

    let posts = JSON.parse(localStorage.getItem("posts"));
    console.log("posts read from local storage");
    console.log(posts);

//
//    const dispatch = useDispatch();
//
//    useEffect(() => {
//        dispatch(getFriends());
//        dispatch(getPosts());
//    }, [dispatch]);



    return (
        <div id="feed">
            <CreatePostForm />
            {posts && user &&
                Object.values(posts)
                    .filter(post => {
                        console.log("post: " + post);
                        console.log("post.id: " + post.id);
                        return (
//                            Object.keys(friends).includes(String(post.user_id)) ||
                            post.user_id === user.id
                        );
                    })
                    .sort((a, b) => {
                        return new Date(b.created_at) - new Date(a.created_at);
                    })
                    .map(post => {
                        return <Post key={post.id} post={post} />;
                    })}
        </div>
    );
}

export default PostFeed;
