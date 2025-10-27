import { config, library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faHome, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Förhindra att Font Awesome lägger till sin egen CSS automatiskt
config.autoAddCss = false;

// Lägg till ikoner du vill använda
library.add(faUser, faHome, faInfoCircle);
