import React, { useState } from 'react';
import style from './AddProperty.module.css';
import SidebarAdmin from '../../../components/admin/sidebarAdmin/SidebarAdmin';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFileImage} from "@fortawesome/free-solid-svg-icons";

const AddProperty = () => {
  const [title, setTitle] = useState('');
  const [listingType, setListingType] = useState('rent');
  const [propertyType, setPropertyType] = useState('house');
  const [buildYear, setBuildYear] = useState('');
  const [province, setProvince] = useState('West Flanders');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [price, setPrice] = useState('');
  const [squareMetre, setSquareMetre] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
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
                <input type="text" className={style.input} placeholder="Title property" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>

              <div className={style.formRow}>
                <select value={listingType} className={style.input} onChange={(e) => setListingType(e.target.value)}>
                  <option value="rent">For Rent</option>
                  <option value="sale">For Sale</option>
                </select>
              </div>

              <div className={style.formRow}>
                <select value={propertyType} className={style.input} onChange={(e) => setPropertyType(e.target.value)}>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="office">Office</option>
                  <option value="garage">Garage</option>
                </select>
              </div>

              <div className={style.formRow}>
                <select value={province} className={style.input} onChange={(e) => setProvince(e.target.value)}>
                  <option value="West Flanders">West Flanders</option>
                  <option value="East Flanders">East Flanders</option>
                  <option value="Antwerp">Antwerp</option>
                  <option value="Limburg">Limburg</option>
                  <option value="Flemish Brabant">Flemish Brabant</option>
                </select>
              </div>

              <div className={style.formRow}>
                <input type="number" className={style.input} placeholder="Zip code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
              </div>

              <div className={style.formRow}>
                <input type="text" className={style.input} placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>

              <div className={style.formRow}>
                <input type="text" className={style.input} value={street} placeholder="Street and number" onChange={(e) => setStreet(e.target.value)} />
              </div>

              <div className={style.formRow}>
                <input type="text" className={style.input} value={price} placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
              </div>

              <div className={style.formRow}>
                <input type="number" className={style.input} placeholder="Buildyear" value={buildYear} onChange={(e) => setBuildYear(e.target.value)} />
              </div>

              <div className={style.formRow}>
                <input type="text" className={style.input} value={squareMetre} placeholder="Square metre" onChange={(e) => setSquareMetre(e.target.value)} />
              </div>

              <div className={style.buttonContainer}>
                <button type="submit" className={style.submitButton}>
                  Create Property
                </button>
              </div>
            </div>
            <div className={style.imgWrapper}>
              <FontAwesomeIcon icon={faFileImage} className={style.image} />
              <button className={style.btnAdd} >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
