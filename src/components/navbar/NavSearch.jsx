import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaSearch,
    FaUser,
    FaFileAlt,
    FaHeart,
    FaBriefcase,
    FaUsers,
    FaCog
} from "react-icons/fa";

function NavSearch({ placeholder }) {

    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const navigationItems = [
        {
            label: "My Profile",
            description: "View and edit your profile",
            keywords: ["profile", "my profile", "account"],
            icon: <FaUser />,
            path: role === "RECRUITER"
                ? "/recruiter/profile"
                : "/candidate/profile"
        },

        {
            label: "Resume",
            description: "Manage your resume",
            keywords: ["resume", "cv", "curriculum"],
            icon: <FaFileAlt />,
            path: "/candidate/profile"
        },

        {
            label: "Saved Jobs",
            description: "View your saved jobs",
            keywords: ["saved", "saved jobs", "bookmarks"],
            icon: <FaHeart />,
            path: "/saved-jobs"
        },

        {
            label: "Jobs",
            description: "Browse available jobs",
            keywords: ["jobs", "job", "browse jobs"],
            icon: <FaBriefcase />,
            path: "/jobs"
        },

        ...(role === "RECRUITER"
            ? [
                {
                    label: "My Jobs",
                    description: "Manage jobs you posted",
                    keywords: ["my jobs", "posted jobs", "manage jobs"],
                    icon: <FaBriefcase />,
                    path: "/recruiter/jobs"
                },

                {
                    label: "Applicants",
                    description: "View job applicants",
                    keywords: ["applicants", "candidates", "applications"],
                    icon: <FaUsers />,
                    path: "/recruiter/applicants"
                }
            ]
            : []),

        {
            label: "Settings",
            description: "Manage your settings",
            keywords: ["settings", "preferences", "account settings"],
            icon: <FaCog />,
            path: role === "RECRUITER"
                ? "/recruiter/settings"
                : "/candidate/settings"
        }
    ];

    const trimmedQuery = query.trim().toLowerCase();

    const filteredItems = trimmedQuery
        ? navigationItems.filter(item =>
            item.keywords.some(keyword =>
                keyword.includes(trimmedQuery) ||
                trimmedQuery.includes(keyword)
            )
        )
        : navigationItems;

    const handleSearch = (e) => {

        e.preventDefault();

        const value = query.trim();

        if (!value) {
            return;
        }

        // First check portal navigation items
        const matchedItem = navigationItems.find(item =>
            item.keywords.some(keyword =>
                keyword.toLowerCase() === value.toLowerCase()
            )
        );

        if (matchedItem) {
            navigate(matchedItem.path);
            setQuery("");
            return;
        }

        // Otherwise treat it as a job search
        navigate(
            `/jobs?keyword=${encodeURIComponent(value)}`
        );

        setQuery("");
    };

    const handleItemClick = (path) => {
        navigate(path);
        setQuery("");
    };

    return (

        <div className="nav-search-wrapper">

            <form
                className="nav-search"
                onSubmit={handleSearch}
            >

                <FaSearch />

                <input
                    type="text"
                    placeholder={
                        placeholder ||
                        "Search jobs, profile, resume..."
                    }
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

            </form>


            {query.trim() && (

                <div className="nav-search-dropdown">

                    {/* Navigation Results */}

                    {filteredItems.length > 0 && (

                        <>
                            <div className="search-section-title">
                                Quick Access
                            </div>

                            {filteredItems.map((item) => (

                                <button
                                    key={item.label}
                                    className="search-result-item"
                                    onClick={() =>
                                        handleItemClick(item.path)
                                    }
                                >

                                    <span className="search-result-icon">
                                        {item.icon}
                                    </span>

                                    <span className="search-result-content">

                                        <strong>
                                            {item.label}
                                        </strong>

                                        <small>
                                            {item.description}
                                        </small>

                                    </span>

                                </button>

                            ))}
                        </>
                    )}


                    {/* Job Search */}

                    <button
                        className="search-job-result"
                        onClick={handleSearch}
                    >

                        <span className="search-result-icon">
                            <FaSearch />
                        </span>

                        <span className="search-result-content">

                            <strong>
                                Search jobs for "{query}"
                            </strong>

                            <small>
                                Find jobs matching your search
                            </small>

                        </span>

                    </button>

                </div>
            )}

        </div>
    );
}

export default NavSearch;