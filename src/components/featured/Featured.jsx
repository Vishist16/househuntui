import React from "react";
import "./Featured.scss"

const Featured = () =>{
    return (
        <div className="featured">
            <div className="container">
                <div className="left">
                    <h1>Discover Your Ideal Home: Find the Perfect <i>Flat/PG and Roommate</i> Today!</h1>
                    <div className="search">
                        <div className="searchInput">
                            <img src="./img/search.png" alt="" />
                            <input type="text" placeholder='Try searching "Kharar"' />
                        </div>
                    <button>Search</button>
                    </div>
                    <div className="popular">
                        <span>Popular:</span>
                        <button>Kharar</button>
                        <button>Gharuan</button>
                        <button>Near Chandigarh University</button>
                        <button>Omega City</button>
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