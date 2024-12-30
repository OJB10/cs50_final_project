import React, { createContext, useContext } from "react";
import useModal from "../hooks/useModal";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const ticketModal = useModal();
  const deleteModal = useModal();

  return (
    <ModalContext.Provider value={{ ticketModal, deleteModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);