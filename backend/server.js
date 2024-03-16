var express = require('express');
var app = express();

const cors = require('cors');
const fs = require('fs');

var expressStaticGzip = require("express-static-gzip");

var path = require('path');
const { Pool } = require("pg")
const SphericalMercator = require("@mapbox/sphericalmercator")
const mercator = new SphericalMercator()


app.use(cors({ credentials: true, origin: '*' }));

const pool = new Pool({
  host: "prodpsql02",
  port: 5444,
  user: "dfrodriguezl",
  database: "vector-tiles",
  password: 'd?E0AA7i1n7#M%R*mZ?lhcDv'
})


app.get('/datos/:archivo', function (req, res) {

  var archivo = req.params.archivo;

  const file = `${__dirname}/datos/` + archivo + `.zip`;

  res.writeHead(200, {
    'Content-Type': 'application/zip'
  });

  var readStream = fs.createReadStream(file);
  readStream.pipe(res);


});

//serve vector tiles
app.get('/:layer/:x/:y/:z.pbf', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const z = req.params.z;
  const x = req.params.x;
  const y = req.params.y;
  const layer = req.params.layer;

  var file = __dirname + '/' + layer + '/' + z + '/' + x + '/' + y + '.gz';


  if (fs.existsSync(file)) {
    var fileDos = fs.readFileSync(file);

    res.writeHead(200, { 'Content-Type': 'application/x-protobuf', 'Content-Encoding': 'gzip' });

    res.end(fileDos);

  } else {
    res.sendStatus(400)
  }

});

app.get("/select/:nombre/:x/:y/:z.pbf", function (req, res) {
  // let bbox = mercator.bbox(req.params.x, req.params.y, req.params.z)
  // console.log(bbox.join(", "))


  var sql = `
  SELECT ST_AsMVT(q, 'buildings', 4096, 'geom')
  FROM (
      SELECT
      
          ST_AsMVTGeom(
              geom,
              TileBBox(${req.params.z}, ${req.params.x}, ${req.params.y}, 3857),
              4096,
              0,
              false
          ) geom
      FROM mpio_p
      WHERE ST_Intersects(geom, TileBBox(${req.params.z}, ${req.params.x}, ${req.params.y}, 3857))
      and nombre_mpio='${req.params.nombre}'
  ) q`

  const values = []
  pool.query(sql, values, function (err, mvt) {
    if (err) {
      console.log(err)
      res.status(400)
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/x-protobuf')
      fs.writeFileSync("foo.pbf", mvt.rows[0].st_asmvt);
      res.send(mvt.rows[0].st_asmvt)
    }
  })
})

app.get('/box/:mun', function (req, res) {

  const sql = `
  select st_xmin(ST_Extent(geom)),st_ymin(ST_Extent(geom)), 
  st_xmax(ST_Extent(geom)),st_ymax(ST_Extent(geom)) 
  from mgn2018_mpio where mpio_ccnct ='${req.params.mun}'`

  pool.query(sql, function (err, results) {
    if (err) {
      console.log(err)
      res.status(200).json("error")
      throw err
    } else {
      res.status(200).json(results.rows)
    }
  })

})




var DIST_DIR = path.join(__dirname, "../dist/");

app.use("/", expressStaticGzip(DIST_DIR));


//deploy in port 3000
app.listen(3000, function () {
  console.log('listening on port 3000!');
});