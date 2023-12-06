import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../store/session";
import LoginForm from "../../auth/LoginForm";
import SignUpForm from "../../auth/SignUpForm";
import { Modal } from "../../Modal";
import "./login.css";
import { useSelector } from "react-redux";

function LogInPage() {
    const [showSignUp, setShowSignUp] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    
    console.log("LoginPage.user");
    console.log(user);

    const demoLogin = e => {
        console.log("demoLogin");
        e.preventDefault();
        dispatch(login("demo@demo.com", "password"));
    };

    return (
        <>
            {showSignUp && (
                <Modal onClose={() => setShowSignUp(false)}>
                    <SignUpForm />
                </Modal>
            )}
            <div id="login-page">
                <div id="login-content">
                    <div id="login-blurb">
                        <h1>BookFace</h1>
                        <p>Connect with friends and the world around you on BookFace.</p>
                        <button className="green-button" onClick={demoLogin}>
                            Demo Login
                        </button>
                    </div>
                    <div id="login-container">
                        <LoginForm />
                        <button className="green-button" onClick={() => setShowSignUp(true)}>
                            Create new account
                        </button>
                    </div>
                </div>
                <div id="login-footer">
                    <h2>Developed By</h2>
                    <div id="gitlinked">
                        <a href="https://www2.cs.siu.edu/~stalukder/supremelab/index.html" target="_blank" rel="noreferrer">
                            Jahangir, Syed
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
    
}

export default LogInPage;
