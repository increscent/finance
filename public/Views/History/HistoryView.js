import React from 'react';
import TopNav from '../Components/TopNav.js';
import PeriodsTable from './PeriodsTable.js';

export default function HistoryView(props) {
  return (
    <div id="history">
      <TopNav page="history"/>
      <PeriodsTable />
    </div>
  );
}
