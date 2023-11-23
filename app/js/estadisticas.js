import React,{  useState,useEffect } from 'react';

import { servidorGetRaw } from '../js/request'

const Estadistica=({mun})=> {

  const [info, setInfo] = useState([]);
  const [view, setView] = useState(false);
    
  useEffect(() => {
    setView(false)
    servidorGetRaw('info/' + mun).then((response) => {
      console.log(response)
  
      setInfo(response[0])
      setView(true)
  
    })

  },[mun])
  
  
  return (
    <>

      
    <p class="titulo_seccion"> <span class="DANE__Geovisor__icon__dataAnalysis"></span> Unidades censadas</p>

    <div id="resumen">
    {view?<>
        {Object.keys(info).map((e) => (
            <>
                {console.log(info[e])}
                <p class="enfasis">{e}</p>
                <p>
                {info[e]}
                </p>
            </>
        ))}
                
                
      </> : ''}
    </div>


      </>
    );
  }

export {Estadistica};
