import React from "react";
import PrivateHeader from "./PrivateHeader";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <PrivateHeader handleSignOut={this.props.handleSignOut} />
        <section className="center">
          <div className="form-container center">
            <h1 style={{ textAlign: "center" }}>Your Settings</h1>
            <form>
              <input
                className="input-field"
                type="text"
                placeholder="Image Link"
                name="settings-image-link"
              />
              <input
                className="input-field"
                type="text"
                placeholder="User Name"
                name="settings-username"
              />
              <textarea
                className="input-field"
                type="text"
                placeholder="bio"
                name="settings-bio"
              ></textarea>
              <input
                className="input-field"
                type="email"
                placeholder="Email"
                name="settings-email"
              />
              <input
                className="input-field"
                type="password"
                placeholder="New Password"
                name="settings-password"
              />
              <button type="submit" className="btn">
                Update Settings
              </button>
            </form>
          </div>
        </section>
      </>
    );
  }
}

export default Settings;
