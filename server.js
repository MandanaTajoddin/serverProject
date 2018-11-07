'use strict'
//import express from the express to set up the route
const express = require('express');

//import superagent to make xhttp request to send it to API 
const superagent = require('superagent');
//import cors to handle cross origin request 
const cors = require('cors')

//initiate an instance of express
const app = express()

app.use(cors())


// listen for a get request at route '/location' and send back the response
app.get('/location',(request,response)=>{
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=7600+Wisconsin+Ave+Bethesda+MD&key=${process.env.GEOCODE_API_key}`
    superagent.get(url)
    .then(res => response.send({
        latitude:res.body.results[0].geometry.location.lat,
        longitude:res.body.results[0].geometry.location.lng
    }
    
))
   .catch(err => response.send('<img src="http://http.cat/404" />'))
})

// listen for a get request at route '/weather' and send back the response
app.get('/weather',(request,response)=>{
    const url = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/38.9861368,-77.0950273`
    superagent.get(url)
    .then(res => response.send({

    summary:res.body.minutely.summary,
    summary:res.body.hourly.summary
     }
    ))
    .catch(err => response.send('<img src="http://http.cat/404" />'))
})

//listen for a get request at any route, this is a catch all, and send back an error
app.get('*',(request,response)=>{
    response.send('<img src="http://http.cat/500" />')
})

//declare a variable PORT that will use either the environment variable of port or 4000
const PORT = process.env.PORT || 4000;

//require in the dotenv module and call the config method for adding environment variables
require('dotenv').config()

//tell express to listen on the PORT
app.listen(PORT, ()=>{
    console.log(`server is now running on port ${PORT}`)
})

// const geoLocationHelper = query =>{
// const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=7600+Wisconsin+Ave+Bethesda+MD&key=AIzaSyAoSSKqCDcaSIJJnaOAmlYlwtRLut0rkbo'

// superagent.get(url)
// .then(res => res.send(res))

// }