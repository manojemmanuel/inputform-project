import React, {useState} from "react";
import axios from "axios";
import "./register.css";


export default function LogIn({onLogInSuccess}) {

    const [emailL,setEmailL] = useState("");
    const [passwordL, setPasswordL] = useState("");
    const [errorL, setErrorL] = useState("");
    const isGmailL = emailL.endsWith("@gmail.com");
    const isPasswordL = passwordL.length >= 8;
    const isValidL = isGmailL && isPasswordL;

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            const response = await axios.post("http://localhost:5000/login",{
            email: emailL,
            password: passwordL
        });

        onLogInSuccess(emailL);
        alert(response.data.message);
        setEmailL("");
        setPasswordL("");
        } catch(error){
            if(error.response && error.response.status === 401){
                setErrorL("Invalid email or password")
            }
            setTimeout(() => {
                setErrorL("");
            }, 10000);
        }
    };
    return (
        <div className="register-container"> 
            <div className="form-box">
                 <h2 className="form-title">Already have an account</h2>
                <form className="form" onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        id="Mail" 
                        placeholder="Email" 
                        value={emailL}
                        onChange={(e)=> setEmailL(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        id="Password" 
                        placeholder="Password" 
                        value={passwordL}
                        onChange={(e) => setPasswordL(e.target.value)}
                        required
                    />
                    {errorL && <p className="error-message">{errorL}</p>}
                    <button
                        type="submit"
                        disabled = {!isValidL}
                    >
                        LogIn
                    </button>
                </form>
            </div>
        </div>
    );

}