import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useAuthContext } from '../../../contexts/AuthContext';
import useMutation from '../../../hooks/useMutation';
import style from './UpdateProperty.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import {IMG} from "../../../consts/Img"

const UpdateProperty = () => {
  
  const { id } = useParams();
  const { user } = useAuthContext();

  const {
    isLoading,
    data: propertyData,
    error,
    invalidate,
  } = useFetch(`/properties/${id}`);
 
  const { data: agencyData } = useFetch(`/agencies/${propertyData?.agency}`);
  const {data: agencies} = useFetch("/agencies");

  
  const { mutate } = useMutation();
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    img: propertyData?.img,
    title: propertyData?.title,
    desc: propertyData?.desc,
    type: propertyData?.type,
    buildyear: propertyData?.buildyear,
    sqmeters: propertyData?.sqmeters,
    address: propertyData?.address,
    city: propertyData?.city,
    zipcode: propertyData?.zipcode,
    province: propertyData?.province,
    price: propertyData?.price,
    sold: propertyData?.sold,
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.checked,
    });
  };

  useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      img:  propertyData?.img,
      title: propertyData?.title,
      desc: propertyData?.desc,
      type: propertyData?.type,
      buildyear: propertyData?.buildyear,
      sqmeters: propertyData?.sqmeters,
      address: propertyData?.address,
      city: propertyData?.city,
      zipcode: propertyData?.zipcode,
      province: propertyData?.province,
      price: propertyData?.price,
      sold: propertyData?.sold,
    }));
  }, [
    propertyData?.img,
    propertyData?.title,
    propertyData?.desc,
    propertyData?.type,
    propertyData?.buildyear,
    propertyData?.sqmeters,
    propertyData?.address,
    propertyData?.city,
    propertyData?.zipcode,
    propertyData?.province,
    propertyData?.price,
    propertyData?.sold,
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission

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
        
        console.log(IMG + data.img);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await mutate(`${process.env.REACT_APP_API_URL}/properties/${id}`, {
        method: "PUT",
        data,
        onSuccess: (data) => {
          console.log(data);
          console.log("success")
        
         
          // reload the page
          window.location.reload();
         
        },
        onError: (error) => {
          console.log(error);
         
        },
      });
    } catch (err) {
      console.log(err);
      
    }
  };

  // delete property
  const handleDelete = async () => {
    try {
      await mutate(`${process.env.REACT_APP_API_URL}/properties/${id}`, {
        method: "DELETE",
        onSuccess: async (data) => {
          console.log("success prop deleted");
  
          // also delete the property from favorites
          try {
            await mutate(`${process.env.REACT_APP_API_URL}/favorites/property/${id}`, {
              method: "DELETE",
              onSuccess: async (data) => {
                console.log("success favorite deleted");

                // delete messages related to the property
                try {
                  await mutate(`${process.env.REACT_APP_API_URL}/messages/property/${id}`, {
                    method: "DELETE",
                    onSuccess: async (data) => {
                      console.log("success messages deleted");
                      // go to admin page
                      window.location.href = "/admin";
                    }
                  });
                } catch (err) {
                  console.log(err);
                }
              },
              onError: (err) => {
                console.log(err);
              },
            });
          } catch (err) {
            console.log(err);
          }
  
          
        },
        onError: (error) => {
          console.log(error);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <Link to="/admin" className={style.linkBack}>
          <div className={style.back}>
            <FontAwesomeIcon icon={faAnglesLeft} />
            Go back
          </div>
        </Link>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.imgWrapper}>
            <img
              src={file ? URL.createObjectURL(file) : IMG + data.img}
              alt="img"
              name="img"
              className={style.img}
            />
            <label htmlFor="fileInput">
              <div className={style.change}>+ Change image</div>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div className={style.infoListing}>
          
            <h1 className={style.title}>
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={handleChange}
                className={style.title}
              />
            </h1>
            <p className={style.description}>
              <input
                type="text"
                name="desc"
                value={data.desc}
                onChange={handleChange}
                className={style.descriptionInput}
              />
            </p>

            <div className={style.form}>
            <h2 className={style.address}>
              Type:
              <select
                name="type"
                value={data.type}
                onChange={handleChange}
                className={style.input}
              >
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="garage">Garage</option>
                <option value="office">Office</option>
      
              </select>
            </h2>
              <h2 className={style.buildYear}>
                Buildyear:
                <input
                  type="number"
                  name="buildyear"
                  value={data.buildyear}
                  onChange={handleChange}
                  className={style.input}
                />
              </h2>
            </div>
            <div className={style.infoWrapper}>
              <h2 className={style.surface}>
                Surface:
                <input
                  type="number"
                  name="sqmeters"
                  value={data.sqmeters}
                  onChange={handleChange}
                  className={style.input}
                />{" "}
                m²
              </h2>
              
              <div className={style.agency}>
                Agency:
                <select
                  value={data.agency}
                  className={style.input}
                  name="agency"
                  onChange={handleChange}
                >
                  <option value={agencyData?._id}>{agencyData.name}</option>
                  {/* map agencies but exclude where agencyData._id == agency._id */}
                  {agencies &&
                    agencies.map((agency) => {
                      if (agencyData?._id !== agency._id) {
                        return (
                          <option key={agency._id} value={agency._id}>
                            {agency.name}
                          </option>
                        );
                      }
                    })}
                </select>
              </div> 
            </div>

            <h2 className={style.address}>
              Address:
              <input
                type="text"
                name="address"
                value={data.address}
                onChange={handleChange}
                className={style.input}
              />
              <br />
              <input
                type="text"
                name="city"
                value={data.city}
                onChange={handleChange}
                className={style.input}
              />
              ,(
              <input
                type="number"
                name="zipcode"
                value={data.zipcode}
                onChange={handleChange}
                className={style.input}
              />),
              <select
                name="province"
                value={data.province}
                onChange={handleChange}
                className={style.input}
              >
                <option value="West Flanders">West Flanders</option>
                <option value="East Flanders">East Flanders</option>
                <option value="Antwerp">Antwerp</option>
                <option value="Limburg">Limburg</option>
                <option value="Flemish Brabant">Flemish Brabant</option>
              </select>
            </h2>

            <h2 className={style.price}>
              Price: €
              <input
                type="number"
                name="price"
                value={data.price}
                onChange={handleChange}
                className={style.input}
              />{" "}
           
            </h2>
            <h2 className={style.sold}>
              <input
                type="checkbox"
                name="sold"
                checked={data.sold}
                onChange={handleCheckboxChange}
                className={style.sold}
              />
              Sold
            </h2>
            <button type="submit" className={style.updateBtn}>
              Update property
            </button>
          </div>
          
        </form>

            <button type="button" className={style.deleteBtn} onClick={handleDelete}>
              Delete property
            </button>
      </div>
    </div>
  );
};

export default UpdateProperty
