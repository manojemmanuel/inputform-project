import React, { useState } from "react";
import axios from "axios"; //is used to send HTTP requests to your backend
import './register.css';

export default function Register() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const isGmail = email.endsWith("@gmail.com");
    const isPasswordValid = password.length >= 8;
    const isPasswordMatch = password === confirmPassword;
    const isFirstName = firstName.length >=1 
    const isLastName = lastName.length >= 1
    const isFormValid = isGmail && isPasswordValid && isPasswordMatch && isFirstName && isLastName;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid) {
            setError("Ensure email ends with @gmail.com, password is at least 8 characters, and both passwords match.");
            return;
        }

        try{
            const response = await axios.post("http://localhost:5000/register",{
                email,
                firstName,
                lastName,
                password
            });

            alert(response.data.message);
            setEmail("");
            setFirstName("");
            setLastName("");
            setPassword("");
            setConfirmPassword("");
            setError("");
        } catch(error){
            if(error.response && error.response.status === 409){
                setError("Email is already registerd")
            }
            else{
                setError(error.response.data.error);
            }
        }
    };

    return (
        <div className="register-container">
            <div className="form-box">
                <h2 className="form-title">Sign up</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        id="mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {email && !isGmail && (
                        <p className="validation-message">Email must end with @gmail.com</p>
                    )}
                    <input
                        type="text"
                        placeholder="Firstname"
                        id="fname"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    {firstName && !isFirstName && (
                        <p className="validation-message">FirstName </p>
                    )}
                    <input
                        type="text"
                        placeholder="Lastname"
                        id="lname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {password && !isPasswordValid && (
                        <p className="validation-message">Password must be at least 8 characters long</p>
                    )}
                    <input
                        type="password"
                        placeholder="Re enter Password"
                        id="rpassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {confirmPassword && !isPasswordMatch && (
                        <p className="validation-message">Passwords do not match</p>
                    )}
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" disabled={!isFormValid}>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}