select * from manzanas1 limit 1

select st_srid(geom) from manzanas limit 1

select manz_ccnct from manzanas limit 1


CREATE TABLE manzanas_def1 AS 
  SELECT "MANZ_CCNCT" AS manz_ccnct,ST_Transform(geom,3857) AS geom 
  FROM manzanas1;
  
  CREATE INDEX manzanas_def1_index
  ON manzanas_def1
  USING GIST (geom);
  
   CREATE INDEX manzanas_def_index_1 ON manzanas_def (geom);
   
CREATE SCHEMA datos;

drop table datos.ipm_rural
create table datos.ipm_rural (
cod_dane text,
IPM_OBSERVADO real,
RF_CENSO real,
GBTR_CENSO real,
RF_DIRECTO_MONTE_media real,
GBTR_DIRECTAS real,
RF_DIRECTAS real,
GBTR_DIRECTO_MONTE_media real	
)
drop table datos.ipm_urbano
create table datos.ipm_urbano (
0 - cod_dane text,  
1 - IPM_OBSERVADO real,
2 - RF_CENSO real,
3 - GBTR_CENSO real,
4 - RF_DIRECTO_MONTE_media real,
5 - GBTR_DIRECTAS real,
6 - RF_DIRECTAS real,
7 - GBTR_DIRECTO_MONTE_media real	
)
delete from datos.ipm_rural 
COPY datos.ipm_rural 
FROM 'C:\Users\Ivan Carrillo\Desktop\visor-nuevo-ipm\datos\last\rural.tab' 
DELIMITER E'\t' CSV HEADER;

COPY datos.ipm_urbano 
FROM 'C:\Users\Ivan Carrillo\Desktop\visor-nuevo-ipm\datos\last\cpob.tab' 
DELIMITER E'\t' CSV HEADER;

select * from datos.ipm_rural limit 10 

update datos.ipm_rural
set cod_dane =substring(cod_dane,1,11)

update datos.ipm_urbano 
set 
IPM_OBSERVADO = round(IPM_OBSERVADO::numeric,2),
RF_CENSO = ROUND(RF_CENSO::numeric,2),
GBTR_CENSO = ROUND(GBTR_CENSO::numeric,2),
RF_DIRECTO_MONTE_media = ROUND(RF_DIRECTO_MONTE_media::numeric,2),
GBTR_DIRECTAS = ROUND(GBTR_DIRECTAS::numeric,2),
RF_DIRECTAS = ROUND(RF_DIRECTAS::numeric,2),
GBTR_DIRECTO_MONTE_media = ROUND(GBTR_DIRECTO_MONTE_media::numeric,2)


CREATE INDEX data_rural_idx
ON datos.ipm_rural (cod_dane);

SELECT
    ROUND( 10.812, 2 );


drop table datos.ipm_r
CREATE table datos.ipm_r AS
select ARRAY[
	cod_dane,
	IPM_OBSERVADO::text,
	RF_CENSO::text,
	GBTR_CENSO::text,
	RF_DIRECTO_MONTE_media::text,
	GBTR_DIRECTAS::text,
	RF_DIRECTAS::text,
	GBTR_DIRECTO_MONTE_media::text
]
from datos.ipm_rural

select * from vista_rural1



COPY datos.ipm_rural
TO 'C:\Users\Ivan Carrillo\Desktop\ipm_r.csv' 
DELIMITER ',' CSV HEADER;




EXPLAIN ANALYZE

WITH poly as (SELECT ST_Transform(ST_MakeEnvelope(-73.828125, 3.5134210456400448,-73.125, 4.214943141390651, 4326), 3857) as geom) 
  SELECT *
  FROM (
      SELECT
      manz_ccnct,
	  data.*,
      ST_AsMVTGeom(
              g.geom,
              TileBBox(9, 151, 250, 3857),
              1024,
              0,
              true
          ) as geom
      FROM manzanas_def1 as g
	  inner join datos.ipm_urbano as data
	  on g.manz_ccnct=data.cod_dane,poly
      WHERE (poly.geom && g.geom) and manz_ccnct like '11001%'
  ) q

CREATE INDEX foo_idx ON manzanas_def1 (manz_ccnct);

create table datos.mas_80 (
cod_dane text,
t_80 real,
p_80 real
)

create table datos.mas_60 (
cod_dane text,
t_60 real,
p_60 real
)

COPY datos.mas_60 
FROM 'C:\Users\Ivan Carrillo\Desktop\pob_60.csv' 
DELIMITER ',' CSV HEADER;  


drop table adultos_80
create table adultos_80 as
select "MANZ_CCNCT" as cod_dane,t_80*100 as t_80,p_80*100 as p_80,ST_Transform(geom,4326) as geom from 
manzanas1 m
inner join datos.mas_80 p on
m."MANZ_CCNCT"=p.cod_dane
limit 100

select count(*) from adultos_80
where p_80 >0.5

create table adultos_60 as
select "MANZ_CCNCT" as cod_dane,t_60 as t_60,p_60*100 as p_60,ST_Transform(geom,4326) as geom from 
manzanas1 m
inner join datos.mas_60 p on
m."MANZ_CCNCT"=p.cod_dane


  
  
  
  
  
  
  
  

