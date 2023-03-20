export default function Header(props) {
  return (
    <>
      <header className="center">
        <nav className="safe-side">
          <div className="logo">coudit</div>
          <ul className="nav-links">
            <li className="link">Home</li>
            <li className="link">Sign In</li>
            <li className="link">Sign Up</li>
          </ul>
        </nav>
      </header>
    </>
  );
}
