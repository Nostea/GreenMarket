import "./GoBack.css";
import { Link } from "react-router-dom";
import BackButton from "../../../public/Back.png"

const GoBack = ({ title, onClick }) => {
    return (
        <section className="go-back" onClick={onClick}>
            {onClick ? <img src={BackButton} alt="Back Arrow Image" /> :
            <Link to={"/"}><img src={BackButton} alt="Back Arrow Image" /></Link>}
            {title && <span className="go-back-title">{title}</span>}
        </section>
    );
}
 
export default GoBack;