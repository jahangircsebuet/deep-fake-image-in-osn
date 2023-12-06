import React from "react";
import { useSelector } from "react-redux";
import HomePage from "./HomePage";
import LogInPage from "./LogInPage";
import QuestionPage from "./QuestionPage";


function Home() {

    const session = useSelector(state => state.session);
    console.log("session");
    console.log(session);

    if (localStorage.getItem('token') !== 'null') {
        return <main style={{ minHeight: "100vh" }}>{ <HomePage />}</main>;
    } else {
        return <main style={{ minHeight: "100vh" }}>{session.isAuthenticated ? <HomePage /> : <LogInPage />}</main>;
    }
}

export default Home;
