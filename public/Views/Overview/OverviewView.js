import React from 'react';
import TopNav from '../Components/TopNav.js';
import BalanceTable from './BalanceTable.js';

export default function OverviewView(props) {
  return (
    <div>
      <TopNav />
      <BalanceTable />
    </div>
  );
}
