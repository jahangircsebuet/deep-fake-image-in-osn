import React, { useEffect } from "react";
import RightSideBar from "../Elements/RightSideBar";
import LeftSideBar from "../Elements/LeftSideBar";
import PostFeed from "../Elements/PostFeed";
import "./home.css";
import { useDispatch } from "react-redux";
import { getLikes } from "../../../store/likes";

function HomePage() {
//    console.log("load HomePage");
//    const dispatch = useDispatch();
//
//    useEffect(() => {
//        dispatch(getLikes());
//    }, [dispatch]);

//    console.log("localStorage.getItem('user'): " + localStorage.getItem('user'));
//    let user = JSON.parse(localStorage.getItem('user'));
//    console.log("user: " + user);

    return (user &&
        <div id="home">
            <LeftSideBar />
            <PostFeed />
            {/* <RightSideBar /> */}
        </div>
    );
}

export default HomePage;
