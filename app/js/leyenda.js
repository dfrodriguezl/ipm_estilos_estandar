import React,{Component} from 'react';


import {variables} from './variables'

const Leyenda=({layer})=> {
    // Declare a new state variable, which we'll call "count"
  const [count, setCount] = React.useState(0);

  console.log(layer)
  
    return (
      <div>
        <p id="titulo">Leyenda</p>
        <div id="dif_catastro_censo" >

      
          {layer ?
            
            <>
              <p className="descripcion">{variables[layer].titulo}  </p>
              <div>
                  {variables[layer].labels.map((i, e) => <div className="item" ><span style={{backgroundColor:variables[layer].colores[e]}}></span><p>{i}</p></div>)}
              </div>
            </>
            
            : ''}
            
          
        
              
            </div>

      </div>
    );
  }

export default Leyenda;
