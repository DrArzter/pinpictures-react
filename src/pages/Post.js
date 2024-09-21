import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Post({ posts, user }) {

    const { id } = useParams();
    const post = posts.find((p) => p.id === id);

    return <div>Post</div>;
}