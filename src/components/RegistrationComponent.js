import React, { useState } from "react";

export default function RegistrationModular(setUser, registration, setRegistration, username, setUsername, email, setEmail, password, setPassword) {

    function toggleRegistration() {
        setRegistration(!registration);
        setForgotPassword(false);
        setUsername("");
        setEmail("");
        setPassword("");
    }

    function handleSubmit(e) {

        try{
            userData = utils.registration(username, email, password);
            setUser(userData);
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    }


}