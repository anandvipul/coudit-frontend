import utilityFunctions from "../services/HelperFunctionV0_2";
import { UserContext } from "../Root_0_3";
import { NavLink } from "react-router-dom";

function Header(props) {
  return (
    <UserContext.Consumer>
      {({ user }) => {
        let userInfo = user.user;
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
                  {utilityFunctions.admin.isSignedIn() ? (
                    <></>
                  ) : (
                    <>
                      <li className="link">
                        <NavLink to="/signin">Sign In</NavLink>
                      </li>
                      <li className="link">
                        <NavLink to="/signup">Sign Up</NavLink>
                      </li>
                    </>
                  )}
                  {utilityFunctions.admin.isSignedIn() ? (
                    <>
                      <li className="link">
                        <NavLink to="/compose">New Post</NavLink>
                      </li>
                      <li className="link">
                        <NavLink to="/settings">Settings</NavLink>
                      </li>
                      <li className="link">
                        <NavLink to="/profile">Profile</NavLink>
                      </li>
                      {/* <li className="link">
                      <form onSubmit={state.handleSignOut}>
                        <button type="submit" className="link-btn">
                          Sign Out
                        </button>
                      </form>
                    </li> */}
                      <li className="link">
                        <NavLink to="/signout">Sign Out</NavLink>
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                </ul>
              </nav>
            </header>
          </>
        );
      }}
    </UserContext.Consumer>
  );
}

export default Header;
