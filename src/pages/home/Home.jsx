import React from "react";
import "./Home.scss"
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import { cards, projects } from "../../data";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home">
            <Featured />
            <TrustedBy />
            <Slide slidesToShow={5} arrowsScroll={4}>
                {cards.map(card => (
                    <CatCard key={card.id} item={card} />
                ))}
            </Slide>
            <div className="features">
                <div className="container">
                    <div className="item">
                        <h1>A whole world of Roommates and Companions at your fingertips</h1>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            Find the perfect match for every budget
                        </div>
                        <p>
                            Discover high-quality roommates and companions at various price points.
                        </p>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            Quick and efficient search
                        </div>
                        <p>
                            Find the ideal roommate or companion that suits your preferences within minutes.
                        </p>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            Safe and secure
                        </div>
                        <p>
                            Your data is protected protected.
                        </p>
                        <div className="title">
                            <img src="./img/check.png" alt="" />
                            24/7 support
                        </div>
                        <p>
                            Have questions? Our dedicated support team is available round-the-clock to assist you.
                        </p>
                    </div>
                    <div className="item">
                        <img className="vidrep" src="./img/vidrep.jpg" alt="" />
                        {/* <video src="public/img/video.mp4" controls></video> */}
                    </div>
                </div>
            </div>
            <div className="features dark">
                <div className="container">
                    <div className="item">
                        <h1>houseHuntHQ </h1>
                        <h1>A solution designed for people and owners</h1>
                        <p>Upgrade to a curated experience packed with tools and benefits, dedicated to users</p>
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
                        <Link className="link" to="/gigs?cat="><button>Explore houseHuntHQ</button></Link>
                    </div>
                    <div className="item">
                        <img src="./img/shutp.jpg" alt="" />
                    </div>
                </div>
            </div>
            {/* <Slide slidesToShow={4} arrowsScroll={4}>
                {projects.map(card => (
                    <ProjectCard key={card.id} item={card} />
                ))}
            </Slide> */}
        </div>
    )
}

export default Home;