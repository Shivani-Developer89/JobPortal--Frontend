function ProfileSidebar({
    name,
    role,
    completion,
    onSave,
    onNavigate
}) {

    const handleNavigation = (section) => {
        if (onNavigate) {
            onNavigate(section);
        } else {
            document.getElementById(section)?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    };

    return (
        <aside className="profile-sidebar">

            {/* PROFILE SUMMARY */}
            <div className="sidebar-profile">

                <div className="sidebar-avatar">
                    <i className="bi bi-person-fill"></i>
                </div>

                <div className="sidebar-profile-info">
                    <h4>{name || "Candidate"}</h4>
                    <span>{role || "Candidate"}</span>
                </div>

            </div>


            {/* COMPLETION */}
            <div className="sidebar-completion">

                <div className="sidebar-completion-top">
                    <span>Profile Completion</span>
                    <strong>{completion || 0}%</strong>
                </div>

                <div className="sidebar-progress">
                    <div
                        className="sidebar-progress-value"
                        style={{
                            width: `${completion || 0}%`
                        }}
                    />
                </div>

            </div>


            {/* QUICK LINKS */}
            <div className="profile-sidebar-title">
                Quick Links
            </div>

            <nav className="profile-sidebar-nav">

                <button
                    type="button"
                    className="sidebar-nav-btn"
                    onClick={() => handleNavigation("personal")}
                >
                    <i className="bi bi-person"></i>
                    <span>Personal Information</span>
                </button>

                <button
                    type="button"
                    className="sidebar-nav-btn"
                    onClick={() => handleNavigation("education")}
                >
                    <i className="bi bi-mortarboard"></i>
                    <span>Education</span>
                </button>

                <button
                    type="button"
                    className="sidebar-nav-btn"
                    onClick={() => handleNavigation("skills")}
                >
                    <i className="bi bi-tools"></i>
                    <span>Skills</span>
                </button>

                <button
                    type="button"
                    className="sidebar-nav-btn"
                    onClick={() => handleNavigation("experience")}
                >
                    <i className="bi bi-briefcase"></i>
                    <span>Experience</span>
                </button>

                <button
                    type="button"
                    className="sidebar-nav-btn"
                    onClick={() => handleNavigation("resume")}
                >
                    <i className="bi bi-file-earmark-text"></i>
                    <span>Resume</span>
                </button>

                <button
                    type="button"
                    className="sidebar-nav-btn"
                    onClick={() => handleNavigation("social")}
                >
                    <i className="bi bi-share"></i>
                    <span>Social Profiles</span>
                </button>

            </nav>


            {/* SAVE */}
            <div className="sidebar-save">

                <button
                    type="button"
                    className="sidebar-save-btn"
                    onClick={onSave}
                >
                    <i className="bi bi-check2-circle"></i>
                    <span>Save Profile</span>
                </button>

            </div>

        </aside>
    );
}

export default ProfileSidebar;