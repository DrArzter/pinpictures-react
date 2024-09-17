import React, { useState } from "react";

export default function LoginModular(setUser, registration, setRegistration, email, setEmail, password, setPassword) {

    function toggleRegistration() {
        setRegistration(!registration);
        setForgotPassword(false);
        setUsername("");
        setEmail("");
        setPassword("");
    }

    function toggleForgotPassword() {
        setForgotPassword(!forgotPassword);
        setRegistration(false);
        setUsername("");
        setEmail("");
        setPassword("");
    }

    async function handleSubmit(e) {

        try{
            userData = await utils.login(username, password);
            setUser(userData);
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }
}