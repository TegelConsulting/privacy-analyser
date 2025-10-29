"use Client"
import "../../app/styles/analysis/Loader.css"

export const Loader = () => {
    return (
        <section className="loaderContainer">
          <p>
            Laddar
            <span className="dot dot1">.</span>
            <span className="dot dot2">.</span>
            <span className="dot dot3">.</span>
          </p>
        </section>

    )
}