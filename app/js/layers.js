import React, { Component } from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import {variables} from './variables'


const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);


const Layers=()=> {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = React.useState(0);
  
    var initialState = variables.layers.map((i, e) => ({[i]:''}))
  
    const [state, setState] = React.useState(initialState);

    const handleChange = e => {
      const { name, value } = e.target;
      setState(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
  
    return (
     <>
          <div class="filter__thematic">
            <div class="filter__thematicGroup">
              <ul class="filter__thematicGroup__list" id="temasg">                
                {variables.leyenda.map((layer, e) =>                   
                  <li class="filter__thematicGroup__item" id={`temas${variables[layer].id}`}>                    
                    <div id="iconimage2" class={`filter__thematicGroup__icon ${variables[layer].coloricon}`}>
                      <span class= {`${variables[layer].icono} icon-span`}></span>
                    </div>
                    <span class="tooltiptext">{variables[layer].descripcion}</span>
                    <p class="filter__thematicGroup__name">{variables[layer].tituloTema}</p>                    
                  </li>
                )}
                <div class="filter__thematicGroup__more" id="ver__mas">
                <div class="filter__thematicGroup__moreIcon" >
                  <span class="filter__thematicGroup__moreLine"></span>
                  <span class="filter__thematicGroup__moreLine"></span>
                  <span class="filter__thematicGroup__moreLine"></span>
                </div>
                <p class="filter__thematicGroup__moreText" id="ver__mas">Ver más</p>
              </div>              
              <div class="filter__thematicGroup__more__menos filter__thematicGroup__more__menos__none" id="ver__menos">
                <div class="filter__thematicGroup__moreIcon">
                  <span class="filter__thematicGroup__moreLine"></span>
                  <span class="filter__thematicGroup__moreLine"></span>
                  <span class="filter__thematicGroup__moreLine"></span>
                </div>
                <p class="filter__thematicGroup__moreText" >Volver</p>
              </div>
              </ul>
            </div>
          </div>    

      <div class="temasgeneral" id='temascarga'> 
      {/* {variables.leyenda.map((layer, e) => */}
          
          <>     
          <div id="primertema" class="basetemas activo-tema">
            <h3 class="text-titulotema">{variables['layer1'].descripcion}</h3>     
            <label class="panel">
              <input type="radio" value="value" class="layer" id={'checklayer1'}  layer='layer1' name="radio"/>
              <label for={'checklayer1'}></label>
              <span>{variables['layer1'].titulo}</span>
              <input type="range" class="slider" min="1" max="10" step="1" value={state['layer1']} name='layer1'
              onChange={handleChange}/>
            </label>
          </div>

          <div id="segundotema" class="basetemas">
          <h3 class="text-titulotema">{variables['layer2'].descripcion}</h3>     
          <label class="panel">
            <input type="radio" value="value" class="layer" id={'checklayer2'}  layer='layer2' name="radio"/>
            <label for={'checklayer2'}></label>
            <span>{variables['layer2'].titulo}</span>
          <input type="range" class="slider" min="1" max="10" step="1" value={state['layer2']} name='layer2'
           onChange={handleChange}/>
          </label>
          </div>

          <div id="tercerotema" class="basetemas">
          <h3 class="text-titulotema">{variables['layer3'].descripcion}</h3>     
          <label class="panel">
            <input type="radio" value="value" class="layer" id={'checklayer3'}  layer='layer3' name="radio"/>
            <label for={'checklayer3'}></label>
            <span>{variables['layer3'].titulo}</span>
          <input type="range" class="slider" min="1" max="10" step="1" value={state['layer3']} name='layer3'
           onChange={handleChange}/>
          </label>
          </div>

          <div id="cuartotema" class="basetemas">
          <h3 class="text-titulotema">{variables['layer4'].descripcion}</h3>     
          <label class="panel">
            <input type="radio" value="value" class="layer" id={'checklayer4'}  layer='layer4' name="radio"/>
            <label for={'checklayer4'}></label>
            <span>{variables['layer4'].titulo}</span>
          <input type="range" class="slider" min="1" max="10" step="1" value={state['layer4']} name='layer4'
           onChange={handleChange}/>
          </label>
          </div>

          <div id="novenotema" class="basetemas">
          <h3 class="text-titulotema">{variables['layer9'].descripcion}</h3>     
          <label class="panel">
            <input type="radio" value="value" class="layer" id={'checklayer9'}  layer='layer9' name="radio"/>
            <label for={'checklayer9'}></label>
            <span>{variables['layer9'].titulo}</span>
          <input type="range" class="slider" min="1" max="10" step="1" value={state['layer9']} name='layer9'
           onChange={handleChange}/>
          </label>
          </div>

          <div id="oncetema" class="basetemas">
          <h3 class="text-titulotema">{variables['layer11'].descripcion}</h3>     
          <label class="panel">
            <input type="radio" value="value" class="layer" id={'checklayer11'}  layer='layer11' name="radio"/>
            <label for={'checklayer11'}></label>
            <span>{variables['layer11'].titulo}</span>
          <input type="range" class="slider" min="1" max="10" step="1" value={state['layer11']} name='layer11'
           onChange={handleChange}/>
          </label>
          </div>
          <p className="descripcion-layer"></p>
          
           
          
          </>
        
        {/* )} */}
      </div>


      
      </>
    );
  }

export {Layers};
