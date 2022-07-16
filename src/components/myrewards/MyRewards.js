
import React from 'react'

import EmptyReward from './EmptyReward'
import MyRewardsList from './MyRewardsList'

const MyRewards = ({ clickHandler, myRewardsData, fetchMyRewards }) => {


    return (
        <div>
            {/* {(myRewardsData.successfulInvites) ? EmptyReward({ clickHandler: clickHandler }) : MyRewardsList({ myRewardsData: myRewardsData })} */}
            {myRewardsData.successfulInvites >= 0 ?
                <MyRewardsList myRewardsData={myRewardsData} fetchMyRewards={(selection) => fetchMyRewards(selection)} /> : <EmptyReward clickHandler={clickHandler} />}
        </div>
    )
}

export default MyRewards