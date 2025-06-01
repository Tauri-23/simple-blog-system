import { Button, Input, Modal } from "antd";
import { FormEvent, useState } from "react";
import { notify } from "../../assets/lib/utils";
import axiosClient from "../../axios-client";
import { BlogCategoryStructure } from "../../types/blogStructures";

interface AddCategoryModalTypes {
    onClose: () => void;
    setCategories: React.Dispatch<React.SetStateAction<BlogCategoryStructure[]>>
}

const AddCategoryModal:React.FC <AddCategoryModalTypes> = ({onClose, setCategories}) => {
    const [categoryIn, setCategoryIn] = useState<string>("");


    
    /**
     * Handlers
     */
    const handleAddCategory = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("categoryIn", categoryIn);

        axiosClient.post("/add-category", formData)
        .then(({data}) => {
            notify({
                type: data.status === 200 ? "success" : "error",
                title: data.status === 200 ? "Success" : "Failed",
                message: data.message
            });

            if(data.status === 200) {
                onClose();
                setCategories(data.categories);
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
        title={"Add Category"}
        open={true}
        onCancel={onClose}
        footer={null}
        width={500}
        >

            <form onSubmit={handleAddCategory}>
                <label htmlFor="categoryIn">Category</label>
                <Input
                className="w-100 mar-bottom-4"
                name="categoryIn"
                id="categoryIn"
                value={categoryIn}
                onChange={(e) => setCategoryIn(e.target.value)}/>

                <div className="d-flex justify-content-end">
                    <Button
                    type="primary"
                    htmlType="submit">
                        Login
                    </Button>
                </div>
            </form>

        </Modal>
    );
}

export default AddCategoryModal;