const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecastutil.js')

const app = express()

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const publicDirectroyPath = path.join(__dirname, '../public')

const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs') //Set handlebars engine through hbs node module which acts as a plugin


//Customizing views path
app.set('views', viewPath)

hbs.registerPartials(partialsPath)

/*--- Customize the server for static directory setup---*/
app.use(express.static(publicDirectroyPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name : 'Node Weather App'
    }) //Helps to render view engine e.g. 'hbs' files
})


app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Page',
        name : 'Node Weather App About Page'
    }) //Helps to render view engine e.g. 'hbs' files
})


app.get('/help', (req,res) => {
    res.render('help', {
        message: "This is a page to provide helpful information. This information might be"
        +" helpful for different access navigation and other details",
        title: 'Help',
        name: 'Node Developer'

    }) //Helps to render view engine e.g. 'hbs' files
})

/*app.get('', (req, resp) => {
    
    resp.send('<h1>Hello express !!!</h1>') // Instead of this taking the index.html page 
})

app.get('/help', (req, res) => {
    
    res.send({
        type: 'help',
        options: 'many'
    })
})

app.get('/about', (req, res) => {
    
    res.send('<h2>This is a about page !!!</h2>')
})*/

app.get('/weather', (req, res) => {
    
    if(!req.query.address) {
        return res.send({
             error: 'You must provide an address'
         }) 
     }

     geocode(req.query.address, (error, data) => {
        if(error) {
            return res.send({error}) //shorthand
        }

        forecast(data.latitude, data.longitude, (error, forcastData) => {
    
            if(error) {
                return res.send({error}) //shorthand
            } 
            res.send({
                forcast: forcastData,
                location: data.location,
                address: req.query.address
            })
          })

     })

    // res.send({
    //     forcast: "Bright Sunny Day",
    //     location: 'Pune',
    //     address: req.query.address
    // })
})

app.get('/products', (req,res) => {
    
    if(!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        }) 
    }

    //console.log(req.query)

    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('error_404', {
       errorMessage : '404 : Help article not found'
    })
})

/*--- Should be declared at last--- */
app.get('*', (req,res) => {
    res.render('error_404', {
        errorMessage : '404: Page Not Found'
     })
})

//Starts the server on port '3000'
app.listen(3000, () => {
    console.log("Server is up on port 3000 !!!")
}) 

