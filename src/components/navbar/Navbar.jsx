import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Navbar = () => {

    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);

    const { pathname } = useLocation();

    const isActive = () => {
        window.scrollY > 0 ? setActive(true) : setActive(false)
    };

    useEffect(() => {
        window.addEventListener("scroll", isActive);

        return () => {
            window.removeEventListener("scroll", isActive);
        }
    }, []);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await newRequest.post("/auth/logout");
            localStorage.setItem("currentUser", null);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
            <div className="container">
                <div className="logo">
                    <Link className="link" to="/">
                        <span className="text">househuntHQ</span>
                    </Link>
                    <span className="dot">.</span>
                </div>
                <div className="links">
                    <span>About househuntHQ</span>
                    <Link className="link" to="/gigs?cat="><span>Explore</span></Link>
                    <Link className="link" to="/gigs?cat=Roommate Required"><span>Find Your Next Roommate</span></Link>
                    {!currentUser?.isSeller && <Link className="link" to="/register"><span>List Your Property</span></Link>}
                    {currentUser ? (
                        <div className="user" onClick={() => setOpen(!open)}>
                            <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
                            <span>{currentUser?.username}</span>
                            {open && (
                                <div className="options">
                                    {currentUser.isSeller && (
                                        <>
                                            <Link className="link" to="/mygigs">
                                                Listings
                                            </Link>
                                            <Link className="link" to="/add">
                                                Add New Listing
                                            </Link>
                                        </>
                                    )}
                                    {currentUser.isSeller ? (
                                        <Link className="link" to="/orders">
                                            Communication Requests
                                        </Link>
                                    ) : (
                                        <Link className="link" to="/orders">
                                            Selected Listings
                                        </Link>
                                    )}
                                    <Link className="link" to="/messages">
                                        Messages
                                    </Link>
                                    <Link className="link" onClick={handleLogout}>
                                        Logout
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="link">Sign in</Link>
                            <Link className="link" to="/register">
                                <button>Join</button>
                            </Link>
                        </>
                    )}
                </div>

            </div>
            {(active || pathname !== "/") && (
                <>
                    <hr />
                    <div className="menu">
                        <Link className="link menuLink" to="/gigs?cat=Kharar">
                            Kharar: Flats and pg's
                        </Link>
                        <Link className="link" to="/gigs?cat=Chandigarh University">
                            Near Chandigarh University
                        </Link>
                        <Link className="link" to="/gigs?cat=GBP Crest">
                            GBP Crest
                        </Link>
                        <Link className="link" to="/gigs?cat=Gharuan">
                            Gharuan
                        </Link>
                        <Link className="link" to="/gigs?cat=Omega City">
                            Omega City
                        </Link>
                        <Link className="link" to="/gigs?cat=Mamupur">
                            Mamupur
                        </Link>
                        <Link className="link" to="/gigs?cat=Sahibzada Ajit Singh Nagar">
                            Sahibzada Ajit Singh Nagar
                        </Link>
                        <Link className="link" to="/gigs?cat=Bhago Majra">
                            Bhago Majra
                        </Link>
                        <Link className="link" to="/gigs?cat=Roommate Required">
                            Roommate Required
                        </Link>
                    </div>
                    <hr />
                </>
            )}

        </div>
    )
};

export default Navbar;