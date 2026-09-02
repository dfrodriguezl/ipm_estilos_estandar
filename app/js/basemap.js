import React from 'react';

import {variables} from './variables'
import { applyBasemapFilter, createBasemapSource } from './googleTilesProtocol'


const Check = () => {
  
  return (
    
      <div className="check"><img src="./img/correct.svg" alt=""/></div>
  )

}

const MapaBase = ({base}) => {
    
  const [active, SetActive] = React.useState(variables.baseMapCheck || 'normal');

  const handleClick = (mapa) => {
    if (!mapa || mapa === active) return;
    if (!variables.baseMaps || !Object.prototype.hasOwnProperty.call(variables.baseMaps, mapa)) {
      return;
    }

    base.setSource(createBasemapSource(mapa));
    applyBasemapFilter(mapa);
    variables.baseMapCheck = mapa;
    SetActive(mapa);
  };

  const handleKeyDown = (event, mapa) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick(mapa);
    }
  };

    return (

        <>

        <p class="titulo_seccion"> <span class="DANE__Geovisor__icon__baseMap"></span> Mapa Base</p>

          
        <div class="grupo-base">
          
          <div
            class="elemento"
            role="button"
            tabIndex="0"
            aria-label="Mapa base normal"
            aria-pressed={active === 'normal'}
            onClick={()=>handleClick('normal')}
            onKeyDown={(event)=>handleKeyDown(event, 'normal')}
          >
            {active=='normal'?<Check />:''}
                  <img src="./img/normal.png" alt=""/>
          </div>
          
          <div
            class="elemento"
            role="button"
            tabIndex="0"
            aria-label="Mapa base gris"
            aria-pressed={active === 'gris'}
            onClick={()=>handleClick('gris')}
            onKeyDown={(event)=>handleKeyDown(event, 'gris')}
          >
          {active=='gris'?<Check />:''}
                  <img src="./img/gris.png" alt=""/>
          </div>
          
          <div
            class="elemento"
            role="button"
            tabIndex="0"
            aria-label="Mapa base oscuro"
            aria-pressed={active === 'dark'}
            onClick={()=>handleClick('dark')}
            onKeyDown={(event)=>handleKeyDown(event, 'dark')}
          >
          {active=='dark'?<Check />:''}
                  <img src="./img/dark.png" alt=""/>
            </div>
    
          </div>



        </>

    )


}

export {MapaBase};
