import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../store/session";
import "../Home/Pages/login.css";

const QuestionForm = () => {

    return (
        <>
           <form id="login-form">
                    <h1>Hard Questions</h1>
                    <br></br>
                    <h3>What is the sum of the issue dates of your passport, SSN and driver license?</h3>
                    <div className="required"></div>
                    <input
                        name="question1"
                        type="text"
                        placeholder="Question 1"
                    />
                    
                    <h3>Which one was issued first among passport, SSN and driver license??</h3>
                    <div className="required"></div>
                    <input
                        name="question2"
                        type="text"
                        placeholder="Question 2"
                    />

                    <h3>Which one was issued last among passport, SSN and driver license?</h3>
                    <div className="required"></div>
                    <input
                        name="question3"
                        type="text"
                        placeholder="Question 3"
                    />

                    {/* <h3>What is the last character of your driver license number?</h3>
                    <div className="required"></div>
                    <input
                        name="question4"
                        type="text"
                        placeholder="Question 4"
                    />

                    <h3>What is the year of your driver license issue date?</h3>
                    <div className="required"></div>
                    <input
                        name="question5"
                        type="text"
                        placeholder="Question 5"
                    /> */}

                    {/* <small style={{ position: "relative", marginBottom: "5px", color: "#919191" }}>
                        <strong
                            style={{
                                fontSize: "24px",
                                color: "red",
                                position: "absolute",
                                left: "-14px",
                                top: "-4px",
                            }}>
                            *
                        </strong>
                        Required
                    </small> */}
                    <button id="login-button" type="submit" style={{marginBottom: "10px"}}>
                        Next
                    </button>
                </form>
        </>
    );
};

export default QuestionForm;
