const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')

const DOE_API_KEY_NAME = process.env.DOE_API_KEY_NAME
const DOE_API_KEY_VALUE = process.env.DOE_API_KEY_VALUE
const DOE_API_BASE_URL = process.env.DOE_API_BASE_URL


router.get('/', async (req,res) => {
  try {
    console.log(url.parse(req.url, true).query)
    // add the API key and query params to the end of the base URL
    const params = new URLSearchParams({
      ...url.parse(req.url, true).query,
      [DOE_API_KEY_NAME]: DOE_API_KEY_VALUE 
    })
    const apiRes = await needle('get', `${DOE_API_BASE_URL}?${params}`)
    const data = apiRes.body
    // log the exact request if in production
    if(process.env.NODE_ENV !== 'production') {
      console.log(`REQUEST: ${DOE_API_BASE_URL}?${params}`)
    }
    res.status(200).json(data)
  }
 catch (error) {
   res.status(500).json({ error })
 }
})

module.exports = router;