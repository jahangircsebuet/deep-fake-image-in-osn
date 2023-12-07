import React from "react";
import { useSelector } from "react-redux";
import HomePage from "./HomePage";
import LogInPage from "./LogInPage";
import QuestionPage from "./QuestionPage";


function Home() {

    const session = useSelector(state => state.session);
    console.log("session");
    console.log(session);
    let token = localStorage.getItem('token');

    if (token !== 'null') {
        return <main style={{ minHeight: "100vh" }}>{ <HomePage />}</main>;
    } else {
        return <main style={{ minHeight: "100vh" }}>{<LogInPage />}</main>;
//        return <main style={{ minHeight: "100vh" }}>{session.isAuthenticated ? <HomePage /> : <LogInPage />}</main>;
    }
}

export default Home;
