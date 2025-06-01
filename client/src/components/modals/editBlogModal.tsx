import { Button, Modal, Select } from "antd";
import { ChangeEvent, FormEvent, useState } from "react";
import { isEmptyOrSpaces, notify } from "../../assets/lib/utils";
import axiosClient from "../../axios-client";
import { useLoggedUserContext } from "../../context/LoggedUserContext";
import { BlogCategoryStructure, BlogStructure } from "../../types/blogStructures";
import TextArea from "antd/es/input/TextArea";
import ImageUpload from "../formItems/imageUpload";

interface EditBlogModalTypes {
    blog: BlogStructure;
    categories: BlogCategoryStructure[];
    setBlogs: React.Dispatch<React.SetStateAction<BlogStructure[]>>;
    onClose: () => void;
}

const EditBlogModal:React.FC <EditBlogModalTypes> = ({blog, categories, setBlogs, onClose}) => {
    const { user } = useLoggedUserContext();

    const [editBlogIn, setEditBlogIn] = useState({
        id: blog.id,
        category: blog.category_id,
        caption: blog.caption,
        user: user?.id
    });

    const [blogPic, setBlogPic] = useState<File | null>(null);

    const isSubmitDisabled = (!blogPic && isEmptyOrSpaces(editBlogIn.caption)) || editBlogIn.category === 0;


    
    /**
     * Handlers
     */
    const handleInputChange = (e: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
        setEditBlogIn(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        
        formData.append("editBlogIn", JSON.stringify(editBlogIn));
        if(blogPic) {
            formData.append("blogPic", blogPic);
        }

        axiosClient.post("/edit-blog", formData)
        .then(({data}) => {
            notify({
                type: data.status === 200 ? "success" : "error",
                title: data.status === 200 ? "Success" : "Failed",
                message: data.message
            });

            if(data.status === 200) {
                onClose();
                setBlogs(data.blogs.filter((_blog: BlogStructure) => _blog.status === blog.status));
            }
        })
        .catch(error => {
            console.error(error);
            notify({
                type: "error",
                title: "Error",
                message: "Server Error"
            });
        })
    }



    /**
     * Render
     */
    return(
        <Modal
        title={"Create Blog"}
        open={true}
        onCancel={onClose}
        footer={null}
        width={700}
        >

            <form onSubmit={handleSubmit}>
                <label htmlFor="caption">Category</label>
                <Select
                className="w-100 mar-bottom-3"
                id="category"
                options={categories.map(cat => ({label: cat.category, value: cat.id}))}
                value={editBlogIn.category}
                onChange={(val) => handleInputChange({target: {name: "category", value: val}} as unknown as ChangeEvent<HTMLInputElement>)}
                />

                <label htmlFor="caption">Caption</label>
                <TextArea
                className="w-100 mar-bottom-4"
                placeholder="Add a caption"
                autoSize={{ minRows: 1, maxRows: 6 }}
                name="caption"
                id="caption"
                value={editBlogIn.caption}
                onChange={handleInputChange}
                />

                <div className="fst-italic fw-bold mar-top-2">Note: If you dont want to update the photo just leave this field blank</div>
                <label htmlFor="image">Image</label>
                <ImageUpload pic={blogPic} setPic={setBlogPic}/>
                {blogPic && (
                    <Button className="mar-top-1" onClick={() => setBlogPic(null)}>Remove Pic</Button>
                )}                

                <div className="d-flex justify-content-end mar-top-1">
                    <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isSubmitDisabled}>
                        Upadate blog
                    </Button>
                </div>
            </form>

        </Modal>
    );
}

export default EditBlogModal;