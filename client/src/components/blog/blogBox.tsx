import { Button, Input, Popconfirm } from "antd";
import { useState } from "react";
// import { LiaCommentDots, LiaHeart, LiaHeartSolid } from "react-icons/lia";
import { BlogCategoryStructure, BlogStructure } from "../../types/blogStructures";
import { getTimeAgo, isEmptyOrSpaces, notify } from "../../assets/lib/utils";
import { useLoggedUserContext } from "../../context/LoggedUserContext";
import axiosClient from "../../axios-client";
import { useGeneralContext } from "../../context/GeneralContext";
import { LiaPenAltSolid, LiaTrashAlt } from "react-icons/lia";

interface BlogBoxTypes {
    blog: BlogStructure;
    categories: BlogCategoryStructure[];
    setBlogs: (value: any) => void
}

const BlogBox:React.FC<BlogBoxTypes> = ({blog, categories, setBlogs}) => {
    const { user } = useLoggedUserContext();
    const { showModal } = useGeneralContext();
    const { TextArea } = Input;
    const [isCommentBtnLoading, setCommentBtnLoading] = useState<boolean>(false);
    const [commentIn, setCommentIn] = useState({
        blogId: blog.id,
        comment: "",
        user: user?.id
    });
    // const isLiked = blog?.likes?.find(like => String(like?.blog_id) === String(blog.id) && like.user_id === user?.id) || null;



    /**
     * Handlers
     */
    const handleAddComment = () => {
        // if(!user) {
        //     showModal("LoginSignupModal");
        //     return;
        // }

        const formData = new FormData();
        formData.append("commentIn", JSON.stringify(commentIn));

        setCommentBtnLoading(true);

        axiosClient.post("/create-blog-comment", formData)
        .then(({data}) => {
            notify({
                type: data.status === 200 ? "success" : "error",
                title: data.status === 200 ? "Success" : "Failed",
                message: data.message
            });

            if(data.status === 200) {
                setBlogs(data.blogs.filter((_blog: BlogStructure) => _blog.id === blog.id));
                setCommentIn(prev => ({...prev, comment: ""}))
            }
        })
        .catch(error => {
            console.error(error);
            notify({
                type: "error",
                title: "Error",
                message: "Server Error"
            })
        })
        .finally(() => {
            setCommentBtnLoading(false);
        })
    }

    // const handleLikeUnlike = () => {
    //     if(!user) {
    //         showModal("LoginSignupModal");
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append("blogId", String(blog.id));
    //     formData.append("user", String(user?.id));

    //     axiosClient.post("/like-unlike-blog", formData)
    //     .then(({data}) => {
    //         notify({
    //             type: data.status === 200 ? "success" : "error",
    //             title: data.status === 200 ? "Success" : "Failed",
    //             message: data.message
    //         });

    //         if(data.status === 200) {
    //             setBlogs(data.blogs);
    //         }
    //     })
    //     .catch(error => {
    //         console.error(error);
    //         notify({
    //             type: "error",
    //             title: "Error",
    //             message: "Server Error"
    //         })
    //     })
    // }

    const handleShowBlog = () => {
        showModal("ViewBlogModal", {
            blog,
            setBlogs
        });
    }

    const handleDeleteBlog = () => {
        const formData = new FormData();
        formData.append("blogId", String(blog.id));
        
        axiosClient.post("/delete-blog", formData)
        .then(({data}) => {
            notify({
                type: data.status === 200 ? "success" : "error",
                title: data.status === 200 ? "Success" : "Failed",
                message: data.message
            });

            if(data.status === 200) {
                setBlogs((prev: BlogStructure[]) => prev.filter(_blog => _blog.id !== blog.id));
            }
        })
        .catch(error => {
            console.error(error);
            notify({
                type: "error",
                title: "Error",
                message: "Server Error"
            })
        })
    }
    
    const handlePublishBlog = () => {
        const formData = new FormData();
        formData.append("blogId", String(blog.id));
        
        axiosClient.post("/publish-blog", formData)
        .then(({data}) => {
            notify({
                type: data.status === 200 ? "success" : "error",
                title: data.status === 200 ? "Success" : "Failed",
                message: data.message
            });

            if(data.status === 200) {
                setBlogs((prev: BlogStructure[]) => prev.filter(_blog => _blog.id !== blog.id));
            }
        })
        .catch(error => {
            console.error(error);
            notify({
                type: "error",
                title: "Error",
                message: "Server Error"
            })
        })
    }

    const handleEditBlog = () => {
        showModal("EditBlogModal", {
            blog,
            categories,
            setBlogs
        });
    }



    /**
     * Render
     */
    return(
        <div className="blog-box1">
            {user && (
                <div className="d-flex justify-content-end w-100 gap3">
                    <Button onClick={handleEditBlog} size="small" variant="solid" color="blue" icon={<LiaPenAltSolid/>}/>
                    <Popconfirm
                    title="Delete this blog"
                    onConfirm={handleDeleteBlog}>
                        <Button size="small" variant="solid" color="red" icon={<LiaTrashAlt/>}/>
                    </Popconfirm>
                    {blog.status === "Draft" && (
                        <Popconfirm
                        title="Publish this blog"
                        onConfirm={handlePublishBlog}>
                            <Button size="small" variant="solid" color="blue">Publish</Button>
                        </Popconfirm>
                    )}
                </div>
            )}
            {/* Header */}
            <div onClick={(e) => {e.stopPropagation(); handleShowBlog()}} className="blog-box-header">
                <div className="blog-box-pfp">{blog.user ? blog.user.fname[0] : "A"}</div>
                <div>
                    <div className="text-m2 fw-bold">Airich Diawan</div>
                    <div onClick={handleShowBlog} className="text-m3">{getTimeAgo(blog.created_at)}</div>
                </div>
            </div>

            {/* Body */}
            <div className="blog-box-body">
                <div className="d-flex justify-content-start">
                    <Button size="small" variant="filled" color="primary">{blog.category.category}</Button>
                </div>
                <div className="blog-box-body-caption">
                    {blog.caption}
                </div>

                {blog.photo && (
                    <div onClick={handleShowBlog} className="blog-box-body-image">
                        <img src={`/media/blogs/${blog.photo}`} alt="blog photo" />
                    </div>
                )}
                
            </div>

            {/* Footer */}
            <div className="blog-box-footer">
                {/* <div className="d-flex gap4 align-items-center mar-bottom-3">
                    {isLiked? <LiaHeartSolid size={30} color="red" onClick={handleLikeUnlike}/> : <LiaHeart size={30} onClick={handleLikeUnlike}/>}
                    <LiaCommentDots size={30} className="cursor-pointer"/>
                </div> */}
                {/* <div className="d-flex mar-bottom-3">
                    <span onClick={handleShowBlog}>{blog.likes_count} Likes</span>
                </div> */}

                {/* If it has comment */}
                <div onClick={handleShowBlog} className="text-m3 text-underlined mar-bottom-3">{blog.comments_count > 0 ? `View ${blog.comments_count} comments` : ""}</div>

                {blog.status === "Published" && (
                    <div className="d-flex gap3 align-items-start">
                        <TextArea
                        placeholder="Add a comment"
                        variant="filled"
                        autoSize={{ minRows: 1, maxRows: 6 }}
                        value={commentIn.comment}
                        onChange={(e) => setCommentIn(prev => ({...prev, comment: e.target.value}))}
                        />
                        {!isEmptyOrSpaces(commentIn.comment) && (
                            <Button loading={isCommentBtnLoading} type="primary" onClick={handleAddComment}>Post</Button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default BlogBox;