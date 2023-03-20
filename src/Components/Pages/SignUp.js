import Header from "../Elements/Header";
import Footer from "../Elements/Footer";

export default function SignUn(props) {
  return (
    <>
      <Header />

      <section className="center sign-up">
        <h1 style={{ marginBottom: 0, marginTop: "3rem" }}>Sign up</h1>
        <p style={{ marginBottom: "2rem" }}>Have an account ?</p>
        <div className="signup-container center">
          <form>
            <input
              className="input-field"
              type="name"
              name="name"
              placeholder="Your Name"
            />
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
            <button type="submit" className="signup-btn">
              Sign Up
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
