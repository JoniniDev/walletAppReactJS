import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom';
// @ts-ignore
import ContentLoader from "react-content-loader"
// @ts-ignore
import { getAllTransaction } from '../services/getTransaction.ts'
// @ts-ignore
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faChevronRight, faExchangeAlt } from '@fortawesome/free-solid-svg-icons'

import './List.scss'

type Transaction = {
    id: string;
    type: string;
    title: string;
    amount: number;
    description: string;
    date: string;
    pending: boolean;
    authUser: any;
};

type ListProps = {
    balance: number;
};


export const List: React.FC<ListProps> = ({ balance }) => {
    const [ListData, setListData] = useState<Transaction[]>([])
    const month: string[] = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    const curDate: Date = new Date()

    const getTransaction = useCallback(() => {
        getAllTransaction().then(({ transaction }) => {
            setListData(transaction)
        })
    }, [])

    const dateHandler = (transactionDate: string) => {
        const date = new Date(transactionDate)
        const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
        const diffMs = Math.abs(date.getTime() - curDate.getTime())
        if (diffMs > oneWeekInMs) {
            return date.toLocaleDateString("en-US");
        }
        return date.toLocaleDateString("en-US", { weekday: 'long' });
    }

    useEffect(() => {
        getTransaction()
    }, [])

    return (
        <div className='List-Container'>
            <h2 className='List-Header'>Latest Transactions</h2>
            <ul className='List-Box'>
                {ListData ? ListData.map(({ id, type, title, amount, description, date, pending, authUser }, index) => {
                    if (index < 10) {
                        return (
                            <div key={id}>
                                <Link to={`/transactionsDetail/${id}`}>
                                    <li className='List-Item'>
                                        <div
                                            style={{
                                                width: '50px',
                                                height: '40px',
                                                borderRadius: '5px',
                                                backgroundColor: `rgb(${Math.floor(Math.random() * 80)}, ${Math.floor(Math.random() * 80)}, ${Math.floor(Math.random() * 80)})`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        ><FontAwesomeIcon icon={faExchangeAlt as IconProp} color="white" /></div>
                                        <div className='List-Item-Text'>
                                            <div className='List-Item-TitleText'>
                                                <p className='List-Item-Title'>{title}</p>
                                                <p className='List-Item-Title'>{type === "Payment" ? "+" : null}${amount}</p>
                                            </div>
                                            <div className='List-Item-TitleText'>
                                                <p className='List-Item-Description'>{description}</p> {type === "Credit" ? <div className='List-Item-Percent'>{Math.ceil((amount / balance) * 100)}%</div> : null}
                                            </div>
                                            <p className='List-Item-Description'>{authUser ? `${authUser.userName} — ` : null}{dateHandler(date)}</p>
                                        </div>
                                        <FontAwesomeIcon icon={faChevronRight as IconProp} className='List-Item-Arrow' />
                                    </li>
                                </Link>
                                {index != ListData.length - 1 ? <hr className='List-Line' /> : null}
                            </div>
                        )
                    }
                }) : (
                    <ContentLoader
                        speed={1}
                        width={300}
                        height={500}
                        viewBox="0 0 290 500"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="0" y="6" rx="5" ry="5" width="279" height="67" />
                        <rect x="0" y="78" rx="5" ry="5" width="279" height="67" />
                        <rect x="0" y="150" rx="5" ry="5" width="279" height="67" />
                    </ContentLoader>
                )}
            </ul >
        </div >
    )
}
