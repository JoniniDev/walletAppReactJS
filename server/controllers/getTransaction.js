import fs from 'fs'

export const getAllTransaction = async (req, res) => {
    const transaction = JSON.parse(fs.readFileSync('./jsonData/Transaction.json', 'utf8'));
    try {
        res.status(200).json({
            transaction
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error"
        })
    }
}

export const getTransactionById = async (req, res) => {
    const transaction = JSON.parse(fs.readFileSync('./jsonData/Transaction.json', 'utf8'));
    const { id } = req.body

    try {
        res.status(200).json({
            transaction: transaction.find(item => item.id === id)
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error"
        })
    }
}
