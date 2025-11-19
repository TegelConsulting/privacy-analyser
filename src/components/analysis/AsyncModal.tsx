"use Client";
import React, {useEffect, useState} from "react";
import Modal from "./Modal";
import { Loader } from "./Loader";
type AsyncModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode; 
    delayMs?: number;
}

export const AsyncModal: React.FC<AsyncModalProps> = ({
    open,
    onClose,
    title,
    delayMs = 1500,
    children
}) => {
    const [showLoader, setShowLoader] = useState(false);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        if (open) {
            setShowLoader(true);
            const prev = document.body.style.overflow;
            document.body.style.overflow = "hidden";

            const t = setTimeout(() => {
                setShowLoader(false);
                setShowResult(true);

                document.body.style.overflow = prev;
            }, delayMs);

           return () => {
                clearTimeout(t);
                setShowLoader(false);
                setShowResult(false);

                document.body.style.overflow = prev;
            };
        } else {
            setShowLoader(false);
            setShowResult(false);
        }
    }, [open, delayMs])

    return(
        <>
            {showLoader && <Loader/>}
            <Modal open={showResult} onClose={onClose} title={title}>
                {children}
            </Modal>
        </>
    )
}