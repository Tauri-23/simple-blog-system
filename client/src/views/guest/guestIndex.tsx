import { useEffect, useState } from "react";
import BlogBox from "../../components/blog/blogBox";
import { BlogStructure, BlogCategoryStructure } from "../../types/blogStructures";
import { fetchAllBlogs, fetchAllBlogCategories } from "../../services/blogServices";
import { Button, Spin } from "antd";

export default function GuestIndex() {
    const [blogs, setBlogs] = useState<BlogStructure[] | null>(null);
    const [categories, setCategories] = useState<BlogCategoryStructure[] | null>(null);

    const [selectedCategory, setSelectedCategory] = useState<BlogCategoryStructure>();



    /**
     * Onmount
     */
    useEffect(() => {
        const getAll = async() => {
            const [blogsData, categoriesData] = await Promise.all([
                fetchAllBlogs(),
                fetchAllBlogCategories()
            ]);
            setBlogs(blogsData.filter((blog: BlogStructure) => blog.status === "Published"));
            setCategories(categoriesData);
        }

        getAll();
    }, []);



    /**
     * Render
     */
    return (
        <div className='content1'>
            {(!blogs || !categories) 
            ? (<Spin size="large"/>)
            : (
                <div className="d-flex justify-content-center">
                    <div className="d-flex flex-direction-y gap1">

                        <div className="d-flex flex-wrap gap3 blogs-categories-cont">
                            <Button
                                variant={!selectedCategory ? "solid" : "outlined"}
                                color="primary"
                                onClick={() => setSelectedCategory(undefined)}>
                                    All
                            </Button>
                            {categories.map((category, index) => (
                                <Button
                                key={index}
                                variant={selectedCategory?.id === category.id ? "solid" : "outlined"}
                                color="primary"
                                onClick={() => setSelectedCategory(category)}>
                                    {category.category}
                                </Button>
                            ))}
                        </div>

                        {blogs.length < 1 && (
                            <h4>There are no available blogs yet.</h4>
                        )}

                        {blogs.filter(blog => selectedCategory ? (blog.category.id === selectedCategory.id) : true).map((blog, index) => (
                            <BlogBox key={index} blog={blog} categories={categories} setBlogs={setBlogs}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
