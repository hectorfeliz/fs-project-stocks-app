require('dotenv').config({
	path: `${__dirname}/.env`
});

const { v4: uuidv4 } = require('uuid');
const express = require('express');

const app = express();



// Logging Function
function logEverything(req) {
	console.log(
		'path:', req.path,
		'method:', req.method,
		'params:', req.params,
		'body:', req.body,
	);
}
const { Post } = require('./models/Post');

app.use(express.json());


app.get('/posts/:postId', (req, res) => {
	logEverything(req);
	const { postId } = req.params;
	const post = posts.find((post) => post.id === postId);

	if (!post) {
		return res.status(404).send();
	}

	res.json(post);
});

app.post('/posts', async (req, res) => {

    const { excerpt, body, author } = postData;

	const postDocument = new Post({ author, body, excerpt });

	try {

		await postDocument.save();
		res.status(201).json(postDocument);

	} catch (err) {

		res.status(500).send();
		console.log.error(error);

	}

	res.status(201).json(post);
});


const mongoose = require('mongoose');


const uri = 'mongodb://localhost:27017/stocks-app';

mongoose.connect(uri, {useNewUrlParser: true}).then(() => {
	console.log(`Successfully connected to: ${uri}`);
}).catch((err) => console.log(err.message));

app.listen(process.env.PORT, () => {
	console.log(`API Server Listening on port ${process.env.PORT}...`);
});