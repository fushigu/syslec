const axios = require('axios')

const res = axios.post('http://localhost:3000/', {'greeting': 'Hello'})

res.then((res) => {
    console.log(res.data)
})