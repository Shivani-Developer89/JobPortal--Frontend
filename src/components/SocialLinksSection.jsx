import { useState } from "react";

function SocialLinksSection({
    profile,
    handleChange
}) {

    const [editing, setEditing] = useState(false);

    const hasSocialLinks =
        profile.github ||
        profile.linkedin ||
        profile.leetcode;

    return (

        <div className="social-section">

            <div className="social-card">

                {/* =========================
                    HEADER
                ========================= */}

                <div className="social-card-header">

                    <div>

                        <h5>
                            Social Profiles
                        </h5>

                        <p>
                            Professional and coding profiles
                        </p>

                    </div>

                    <div className="social-header-actions">

                        {!editing && (

                            <button
                                type="button"
                                className="social-edit-btn"
                                onClick={() => setEditing(true)}
                            >
                                <i className="bi bi-pencil me-1"></i>
                                Edit
                            </button>

                        )}

                        <div className="social-header-icon">
                            <i className="bi bi-share"></i>
                        </div>

                    </div>

                </div>


                {/* =================================================
                    VIEW MODE
                ================================================= */}

                {!editing && (

                    <div className="social-card-body">

                        {!hasSocialLinks ? (

                            <div className="social-empty">

                                <div className="social-empty-icon">
                                    <i className="bi bi-share"></i>
                                </div>

                                <div>

                                    <strong>
                                        No social profiles added
                                    </strong>

                                    <p>
                                        Add GitHub, LinkedIn or
                                        LeetCode profiles to help
                                        recruiters learn more about you.
                                    </p>

                                </div>

                            </div>

                        ) : (

                            <div className="social-profile-list">

                                {profile.github && (

                                    <a
                                        href={profile.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="social-profile-item"
                                    >

                                        <span className="social-icon github-icon">
                                            <i className="bi bi-github"></i>
                                        </span>

                                        <span className="social-profile-content">

                                            <strong>
                                                GitHub
                                            </strong>

                                            <small>
                                                {profile.github}
                                            </small>

                                        </span>

                                        <i className="bi bi-box-arrow-up-right social-link-arrow"></i>

                                    </a>

                                )}


                                {profile.linkedin && (

                                    <a
                                        href={profile.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="social-profile-item"
                                    >

                                        <span className="social-icon linkedin-icon">
                                            <i className="bi bi-linkedin"></i>
                                        </span>

                                        <span className="social-profile-content">

                                            <strong>
                                                LinkedIn
                                            </strong>

                                            <small>
                                                {profile.linkedin}
                                            </small>

                                        </span>

                                        <i className="bi bi-box-arrow-up-right social-link-arrow"></i>

                                    </a>

                                )}


                                {profile.leetcode && (

                                    <a
                                        href={profile.leetcode}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="social-profile-item"
                                    >

                                        <span className="social-icon leetcode-icon">
                                            <i className="bi bi-code-square"></i>
                                        </span>

                                        <span className="social-profile-content">

                                            <strong>
                                                LeetCode
                                            </strong>

                                            <small>
                                                {profile.leetcode}
                                            </small>

                                        </span>

                                        <i className="bi bi-box-arrow-up-right social-link-arrow"></i>

                                    </a>

                                )}

                            </div>

                        )}

                    </div>

                )}


                {/* =================================================
                    EDIT MODE
                ================================================= */}

                {editing && (

                    <div className="social-card-body">

                        <div className="row g-3">

                            {/* GITHUB */}

                            <div className="col-md-6">

                                <div className="social-field">

                                    <label
                                        htmlFor="github"
                                        className="social-label"
                                    >

                                        <span className="social-icon github-icon">
                                            <i className="bi bi-github"></i>
                                        </span>

                                        <span>
                                            GitHub
                                            <small>
                                                Your projects and repositories
                                            </small>
                                        </span>

                                    </label>

                                    <input
                                        id="github"
                                        type="url"
                                        className="form-control social-input"
                                        name="github"
                                        placeholder="https://github.com/username"
                                        value={profile.github || ""}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>


                            {/* LINKEDIN */}

                            <div className="col-md-6">

                                <div className="social-field">

                                    <label
                                        htmlFor="linkedin"
                                        className="social-label"
                                    >

                                        <span className="social-icon linkedin-icon">
                                            <i className="bi bi-linkedin"></i>
                                        </span>

                                        <span>
                                            LinkedIn
                                            <small>
                                                Your professional profile
                                            </small>
                                        </span>

                                    </label>

                                    <input
                                        id="linkedin"
                                        type="url"
                                        className="form-control social-input"
                                        name="linkedin"
                                        placeholder="https://linkedin.com/in/username"
                                        value={profile.linkedin || ""}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>


                            {/* LEETCODE */}

                            <div className="col-md-6">

                                <div className="social-field">

                                    <label
                                        htmlFor="leetcode"
                                        className="social-label"
                                    >

                                        <span className="social-icon leetcode-icon">
                                            <i className="bi bi-code-square"></i>
                                        </span>

                                        <span>
                                            LeetCode
                                            <small>
                                                Your coding practice profile
                                            </small>
                                        </span>

                                    </label>

                                    <input
                                        id="leetcode"
                                        type="url"
                                        className="form-control social-input"
                                        name="leetcode"
                                        placeholder="https://leetcode.com/u/username"
                                        value={profile.leetcode || ""}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                        </div>


                        {/* INFO */}

                        <div className="social-info">

                            <i className="bi bi-info-circle"></i>

                            <span>
                                Social profiles are optional, but they
                                can help recruiters understand your
                                technical background.
                            </span>

                        </div>


                        {/* ACTIONS */}

                        <div className="social-edit-actions">

                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => setEditing(false)}
                            >
                                <i className="bi bi-check2 me-1"></i>
                                Done
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setEditing(false)}
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default SocialLinksSection;