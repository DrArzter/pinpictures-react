import React from "react";

import * as utils from "../utils";
import { redirect } from "react-router-dom";

function Support() {

    const redirect = utils.useRedirectToMainPage();

    return (
        <div className="p-4">
            <div className="lg:w-1/2 p-6 bg-zinc-800 mx-auto p-6 rounded-lg">
                <h1 className="text-2xl font-bold text-center text-5xl mb-4">Error 404</h1>
                <h1 className="text-2xl font-bold text-center text-5xl mb-4">Page not found</h1>
            </div>
            <div className="lg:w-1/2 p-6 bg-zinc-800 mx-auto p-6 rounded-lg mt-4">
                <p className="text-center">If you have any questions or concerns, please contact me.</p>
                <p className="text-center">get back to <a href={redirect} onClick={() => redirect()}>main page</a></p>
            </div>
        </div>
    );
}

export default Support;