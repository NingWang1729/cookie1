const express = require('express')
const path = require('path')
const app = express()
const port=3000

app.get('/hello',(req,res) => {
	res.send('Hello World!')
})

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req,res) => {
	res.sendFile(path.join(__dirname, 'build'));
})

app.listen(port, () => {
	console.log(`example app listening at http://localhost${port}`)
})
