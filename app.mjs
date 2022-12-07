import express, {json, urlencoded} from 'express';
import morgan from 'morgan';
import { content } from './404.mjs';
import { htmlContent } from './index.mjs';
import { animals } from './animal-data.mjs'

const { PORT, HOST } = process.env;

const app = express()

app.use((request, response, next) => {
    console.log(`Query: ${JSON.stringify(request.query)}`)
    console.log(`Params: ${JSON.stringify(request.params)}`)
    console.log(`Body: ${JSON.stringify(request.body)}`)
    return next()
})

app.use(morgan('dev'))
app.use(json())
app.use(urlencoded({extended:true}))

app.get('/',  (req, res) => {
    res.status(200).send('Hello Express!')
})

app.get('/users', (req, res) => {
    res.status(200).send('Get all Users')
})

app.get('/json', (request, response) => {
    response.set('Content-Type', 'application/json')
    response.status(200).json(animals)
})

app.get('/html', (request, response) => {
    response.set('Content-Type', 'text/html')
    response.status(200).send(htmlContent)
})

app.get("/query", (request, response) => {
    response.send(request.query)
})

app.get('/:part1/:part2', (request, response) => {
    response.status(200).send(request.params)
})


app.post('/post', (request, response) => {
    response.status(200).send(request.body)
})

app.post('/form', (request, response) => {
    response.status(200).send(request.body)
} )

app.use((request, response, next) => {
    response.set('Content-Type','text/html; charset=utf-8')
    response.status(404).send(content)
    return next()
})

app.listen(PORT, HOST,  ()=> {
    console.log(`🌎  listening on`,`http://${HOST}:${PORT}`);
});
