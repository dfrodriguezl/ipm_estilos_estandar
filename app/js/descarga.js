import React from 'react';

const Descarga = () => {


  const handleClick = () => {
    console.log('descargar')
    window.open('https://geoportal.dane.gov.co/servicios/descarga-y-metadatos/datos-geoestadisticos/?cod=133', '_blank')
  }

    return (

        <>

        <p class="titulo_seccion"> <span class="DANE__Geovisor__icon__baseMap"></span> Descarga</p>

        <button class="btn-descarga" onClick={handleClick}>Descargar</button>

        </>

    )


}

export {Descarga};