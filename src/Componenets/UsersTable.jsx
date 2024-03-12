import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { AxiosInstance } from "../Utils/AxiosInstance";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Search from "./SearchBar";

const UsersList = ({ usersList, fetchUsers, setUsersList }) => {
  const [userDetail, setUserDetail] = useState({});
  const [showUserModal, setShowUserModal] = useState(false);

  async function handleShowModal(id) {
    const { data } = await AxiosInstance.get(`/fitsy/api/v1/users/${id}`);
    setUserDetail(data);
    setShowUserModal(true);
  }

  const userDetailFormChange = (event) => {
    setUserDetail({
      ...userDetail,
      [event.target.name]: event.target.value,
    });
  };

  async function handleUserEditModal(id) {
    await AxiosInstance.put(`/fitsy/api/v1/users/${id}`, userDetail);
    toast.success("details updated successfully");
    setShowUserModal(false);
    fetchUsers();
  }

  async function deleteUser(id) {
    await AxiosInstance.delete(`/fitsy/api/v1/users/${id}`);
    const filteredData = usersList.filter((user) => user._id !== id);
    setUsersList(filteredData);
  }

  return (
    <>
      <div
        className="heading_search d-flex py-5 align-items-center justify-content-between"
        style={{
          position: "sticky",
          height: "50px",
          top: "0px",
          backgroundColor: "#1E1E1E",
          zIndex: "1000",
          marginBottom: "4px",
        }}
      >
        <h3 className="table_heading text-light">Users list </h3>
        <Search />
      </div>
      <div className="tables" style={{ zIndex: "0" }}>
        <table class="table table-dark diagnosis_table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Userid</th>
              <th scope="col">Email</th>
              <th scope="col">Usertype</th>
              <th scope="col">Userstatus</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersList?.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.userId}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>
                <td>
                  {user.userStatus === "PENDING" ? (
                    <span className="text-warning">PENDING</span>
                  ) : (
                    <span className="text-success">APPROVED</span>
                  )}
                </td>

                <td>
                  <div className="d-flex ">
                    <RiDeleteBin6Line
                      className="mx-3"
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => deleteUser(user._id)}
                    />
                    <FiEdit
                      style={{
                        cursor: "pointer",
                        color: "green",
                      }}
                      onClick={() => handleShowModal(user._id)}
                    />
                  </div>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        show={showUserModal}
        onHide={() => setShowUserModal(false)}
        centered
        backdrop="static"
        variant="dark"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="inputgroup mb-2">
            <div>Name</div>
            <input
              type="text"
              name="name"
              value={userDetail.name}
              onChange={userDetailFormChange}
              className="form-control"
              required
            />
          </div>
          <div className="inputgroup mb-2">
            <div>Userid</div>
            <input
              type="text"
              name="userId"
              value={userDetail.userId}
              onChange={userDetailFormChange}
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
              value={userDetail.email}
              onChange={userDetailFormChange}
            />
          </div>
          <div className="inputgroup mb-2">
            <div>Userstatus</div>
            <select
              className="form-select"
              required
              name="userStatus"
              value={userDetail.userStatus}
              onChange={userDetailFormChange}
            >
              <option value="APPROVED">APPROVED</option>
              <option value="PENDING">PENDING</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUserModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => handleUserEditModal(userDetail._id)}
          >
            Edit user
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UsersList;
