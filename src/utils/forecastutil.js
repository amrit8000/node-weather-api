const request = require('request')


const forcast = ((latitude,longitude, callback) => {
    const weatherUrl = "http://api.weatherstack.com/current?access_key=cda1e6db0551812042a4a3f042dc50c0&query=" + 
    latitude + "," + longitude + "&units=f"

    request({url: weatherUrl, json: true}, (error, response) => {
        
        //If use json:true in the options argument then no need to parse the response body as json
        if(error) {
            callback("Unable to connect to weather service ", undefined)
        } else if(response.body.error) {
            callback("Unable to find location !!!!", undefined)
        } else {
            callback(undefined,  {
                currentTemp : response.body.current.temperature,
                feelslike : response.body.current.feelslike,
                weatherDescriptions : response.body.current.weather_descriptions[0]
                })   
        }
    
    })

})

module.exports = forcast