import Header from "../Elements/Header";
import Footer from "../Elements/Footer";

export default function SignIn(props) {
  return (
    <>
      <section className="center sign-in">
        <h1 style={{ marginBottom: 0, marginTop: "3rem" }}>Sign in</h1>
        <p style={{ marginBottom: "2rem" }}>need an account ?</p>
        <div className="signin-container center">
          <form>
            <input
              className="input-field"
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              className="input-field"
              type="password"
              name="password"
              placeholder="Password"
            />
            <button type="submit" className="signin-btn">
              Sign in
            </button>
          </form>
        </div>
      </section>
      <div className="footer-container">
        <Footer />
      </div>
    </>
  );
}
