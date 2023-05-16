import React from 'react'
import Sidebar from '../../components/global/sidebar/Sidebar'
import CardListing from '../../components/global/cards/listings/CardListing'
import style from './Buy.module.css'

const Buy = () => {
  return (
    <div className={style.main}>
      <Sidebar />
      <div className={style.container}>
        <CardListing
          src={require('../../images/rent.jpg')}
          alt='rent'
          title='Explore the best quality '
          price="1000"
          place="Roeselare (8800), West Flanders"
          path='/detail'
        />

        <CardListing
          src={require('../../images/rent.jpg')}
          alt='rent'
          title='Explore the best quality '
          price="1000"
          place="Roeselare (8800), West Flanders"
          path='/detail'
        />
       
       <CardListing
          src={require('../../images/rent.jpg')}
          alt='rent'
          title='Explore the best quality '
          price="1000"
          place="Roeselare (8800), West Flanders"
          path='/detail'
        />
       </div>
    </div>
  )
}

export default Buy