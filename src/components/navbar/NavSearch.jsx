import { FaSearch } from "react-icons/fa";

function NavSearch({ placeholder }) {

    return (

        <div className="nav-search">

            <FaSearch />

            <input
                type="text"
                placeholder={placeholder}
                
            />

        </div>

    );

}

export default NavSearch;