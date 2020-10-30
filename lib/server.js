require('newrelic')
const express = require('express')
const path = require('path')
const app = express()
const port = 3005

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('lib'))
app.use('/listing/:itemId', express.static(path.join(__dirname, 'index.html')))


app.get('/listing/:itemId', (req, res) => {
  const api = req.params;
  res.redirect(`http://3.137.156.25/listing/${api.itemId}/`);
});

app.listen(port, () => {
  console.log(`Proxy listening at http://localhost:${port}`);
})
