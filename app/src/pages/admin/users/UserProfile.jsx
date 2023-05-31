import { useEffect, useState } from "react";
import style from "./UserProfile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { IMG } from "../../../consts/Img";
import useMutation from "../../../hooks/useMutation";
import Loading from "../../../components/global/loading/Loading";

const UserProfile = () => {
  const { id } = useParams();

  const { data: userData, isLoading, error } = useFetch(`/users/${id}`);
  const { data: agenciesData } = useFetch("/agencies");
  const [file, setFile] = useState(null);
  const { mutate } = useMutation();
  const [message, setMessage] = useState(null);
  const [data, setData] = useState({
    profileImg: userData?.profileImg || "defaultUser.png",
    name: userData?.name || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    agency: userData?.agency || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "agency" && value === "") {
      // If "No Agency" option is selected, set the agency field to an empty string
      setData((prevData) => ({
        ...prevData,
        agency: "",
      }));
    } else {
      // For other fields, update the value as before
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      profileImg: userData?.profileImg || "defaultUser.png",
      name: userData?.name || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      agency: userData?.agency || "",
    }));
  }, [
    userData?.profileImg,
    userData?.name,
    userData?.email,
    userData?.phone,
    userData?.agency,
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

    try {
      await mutate(`${process.env.REACT_APP_API_URL}/users/${id}`, {
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
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await mutate(`${process.env.REACT_APP_API_URL}/users/${id}`, {
        method: "DELETE",
        onSuccess: async (data) => {
          setMessage("User deleted"); // Set success message

          // delete user messages
          try {
            await mutate(
              `${process.env.REACT_APP_API_URL}/messages/user/${id}`,
              {
                method: "DELETE",
                onSuccess: (data) => {
                  window.location.replace("/admin/users");
                },
              }
            );
          } catch (err) {
            console.log(err);
          }
        },
      });
    } catch (err) {
      console.log(err);
      setMessage("An error occurred. Please try again."); // Set error message
    }
  };

  if (error || isLoading) return <div>{error || <Loading />}</div>;

  return (
    <>
      <div className={style.header}>
        <Link to="/admin/users" className={style.linkBack}>
          <div className={style.back}>
            <FontAwesomeIcon icon={faAnglesLeft} />
            Go back
          </div>
        </Link>
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
        {agenciesData && (
          <div className={style.formGroup}>
            <select
              name="agency"
              className={style.formSelect}
              value={data.agency}
              onChange={handleChange}
            >
              <option value="">No Agency</option>{" "}
              {/* Add option for no agency */}
              {agenciesData.map((agency) => (
                <option key={agency._id} value={agency._id}>
                  {agency.name}
                </option>
              ))}
            </select>
          </div>
        )}
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
            Delete User
          </button>
        </div>
      </form>
    </>
  );
};

export default UserProfile;
