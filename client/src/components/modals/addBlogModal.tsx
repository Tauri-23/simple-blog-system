import { Button, Modal, Select } from "antd";
import { ChangeEvent, FormEvent, useState } from "react";
import { isEmptyOrSpaces, notify } from "../../assets/lib/utils";
import axiosClient from "../../axios-client";
import { useLoggedUserContext } from "../../context/LoggedUserContext";
import { BlogCategoryStructure, BlogStructure } from "../../types/blogStructures";
import TextArea from "antd/es/input/TextArea";
import ImageUpload from "../formItems/imageUpload";

interface AddBlogModalTypes {
    categories: BlogCategoryStructure[];
    setBlogs: React.Dispatch<React.SetStateAction<BlogStructure[]>>;
    onClose: () => void;
}

const AddBlogModal:React.FC <AddBlogModalTypes> = ({categories, setBlogs, onClose}) => {
    const { user } = useLoggedUserContext();

    const [blogIn, setBlogIn] = useState({
        category: 0,
        caption: "",
        user: user?.id
    });

    const [blogPic, setBlogPic] = useState<File | null>(null);

    const isSubmitDisabled = (!blogPic && isEmptyOrSpaces(blogIn.caption)) || blogIn.category === 0;


    
    /**
     * Handlers
     */
    const handleInputChange = (e: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
        setBlogIn(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        
        formData.append("blogIn", JSON.stringify(blogIn));
        if(blogPic) {
            formData.append("blogPic", blogPic);
        }

        axiosClient.post("/create-blog", formData)
        .then(({data}) => {
            notify({
                type: data.status === 200 ? "success" : "error",
                title: data.status === 200 ? "Success" : "Failed",
                message: data.message
            });

            if(data.status === 200) {
                onClose();
                setBlogs(data.blogs.filter((blog: BlogStructure) => blog.status === "Published"));
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
                options={[
                    {label: "Select category", value: 0},
                    ...categories.map(cat => ({label: cat.category, value: cat.id}))
                ]}
                value={blogIn.category}
                onChange={(val) => handleInputChange({target: {name: "category", value: val}} as unknown as ChangeEvent<HTMLInputElement>)}
                />

                <label htmlFor="caption">Caption</label>
                <TextArea
                className="w-100 mar-bottom-4"
                placeholder="Add a caption"
                autoSize={{ minRows: 1, maxRows: 6 }}
                name="caption"
                id="caption"
                value={blogIn.caption}
                onChange={handleInputChange}
                />

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
                        Create blog (Draft)
                    </Button>
                </div>
            </form>

        </Modal>
    );
}

export default AddBlogModal;