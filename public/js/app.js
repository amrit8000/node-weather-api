
//console.log("Client side javascript loaded !!!")

/*fetch('http://puzzle.mead.io/puzzle').then((response)=> {

    response.json().then((data) => {
        if(data.error) {
            console.log(data.error)
        } else {
            console.log(data)
        }
    })

})*/

const weatherForm = document.querySelector('form')
const searchItem = document.querySelector('input')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() 
    const messageOne = document.querySelector('#msg1')
    const messageTwo = document.querySelector('#msg2')
    messageTwo.textContent = ''
    console.log(" searched location :: " , searchItem.value)
    
    //weather api calling using 'fetch' api
    //http://localhost:3000
    fetch('/weather?address=' + searchItem.value).then((response)=> {

    response.json().then((data) => {
        if(data.error) {
            //console.log(data.error)
            messageOne.textContent = data.error
        } else {
            console.log("Location: ", data.location)
            console.log("Forcast : " , data.forcast)
            messageOne.textContent = data.location 
            messageTwo.textContent = data.forcast.weatherDescriptions
        }
    })

})


})
