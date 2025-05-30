import { useEffect, useState, createContext, useContext, ReactNode } from "react";

interface ModalState {
    type: string | null;
    props: Record<string, unknown>;
}

interface GeneralContextType {
    screenWidth?: number;
    screenHeight?: number;
    modalState: ModalState;
    showModal: (type: string, props?: Record<string, unknown>) => void;
    hideModal: () => void;
}

const GeneralContext = createContext<GeneralContextType | undefined>(undefined);


export const GeneralProvider = ({ children }: { children: ReactNode }) => {
    const [screenWidth, setScreenWidth] = useState<number | undefined>(window.innerWidth || 0);
    const [screenHeight, setScreenHeight] = useState<number | undefined>(window.innerHeight || 0);
    const [modalState, setModalState] = useState<ModalState>({ type: null, props: {} });


    
    /**
     * Onmount
     */
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            setScreenHeight(window.innerHeight);
        }

        window.addEventListener("resize", handleResize);

        // Cleanup on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);



    /**
     * Modal Handlers
     */
    const showModal = (type: string, props: Record<string, unknown> = {}) => {
        setModalState({ type, props });
        document.body.style.overflow = "hidden";
    };

    const hideModal = () => {
        setModalState({ type: null, props: {} });
        document.body.style.overflow = "auto";
    };



    /**
     * Render
     */
    return (
        <GeneralContext.Provider 
        value={{
            screenWidth,
            screenHeight,
            modalState, 
            showModal, 
            hideModal
        }}>
            {children}
        </GeneralContext.Provider>
    )
}


export const useGeneralContext = () => {
    const context = useContext(GeneralContext);
    
    if(!context) {
        throw new Error("useGeneralContext must be used within a GeneralProvider");
    }

    return context;
};