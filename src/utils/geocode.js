
//Original request module has been deprecated. An alternative is 'postman-request'.
//const request = require('postman-request');

//Geo Coding Service using mapbox API
const request = require('request')

const geocode = ((address, callback) => {
    //limit param by default value is '5' for mapbox api
    const geoUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURI(address) + ".json?access_token=pk.eyJ1Ijoiam95ZGVlcDIwMjAiLCJhIjoiY2thYmN2aGFuMTVqajJzcDRobnoxMGo4ZCJ9.jXoilCnEuSXD4ZzwGGhPZQ&limit=1"

    request({url: geoUrl, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to location services !', undefined)
        } else if(response.body.features.length === 0) {
            callback('Not able to find the geolocation !', undefined)
        } else {
            callback(undefined, {
                latitude : response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name

            })
        }
    })

})


 module.exports = geocode