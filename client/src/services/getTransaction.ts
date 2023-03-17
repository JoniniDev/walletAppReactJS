// @ts-ignore
import axios from '../utils/axios.ts'

export async function getAllTransaction() {
    const { data } = await axios.get("transaction/getAllTransaction")
        .catch(error => {
            console.log(error)
        })
    return data
}

export async function getTransactionById(id: String) {
    const { data } = await axios.post("transaction/getTransactionById", {id})
        .catch(error => {
            console.log(error)
        })
    return data
}