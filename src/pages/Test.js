import React from "react";

import UserList from "../components/UserList.js";


export default function Test() {

    let myUsers = [];

    myUsers = [
        {
            "id": 1,
            "username": "test1"
        },
        {
            "id": 2,
            "username": "test2"
        },
        {
            "id": 3,
            "username": "test3"
        },
        {
            "id": 4,
            "username": "test4"
        },
        {
            "id": 5,
            "username": "test5"
        },
    ]

    return (
        <div>
            <UserList users={myUsers}/>
        </div>
    );
}