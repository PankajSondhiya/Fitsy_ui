import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setDpUrl,
  setShowUserModal,
  updateUser,
  updateUserInfo,
} from "../Slices/users";
import profileImage from "../Assets/whatappdp.jpg";
import { useEffect } from "react";
const UserModal = () => {
  const { userData, showUserModal, userInfo } = useSelector(
    (state) => state.users
  );

  const dispatch = useDispatch();

  // function handleDpChange(event) {
  //   const file = event.target.files[0];

  //   if (file) {
  //     const dpURL = URL.createObjectURL(file);
  //     console.log("Generated dpURL:", dpURL);
  //     dispatch(setDpUrl(dpURL));
  //     dispatch(updateUserInfo({ field: "photoUrl", value: dpURL }));
  //   }
  // }

  // console.log("userInfo", userInfo);

  return (
    <Modal
      show={showUserModal}
      onHide={() => dispatch(setShowUserModal(false))}
      centered
      backdrop="static"
      variant="dark"
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <div className="d-flex flex-column justify-content-center align-items-center"> */}
        {/* <img
            src={
              userInfo?.photoUrl
                ? userInfo.photoUrl
                : dpUrl
                ? dpUrl
                : profileImage
            }
            alt="profile_img"
            height={120}
            width={120}
            className="me-2"
            style={{ borderRadius: "50%", cursor: "pointer" }}
          />
          <div className="inputgroup mb-2">
            <input type="file" onChange={handleDpChange} />
          </div>
        </div> */}

        <div className="inputgroup mb-2">
          <div>Name</div>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={(event) =>
              dispatch(
                updateUserInfo({
                  field: "name",
                  value: event.target.value,
                })
              )
            }
            className="form-control"
            required
          />
        </div>
        <div className="inputgroup mb-2">
          <div>Userid</div>
          <input
            type="text"
            name="userId"
            value={userInfo.userId}
            onChange={(event) =>
              dispatch(
                updateUserInfo({
                  field: "userId",
                  value: event.target.value,
                })
              )
            }
            className="form-control"
            required
          />
        </div>
        <div className="inputgroup mb-2">
          <div>Email</div>
          <input
            className="form-control"
            required
            name="email"
            value={userInfo.email}
            onChange={(event) =>
              dispatch(
                updateUserInfo({ field: "email", value: event.target.value })
              )
            }
          />
        </div>

        {localStorage.getItem("userType") === "ADMIN" && (
          <div className="inputgroup mb-2">
            <div>Userstatus</div>
            <select
              className="form-select"
              required
              name="userStatus"
              value={userInfo.userStatus}
              onChange={(event) =>
                dispatch(
                  updateUserInfo({
                    field: "userStatus",
                    value: event.target.value,
                  })
                )
              }
            >
              <option value="APPROVED">APPROVED</option>
              <option value="PENDING">PENDING</option>
            </select>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => dispatch(setShowUserModal(false))}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            dispatch(updateUser({ id: userInfo._id, Data: userInfo }))
          }
        >
          Edit user
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
