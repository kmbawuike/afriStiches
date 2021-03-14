const express = require('express')
const router = express.Router();

router.get('/', (req, res)=>{
   res.send('Omoh E choke')
})


module.exports = router