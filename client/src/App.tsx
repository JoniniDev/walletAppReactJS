import React from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.scss';
// @ts-ignore
import { TransactionDetail } from './pages/TransactionDetail.tsx';
// @ts-ignore
import { TransactionList } from './pages/TransactionList.tsx';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TransactionList/>} />
      <Route path="/transactionsDetail/:id" element={<TransactionDetail/>} />
    </Routes>
  );
}
