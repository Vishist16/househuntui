import React, { useState } from "react";
import "./Featured.scss";
import {Link, useNavigate} from "react-router-dom";

const Featured = () =>{
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate(`gigs?search=${input}`);
    };

    return (
        <div className="featured">
            <div className="container">
                <div className="left">
                    <h1>Discover Your Ideal Home: Find the Perfect <i>Flat/PG and Roommate</i> Today!</h1>
                    <div className="search">
                        <div className="searchInput">
                            <img src="./img/search.png" alt="" />
                            <input type="text" placeholder='Try searching "Kharar"' onChange={e=>setInput(e.target.value)}/>
                        </div>
                    <button onClick={handleSubmit}>Search</button>
                    </div>
                    <div className="popular">
                        <span>Popular:</span>
                        <Link className="link menuLink" to="/gigs?cat=Kharar"><button>Kharar</button></Link>
                        <Link className="link" to="/gigs?cat=Gharuan"><button>Gharuan</button></Link>
                        <Link className="link" to="/gigs?cat=Chandigarh University"><button>Near Chandigarh University</button></Link>
                        <Link className="link" to="/gigs?cat=Omega City"><button>Omega City</button></Link>
                    </div>
                </div>
                <div className="right">
                    <img src="./img/Lman.png" alt="" />
                </div>
            </div>
        </div>
    )
};

export default Featured;