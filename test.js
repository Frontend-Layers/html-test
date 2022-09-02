import express from 'express'
import htmlTest from '.'

const app = express()
const port = 3000

htmlTest('./html/**/*.html')

app.get('/', async (req, res) => {
  res.send('test')
})

app.listen(port, () => console.log(`Server: http://localhost:3000/`))

