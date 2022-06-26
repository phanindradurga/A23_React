import logo from './logo.svg';
import React from 'react'

import './App.css';
import HeaderTab from './components/HeaderTab';
import RnESteps from './components/RnESteps';
import SocialInvites from './components/SocialInvites';
import { useState } from 'react';
import MyRewards from './components/myrewards/MyRewards';
import MyInvites from './components/myinvites/MyInvites';

function App() {

  const tabsList = ["Refer Now", "My Rewards", "My Invites"]
  const [pageID, setPageID] = useState(0)

  const onTabSelected = (selectedPage) => {
    setPageID(selectedPage)
  }

  const getReferNowPage = () => {
    return (
      <div>
        <RnESteps />
        <SocialInvites />
      </div>
    )
  }

  const referNowClick = () => {
    setPageID(0)
  }

  return (
    <div className="App">
      <HeaderTab tabs={tabsList} onPageSelected={(data) => onTabSelected(data)} pageID={pageID} />
      {(pageID === 0) ? getReferNowPage() : ''}
      {(pageID === 1) ? MyRewards({ clickHandler: () => referNowClick() }) : ''}
      {(pageID === 2) ? MyInvites({ clickHandler: () => referNowClick() }) : ''}

    </div>
  );
}



export default App;
