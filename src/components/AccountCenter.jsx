import PropTypes from "prop-types";

const AccountCenter = ({ setLoggedIn, setSignUp, loggedIn }) => {
  const accName = JSON.parse(localStorage.getItem("savedUserData")).username;

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
    setSignUp(false);
  }

  return (
    <>
      {loggedIn && (
        <div>
          <h2>Account Center</h2>

          <div>
            <p>Username: {accName}</p>
            <p>Delete account</p>
            <p onClick={handleLogOut}>Log out</p>
          </div>
        </div>
      )}
    </>
  );
};

AccountCenter.propTypes = {
  setLoggedIn: PropTypes.func.isRequired,
  setSignUp: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default AccountCenter;
