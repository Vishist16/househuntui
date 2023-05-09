import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {

    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);

    const {pathname} = useLocation();

    const isActive = () => {
        window.scrollY > 0 ? setActive(true) : setActive(false)
    };

    useEffect(()=>{
        window.addEventListener("scroll", isActive);

        return () => {
            window.removeEventListener("scroll", isActive);
        }
    },[]);

    const currentUser = {
        id: 1,
        username:"Havard 101",
        isSeller:true
    }

    return (
        <div className={active || pathname!=="/" ? "navbar active" : "navbar"}>
            <div className="container">
                <div className="logo">
                    <Link to="/" className="link">
                        <span className="text">houseHuntHQ</span>
                    </Link>
                    {/* <span className="text">houseHuntHQ</span> */}
                    <span className="dot">.</span>
                </div>
                <div className="links">
                    <span>houseHuntHQ Business</span>
                    <span>Explore</span>
                    <span>English</span>
                    <span>Sign In</span>
                    {!currentUser?.isSeller && <span>Become a Seller</span>}
                    {!currentUser && <button>Join</button>}
                    {currentUser && (
                        <div className="user" onClick={()=>setOpen(!open)}>
                            <img src="https://img.freepik.com/free-vector/letter-h-with-blossoms_53876-66878.jpg?w=740&t=st=1680720990~exp=1680721590~hmac=36f37b040cd9cde4216323a34fed0d840720d85594b9e1ddd665f0c6f225dc99" alt="" />
                            <span>{currentUser?.username}</span>
                            {open && <div className="options">
                                {
                                    currentUser?.isSeller && (
                                        <>
                                        <Link className="link" to="/mygigs">Gigs</Link>
                                        <Link className="link" to="/add">Add New Gig</Link>
                                        </>
                                    )
                                }
                                <Link className="link" to="/orders">Orders</Link>
                                <Link className="link" to="messages">Messages</Link>
                                <Link className="link" to="/">Logout</Link>
                            </div>}
                        </div>
                    )}
                </div>
                
            </div>
                { (active || pathname!=="/") &&(
                    <>
                        <hr/>
                        <div className="menu">
                            <Link className="link menuLink" to="/">
                                Graphics and Design
                            </Link>
                            <Link className="link" to="/">
                                Video & Animation
                            </Link>
                            <Link className="link" to="/">
                                Writing & Translation
                            </Link>
                            <Link className="link" to="/">
                                AI Services
                            </Link>
                            <Link className="link" to="/">
                                Digital Marketing
                            </Link>
                            <Link className="link" to="/">
                                Music & Audio
                            </Link>
                            <Link className="link" to="/">
                                Programming & Tech
                            </Link>
                            <Link className="link" to="/">
                                Business
                            </Link>
                            <Link className="link" to="/">
                                Lifestyle
                            </Link>
                        </div>
                        <hr />
                    </>
                )}
                    
        </div>
    )
};

export default Navbar;