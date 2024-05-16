import React from "react";
import { Route, Router, Routes } from "react-router-dom";

import Posts from "../pages/Posts";
import Support from "../pages/Support";
import License from "../pages/License";
import Authentication from "../pages/Authentication";
import NotFound from "../pages/NotFound";
import AccountSettings from "../pages/AccountSettings";


export default function Main( { user, setUser } ) {
    return (
        //bg-gradient-to-br from-zinc-950 to-zinc-900 min-h-screen
        <div id="main" className="main min-h-screen bg-zinc-700">
            <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="/support" element={<Support />} />
                <Route path="/license" element={<License />} />
                <Route path="/Authentification" element={<Authentication setUser={setUser} user={user} />} />
                <Route path="/AccountSettings" element={<AccountSettings user={user} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}