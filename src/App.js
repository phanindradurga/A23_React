import logo from './logo.svg';
import React, { useEffect } from 'react'

import './App.css';
import HeaderTab from './components/HeaderTab';
import RnESteps from './components/RnESteps';
import SocialInvites from './components/SocialInvites';
import { useState } from 'react';
import MyRewards from './components/myrewards/MyRewards';
import MyInvites from './components/myinvites/MyInvites';
import axios from 'axios';
import { A23_TOKEN } from './Constants';


function App() {


  const tabsList = ["Refer Now", "My Rewards", "My Invites"]
  const [pageID, setPageID] = useState(0)
  const [referAndEarndata, setReferAndEarndata] = useState({})


  useEffect(() => {
    const fetchReNData = async () => {
      const headers = {
        'Authorization': A23_TOKEN,
      };
      await axios.get('https://api.qapfgames.com/a23user/referAndEarn', { headers })
        .then((response => receivedResponse(response.data.referNow)))
        .catch((e) => console.log('error here', e))
    }

    const fetchMyRewards = async () => {
      const body = { filter: '1' }
      const headers = {
        'Authorization': A23_TOKEN,
      };
      await axios.post('https://api.qapfgames.com/a23user/my_rewards', body, { headers })
        .then((response => console.log('----->', response.data)))
        .catch((e) => console.log('error here', e))
    }

    const fetchMyIvites = async () => {
      const body = { filter: '1' }
      const headers = {
        'Authorization': A23_TOKEN,
      };
      await axios.post('https://api.qapfgames.com/a23user/my_invites', body, { headers })
        .then((response => console.log('----->', response.data)))
        .catch((e) => console.log('error here', e))
    }

    fetchReNData()
    fetchMyRewards()
    fetchMyIvites()

  }, [])

  const receivedResponse = (data) => {
    console.log("Data is: ", data);
    setReferAndEarndata(data)
  }


  // useEffect(() => {
  //   let profilesLength = gg();
  //   alert("Length: ", profilesLength);
  // }, [])

  const onTabSelected = (selectedPage) => {
    setPageID(selectedPage)
  }

  const getReferNowPage = () => {
    return (
      <div>
        <RnESteps data={referAndEarndata} />
        <SocialInvites />
      </div>
    )
  }

  const referNowClick = () => {
    setPageID(0)
  }

  // const gg = () => {
  //   if (console) {
  //     console.profile();
  //     console.profileEnd();
  //     // if (console.clear) { console.clear() };
  //     console.log(console.profiles);
  //     return console.profiles.length > 0;
  //   } else {
  //     console.log("console not available");
  //   }
  // }

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
