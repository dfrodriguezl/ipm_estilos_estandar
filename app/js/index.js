
import '../css/styles.scss';
//openlayers
import './filtros'
import './acciones.js'

import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import TileGrid from 'ol/tilegrid/TileGrid';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import { transform } from 'ol/proj';
import { Style, Fill, Stroke } from 'ol/style';
import { boundingExtent } from 'ol/extent';
import { transformExtent } from 'ol/proj';
import Overlay from 'ol/Overlay';
import MVT from 'ol/format/MVT';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Cluster from 'ol/source/Cluster';
import { Circle as CircleStyle, RegularShape, Text, Icon } from 'ol/style';
import { defaults as defaultControls } from 'ol/control.js';

import { get as getProjection } from 'ol/proj';

import { servidorGetRaw } from '../js/request'
import {service} from './services'

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import geometria from '../json/bbox.json'

import Leyenda from './leyenda.js'
import {Estadistica} from './estadisticas.js'
import {MapaBase} from './basemap.js'
import {Layers} from './layers.js'


import { getZip } from './csvtojson'

import {variables,urlDeploy} from './variables'

import Load from './util'


import { Barras, Dona } from './graficos'
import { jsPDF } from "jspdf";

var cod = '25473'
var clase='0'
var nombre=''



// componentes de React
ReactDOM.render(<Load visible={true} />, document.getElementById('loader'));
ReactDOM.render(<Leyenda />, document.getElementById('leyenda'));

ReactDOM.render(<Layers />, document.getElementById('layers'));

// lectura de las imágenes
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}
const images = importAll(require.context('../img/', false, /\.(png|jpg|svg)$/));

// configuración del popup
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

var overlay = new Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250
  }
});

//////




//////////////




var key = variables.key;

var base = new TileLayer({
  source: new XYZ({
    url: variables.baseMaps.normal + key,
    crossOrigin: "Anonymous"
  })
});

ReactDOM.render(<MapaBase base={base }/>, document.getElementById('basemaps'));



const map = new Map({
  target: 'mapa',
  controls: [],
  overlays: [overlay],
  layers: [
    base
  ],
  view: new View({
    center: transform(variables.centro_mapa, 'EPSG:4326', 'EPSG:3857'),
    zoom: 9,
    multiWorld: true,
  })
});


var resolutions = [];
for (var i = 0; i <= 8; ++i) {
  resolutions.push(156543.03392804097 / Math.pow(2, i * 2));
}


// Calculation of tile urls for zoom levels 1, 3, 5, 7, 9, 11, 13, 15.



function tileUrlFunction_seleccion(tileCoord) {

  return (
    urlDeploy + 'select/'+nombre+'/{x}/{y}/{z}.pbf'
  )
    .replace('{z}', String(tileCoord[0] * 2 - 1))
    .replace('{x}', String(tileCoord[1]))
    .replace('{y}', String(tileCoord[2]))
}


function tileUrlFunction_mpio(tileCoord) {

  return (
    urlDeploy + 'mpio/{x}/{y}/{z}.pbf'
  )
    .replace('{z}', String(tileCoord[0] * 2 - 1))
    .replace('{x}', String(tileCoord[1]))
    .replace('{y}', String(tileCoord[2]))
}
function tileUrlFunction_depto(tileCoord) {

  return (
    urlDeploy + 'depto/{x}/{y}/{z}.pbf'
  )
    .replace('{z}', String(tileCoord[0] * 2 - 1))
    .replace('{x}', String(tileCoord[1]))
    .replace('{y}', String(tileCoord[2]))
}


const vectorTileSource = (tileFunc) => {
  return new VectorTileSource({
    format: new MVT(),
    tileGrid: new TileGrid({
      extent: getProjection('EPSG:900913').getExtent(),
      resolutions: resolutions,
      tileSize: 512,
    }),
    tileUrlFunction: tileFunc,
  });
}

const vectorTileLyr = (source,zindex,min,max) => {
  return new VectorTileLayer({
    source: source,
    declutter: true,
    zIndex: zindex,
    minZoom: min,
    maxZoom: max,
  });
}





