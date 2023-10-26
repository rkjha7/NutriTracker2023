import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
	return (
		<header className="header">
			<div className="logo">
				<Link to="/">NutriTracker</Link>
			</div>
			<ul></ul>
		</header>
	);
}

export default Header;
