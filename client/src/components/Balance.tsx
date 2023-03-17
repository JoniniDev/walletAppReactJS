import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import './Balance.scss'

interface Balance {
    onChangeBalance: (balance: number) => void;
}

export const Balance: React.FC<Balance> = ({ onChangeBalance }) => {
    const [limit, setLimit] = useState(1500) // Card limit
    const [balance, setBalance] = useState(Math.floor(Math.random() * 1500)) // Card balance (random number for the test)
    const [dailyPoints, setDailyPoints] = useState<number>(0) // Daily Points

    useEffect(() => {
        const today: Date = new Date();
        const month: number = today.getMonth() + 1;
        const day: number = today.getDate();
        const season: string = getSeason(month);

        if (day === 1) {
            setDailyPoints(2);
        } else if (day === 2) {
            setDailyPoints(3);
        } else {
            const prevDayPoints: number = calculatePrevDayPoints(season, day);
            const prevPrevDayPoints: number = calculatePrevDayPoints(season, day - 1);
            setDailyPoints(Math.round(prevDayPoints + prevPrevDayPoints));
        }
    }, []);

    useEffect(() => {
        onChangeBalance(balance)
    }, [balance])

    const getMonth = (monthNumber: number) => {
        const month: string[] = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
        return month[monthNumber]
    }

    const calculatePrevDayPoints = (season: string, day: number): number => {
        if (day < 1) return 0;
        if (day === 1) return 2;
        if (day === 2) return 3;

        const prevDayPoints: number = calculatePrevDayPoints(season, day - 1);
        const prevPrevDayPoints: number = calculatePrevDayPoints(season, day - 2);
        const prevDayMultiplier: number = day === 3 ? 1 : 1.6;

        return Math.round(prevDayPoints * prevDayMultiplier + prevPrevDayPoints);
    };

    const getSeason = (month: number): string => {
        switch (month) {
            case 12:
            case 1:
            case 2:
                return "winter";
            case 3:
            case 4:
            case 5:
                return "spring";
            case 6:
            case 7:
            case 8:
                return "summer";
            case 9:
            case 10:
            case 11:
                return "autumn";
            default:
                return "";
        }
    };

    return (
        <div className='Balance-Container'>
            <div className='Balance-box-1 Balance-box'>
                <p className='Balance-CardText'>Card Balance</p>
                <p className='Balance-CardBalanceValue'>${balance}</p>
                <p className='Balance-CardBalanceAvailable'>${limit - balance} Available</p>
            </div>
            <div className='Balance-box-2 Balance-box'>
                <p className='Balance-CardText'>Daily Points</p>
                <p className='Balance-CardBalanceAvailable'>{dailyPoints > 1000 ? `${Math.round(dailyPoints / 1000)}K` : dailyPoints}</p>
            </div>
            <div className='Balance-box-3 Balance-box'>
                <p className='Balance-CardText'>No Payment Due</p>
                <p className='Balance-CardBalanceAvailable'>You've paid your {getMonth(new Date().getMonth())} balance.</p>
                <div className='Balance-Accept'><FontAwesomeIcon icon={faCheck as IconProp} className='Balance-Mark' /></div>
            </div>
        </div>
    )
}
