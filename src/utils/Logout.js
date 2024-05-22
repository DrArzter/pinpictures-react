import Cookies from 'js-cookie';
import React, { useState } from 'react';

export default function Logout(setUser) {

    if (!Cookies.get('token')) {
        return null;
    }

    Cookies.remove('token');

    setUser(null);
}

