'use strict'
require('dotenv').config();
const express =require('express');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const server = express();

server.get ('/location',locationHandler);
server.get ('/weather',weatherHandler);

function locationHandler (req,res) {
    let locationData= getLocation(req.query.data);
    res.status(200).json(locationData)
};
function getLocation(city){
    let data =require('./data/geo.json');
    return new Location(city,data);
}
function Location(city,data){
    this.search_query=city;
    this.formatted_query =data.results[0].formatted_address;
    this.latitude=data.results[0].geometry.location.lat;
    this.longitude=data.results[0].geometry.location.lng;
}
//.......................................//
//weather sttuf
//........................................//
function weatherHandler (req,res) {
    let weatherData= getWeather(req.query.data);
    res.status(200).json(weatherData)
};
function getWeather(city){
    let data =require('./data/darksky.json');
    let stuf=data.daily.data.map((day) => {
return new Weather(day);
    })
    console.log(stuf)
}
function Weather(day){
this.forecast=day.summary;
this.time=day.time;

}


server.use ('*',(req,res)=>{
    res.status(404).send('huh??')
})
server.listen(PORT ,() => console.log ('Hi world, from port',PORT));