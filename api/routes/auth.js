import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World!qqfqfzf');
})  

router.get('/register', (req, res) => {
  res.send('regqfqfzf');
})  


export default router;