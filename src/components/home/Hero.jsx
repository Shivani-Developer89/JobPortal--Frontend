import "../../styles/hero.css";
import HeroImage from "../../assets/images/hero.svg";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center">

          {/* Left Side */}
          <div className="col-lg-6">

            <h1 className="hero-title">
              Build Your <br />
              <span>Career</span> With Confidence
            </h1>

            <p className="hero-subtitle">
              Discover opportunities from verified employers and
              take the next step in your professional journey.
            </p>

            {/* Search */}
            <div className="row g-2 mt-4">

              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Job title"
                />
              </div>

              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Location"
                />
              </div>

              <div className="col-md-3">
                <button className="btn btn-primary btn-lg w-100">
                  Search
                </button>
              </div>

            </div>

            {/* Buttons */}
            <div className="hero-buttons mt-4">
              <button className="btn btn-primary me-3">
                Browse Jobs
              </button>

              <button className="btn btn-outline-primary">
                Post a Job
              </button>
            </div>

            {/* Stats */}
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

          {/* Right Side */}
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