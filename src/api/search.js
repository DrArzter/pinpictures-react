import axios from "axios";
import config from "./config";

export default async function search(searchTerm) {
    if (!searchTerm) {
        return { posts: [], users: [] };
    }
    try {
        const response = await axios.get(
            `${config.apiUrl}/search/${searchTerm}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching search data:", error);
        throw error;
    }
}
