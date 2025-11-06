"use client";
import React, { useEffect } from "react";
import ReactDOM  from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({open, onClose, title, children }) => {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        if (open) document.addEventListener("keydown", onKey);
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open, onClose]);
    
    if (!open) return null;

    
    return ReactDOM.createPortal(
        <section className="fixed inset-0 z-50">
            <section className="absolute inset-0 bg-black/40" onClick={onClose}/>
            <section className="absolute inset-0 flex items-center justify-center p-4">
                <article
                    role="dialog"
                    aria-modal="true"
                    aria-label={title ?? "Dialog"}
                    className="w-full max-w-3xl rounded bg-[#E2E8F0] p-4 shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                    >
                        <header className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">{title}</h2>
                            <button 
                                 type="submit"
                                 onClick={onClose}
                                 aria-label="Stäng"
                                 className="close-btn rounded-2xl p-2 bg-white border "                             >
                                <AiOutlineClose/>
                            </button>
                        </header>
                        {children}
                </article>
            </section>
        </section>,   
        document.body
    )
};

export default Modal;