import getAllUsersApi from "../api/getAllUsers";
import getAllPostsApi from "../api/getAllPosts";
import setBananaLevelApi from "../api/setBananaLevel";
import banUserApi from "../api/banUser";


export async function getAllUsers() {
    const users = getAllUsersApi();
    return users;
}

export async function getAllPosts() {
    const data = getAllPostsApi();
    return data;
}

export async function userAction(id, action, value) {
    if (!id || !action) {
        return 0;
    }
    var data = {};
    switch (action) {
        case "setBananaLevel":
            data = setBananaLevelApi(id, value, action);
            return data;
        case "unbanUser":
        case "banUser":
            console.log(id, action, value);
            data = banUserApi(id, value, action);
            return data;
        default:
            return "Unknown action";
    }
}