const depto_source = vectorTileSource(tileUrlFunction_depto)  
const seleccion=vectorTileSource(tileUrlFunction_seleccion) 


const mpio_source = new vectorTileSource(tileUrlFunction_mpio) 


const seleccion_mpio = vectorTileLyr(seleccion,4,1,20)
map.addLayer(seleccion_mpio);
seleccion_mpio.set('id', 'seleccion_mpio')


const mpio = vectorTileLyr(mpio_source,2,8,15)
map.addLayer(mpio);
mpio.set('id', 'mpio')
//mpio.setVisible(false)


const depto = vectorTileLyr(depto_source,3,2,10)
map.addLayer(depto);
depto.set('id', 'depto')
//depto.setVisible(false)





//cursor en el mapa

/*
map.on("pointermove", function (evt) {
  var hit = map.hasFeatureAtPixel(evt.pixel);
  map.getTargetElement().style.cursor = (hit ? 'pointer' : '');
});
*/



// estilo del municipio
mpio.setStyle(function (feature) {

  return new Style({
    stroke: new Stroke({
      color: '#015592',
      width: 0.5,
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0)'
    })
  });
});


// estilo de la selección del municipio
seleccion_mpio.setStyle(function (feature) {
  // console.log("SEL MUN", feature);
  return new Style({
    stroke: new Stroke({
      color: '#2BDDEC',
      width: 3,
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0)'
    })
  });
});

// estilo departamento
depto.setStyle(function (feature) {

  return new Style({
    stroke: new Stroke({
      color: '#d460f7',
      width: 3,
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0)'
    })
  });
});




const finishLoad = () => {
  

  ReactDOM.unmountComponentAtNode(document.getElementById('loader'))
  document.getElementById('background').style.display="none"


}


var tiles_arr = [];
var layer_arr = [];
var layer_id = [];
var csv_arr=[]



const servicios = async () => {
  
  console.log("datos")

  //csv = await getZip(variables['layer' + i].csv);

  var informacion= await service()

  //console.log(informacion)





for (var i = 1; i <= variables.layers.length ; i++){                                                                                                               
  
  var csv;
  
  async function getDatos(i) {
    
    console.log("hola")

    console.log(variables['layer' + i].service)
    
    csv = informacion[variables['layer' + i].service]
    
       
    csv_arr[i] = csv
    
    function tiles(tileCoord) {

      return (
        urlDeploy + variables['layer'+i].url_backend
      )
        .replace('{z}', String(tileCoord[0] * 2 - 1))
        .replace('{x}', String(tileCoord[1]))
        .replace('{y}', String(tileCoord[2]))
    }
  
    
    
    const source = vectorTileSource(tiles); 
  
    const layer = vectorTileLyr(source,1,variables['layer'+i].zMin,variables['layer'+i].zMax);
  
    layer_arr[i]=layer
    layer_id[i]='layer'+i
    
    map.addLayer(layer);
    layer.set('id', 'layer' + i)
    
    
    layer.setVisible(variables['layer' + i].active)
    

    
    layer.setStyle(function (feature) {
  
      var color = iterador(
        csv_arr[i] ,
        feature,
        variables['layer'+i].columna,
        variables['layer'+i].pk_backend,
        variables['layer'+i].rangos,
        variables['layer'+i].colores
      );
      
      return estilo(color)
    });
    
    



    /*
   layer.setStyle(function (feature) {
  
     var value=feature.get(variables['layer'+i].col_data)
     
    var color = getColor(
      value,
      variables['layer'+i].rangos,
      variables['layer'+i].colores
    );
    
    return estilo(color)
   });
    */


    finishLoad();
    
  }
  
  getDatos(i)


}

}

servicios();







const getColor = (valor, var_array, var_colores) => {

  var array = []
  var colores = []

  array = var_array;
  colores = var_colores;

  var filter = array.map((e, i) => {
    return e < valor ? i : false;
  })

  return colores[Math.max(...filter)]

}


