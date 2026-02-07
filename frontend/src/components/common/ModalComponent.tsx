import React from "react";
import { Modal } from "react-native";

export default function ModalComponent({animationType,onRequestClose, visible, children}){
    return <Modal
        visible={visible}
        animationType={animationType}
        transparent
        onRequestClose={onRequestClose}
    >
        {children}
    </Modal>
}