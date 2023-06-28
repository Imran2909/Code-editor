const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
    res.send("HOME ROUTE")
})

app.post("/write", async (req, res) => {
    let { Prompt } = req.body
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: Prompt,
            max_tokens: 2000,
        });
        console.log("completion")
        const completion = response.data.choices[0].text
        res.send({ "ans": completion })
    } catch (error) {
        res.send(error)
    }
})


app.post('/convert-code/:id', async (req, res) => {
    const code = req.body.code;
    const language = req.params.id;
    console.log(language)
    let Prompt=`let suppose you are a senior developer who knows java, javascript, python, c++,typescript, php languages. Now i will prove a code and tell you to convert it in another route and you have to just answer the converted code in the language I said
    ${code}
    convert this code in ${language} and add one blank line after each step make it more attractive`
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: Prompt,
            max_tokens: 2000,
        });
        console.log("completion")
        const completion = response.data.choices[0].text
        res.send({ "ans": completion })
    } catch (error) {
        res.send(error)
    }
});

app.post('/convert-debug', async (req, res) => {
    const code = req.body.code;

    let Prompt=`let suppose you are a senior developer who knows java, javascript, python, c++,typescript, php languages. Now i will prove a code and you have to debug the code give the result with very tiny observation and your code is :-
    ${code}
    now debug this and give brief response and also response with how correct code should be `
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: Prompt,
            max_tokens: 2000,
        });
        const completion = response.data.choices[0].text
        res.send({ "ans": completion })
    } catch (error) {
        res.send(error)
    }
});

app.post('/convert-check', async (req, res) => {
    const code = req.body.code;

    let Prompt=`let suppose you are a senior developer who knows java, javascript, python, c++,typescript, php languages. Now i will prove a code and you have to check the entire code and chech it very neatly and give feedback on the basis of code consistancy, code performance, code documentation, error handeling, code testability, code modularity, code complexity, code duplication, code readability
    and rate all them on tha scale of 100 for each aspect  and give a explaination also at last give overall accuracy and your code is :-
    ${code}
    now check this and give brief response`
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: Prompt,
            max_tokens: 2000,
        });
        const completion = response.data.choices[0].text
        res.send({ "ans": completion })
    } catch (error) {
        res.send(error)
    }
});



app.listen(3000, () => {
    console.log("listening")
})
