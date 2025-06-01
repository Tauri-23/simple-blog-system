import AddBlogModal from "../components/modals/addBlogModal";
import AddCategoryModal from "../components/modals/addCategoryModal";
import EditBlogModal from "../components/modals/editBlogModal";
import LoginSignupModal from "../components/modals/loginSignupModal";
import ViewBlogModal from "../components/modals/viewBlogModal";
import { useGeneralContext } from "../context/GeneralContext";
import { BlogCategoryStructure, BlogStructure } from "../types/blogStructures";

const ModalManager = () => {
    const { modalState, hideModal } = useGeneralContext();
    const { type, props } = modalState;



    const renderModal = () => {
        switch(type) {
            /**
             * GENERAL
             */
            case "ViewBlogModal":
                return <ViewBlogModal
                blog={props.blog as BlogStructure}
                setBlogs={props.setBlogs as React.Dispatch<React.SetStateAction<BlogStructure[]>>}
                onClose={hideModal}
                />





            /**
             * GUEST
             */
            case "LoginSignupModal":
                return <LoginSignupModal
                onClose={hideModal}
                />
            




            /**
             * USER
             */
            case "AddBlogModal":
                return <AddBlogModal
                categories={props.categories as BlogCategoryStructure[]}
                setBlogs={props.setBlogs as React.Dispatch<React.SetStateAction<BlogStructure[]>>}
                onClose={hideModal}
                />
            case "AddCategoryModal":
                return <AddCategoryModal
                setCategories={props.setCategories as React.Dispatch<React.SetStateAction<BlogCategoryStructure[]>>}
                onClose={hideModal}
                />
            case "EditBlogModal":
                return <EditBlogModal
                blog={props.blog as BlogStructure}
                categories={props.categories as BlogCategoryStructure[]}
                setBlogs={props.setBlogs as React.Dispatch<React.SetStateAction<BlogStructure[]>>}
                onClose={hideModal}
                />






            /**
             * Default
             */
            default:
                return null;
        }
    }

    return(
        <>
            {renderModal()}
        </>
    )
}

export default ModalManager;