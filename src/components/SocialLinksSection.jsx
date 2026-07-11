function SocialLinksSection({
    profile,
    handleChange
}) {

    return (

        <div className="card shadow-sm mb-4">

            <div className="card-header">

                <h5 className="mb-0">
                    Social Profiles
                </h5>

            </div>

            <div className="card-body">

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            <i className="bi bi-github me-2"></i>
                            GitHub
                        </label>

                        <input
                            type="url"
                            className="form-control"
                            name="github"
                            placeholder="https://github.com/username"
                            value={profile.github}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            <i className="bi bi-linkedin me-2"></i>
                            LinkedIn
                        </label>

                        <input
                            type="url"
                            className="form-control"
                            name="linkedin"
                            placeholder="https://linkedin.com/in/username"
                            value={profile.linkedin}
                            onChange={handleChange}
                        />

                    </div>

                    

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            <i className="bi bi-code-square me-2"></i>
                            LeetCode
                        </label>

                        <input
                            type="url"
                            className="form-control"
                            name="leetcode"
                            placeholder="https://leetcode.com/u/username"
                            value={profile.leetcode}
                            onChange={handleChange}
                        />

                    </div>

                    

                </div>

            </div>

        </div>

    );

}

export default SocialLinksSection;