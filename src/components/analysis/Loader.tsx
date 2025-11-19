"use Client"
import "../../app/styles/analysis/Loader.css"
import React from "react"
import ReactDOM from "react-dom"

export const Loader: React.FC = () => {
    return ReactDOM.createPortal(
      <section className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
        <section className="loaderContainer">
          <p>
            Laddar
            <span className="dot dot1">.</span>
            <span className="dot dot2">.</span>
            <span className="dot dot3">.</span>
          </p>
        </section>
      </section>,
      document.body
    )
}