import React, { useState, useEffect } from "react";
import style from "./DashboardAgency.module.css";
import OptionLabel from "../../../components/admin/OptionLabel";
import CardListing from "../../../components/admin/cards/CardListing";
import useFetch from "../../../hooks/useFetch";
import { IMG } from "../../../consts/Img";
import SidebarAgency from "../../../components/agency/sidebarAgency/SidebarAgency";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";

const DashboardAgency = () => {
  const { user } = useAuthContext();
  const agencyId = user?.agency;

  const [selectedOption, setSelectedOption] = useState("rent");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {}, [selectedOption]);

  const { isLoading, data, error, invalidate } = useFetch(
    "/properties?agency=" + agencyId
  );

  const filteredData = Array.isArray(data)
    ? data.filter((property) => {
        if (selectedOption === "rent") {
          return property?.saleType === "rent";
        } else if (selectedOption === "sale") {
          return property?.saleType === "sale";
        }
        return true; // Display all properties if no option is selected
      })
    : [];

  if (!agencyId) {
    return (
      <Link to="/">
        You are not logged in as an agency
        <br />
        Click here to go back
      </Link>
    );
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <SidebarAgency />
      <div className={style.container}>
        <div className={style.header}>
          <h1 className={style.title}>Dashboard Agency</h1>
          {/* <input
            type="text"
            className={style.search}
            placeholder="Search by title, city, ..."
          /> */}
        </div>

        <OptionLabel
          selectedOption={selectedOption}
          onChange={handleOptionChange}
        />

        <div className={style.listingsContainer}>
          <div className={style.listings}>
            {filteredData.map((property) => (
              <CardListing
                key={property._id}
                src={IMG + property.img}
                alt="buy"
                title={property.title}
                type={property.type}
                price={property.price}
                saleType={property.saleType}
                city={property.city}
                zipcode={property.zipcode}
                province={property.province}
                buildyear={property.buildyear}
                sold={property.sold}
                path={`/agency/${property._id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAgency;
