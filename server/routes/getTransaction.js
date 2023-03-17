import { Router } from 'express'
import { getAllTransaction, getTransactionById } from '../controllers/getTransaction.js'

const router = new Router()

router.get('/getAllTransaction', getAllTransaction)

router.post('/getTransactionById', getTransactionById)

export default router