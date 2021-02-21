const Amadeus = require("amadeus");
const request = require('request');

// const city = 'berlin';

function weather(city) {
    const API_KEY = 'API_KEY';
    request.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${API_KEY}`, (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
        let temp = [];
        const result = JSON.parse(body);
        result.data.forEach(element => {
            temp.push(element.temp);
        }); return [Math.min.apply(Math, temp), Math.max.apply(Math, temp)]
        // return weather_call(temp);
    });
}

function weather_call(temp) {
    return [lowTemp, highTemp];
}

// weather('berlin')

function latlong(city){
    city = city.toLowerCase()
    if (city == 'berlin') {
        return [52.5200, 13.4050];
    }
    else if (city == 'london') {
        return [51.5074, 0.1278];
    }
    else if (city == 'paris') {
        return [48.8566, 2.3522];
    }
}


function sights(city) {
    const amadeus = new Amadeus({
        clientId: 'clientId',
        clientSecret: 'clientSecret'
    });
    // Returns activities for the given location based on geolocation coordinates
    const [lat, long]  = latlong(city)
    let result = []
    return amadeus.shopping.activities.get({
        latitude: lat,
        longitude: long,
    }).then((response) => {
        response.data.forEach(element => {
            result.push(element.shortDescription)
        }); sights_call(result)
    }).catch((response) => {
        console.error(response);
    });
}

function sights_call(data) {
    return data[Math.floor(Math.random() * Math.floor(10))];
}

// sights(latlong('berlin'))

function interests(city) {
    const amadeus = new Amadeus({
        clientId: 'clientId',
        clientSecret: 'clientSecret'
    });

    // What are the popular places in the given location (based on a geo location and a radius)
    const [lat, long]  = latlong(city)
    let result = []
    amadeus.referenceData.locations.pointsOfInterest.get({
        latitude: lat,
        longitude: long
    }).then((response) => {
        response.data.forEach(element => {
            result.push(element.name)
        });console.log(result)
        }).catch((response) => {
        console.error(response);
    });
}

function interests_call(data) {
    return data[Math.floor(Math.random() * Math.floor(10))];
}

// interests(latlong('berlin'))

module.exports.weather = weather;
module.exports.sights = sights;