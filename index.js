// A express serveur, which will handle API requests coming in and respond back with a json object, it will use body parser as well as cross 
const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app =express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-3QkSfbCjul6TPq8IwZpoBVQh",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const {message} = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Tu es enseignant d'une classe de primaire, tu dois simplifier des notions complexes.
        Professeur: Que veux tu savoir?
        Eleve: ${message}?
        Professeur:`,
        max_tokens: 100,
        temperature: 0,
      });
      console.log(response.data)
      if(response.data.choices[0].text){
        res.json({message: response.data.choices[0].text})
      }
});

app.listen(port, () => {
    console.log('Example app listening');
});