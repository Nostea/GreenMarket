import SingleOffer from "../SingleOffer/SingleOffer";
import "./AllOffers.css";

const AllOffers = () => {
    return (
        <section className="alloffers-container">
            <div className="scroll-container">
                <SingleOffer/>
            </div>
        </section>
    );
}
 
export default AllOffers;