import React from 'react';
import TopNav from '../Components/TopNav.js';
import HistoryTable from './HistoryTable.js';

export default function HistoryView(props) {
  return (
    <div>
      <TopNav />
      <HistoryTable />
    </div>
  );
}
