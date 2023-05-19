import React, { useState } from 'react';
import style from './DashboardAdmin.module.css';
import SidebarAdmin from '../../../components/admin/sidebarAdmin/SidebarAdmin';
import OptionLabel from '../../../components/admin/OptionLabel';
import CardListing from '../../../components/global/cards/listings/CardListing';

const DashboardAdmin = () => {
 

  return (
    <div className={style.main}>
      <SidebarAdmin />

      <div className={style.container}>
        <div className={style.header}>
          <h1 className={style.title}>Dashboard Admin</h1>
          <input type="text" className={style.search} placeholder="Search by title, city, ..." />
        </div>

        
          <OptionLabel />
          
          <div className={style.listings}>
            <CardListing
              src={require('../../../images/rent.jpg')}
              alt='rent'
              title='Explore the best quality '
              price="1000"
              place="Roeselare (8800), West Flanders"
              path='/detail'
            />
            <CardListing
              src={require('../../../images/rent.jpg')}
              alt='rent'
              title='Explore the best quality '
              price="1000"
              place="Roeselare (8800), West Flanders"
              path='/detail'
            />
          </div>
      
      </div>
    </div>
  );
};

export default DashboardAdmin;
