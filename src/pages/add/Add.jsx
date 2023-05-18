import React, { useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer.js";
import upload from "../../utils/upload.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const [singleFile, setSingleFile] = useState(undefined);
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

    const handleChange = (e) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: { name: e.target.name, value: e.target.value },
        });
    };
    const handleFeature = (e) => {
        e.preventDefault();
        dispatch({
            type: "ADD_FEATURE",
            payload: e.target[0].value,
        });
        e.target[0].value = "";
    };

    const handleUpload = async () => {
        setUploading(true);
        try {
            const cover = await upload(singleFile);

            const images = await Promise.all(
                [...files].map(async (file) => {
                    const url = await upload(file);
                    return url;
                })
            );
            setUploading(false);
            dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
        } catch (err) {
            console.log(err);
        }
    };

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (gig) => {
            return newRequest.post("/gigs", gig);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["myGigs"]);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(state);
        navigate("/mygigs")
    };

    return (
        <div className="add">
            <div className="container">
                <h1>Add New Listing</h1>
                <div className="sections">
                    <div className="info">
                        <label htmlFor="">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. pg available near kharar bus stand"
                            onChange={handleChange}
                        />
                        <label htmlFor="">Location / Roommate Required (select from drop down)</label>
                        <select name="cat" id="cat" onChange={handleChange}>
                            <option value="Chandigarh University">Select From DropDown</option>
                            <option value="Chandigarh University">Near Chandigarh University</option>
                            <option value="Roommate Required">Roommate Required</option>
                            <option value="Kharar">Kharar</option>
                            <option value="GBP Crest">GBP Crest</option>
                            <option value="Gharuan">Gharuan</option>
                            <option value="Omega City">Omega City</option>
                            <option value="Mamupur">Mamupur</option>
                            <option value="Sahibzada Ajit Singh Nagar">Sahibzada Ajit Singh Nagar</option>
                            <option value="Bhago Majra">Bhago Majra</option>
                        </select>
                        <div className="images">
                            <div className="imagesInputs">
                                <label htmlFor="">Cover Image</label>
                                <input
                                    type="file"
                                    onChange={(e) => setSingleFile(e.target.files[0])}
                                />
                                <label htmlFor="">Upload Images</label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={(e) => setFiles(e.target.files)}
                                />
                            </div>
                            <button onClick={handleUpload}>
                                {uploading ? "uploading" : "Upload"}
                            </button>
                        </div>
                        <label htmlFor="">Description</label>
                        <textarea
                            name="desc"
                            id=""
                            placeholder="Brief descriptions about the property, location and address"
                            cols="0"
                            rows="16"
                            onChange={handleChange}
                        ></textarea>
                        <button onClick={handleSubmit}>Create</button>
                    </div>
                    <div className="details">
                        <label htmlFor="">Short Title</label>
                        <input
                            type="text"
                            name="shortTitle"
                            placeholder="e.g. pg available near kharar bus stand"
                            onChange={handleChange}
                        />
                        <label htmlFor="">Address</label>
                        <textarea
                            name="shortDesc"
                            onChange={handleChange}
                            id=""
                            placeholder="e.g. H.No. 00917 , Block - 5 ,Friends colony, opp. Main Bus Stand, Kharar, Punjab 140301"
                            cols="30"
                            rows="10"
                        ></textarea>
                        <label htmlFor="">Hours Open (e.g. 24 Hours)</label>
                        <input type="number" name="deliveryTime" onChange={handleChange} />
                        <label htmlFor="">Deposit Amount</label>
                        <input
                            type="number"
                            name="revisionNumber"
                            onChange={handleChange}
                        />
                        <label htmlFor="">Add Furniture / Facilities</label>
                        <form action="" className="add" onSubmit={handleFeature}>
                            <input type="text" placeholder="e.g. page design" />
                            <button type="submit">add</button>
                        </form>
                        <div className="addedFeatures">
                            {state?.features?.map((f) => (
                                <div className="item" key={f}>
                                    <button
                                        onClick={() =>
                                            dispatch({ type: "REMOVE_FEATURE", payload: f })
                                        }
                                    >
                                        {f}
                                        <span>X</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <label htmlFor="">Price</label>
                        <input type="number" onChange={handleChange} name="price" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add;