import React, { useCallback, useState, useEffect } from 'react'
import './TransactionDetail.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';
// @ts-ignore
import { getTransactionById } from '../services/getTransaction.ts'
import { Link } from 'react-router-dom';

interface User {
    userName: string;
}

interface Transaction {
    id: string,
    type: string,
    amount: string,
    title: string,
    description: string,
    date: string,
    time: string,
    pending: boolean,
    authUser: User | null
}

export const TransactionDetail: React.FC<{}> = () => {
    const { id } = useParams()
    const [transaction, setTransaction] = useState<Transaction>({id:"", type: "", amount: "", title: "", description: "", date: "", time:"", pending: true, authUser: { userName: "" }})

    useEffect(() => {
        getTransaction()
    }, [])


    const getTransaction = useCallback(() => {
        getTransactionById(id ? id : "").then(({ transaction }) => {
            console.log(transaction)
            setTransaction(transaction)
        })
    }, [])

    return (
        <>
            <Link to="/">
                <FontAwesomeIcon className='TransactionDetail-Arrow' icon={faChevronLeft as IconProp} />
            </Link>
            <div className="TransactionDetail-Container">
                <p className="TransactionDetail-Amount">
                    ${transaction ? transaction.amount : null}
                </p>
                <p className="TransactionDetail-DescrText">
                    {transaction ? transaction.title : null} <br /> {transaction ? transaction.date : null}, {transaction ? transaction.time : null}
                </p>

                <div className="TransactionDetail-DetailBox">
                    <div className='TransactionDetail-Detail'>
                        <p className='TransactionDetail-Detail-Text-Bold'>
                            Status: {transaction && !transaction.pending ? "Approved" : "Pending"}
                        </p>
                        <p className='TransactionDetail-Detail-Text'>
                            Bank Card Debit
                        </p>
                        <br />
                        <p className='TransactionDetail-Detail-Text'>
                            {transaction ? transaction.description : "No description"}
                        </p>
                    </div>
                    <hr />
                    <div className='TransactionDetail-Total'>
                        <div className='TransactionDetail-Total-Box'>
                            <p className='TransactionDetail-Total-Text'>
                                Total
                            </p>
                            <p className='TransactionDetail-Total-Amount'>
                                ${transaction ? transaction.amount : null}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
