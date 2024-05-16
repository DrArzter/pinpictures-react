import React, { useEffect } from "react";
import * as utils from "../utils";

export default function Authentification({ setUser, user }) {

    const [registration, setRegistration] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const redirect = utils.useRedirectToMainPage();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (registration) {
                const userData = await utils.Registration(username, email, password);
                setRegistration(false);
                setUser(userData);

                redirect();
            } else {
                const userData = await utils.Login(username, password); 
                setUser(userData);
                console.log(user)
                redirect();
            }
        } catch (error) {
            console.error('Error during authentication:', error);
        }
    }    
    
    return (
        <div className="flex flex-col items-center h-screen mx-auto text-zinc-800 p-4">
            <form className="w-full max-w-md" onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2" htmlFor="username">Username</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                {registration ? (
                    <div className="mb-6">
                        <label className="block text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <p className="text-red-500 text-xs italic">Please enter your email address.</p>
                    </div>
                ) : null}
                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <p className="text-red-500 text-xs italic">Please enter your password.</p>
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
                </div>
                <div className='my-4'></div>
                {registration ? (
                    <div className="flex items-center justify-between" onClick={() => setRegistration(false)}>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#" onClick={() => setRegistration(false)}>Already have an account? Sign In</a>
                    </div>
                ) : (
                    <div className="flex items-center justify-between">
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#" onClick={() => setRegistration(true)}>Don't have an account? Sign Up</a>
                    </div>
                )}
                <div className="flex items-center justify-between">
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">Forgot Password?</a>
                </div>
            </form>
        </div>
    );
}