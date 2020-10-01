import React from "react";
import { connect } from "react-redux";
import { clearState } from "../../../actions/authActions";
import { clearAll } from "../../../actions/friendActions";
import { clearChatState } from "../../../actions/chatroomActions";
import { useHistory } from "react-router-dom";

const LogoutModal = ({
  auth: { token },
  clearState,
  clearAll,
  clearChatState,
  toggleLogoutModal,
  setToggleLogoutModal,
}) => {
  const history = useHistory();

  const logUserOut = (e) => {
    if (token) {
      clearState();
      clearAll();
      clearChatState();
      history.push("/login");
    } else {
      console.log("nothing happened");
    }
  };

  const closeTheModal = (e) => {
    if (e.target.className === "innerLogoutModal") {
      setToggleLogoutModal(!toggleLogoutModal);
    }
  };

  const cancelLogoutPrompt = ()=>{
    setToggleLogoutModal(!toggleLogoutModal);
  }

  return (
    <div classname="">
      <div className="innerLogoutModal" onClick={closeTheModal}>
        <section className="logoutTheUserModal hideOnSmallMedia flexCenterColumn">
          <p className="">Are you sure you want to logout? </p>
          <div classname="flexSpaceBetween">
            {" "}
            <button
              onClick={logUserOut}
              className="logoutBtns whiteText redBackground logoutBtnWidth mg-left1 mg-right1"
            >
              Yes
            </button>
            <button
              className="logoutBtns whiteBackground logoutBtnWidth mg-left1 mg-right1"
              onClick={cancelLogoutPrompt}
            >
              No
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  chatroom: state.chatroom,
});

export default connect(mapStateToProps, {
  clearState,
  clearAll,
  clearChatState,
})(LogoutModal);
