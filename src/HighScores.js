import React, { useState } from 'react';
import NameForm from './NameForm.js';

function HighScoreEntry(params) {
	return (
	
	<tr>
		<td> {params.highScoreObject.name} </td>
		<td> {params.highScoreObject.score} </td>
	</tr>
	)
}

function SubmitScore(params) {
	return (
		<tr>
			<td>
			<input type="text" placeholder="Your Name Here:" id="fname" name="fname"/>
			</td>
			<td>
				<button onClick={params.submitFunction}>Submit!</button>
			</td>
		</tr>
	)
}


function HighScores(params) {
	return (

		<table>
			<tr>
				<th>Name</th> <th>Score</th>
			</tr>
		{
		params.highScoreList.map((highScore) => {
			return <HighScoreEntry highScoreObject={highScore}
			/>
		})
		}
		<td>
			<NameForm submitFunction={params.submitFunction}></NameForm>
			</td>
		</table>

	)
}

export default HighScores;