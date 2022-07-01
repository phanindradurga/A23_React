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
  const [myRewards, setMyRewards] = useState({})
  const [myInvites, setmyInvites] = useState({})
  const [userprofile, setUserProfile] = useState({})

  const fetchProfile = async () => {
    const headers = {
      'Authorization': A23_TOKEN,
    };
    await axios.get('https://api.qapfgames.com/a23user/get_profile/', { headers })
      .then((response => {
        setUserProfile(response.data)
      }))
      .catch((e) => console.log('error here', e))
  }

  const fetchReNData = async () => {
    const headers = {
      'Authorization': A23_TOKEN,
    };
    await axios.get('https://api.qapfgames.com/a23user/referAndEarn', { headers })
      .then((response => receivedResponse(response.data.referNow)))
      .catch((e) => console.log('error here', e))
  }

  const fetchMyRewards = async (filter = '1') => {
    const body = { filter }
    const headers = {
      'Authorization': A23_TOKEN,
    };
    await axios.post('https://api.qapfgames.com/a23user/my_rewards', body, { headers })
      .then(response => {

        const data = "{\"successfulInvites\":0,\"totalBonus\":100,\"bonusList\":[{\"_id\":\"19abb8f6-045d-4db1-95f5-324ee514d7e3\",\"amount\":100,\"createdAt\":1656416069004,\"updatedAt\":1656416069004,\"description\":\"Bonus Received\",\"type\":\"REFCONBRONZE\",\"userID\":\"b659cgjrz0rukd8\"}]}"
        // setMyRewards(JSON.parse(data))
        setMyRewards(response.data)
      })
      .catch((e) => console.log('error here', e))
  }

  const fetchMyIvites = async (filter = '1') => {
    const body = { filter }
    const headers = {
      'Authorization': A23_TOKEN,
    };
    //Prod : https://pfapi.a23games.in/a23user/my_invites/
    //QA : https://api.qapfgames.com/a23user/my_invites
    await axios.post('https://api.qapfgames.com/a23user/my_invites', body, { headers })
      .then(response => {
        const data = "{\"Items\":[{\"identity\":\"7207666037\",\"userId\":\"0rl7xk05y5duiut\",\"updatedAt\":0,\"status\":\"pending\",\"screenName\":\"zero40\",\"createdAt\":1656180691158,\"type\":\"sms\"},{\"identity\":\"7569495111\",\"userId\":\"0rl7xk05y5duiut\",\"updatedAt\":0,\"status\":\"pending\",\"screenName\":\"zero40\",\"createdAt\":1656180691155,\"type\":\"sms\"}]}"
        // setmyInvites(JSON.parse(data))
        setmyInvites(response.data)
      })
      .catch((e) => console.log('error here', e))
  }

  useEffect(() => {
    fetchProfile()
    fetchReNData()
    fetchMyRewards()
    fetchMyIvites()
  }, [])

  const receivedResponse = (data) => {
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
        <SocialInvites renData={referAndEarndata} userProfile={userprofile} />
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
      {(pageID === 1) ? <MyRewards clickHandler={() => referNowClick()} myRewardsData={myRewards} fetchMyRewards={(selection) => fetchMyRewards(selection)} /> : ''}
      {(pageID === 2) ? <MyInvites clickHandler={() => referNowClick()} myInvitesData={myInvites} fetchMyIvites={(selection) => fetchMyIvites(selection)} /> : ''}

    </div>
  );
}



export default App;
