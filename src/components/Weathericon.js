import React from 'react'
const styleObj = {
  display:"flex",
  justifyContent : "center",
  alignItems : "center"
}
const Weathericon = ({url}) => {
  return (
    <div style={styleObj} className='weather-icon'>
      <img src={url} alt="weather-icon" />
    </div>
  )
}

export default Weathericon