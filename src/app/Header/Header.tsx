"use client";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons"
import { faContactBook, faHome, faInfoCircle, faSearch, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../css/Header.css"
import "../css/Nav.css"
import { useEffect, useState } from "react"
import { BsShare } from "react-icons/bs";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sideList = [
    {
      icon: <FontAwesomeIcon icon={faHome} />,
      title: "Hem",
    },
    {
      icon: <FontAwesomeIcon icon={faProductHunt}/>,
      title: "Produkter",
    },
    {
      icon: <FontAwesomeIcon icon={faInfoCircle}/>,
      title: "Om",
    },
    {
      icon: <FontAwesomeIcon icon={faContactBook}/>,
      title: "Kontakter",
    },
  ];

  const navList = [
       {
      icon: <FontAwesomeIcon icon={faHome} />,
      title: "Hem",
    },
    {
      icon: <FontAwesomeIcon icon={faProductHunt}/>,
      title: "Produkter",
    },
    {
      icon: <FontAwesomeIcon icon={faInfoCircle}/>,
      title: "Om",
    },
    {
      icon: <FontAwesomeIcon icon={faContactBook}/>,
      title: "Kontakter",
    },
  ];

  const handleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleEscKeyPress = (e: any) => {
      if (e.keyCode === 27 && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.setProperty("overflow", "hidden");
    } else {
      document.body.style.removeProperty("overflow");
    }

    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isOpen]);

  return (
    <nav className="flex w-full items-center px-6 h-16 bg-white text-gray-700 border-b border-gray-200 z-10">
      <div className="flex items-center">
        {/* Mobile */}
        <button className="mr-2 hamburger-icon" aria-label="Open Menu" onClick={handleDrawer}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>        
      </div>

      {/* Desktop */}
      <section className="grid">
        <section className="navList hidden md:flex md md:bg-transparent ">
          {navList.map(({ icon, title }, index) => {
            return (
              <li
                key={index}
                title="Wishlist"
                className="listItem flex items-center p-3 font-medium mr-2 text-center rounded focus:outline-none focus:bg-gray-400"
              >
                <span>{icon}</span>
                <span>{title}</span>
              </li>
            );
          })}
        </section>
      </section>
      
        <section className="icon-container">
          <input type="text" />
          <FontAwesomeIcon icon={faSearch}/>
          <FontAwesomeIcon icon={faUser}/>

        </section>
        
        <section className="icon-container-mobile">
          <FontAwesomeIcon icon={faSearch}/>
          <FontAwesomeIcon icon={faUser}/>

        </section>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-20"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}

        <aside
          className={`transform top-0 left-0 w-full bg-black fixed h-full overflow-auto 
                      ease-in-out transition-all duration-300 z-30 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
        <header className="headrow">
          <section className="logo">Privacy Analyser</section>

          {/* Gör close som en knapp och ta bort inset-0 */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="close-icon"   // behåll bara denna klass här
            aria-label="Stäng meny"
          >
            <span className="closebar"></span>
            <span className="closebar"></span>
          </button>
        </header>
        {sideList.map(({ icon, title }, index) => {
          return (
            <span
              key={index}
              className="listItem flex items-center p-4 border-b"
            >
              <span className="mr-2">{icon}</span> <span>{title}</span>
            </span>
          );
        })}
        <div className="fixed bottom-0 w-full">
          <button className="flex items-center p-4 text-white bg-blue-500 w-full">
            <span className="mr-2">
              <BsShare className="text-2xl" />
            </span>

            <span>Share</span>
          </button>
        </div>
      </aside>
    </nav>
  );
};

