import axiosClient from "../axios-client"

export const fetchAllBlogs = async() => {
    try {
        const response = await axiosClient.get(`/get-all-blogs`);
        return response.data;
    } catch(error) {
        console.error(error);
        throw error;
    }
}

export const fetchAllBlogCategories = async() => {
    try {
        const response = await axiosClient.get(`/get-all-blog-categories`);
        return response.data;
    } catch(error) {
        console.error(error);
        throw error;
    }
}