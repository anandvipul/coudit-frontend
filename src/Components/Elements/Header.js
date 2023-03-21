import { NavLink } from "react-router-dom";

export default function Header(props) {
  return (
    <>
      <header className="center">
        <nav className="safe-side">
          <div className="logo">coudit</div>
          <ul className="nav-links">
            <li className="link">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="link">
              <NavLink to="/signin">Sign In</NavLink>
            </li>
            <li className="link">
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
