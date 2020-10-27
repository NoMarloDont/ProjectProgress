import React, { useState } from "react";

export const UIContext = React.createContext(null);

export const UIProvider = (props) => {
    const [modalContent, setModalContent] = useState();
    const handleModalClose = () => {
        setModalContent(null);
    }
    return (
        <UIContext.Provider value={{ modalContent, setModalContent, handleModalClose }}>
            {props.children}
        </UIContext.Provider>
    );
};