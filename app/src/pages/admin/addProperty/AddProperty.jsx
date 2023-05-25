import React, { useState } from "react";
import style from "./AddProperty.module.css";
import SidebarAdmin from "../../../components/admin/sidebarAdmin/SidebarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFileImage } from "@fortawesome/free-solid-svg-icons";
import useMutation from "../../../hooks/useMutation";
import  useFetch  from "../../../hooks/useFetch";

const AddProperty = () => {

  const { mutate } = useMutation();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    img: "",
    title: "",
    desc: "",
    saleType: "rent",
    type: "house",
    buildyear: "",
    sqmeters: "",
    address: "",
    city: "",
    zipcode: "",
    province: "West Flanders",
    price: "",
    sold: false,
    agency: "646bd0e4ad8b039061254c71",
  });

  // fetch all agencies
  const { data: agencies } = useFetch("/agencies");
 

  const handleChange = (e) => {
    if (e.target.name === "agency") {
      // Set the agency ID instead of the whole agency object
      setData({
        ...data,
        agency: e.target.value,
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
    console.log(data);
  };

  

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (data.title === "" || data.desc === "" || data.buildyear === "" || data.sqmeters === "" || data.address === "" || data.city === "" || data.zipcode === "" || data.price === "") {
      setError("Make sure everything is filled in.")
      return; // Don't submit if the form is not valid
    }

    if(file){
      const dataImg = new FormData();
      const fileName = Date.now() + file.name;
      dataImg.append("name", fileName);
      dataImg.append("file", file);
      data.img = fileName;

      try {
        await fetch(`${process.env.REACT_APP_API_URL}/upload`, {
          method: "POST",
          body: dataImg,
        });

         // Update the profile picture value in data state
         setData((prevState) => ({
          ...prevState,
          img: fileName,
        }));
        
        
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await mutate(`${process.env.REACT_APP_API_URL}/properties/`, {
        method: "POST",
        data,
        onSuccess: (data) => {
          console.log(data);
          console.log("success")
        
          window.location.href = "/admin";
        },
        onError: (error) => {
          console.log(error);
         
        },
      });
    } catch (err) {
      console.log(err);
      
    }
    console.log(data);
  };

  return (
    <div className={style.main}>
      <SidebarAdmin />
      <div className={style.container}>
        <div className={style.header}>
          <h1 className={style.title}>Dashboard Admin</h1>
        </div>
        <div className={style.body}>
          <form className={style.form} onSubmit={handleFormSubmit}>
            <div className={style.wrapper}>
              <div className={style.formRow}>
                <input
                  type="text"
                  name="title"
                  className={style.input}
                  placeholder="Title property"
                  value={data.title}
                  onChange={handleChange}
                />
              </div>
              <div className={style.formRow}>
                <textarea
                  type="textarea"
                  name="desc"
                  className={style.input + " " + style.textarea}
                  placeholder="Description"
                  value={data.desc}
                  onChange={handleChange}
                />
              </div>

              <div className={style.formRow}>
                <select
                  value={data.saleType}
                  name="saleType"
                  className={style.input}
                  onChange={handleChange}
                >
                  <option value="rent">For Rent</option>
                  <option value="sale">For Sale</option>
                </select>
              </div>

              <div className={style.formRow}>
                <select
                  value={data.type}
                  className={style.input}
                  name="type"
                  onChange={handleChange}
                >
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="office">Office</option>
                  <option value="garage">Garage</option>
                </select>
              </div>

              <div className={style.formRow}>
                <select
                  value={data.province}
                  className={style.input}
                  name="province"
                  onChange={handleChange}
                >
                  <option value="West Flanders">West Flanders</option>
                  <option value="East Flanders">East Flanders</option>
                  <option value="Antwerp">Antwerp</option>
                  <option value="Limburg">Limburg</option>
                  <option value="Flemish Brabant">Flemish Brabant</option>
                </select>
              </div>

              <div className={style.formRow}>
                <input
                  type="number"
                  className={style.input}
                  placeholder="Zip code"
                  value={data.zipcode}
                  name="zipcode"
                  onChange={handleChange}
                />
              </div>

              <div className={style.formRow}>
                <input
                  type="text"
                  className={style.input}
                  placeholder="City"
                  value={data.city}
                  name="city"
                  onChange={handleChange}
                />
              </div>

              <div className={style.formRow}>
                <input
                  type="text"
                  className={style.input}
                  value={data.address}
                  placeholder="Street and number"
                  name="address"
                  onChange={handleChange}
                />
              </div>

              


           
              <div className={style.buttonContainer}>
                <button type="submit" className={style.submitButton}>
                  Create Property
                </button>
                {error && <p className={style.error}>{error}</p>}
              </div>
            </div>
            <div className={style.infoWrapper2}>
            <div className={style.formRow}>
                <input
                  type="number"
                  className={style.input}
                  value={data.price}
                  placeholder="Price"
                  name="price"
                  onChange={handleChange}
                />
              </div>
              <div className={style.formRow}>
                <input
                  type="number"
                  className={style.input}
                  placeholder="Buildyear"
                  value={data.buildyear}
                  name="buildyear"
                  onChange={handleChange}
                />
              </div>

              <div className={style.formRow}>
                <input
                  type="number"
                  className={style.input}
                  value={data.sqmeters}
                  placeholder="Square metres"
                  name="sqmeters"
                  onChange={handleChange}
                />
              </div>
               <div className={style.formRow}>
                  <select
                    value={data.agency}
                    className={style.input}
                    name="agency"
                    onChange={handleChange}
                  >
                    {agencies &&
                      agencies.map((agency) => (
                        <option key={agency._id} value={agency._id}>
                          {agency.name} {agency._id}
                        </option>
                      ))}
                  </select>
                </div>  
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="img"
                  className={style.img}
                />
              ) : (
                <FontAwesomeIcon icon={faFileImage} className={style.imageIcon} />
              )}
              <label htmlFor="fileInput" className={style.btnAdd}>
                <FontAwesomeIcon icon={faPlus}/> Add Image
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
