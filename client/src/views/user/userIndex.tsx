import { useEffect, useState } from "react";
import BlogBox from "../../components/blog/blogBox";
import { fetchAllBlogCategories, fetchAllBlogs } from "../../services/blogServices";
import { BlogCategoryStructure, BlogStructure } from "../../types/blogStructures";
import { Button, Spin } from "antd";
import { useGeneralContext } from "../../context/GeneralContext";
import { useOutletContext } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { outletContextTypes } from "./userDefault";

export default function UserIndex() {
    const { showModal } = useGeneralContext();
    const { setUserActivePage } = useOutletContext<outletContextTypes>();
    const [blogs, setBlogs] = useState<BlogStructure[] | null>(null);
    const [categories, setCategories] = useState<BlogCategoryStructure[] | null>(null);

    const [selectedCategory, setSelectedCategory] = useState<BlogCategoryStructure>();



    /**
     * Onmount
     */
    useEffect(() => {
        setUserActivePage("Home");
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
     * handlers
     */
    const handleAddPostClick = () => {
        showModal("AddBlogModal", {
            categories,
            setBlogs
        });
    }

    const handleAddCategory = () => {
        showModal("AddCategoryModal", {
            setCategories
        });
    }



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
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleAddCategory}
                                icon={<BiPlus size={20}/>}>
                                    Add Category
                            </Button>
                        </div>

                        <div className="create-blog-cont d-flex align-items-center gap3">
                            <div className="blog-box-pfp">A</div>
                            <div className="create-blog-btn1" onClick={handleAddPostClick}>Create a blog</div>
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
