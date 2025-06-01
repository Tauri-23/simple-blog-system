import { useOutletContext } from "react-router-dom";
import { outletContextTypes } from "../userDefault";
import { BlogCategoryStructure, BlogStructure } from "../../../types/blogStructures";
import { useEffect, useState } from "react";
import { fetchAllBlogCategories, fetchAllBlogs } from "../../../services/blogServices";
import { Button, Spin } from "antd";
import BlogBox from "../../../components/blog/blogBox";

export default function UserDraftsIndex() {
    const { setUserActivePage } = useOutletContext<outletContextTypes>();
    const [blogs, setBlogs] = useState<BlogStructure[] | null>(null);
    const [categories, setCategories] = useState<BlogCategoryStructure[] | null>(null);

    const [selectedCategory, setSelectedCategory] = useState<BlogCategoryStructure>();



    /**
     * Onmount
     */
    useEffect(() => {
        setUserActivePage("Drafts");
        const getAll = async() => {
            const [blogsData, categoriesData] = await Promise.all([
                fetchAllBlogs(),
                fetchAllBlogCategories()
            ]);
            setBlogs(blogsData.filter((blog: BlogStructure) => blog.status === "Draft"));
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
                            <h4>There are no available draft blogs yet.</h4>
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
