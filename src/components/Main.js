import React from "react";
import { Route, Router, Routes } from "react-router-dom";

import Posts from "../pages/Posts";
import Support from "../pages/Support";
import License from "../pages/License";
import Authentication from "../pages/Authentication";
import NotFound from "../pages/NotFound";


export default function Main() {
    return (
        //bg-gradient-to-br from-zinc-950 to-zinc-900 min-h-screen
        <div id="main" className="main min-h-screen bg-zinc-700">
            <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="/support" element={<Support />} />
                <Route path="/license" element={<License />} />
                <Route path="/Authentification" element={<Authentication />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}