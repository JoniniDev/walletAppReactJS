import React, { useState, useEffect } from 'react'

// @ts-ignore
import { Balance } from '../components/Balance.tsx'
// @ts-ignore
import { List } from '../components/List.tsx'

import './TransactionList.scss'

export const TransactionList: React.FC<{}> = () => {
    const [balance, setBalance] = useState<number>(0)

    const onChangeBalance = (amount: number): void => {
        setBalance(amount)
    }

    return (
        <div className='TransactionList-Container'>
            <Balance onChangeBalance={onChangeBalance} />
            <List balance={balance} />
        </div>
    )
}
