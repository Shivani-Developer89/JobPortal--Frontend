import "../../styles/hero.css";
import HeroImage from "../../assets/images/hero.svg";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";


const Hero = () => {

    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("");

    const navigate = useNavigate();

    const { role } = useAuth();


    /* =========================
       BROWSE JOBS
    ========================= */

    const handleBrowseJobs = () => {
        navigate("/jobs");
    };


    /* =========================
       POST JOB
    ========================= */

    const handlePostJob = () => {
        navigate("/post-job");
    };


    /* =========================
       SEARCH
    ========================= */

   const handleSearch = () => {

    const cleanKeyword = keyword.trim();
    const cleanLocation = location.trim();

    if (!cleanKeyword && !cleanLocation) {
        navigate("/jobs");
        return;
    }

    const params = new URLSearchParams();

    if (cleanKeyword) {
        params.set("keyword", cleanKeyword);
    }

    if (cleanLocation) {
        params.set("location", cleanLocation);
    }

    navigate(`/jobs?${params.toString()}`);
};





    /* =========================
       ENTER KEY
    ========================= */

    const handleKeyDown = (event) => {

        if (event.key === "Enter") {
            handleSearch();
        }

    };


    return (

        <section className="hero-section">

            <div className="container">

                <div className="row align-items-center">


                    {/* ================================
                        LEFT SIDE
                    ================================= */}

                    <div className="col-lg-6">

                        <h1 className="hero-title">
                            Build Your <br />
                            <span>Career</span> With Confidence
                        </h1>


                        <p className="hero-subtitle">
                            Discover opportunities from verified employers and
                            take the next step in your professional journey.
                        </p>


                        {/* ================================
                            JOB SEARCH
                        ================================= */}

                        <div className="row g-2 mt-4">


                            {/* JOB TITLE */}

                            <div className="col-md-5">

<input
    type="text"
    className="form-control form-control-lg"
    placeholder="Job title"
    value={keyword}
    onChange={(e) => setKeyword(e.target.value)}
    onKeyDown={handleKeyDown}
/>

                            </div>


                            {/* LOCATION */}

                            <div className="col-md-4">
<input
    type="text"
    className="form-control form-control-lg"
    placeholder="Location"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    onKeyDown={handleKeyDown}
/>

                            </div>


                            {/* SEARCH BUTTON */}

                            <div className="col-md-3">

                               <button
    type="button"
    className="btn btn-primary btn-lg w-100"
    onClick={handleSearch}
>
    Search
</button>

                            </div>

                        </div>


                        {/* ================================
                            ROLE BASED BUTTONS
                        ================================= */}

                        <div className="hero-buttons mt-4">

                            <button
                                type="button"
                                className="btn btn-primary me-3"
                                onClick={handleBrowseJobs}
                            >
                                Browse Jobs
                            </button>


                            {role === "RECRUITER" && (

                                <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    onClick={handlePostJob}
                                >
                                    Post a Job
                                </button>

                            )}

                        </div>


                        {/* ================================
                            STATS
                        ================================= */}

                        <div className="hero-stats mt-5">

                            <div>

                                <h3>1500+</h3>

                                <p>Jobs</p>

                            </div>


                            <div>

                                <h3>250+</h3>

                                <p>Companies</p>

                            </div>


                            <div>

                                <h3>800+</h3>

                                <p>Candidates</p>

                            </div>

                        </div>

                    </div>


                    {/* ================================
                        RIGHT SIDE
                    ================================= */}

                    <div className="col-lg-6 text-center">

                        <img
                            src={HeroImage}
                            alt="Hero"
                            className="img-fluid hero-image"
                        />

                    </div>

                </div>

            </div>

        </section>

    );
};


export default Hero;