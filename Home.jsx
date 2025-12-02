import { useState } from "react";
import CreditCard from "../components/CreditCard";
import { creditdata } from "../data/creditdata";
import './Home.css';

function Home(){
    const [credits]=useState(creditdata);
    return(
        <div className="home-page">
            {/*hero seccion*/}
            <section className="hero">
                <div className="hero-content">
                    <h1>diferentes tipos de credito para ti y tu familia</h1>
                    <p>
                        somos una familia que velamos por le bienestra de nuestros usuarios, bindamos difernetes tipos de credito a tu alcance.
                    </p>
                </div>
            </section>

            {/*seccion creditos*/}
            <section className="credits-section">
                <div className="container">
                    <h2>nuestros creditos</h2>
                    <div className="credits-grid">
                        {credits.map((credit)=>(<CreditCard key={credit.id} credit={credit} />))}
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Home;