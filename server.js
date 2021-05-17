const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const port=3000
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const HIGH_SCORE_PATH = './data/highScores.json'

function getHighScores() {
	let highScoreList = fs.readFileSync(HIGH_SCORE_PATH,'utf-8');
	console.log(highScoreList);
	return JSON.parse(highScoreList);
}

function compareScores(firstEl, secondEl) {
	if (firstEl.score < secondEl.score) return 1;
	if (firstEl.score == secondEl.score) return 0;
	if (firstEl.score > secondEl.score) return -1;
}

function saveHighScores(highScoreObject) {
	let currentHighScores = getHighScores();
	currentHighScores.push(highScoreObject);
	currentHighScores.sort(compareScores);
	fs.writeFileSync(HIGH_SCORE_PATH, JSON.stringify(currentHighScores), 'utf-8');
}


const exampleScore = {
	name: "Eggert",
	score: 420
};

app.get('/hello',(req,res) => {
	res.send('Hello World!')
})

app.use(express.static(path.join(__dirname, 'build')));

app.post('/saveScore', jsonParser, (req, res) => {
	saveHighScores(req.body);	
});

app.get('/highScores', (req, res) => {
	res.json(getHighScores());
})

app.get('*', (req,res) => {
	res.sendFile(path.join(__dirname, 'build'));
})

app.listen(port, () => {
	console.log(`example app listening at http://localhost:${port}`)
})
