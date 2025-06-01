import { Button, Input, Modal, Popconfirm } from "antd";
import { useLoggedUserContext } from "../../context/LoggedUserContext";
import { BlogStructure } from "../../types/blogStructures";
import { getTimeAgo, isEmptyOrSpaces, notify } from "../../assets/lib/utils";
// import { LiaCommentDots, LiaHeart, LiaHeartSolid } from "react-icons/lia";
import axiosClient from "../../axios-client";
// import { useGeneralContext } from "../../context/GeneralContext";
import { useState } from "react";
import { LiaTrashAlt } from "react-icons/lia";
interface ViewBlogModalTypes {
    blog: BlogStructure;
    setBlogs: React.Dispatch<React.SetStateAction<BlogStructure[]>>;
    onClose: () => void;
}

const ViewBlogModal:React.FC <ViewBlogModalTypes> = ({blog, setBlogs, onClose}) => {
    // const {showModal} = useGeneralContext();
    const { user } = useLoggedUserContext();
    const { TextArea } = Input;
    const [isCommentBtnLoading, setCommentBtnLoading] = useState<boolean>(false);
    const [_blog, _setBlog] = useState<BlogStructure>(blog);
    const [commentIn, setCommentIn] = useState({
        blogId: _blog.id,
        comment: "",
        user: user?.id
    });
    // const isLiked = _blog?.likes?.find(like => String(like?.blog_id) === String(_blog.id) && like.user_id === user?.id) || null;



    /**
     * Handlers
     */
    const handleAddComment = () => {
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
                setBlogs(data.blogs);
                _setBlog(prev => ({
                    ...prev,
                    comments_count: prev.comments_count+1,
                    comments: [...prev.comments, data.comment]
                }));
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
    //             _setBlog(prev => ({
    //                 ...prev,
    //                 likes_count: data.mode === "unlike" ? prev.likes_count-1 : prev.likes_count+1,
    //                 likes: data.mode === "unlike" 
    //                 ? prev.likes.filter((like: BlogLikeStructure) => String(like.blog_id) !== String(_blog.id) && like.user_id === user.id)
    //                 : [...prev.likes, data.like]
    //             }));
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

    const handleDeleteComment = (commentId: number) => {
        const formData = new FormData();
        formData.append("commentId", String(commentId));
        
        axiosClient.post("/delete-comment", formData)
        .then(({data}) => {
            notify({
                type: data.status === 200 ? "success" : "error",
                title: data.status === 200 ? "Success" : "Failed",
                message: data.message
            });

            if(data.status === 200) {
                _setBlog(prev => ({
                    ...prev,
                    comments: prev.comments.filter(comment => comment.id !== commentId),
                    comments_count: prev.comments_count-1
                }));
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



    /**
     * Render
     */
    return(
        <Modal
        title={`${_blog.user ? `${_blog.user.fname} ${_blog.user.lname}` : "Admin" }'s Blog`}
        open={true}
        onCancel={onClose}
        footer={null}
        width={800}
        >
            <div className="overflow-y-scroll" style={{maxHeight: "75vh", paddingRight: 20}}>
                {/* Header */}
                <div className="blog-box-header">
                    <div className="blog-box-pfp">{_blog.user ? _blog.user.fname[0] : "A"}</div>
                    <div>
                        <div className="text-m2 fw-bold">{_blog.user ? `${_blog.user.fname} ${_blog.user.lname}` : "Admin"}</div>
                        <div className="text-m3">{getTimeAgo(_blog.created_at)}</div>
                    </div>
                </div>

                {/* Body */}
                <div className="blog-box-body">
                    <div className="d-flex justify-content-start">
                        <Button size="small" variant="filled" color="primary">{_blog.category.category}</Button>
                    </div>
                    <div className="blog-box-body-caption">
                        {_blog.caption}
                    </div>

                    {_blog.photo && (
                        <div className="blog-box-body-image">
                            <img src={`/media/blogs/${_blog.photo}`} alt="blog photo" />
                        </div>
                    )}
                    
                </div>

                <div className="blog-box-footer">
                    {/* <div className="d-flex gap4 align-items-center mar-bottom-3">
                        {isLiked? <LiaHeartSolid size={30} color="red" onClick={handleLikeUnlike}/> : <LiaHeart size={30} onClick={handleLikeUnlike}/>}
                        <LiaCommentDots size={30} className="cursor-pointer"/>
                    </div> */}
                    {/* <div className="d-flex mar-bottom-3">
                        <span>{_blog.likes_count} Likes</span>
                    </div> */}

                    <hr />
            
                    {/* If it has comment */}
                    <div className="text-m3 text-underlined mar-bottom-1">{_blog.comments_count > 0 ? `${_blog.comments_count} comments` : ""}</div>

                    {/* Comments */}
                    <div className="w-100 d-flex flex-direction-y gap3 mar-bottom-1">
                        {_blog.comments.map((comment, index) => (
                            <div key={index} className="blog-comment-box">
                                {user && (
                                    <div className="d-flex justify-content-end">
                                        <Popconfirm
                                        title="Delete this Comment"
                                        onConfirm={() => handleDeleteComment(comment.id)}>
                                            <Button size="small" variant="solid" color="red" icon={<LiaTrashAlt/>}/>
                                        </Popconfirm>
                                    </div>
                                )}
                                {/* Header */}
                                <div className="blog-comment-header">
                                    <div className="blog-comment-pfp">{comment.user ? comment.user.fname[0] : "A"}</div>
                                    <div>
                                        <div className="text-m3 fw-bold">{comment.user ? `${comment.user.fname} ${comment.user.lname}` : "Anonymous User"}</div>
                                        <div className="text-m3">{getTimeAgo(comment.created_at)}</div>
                                    </div>
                                </div>

                                <div className="text-m3 mar-start-3 mar-end-3">{comment.comment}</div>
                                
                            </div>
                        ))}
                    </div>
                </div>
            </div>

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

        </Modal>
    );
}

export default ViewBlogModal;