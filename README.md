# Challenge

## como probar

- docker compose -d redis (o levantar redis desde otro lugar)
- yarn
- yarn dev

## endpoints API

get /rooms
devuelve las zonas disponibles

get /rooms/:num
devuelve la cantidad de monedas en una zona dada su numero

## lista de eventos del websocket

### emitidos desde afuera

- room(argumentos: un numero, por ejemplo 1)
  se obtiene las monedas disponibles en la habitacion

- collect(argumentos:un numero de habitacion, por ejemplo 1, y un punto en 3d, por ejemplo {x:3, y:5, z:10})
  quita una moneda de la habitacion dado un punto3d,
  si existe moneda en ese punto emite un mensaje a todos que se recolecto una moneda

### emitidos por ser servidor

- coins_available
  se obtiene como respuesta al mensaje room,da las monedas disponibles en una habitacion

- coin_collected
  se obtiene como respuesta al mensaje collect

- error
  se obtiene cuando hubo un error, por ejemplo en collect no existe monedas en la posicion dada

- saludo
  se obtiene cuando se conectan al principio
