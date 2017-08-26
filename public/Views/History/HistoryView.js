import React from 'react';
import TopNav from '../Components/TopNav.js';
import HistoryTable from './HistoryTable.js';
import BottomNav from '../Components/BottomNav.js';

export default function HistoryView(props) {
  return (
    <div>
      <TopNav page="history"/>
      <HistoryTable />
      <BottomNav />
    </div>
  );
}
