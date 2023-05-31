import { useState, useEffect } from "react";
import style from "./AgencyProfile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import ModalAddUsers from "../../../components/admin/modal/ModalAddUsers";
import useFetch from "../../../hooks/useFetch";
import { IMG } from "../../../consts/Img";
import { Link, useParams } from "react-router-dom";
import useMutation from "../../../hooks/useMutation";
import Loading from "../../../components/global/loading/Loading";

const AgencyProfile = () => {
  const { id } = useParams();

  const { data: agencyData, isLoading, error } = useFetch(`/agencies/${id}`);
  const { mutate } = useMutation();
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    profileImg: agencyData?.profileImg || "",
    name: agencyData?.name || "",
    email: agencyData?.email || "",
    phone: agencyData?.phone || "",
  });

  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    agency: id,
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeUser = (e) => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      profileImg: agencyData?.profileImg || "defaultUser.png",
      name: agencyData?.name || "",
      email: agencyData?.email || "",
      phone: agencyData?.phone || "",
    }));
  }, [
    agencyData?.profileImg,
    agencyData?.name,
    agencyData?.email,
    agencyData?.phone,
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      const dataImg = new FormData();
      const fileName = Date.now() + file.name;
      dataImg.append("name", fileName);
      dataImg.append("file", file);
      data.profileImg = fileName;

      try {
        await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
          method: "POST",
          body: dataImg,
        });

        // Update the profile picture value in data state
        setData((prevState) => ({
          ...prevState,
          profileImg: fileName,
        }));
      } catch (err) {
        console.log(err);
      }
    }

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (
      data.name === "" ||
      !validateEmail(data.email) ||
      data.phone.length > 9
    ) {
      try {
        await mutate(`${process.env.REACT_APP_API_URL}/agencies/${id}`, {
          method: "PUT",
          data,
          onSuccess: (data) => {
            // Update the user in the context

            setMessage("Profile updated"); // Set success message
            // refresh the page
            window.location.reload();
          },
          onError: (error) => {
            console.log(error);
            // Set error message
          },
        });
      } catch (err) {
        console.log(err);
        setMessage("An error occurred. Please try again."); // Set error message
      }
    } else {
      setMessage("Please fill in all the fields correctly");
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    // Handle agency deletion
    try {
      await mutate(`${process.env.REACT_APP_API_URL}/agencies/${id}`, {
        method: "DELETE",
        onSuccess: async (data) => {
          // also delete all properties of this agency
          try {
            await mutate(
              `${process.env.REACT_APP_API_URL}/properties/agency/${id}`,
              {
                method: "DELETE",
                onSuccess: async (data) => {
                  // also delete all the messages of this agency
                  try {
                    await mutate(
                      `${process.env.REACT_APP_API_URL}/messages/agency/${id}`,
                      {
                        method: "DELETE",
                        onSuccess: async (data) => {
                          // also delete all the users of this agency
                          try {
                            await mutate(
                              `${process.env.REACT_APP_API_URL}/users/delete/${id}`,
                              {
                                method: "DELETE",
                                onSuccess: async (data) => {
                                  // also delete replies of this agency
                                  try {
                                    await mutate(
                                      `${process.env.REACT_APP_API_URL}/agencyMessages/agency/${id}`,
                                      {
                                        method: "DELETE",
                                        onSuccess: async (data) => {
                                          // go back to agencies page
                                          window.location.href =
                                            "/admin/agencies";
                                        },
                                      }
                                    );
                                  } catch (err) {
                                    console.log(err);
                                    setMessage(
                                      "An error occurred. Please try again."
                                    ); // Set error message
                                  }
                                },
                                onError: (error) => {
                                  console.log(error);
                                  setMessage(
                                    "An error occurred. Please try again."
                                  ); // Set error message
                                },
                              }
                            );
                          } catch (err) {
                            console.log(err);
                            setMessage("An error occurred. Please try again."); // Set error message
                          }
                        },
                      }
                    );
                  } catch (err) {
                    console.log(err);
                  }
                },
              }
            );
          } catch (err) {
            console.log(err);
            setMessage("An error occurred. Please try again."); // Set error message
          }
        },
        onError: (error) => {
          console.log(error);
          setMessage("Password is not correct"); // Set error message
        },
      });
    } catch (err) {
      console.log(err);
      setMessage("An error occurred. Please try again."); // Set error message
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // this is for the modal add new user function
  const handleSubmitAddUser = async (event) => {
    event.preventDefault();

    // check if inputs are valid

    if (!validateEmail(dataUser.email)) {
      setErrorMessage("Invalid email");
    } else if (dataUser.phone.length < 9) {
      setErrorMessage("Invalid phone number");
    } else if (dataUser.name.length < 2) {
      setErrorMessage("Invalid name");
    } else {
      // add user with the agency id
      await mutate(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: "POST",
        data: dataUser,
        onSuccess: async (data) => {
          setMessage("User added"); // Set success message
          closeModal();
        },
        onError: (error) => {
          console.log(error);
          setErrorMessage("email already exists");
        },
      });
    }

    // reset the form
    setDataUser({
      name: "",
      email: "",
      phone: "",
      password: "",
      agency: id,
    });
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (error || isLoading) return <div>{error || <Loading />}</div>;

  return (
    <>
      <div className={style.header}>
        <Link to="/admin/agencies" className={style.linkBack}>
          <div className={style.back}>
            <FontAwesomeIcon icon={faAnglesLeft} />
            Go back
          </div>
        </Link>
        <button className={style.btnAddAgency} onClick={openModal}>
          + Add new user to agency
        </button>
      </div>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.profileImgContainer}>
          <div className={style.profileImgWrapper}>
            <img
              src={file ? URL.createObjectURL(file) : IMG + data.profileImg}
              alt="profileImg"
              className={style.profileImg}
            />
            <label htmlFor="fileInput">
              <FontAwesomeIcon icon={faPlus} className={style.fileInput} />
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </div>

        <div className={style.formGroup}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            className={style.formControl}
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div className={style.formGroup}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            className={style.formControl}
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div className={style.formGroup}>
          <input
            type="number"
            placeholder="Phone Number"
            name="phone"
            className={style.formControl}
            value={data.phone}
            onChange={handleChange}
          />
        </div>
        <div className={style.formGroup}>
          <button type="submit" className={style.saveBtn}>
            Update
          </button>
          {message && <p className={style.message}>{message}</p>}
          <button
            type="button"
            className={style.deleteBtn}
            onClick={handleDelete}
          >
            Delete Agency
          </button>
        </div>
      </form>
      {showModal && (
        <ModalAddUsers
          data={dataUser}
          handleChange={handleChangeUser}
          handleSubmit={handleSubmitAddUser}
          closeModal={closeModal}
          errorMessage={errorMessage}
        />
      )}
    </>
  );
};

export default AgencyProfile;
