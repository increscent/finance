import React from 'react';
import TopNav from '../Components/TopNav.js';
import BalanceTable from './BalanceTable.js';
import BottomNav from '../Components/BottomNav.js';

export default function OverviewView(props) {
  return (
    <div>
      <TopNav page="overview"/>
      <BalanceTable />
      <BottomNav />
    </div>
  );
}
