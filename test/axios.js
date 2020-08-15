const axios  = require('axios')

axios.get('https://google.com')
.then((response) => {
    console.log(response.data)
})