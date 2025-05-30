import LoginSignupModal from "../components/modals/loginSignupModal";
import { useGeneralContext } from "../context/GeneralContext";

const ModalManager = () => {
    const { modalState, hideModal } = useGeneralContext();
    const { type, props } = modalState;



    const renderModal = () => {
        switch(type) {
            /**
             * GUEST
             */
            case "LoginSignupModal":
                return <LoginSignupModal
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