const iterador = (info, feature, columna, pk, array, colores) => {

  const key = feature.get(pk);

  var color = 'transparent'

  //console.log(info)

  if (typeof info[key] !== "undefined") {
    //console.log(newdata_mz[key])

    color = getColor(parseFloat(info[key][columna]), array, colores)
    
  

  }
  return color;
}


const estilo = (color) => {

  if (color!=='transparent') {
    return new Style({
      fill: new Fill({
        color: color
      }),
      stroke: new Stroke({
        color: '#535353',
        width: 0.3,
      }),
    });
  } else {
    return new Style({
      fill: new Fill({
        color: color
      })
    });
  }
  

}






// zoom to municipio 
const sel_municipio = document.querySelector('#municipio');
sel_municipio.addEventListener('change', (event) => {

  var value = sel_municipio.value;
  console.log(value)

  cod = value;

  nombre=sel_municipio.options[sel_municipio.selectedIndex].text;
  console.log("NOMBRE", nombre);

  
  var boundary = geometria[value];

  var ext = boundingExtent([[boundary[0][0], boundary[0][1]], [boundary[1][0], boundary[1][1]]]);


  servidorGetRaw('box/' + cod).then((response) => {
    var box = response[0];

    console.log(box)

    var ext = boundingExtent([[box.st_xmin, box.st_ymin],[box.st_xmax, box.st_ymax]]);

    map.getView().fit(ext, map.getSize());


  })


  ext = transformExtent(ext, 'EPSG:4326', 'EPSG:3857');

  
  seleccion_mpio.getSource().setUrl(urlDeploy + 'select/'+nombre+'/{x}/{y}/{z}.pbf'); 
  const aa = seleccion_mpio.getSource().getFeaturesInExtent();
  
  seleccion_mpio.setStyle((feature) => {
    console.log("FEATURE", feature);
  })

 

});




var highlightStyle=   new Style({
  stroke: new Stroke({
    color: '#fff',
    width: 2,
  }),
});


var selection = {};
var cambio=""

var selectedCountry = new Style({
  stroke: new Stroke({
    color: 'rgba(64,163,213,0.8)',
    width: 2,
  }),
  fill: new Fill({
    color: 'rgba(64,163,213,0.3)',
  }),
});



var selectionLayer = new VectorTileLayer({
  map: map,
  renderMode: 'vector',
  source: null,
  style: function (feature) {
    if (feature.get(cambio) in selection) {
      return selectedCountry;
    }
  },
});




// Popup al hacer click sobre una capa
map.on('singleclick', function (evt) {
  var coordinate = evt.coordinate;

  var mensaje = "";
  var id = "";

  let features = [];
  let ids=[]

  var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {

    features.push(feature);


    var id=layer.get('id')

    ids.push(id)



    if ( id!=='mpio' && id!=='depto' && id!=='seleccion_mpio') {
        

      var layer1 = id;
      console.log(id)
      var index = layer_id.indexOf(layer1)
      
      
      selection={}

      var fid = feature.get(variables[id].pk_backend);
      selection[fid] = feature;
      cambio=variables[id].pk_backend

      selectionLayer.setSource(layer.getSource())    
      selectionLayer.changed();



    }

 
  
  





  });



  if (features !== []) {
   

    for (let l = 0; l < features.length; l++){
      
      let id = ids[l]
      
      if ( id!=='mpio' && id!=='depto' && id!=='seleccion_mpio') {
        

        var layer=id;
        var index = layer_id.indexOf(layer)
            
        var info = csv_arr[index][features[l].get(variables[id].pk_backend)]
        mensaje = "<p>Cod DANE: " + info[0] + "</p><p> " + variables[id].titulo + ' : ' + info[variables[id].columna] + "</p>"+mensaje
        

      } else {
        if (id == "mpio") {
          var info = features[l].get("nombre_mpio")
     
          mensaje = "<p>Municipio: " + info + "</p>" +mensaje

        } else if (id == "depto") {

          var info = features[l].get("nombre")
          mensaje = "<p>Depto: " + info + "</p>"+mensaje
        }
      }

       

    }

    

  }
  


  







  if (mensaje != "") {
    content.innerHTML = '<p>' + mensaje + '</p>';
    overlay.setPosition(coordinate);
  }


});


