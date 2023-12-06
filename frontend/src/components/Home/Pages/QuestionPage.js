import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../store/session";
import QuestionForm from "../../auth/QuestionForm";
import LoginForm from "../../auth/LoginForm";
import SignUpForm from "../../auth/SignUpForm";
import { Modal } from "../../Modal";
import "./login.css";
import { useSelector } from "react-redux";

function QuestionPage() {
    

    return (
        <>
            <div id="login-page">
                <div id="login-content">
                    <div id="login-blurb">
                        <h1>BookFace</h1>
                        <p>Connect with friends and the world around you on BookFace.</p>
                        <button className="green-button">
                            Demo Login
                        </button>
                    </div>
                    <div id="login-container">
                        <QuestionForm />
                        {/* <button className="green-button" onClick={() => setShowSignUp(true)}>
                            Create new account
                        </button> */}
                    </div>
                </div>
                <div id="login-footer">
                    <h2>Developed By</h2>
                    <div id="gitlinked">
                        <a href="https://www2.cs.siu.edu/~stalukder/supremelab/index.html" target="_blank" rel="noreferrer">
                            SUPREME Lab
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
    
}

export default QuestionPage;
