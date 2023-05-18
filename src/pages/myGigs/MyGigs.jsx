import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import getCurrentUser from "../../utils/getCurrentUser.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";

function MyGigs() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log(currentUser._id)
    const queryClient = useQueryClient();

    const { isLoading, error, data } = useQuery({
        queryKey: ["myGigs"],
        queryFn: () =>
            newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {
                return res.data;
            }),
    });
    console.log(data)

    const mutation = useMutation({
        mutationFn: (id) => {
            return newRequest.delete(`/gigs/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["myGigs"]);
        },
    });

    const handleDelete = (id) => {
        mutation.mutate(id);
    };

    return (
        <div className="myGigs">
            {isLoading ? (
                "loading"
            ) : error ? (
                "error"
            ) : (
                <div className="container">
                    <div className="title">
                        <h1>Listings</h1>
                        {currentUser.isSeller && (
                            <Link to="/add">
                                <button>Add New Listing</button>
                            </Link>
                        )}
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                {/* <th>Sales</th> */}
                                <th>Action</th>
                            </tr>
                            {data.map((gig) => (
                                <tr key={gig._id}>
                                    <td>
                                        <img className="img" src={gig.cover} alt="" />
                                    </td>
                                    <td><Link className="link" to={`/gig/${gig._id}`}>{gig.title}</Link></td>
                                    <td>{gig.price}</td>
                                    {/* <td>{gig.sales}</td> */}
                                    <td>
                                        <img
                                            className="delete"
                                            src="./img/delete.png"
                                            alt=""
                                            onClick={() => handleDelete(gig._id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default MyGigs;