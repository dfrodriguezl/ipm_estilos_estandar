import React from 'react';

import {variables} from './variables'
import XYZ from 'ol/source/XYZ';


const Check = () => {
  
  return (
    
      <div className="check"><img src="./img/correct.svg" alt=""/></div>
  )

}

const MapaBase = ({base}) => {
    
  const [active, SetActive] = React.useState('normal');

  const baseMaps = variables.baseMaps;
  var key = variables.key;
 

  const handleClick = (mapa) => {
    console.log(mapa)

    base.setSource(
      new XYZ({
        url: baseMaps[mapa]+key,
        crossOrigin: "Anonymous"
      })
    )

    SetActive(mapa)

  };

    return (

        <>

        <p class="titulo_seccion"> <span class="DANE__Geovisor__icon__baseMap"></span> Mapa Base</p>

          
        <div class="grupo-base">
          
          <div class="elemento" onClick={()=>handleClick('normal')}>
            {active=='normal'?<Check />:''}
                  <img src="./img/normal.png" alt=""/>
          </div>
          
          <div class="elemento" onClick={()=>handleClick('gris')}>
          {active=='gris'?<Check />:''}
                  <img src="./img/gris.png" alt=""/>
          </div>
          
          <div class="elemento" onClick={()=>handleClick('dark')}>
          {active=='dark'?<Check />:''}
                  <img src="./img/dark.png" alt=""/>
            </div>
    
          </div>



        </>

    )


}

export {MapaBase};