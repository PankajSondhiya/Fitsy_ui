import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  fetchUserById,
  fetchUsers,
  setFilteredData,
  setShowUserModal,
} from "../Slices/users";
import UserModal from "./userModal";
import TableHeader from "./TableHeader";
import { auth } from "../Firebase/firebaseConfig";

const UsersList = () => {
  const { userData, filteredData } = useSelector((state) => state.users);
  const { usersList, isError, isLoading } = userData;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (usersList) {
      dispatch(setFilteredData(usersList));
    }
    fetchCurrentUserRole();
  }, [dispatch, usersList]);

  const fetchCurrentUserRole = async () => {
    const user = auth.currentUser;
    console.log("user", user);
    if (user) {
      const tokenResult = await user.getIdTokenResult();
      const isAdmin = tokenResult.claims.admin;
      console.log(isAdmin);
    }
  };

  function handleSearch(term) {
    if (usersList) {
      const filtered = usersList?.filter((user) =>
        user?.name?.toLowerCase().includes(term.toLowerCase())
      );
      dispatch(setFilteredData(filtered));
    }
  }
  console.log("users", filteredData);

  return (
    <>
      <TableHeader title="User Table" onSearch={handleSearch} />
      <div className="tables" style={{ zIndex: "0" }}>
        <table class="table table-dark diagnosis_table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              {/* <th scope="col">Userid</th> */}
              <th scope="col">Email</th>
              <th scope="col">Usertype</th>
              <th scope="col">Userstatus</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user?.name}</td>
                {/* <td>{user?.userId && user.userId}</td> */}
                <td>{user?.email}</td>
                <td>{user?.userType}</td>
                <td>
                  {user?.userStatus === "PENDING" ? (
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
                      onClick={() =>
                        dispatch(
                          deleteUser({
                            id: user?._id,
                            firebaseUid: user?.firebaseUid,
                          })
                        )
                      }
                    />
                    <FiEdit
                      style={{
                        cursor: "pointer",
                        color: "green",
                      }}
                      onClick={() => {
                        dispatch(fetchUserById({ id: user?._id }));
                        dispatch(setShowUserModal(true));
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UserModal />
    </>
  );
};

export default UsersList;
