import { getData } from '../js/request'
import { servidorPost } from '../js/request'

import { variables } from './variables'

var JSZip = require("jszip");
var zip = new JSZip();
const CSV = require('csv-string');

var arr={}

    
var service = async () => {

    for (let k = 0; k < Object.keys(variables.services).length ; k++){


        /*
        var path = variables.services[Object.keys(variables.services)[k]]
        
        var data = await servidorPost(path, null)

        var resultado = data.data;
        
        
        var newdata=[]

        resultado.map((row, i) => {
            
            var datos = row.array;
            var cod = datos[0]
            newdata[cod] = datos
        });
        */
        

        
       var path = variables.services[Object.keys(variables.services)[k]]
        

       const response = await getData(path);

        
        
       var newdata=[]

        var z = await zip.loadAsync(response.data);
        
        var str= await z.file(path + ".csv").async("string");


        const parsedCsv = CSV.parse(str);

   
        parsedCsv.map((row, i) => {
            
            if (i > 0) { //para quitar el encabezado
                var cod = row[0]
       
                newdata[cod] = row
            }
          
            

           })
 

        arr[Object.keys(variables.services)[k]] = newdata
        

    
    }
    return arr;

}
   

export {service}