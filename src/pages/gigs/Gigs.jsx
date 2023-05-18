import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
//import { gigs } from "../../data";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Gigs() {
    const [sort, setSort] = useState("sales");
    const [open, setOpen] = useState(false);
    const minRef = useRef();
    const maxRef = useRef();

    const { search } = useLocation();

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ["gigs"],
        queryFn: () =>
            newRequest
                .get(
                    `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
                )
                .then((res) => {
                    return res.data;
                }),
    });

    console.log(data);

    const reSort = (type) => {
        setSort(type);
        setOpen(false);
    };

    useEffect(() => {
        refetch();
    }, [sort]);

    const apply = () => {
        refetch();
    };

    return (
        <div className="gigs">
            <div className="container">
                <span className="breadcrumbs">HouseHuntHQ {">"} Availaible Listings {">"}</span>
                <h1>Available Accomodations</h1>
                <p>
                    Find your ideal flat/pg/roommate with ease and embark on a new chapter of shared living
                </p>
                <div className="menu">
                    <div className="left">
                        <span>Budget</span>
                        <input ref={minRef} type="number" placeholder="min" />
                        <input ref={maxRef} type="number" placeholder="max" />
                        <button onClick={apply}>Apply</button>
                    </div>
                    <div className="right">
                        <span className="sortBy">Sort by</span>
                        <span className="sortType">
                            {sort === "sales" ? "Best Rated" : "Newest"}
                        </span>
                        <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
                        {open && (
                            <div className="rightMenu">
                                {sort === "sales" ? (
                                    <span onClick={() => reSort("createdAt")}>Newest</span>
                                ) : (
                                    <span onClick={() => reSort("sales")}>Best Rated</span>
                                )}
                                <span onClick={() => reSort("sales")}>Popular</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="cards">
                    {isLoading
                        ? "loading"
                        : error
                            ? "Something went wrong!"
                            : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
                </div>
            </div>
        </div>
    );
}

export default Gigs;