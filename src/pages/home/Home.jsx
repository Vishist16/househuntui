import React from "react";
import "./Home.scss"
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import {cards, projects} from "../../data";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";

const Home = () => {
    return (
        <div className="home">
            <Featured />
            <TrustedBy />
            <Slide slidesToShow={5} arrowsScroll={4}>
                {cards.map(card=>(
                    <CatCard key={card.id} item={card} />
                ))}
            </Slide>
            <div className="features">
                <div className="container">
                    <div className="item">
                        <h1>A whole world of Homes and Companions at your fingertips</h1>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            The best of every budget
                        </div>
                        <p>
                            Find high quality services at every price point. No hourly rates, just project-based pricing.
                        </p>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            Quality work done quickly
                        </div>
                        <p>
                            Find the right freelancer to begin working on your project within minutes.
                        </p><div className="title">
                            <img src="./img/check.png" alt="" />
                            Protected payments, every time
                        </div>
                        <p>
                            Always know what you'll pay upfront. Your payment isn't released until you approve the work.
                        </p><div className="title">
                            <img src="./img/check.png" alt="" />
                            24/7 support
                        </div>
                        <p>
                            Questions? Our round-the-clock support team is available to help anytime, anywhere..
                        </p>
                    </div>
                    <div className="item">
                        <video src="public/img/video.mp4" controls></video>
                    </div>
                </div>
            </div>
            <div className="features dark">
                <div className="container">
                    <div className="item">
                        <h1>houseHuntHQ Business</h1>
                        <h1>A business solution designed for people and owners</h1>
                        <p>Upgrade to a curated experience packed with tools and benefits, dedicated to businesses</p>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            Connect to people with proven similiar intrests
                        </div>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            Get matched with the perfect person by a profile matching algorithm
                        </div>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            Manage teamwork and boost productivity with one powerful workspace
                        </div>
                        <button>Explore houseHuntHQ Business</button>
                    </div>
                    <div className="item">
                        <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624757/business-desktop-870-x1.png" alt="" />
                    </div>
                </div>
            </div>
            <Slide slidesToShow={4} arrowsScroll={4}>
                {projects.map(card=>(
                    <ProjectCard key={card.id} item={card} />
                ))}
            </Slide>
        </div>
    )
}

export default Home;