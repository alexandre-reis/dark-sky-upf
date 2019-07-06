const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const DarkSky = require('dark-sky')
const darksky = new DarkSky('GERE SUA API NO SITE DARSKY E COLE AQUI')
//     https://darksky.net/dev

//podemos definir a porta que quisermos aqui, no caso esta rodando na 8888
const port = 8888;
const index = require("./routes/index");
const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

var cities = [
  {
    position: {lat: -28.4384116,lng: -52.246092},
    name: "Marau - RS",
    title: "Marau - RS"
  },
  {
    position: {lat: -22.9132525,lng: -43.7261679},
    name: "Rio de Janeiro - RJ",
    title: "Rio de Janeiro - RJ"    
  },
  {
    position: {lat: 41.909986,lng: 12.3959139},
    name: "Roma - Itália",
    title: "Roma - Itália"    
  },
  {
    position: {lat: -77.8400829,lng: 166.64453},
    name: "Estação McMurdo - Antartida",
    title: "Estação McMurdo - Antartida"
  }
];

const getApiAndEmit = async (socket) => {
   /*
   aqui estamos consumindo a API fornecida pelo DarkSky, 
   a latitude e longitude desejada 
   e como parametros passamos a units=si para que os resultados retornem em °celcius e medidas métricas
  */
  try {          
    cities.map(city => {
      darksky
        .coordinates({lat: city.position.lat, lng: city.position.lng})
        .units('si')
        .language('pt')
        .exclude('minutely,daily')
        .get()
        .then(value => {    
          console.log(value)               
          city.temperature = value.currently.temperature;
          return city;         
        }).catch(err => {
          console.log('erro then', err)
        })

    })
    } catch (err) {
      console.log('catch', err)
    }
  socket.emit("FromAPI", cities);
}

/**
 * ao conectar no socket, será realizada a chamada para a funcao getApiAndEmit() definida anteriormente
 e realizara uma chamada a cada 60 segundos. 
 */
io.on("connection", socket => {  
  setInterval(() => getApiAndEmit(socket), 10000);
  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(port, () => console.log(`Listening on port ${port}`));
