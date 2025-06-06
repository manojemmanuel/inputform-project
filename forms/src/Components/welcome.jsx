import React from "react";
import "./welcome.css";

export default function Welcome({email, onLogOut}) {
    return (
        <div className="welcome-container">
            <h1> Welcome, {email}! </h1>
            <button onClick={onLogOut}> LogOut </button>
        </div>
    );
}