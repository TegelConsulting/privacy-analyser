"use client";
import { CrossIcon, Icon } from "lucide-react";
import React, { useEffect } from "react";
import ReactDOM  from "react-dom";
import "../../app/styles/analysis/Modal.css"

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
                    className="w-full max-w-3xl rounded bg-white p-6 shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                    >
                        <header className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">{title}</h2>
                            <button
                                 onClick={onClose}
                                 aria-label="Stäng"
                                 className="rounded-md p-2 hover:bg-gray-100" 
                            >
                                </>
                            </button>
                        </header>
                </article>
            </section>
        </section>    
    );
};

export default Modal;