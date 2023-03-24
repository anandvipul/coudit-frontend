import { NavLink } from "react-router-dom";

export default function PrivateHeader(props) {
  return (
    <>
      <header className="center">
        <nav className="safe-side">
          <div className="logo">coudit</div>
          <ul className="nav-links">
            <li className="link">
              <NavLink replace to="/">
                Home
              </NavLink>
            </li>
            <li className="link">
              <NavLink to="/compose">New Post</NavLink>
            </li>
            <li className="link">
              <NavLink to="/settings">Settings</NavLink>
            </li>
            <li className="link">
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li className="link">
              <form onSubmit={props.handleSignOut}>
                <button type="submit" className="link-btn">
                  Sign Out
                </button>
              </form>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
