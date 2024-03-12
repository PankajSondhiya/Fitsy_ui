import { MdHealthAndSafety } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import profileImage from "../Assets/whatappdp.jpg";
import { useEffect, useState } from "react";
import { Accordion, Button, Modal } from "react-bootstrap";
import { AxiosInstance } from "../Utils/AxiosInstance";
import { toast } from "react-toastify";

const Navbar = ({ setHospitalList, hospitalList }) => {
  const navigate = useNavigate();

  function HandleLogout() {
    localStorage.clear();
    navigate("/");
  }
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState({});
  const [profileImageUrl, setProfileImageUrl] = useState(profileImage);
  const [userData, setUserData] = useState({});
  const [iseditUser, setIsEditUser] = useState(false);
  const [doctorDetail, setDoctorDetail] = useState({});
  // const [isAdditionalDetails,setIsAdditionalDetails] =  useState(false)
  // const [additionalDetails,setIsAdditionalDetails]= useState({})
  const handleProfileModal = async () => {
    // fetchDoc();
    setIsEditUser(true);
    const id = localStorage.getItem("_id");
    setShowProfileModal(true);
    try {
      const response = await AxiosInstance.get(`/fitsy/api/v1/users/${id}`);
      console.log(response.data);
      setSelectedProfile(response.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleUserProfileChnage = (event) => {
    setSelectedProfile({
      ...selectedProfile,
      [event.target.name]: event.target.value,
    });
  };

  // const handleImageChange = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const selectedFile = event.target.files[0];
  //     console.log(selectedFile);
  //     const imageUrl = URL.createObjectURL(selectedFile);
  //     setProfileImageUrl(imageUrl);
  //   }
  // };
  // const fetchDoc = async () => {
  //   try {
  //     const id = localStorage.getItem("_id");
  //     const response = await AxiosInstance.get(`/fitsy/api/v1/doctors/${id}`);
  //     console.log(response.data);
  //     setDoctorDetail(response.data);
  //   } catch (ex) {
  //     console.log(ex);
  //   }
  // };
  console.log(doctorDetail);
  const fetchUser = async () => {
    const id = localStorage.getItem("_id");
    try {
      const response = await AxiosInstance.get(`/fitsy/api/v1/users/${id}`);
      setUserData(response.data);
      console.log(userData);
    } catch (ex) {}
  };

  const updateProfile = async () => {
    const id = localStorage.getItem("_id");
    const data = {
      name: selectedProfile.name,
      userId: selectedProfile.userId,
      email: selectedProfile.email,
      userType: selectedProfile.userType,
      userStatus: selectedProfile.userStatus,
      photoUrl: profileImageUrl ? profileImageUrl : profileImage,
    };
    setShowProfileModal(false);

    try {
      await AxiosInstance.put(`/fitsy/api/v1/users/${id}`, data);
      fetchUser();
    } catch (ex) {
      toast.success("user updated successfully");
    } finally {
      setIsEditUser(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <div
        className="navbar p-2 w-100 bg-success d-flex justify-content-spacebetween align-items-center"
        style={{ height: "60px" }}
      >
        <div className="icon d-flex align-items-center justify-content-center ">
          <MdHealthAndSafety style={{ fontSize: "40px" }} />
          <h3 onClick={() => navigate("/doctor")}>Fitsy</h3>
        </div>

        <div className="d-flex justify-content-center align-items-center">
          {/* <div className="User_image">
            <img
              src={userData.photoUrl ? userData.photoUrl : profileImage}
              alt="profile_img"
              height={30}
              width={30}
              className="me-2"
              style={{ borderRadius: "50%", cursor: "pointer" }}
              onClick={() => handleProfileModal()}
            />
          </div> */}
          <div className="btn btn-dark" onClick={HandleLogout}>
            Logout
          </div>
        </div>
      </div>
      <Modal
        show={showProfileModal}
        onHide={() => setShowProfileModal(false)}
        backdrop="static"
        keyboard={false}
        dark
      >
        <Modal.Header closeButton>
          <Modal.Title>User Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column justify-content-center align-items-center">
            {/* <img
              src={userData.photoUrl ? userData.photoUrl : profileImage}
              alt="profile_img"
              height={100}
              width={100}
              className="me-2"
              style={{ borderRadius: "50%", cursor: "pointer" }}
            /> */}

            {/* <input type="file" className="form" onChange={handleImageChange} /> */}
          </div>
          <div>
            <div>Username</div>
            <input
              className="form-control"
              name="name"
              type="text"
              value={selectedProfile.name}
              onChange={handleUserProfileChnage}
            />
            <div>userId</div>
            <input
              className="form-control"
              name="userId"
              type="text"
              value={selectedProfile.userId}
              onChange={handleUserProfileChnage}
            />
            <div>email</div>
            <input
              className="form-control"
              type="email"
              name="email"
              value={selectedProfile.email}
              onChange={handleUserProfileChnage}
            />
            <div className="d-flex justify-content-center align-items-center">
              <Button
                variant="primary"
                className="my-1"
                onClick={() => updateProfile()}
              >
                edit profiles
              </Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
