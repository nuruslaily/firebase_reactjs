import React, { useState, useContext } from "react";
import { AuthContext } from "./index";
import firebase from "firebase";

const Join = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrors] = useState("");

    const Auth = useContext(AuthContext);
    const handleForm = e => {
        e.preventDefault();
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
            if(res.user) Auth.setLoggedIn(true)
        })
        .catch(e => {
            setErrors(e.message);
        })
    }

    const onJoin = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                if(result.user) Auth.setLoggedIn(true);
            }).catch((error) => {
                console.log(error)
            });
    }

    return (
        <div>
            <h1>Join</h1>
            <form onSubmit={e => handleForm(e)}>
                <input 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    name="email"
                    type="email"
                    placeholder="email"
                />
                <input
                    onChange={e => setPassword(e.target.value)}
                    name="password"
                    // value="password"
                    type="password"
                    placeholder="password"
                />
                <hr/>
                <button className="googleBtn" type="button" onClick={onJoin}>
                    <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"
                    alt="logo"/>
                    Join with Google
                </button>
                
                <button type="submit">Join</button>

                <span>{error}</span>
            </form>
        </div>
    )
}

export default Join;