// cambio del mapa base

/*
var radios = document.querySelectorAll('input[type=radio][name=radio1]');

radios.forEach(radio => radio.addEventListener('change', () => {

  const mapa = radio.value;

  const baseMaps = variables.baseMaps;

  base.setSource(
    new XYZ({
      url: baseMaps[mapa]+key,
      crossOrigin: "Anonymous"
    })
  )

}

))
*/


/* gráficos en el movimiento
var grafico = document.getElementById('grupo-graficos')

var info_graph = null;

var activo = "layer1"

var data = variables[variables["layer1"]]
  
info_graph = data;

map.on('moveend', onMoveEnd);
*/





//visibilidad de las capas de los layer
var check = document.getElementsByClassName('layer');

var activo = "layer1"
var prev_layer = "layer1";

console.log(prev_layer)

ReactDOM.render(<Leyenda layer={prev_layer}/>, document.getElementById('leyenda'));

const myFunction = (e) => {


  try {

    var index = layer_id.indexOf(prev_layer)
    
    var hijo = variables[prev_layer].hijos
    var index_hijo = layer_id.indexOf(hijo)

    layer_arr[index].setVisible(false)
    layer_arr[index_hijo].setVisible(false)

  } catch (err) {
    
  }

 var layer=e.target.getAttribute("layer");
  activo = layer;
 var index = layer_id.indexOf(layer)

  var hijo = variables[layer].hijos
  var index_hijo = layer_id.indexOf(hijo)
  
  layer_arr[index].setVisible(true)
  layer_arr[index_hijo].setVisible(true)
  
 prev_layer = layer;

 ReactDOM.render(<Leyenda layer={layer}/>, document.getElementById('leyenda'));

}

for (var i = 0; i < check.length; i++) {
  check[i].addEventListener('change', e => myFunction(e), false);
}


// se activa la primera capa
document.getElementById("checklayer1").checked = true;


//cambio de transparencia
var slider = document.getElementsByClassName('slider');

const changeSlider = (e) => {
  const transparencia = e.target.value / 10
  
  var layer = e.target.name;
  var index = layer_id.indexOf(layer)
  layer_arr[index].setOpacity(transparencia)

  var hijo = variables[layer].hijos
  var index_hijo = layer_id.indexOf(hijo)
  layer_arr[index_hijo].setOpacity(transparencia)

}
for (var i = 0; i < slider.length; i++) {
  slider[i].addEventListener('change', e => changeSlider(e), false);
}



// actualización de las estadisticas


const getEstadistica = (valor, rangos) => {

  var array = []

  array = rangos

  var filter = array.map((e, i) => {
    return e < valor ? i : false;
  })

  return Math.max(...filter)

}






function onMoveEnd(evt) {
  
  evt.stopPropagation();
  evt.preventDefault();

  


}





function getUniqueFeatures(array, comparatorProperty) {
  var existingFeatureKeys = {};
  var uniqueFeatures = array.filter(function (el) {

    if (existingFeatureKeys[el.get(comparatorProperty)]) {
      return false;
    } else {
      existingFeatureKeys[el.get(comparatorProperty)] = true;
      return true;
    }
  });

  return uniqueFeatures;
}


// menu de estilo de hamburguesa

const mq = window.matchMedia("(max-width: 700px)");

if (mq.matches) {
  document.getElementById('ham').checked = false;


  var ham = document.getElementById('ham');
  ham.addEventListener('change', e => {

    if (ham.checked) {
      document.getElementById('leyenda').style.visibility = "hidden";
    } else {
      document.getElementById('leyenda').style.visibility = "visible";

    }

  }

    , false);


} else {
  document.getElementById('ham').checked = true;
}


var buttons = document.querySelectorAll(".toggle-button");
var modal = document.querySelector("#modal");


[].forEach.call(buttons, function(button) {
  button.addEventListener("click", function() {
    modal.classList.toggle("off");
  })
});


//defaults
document.getElementById('titulo_visor').innerHTML = variables.title;
document.getElementById('description').innerHTML = variables.description;

document.getElementById('logo-presidente').src=variables.imgFooter