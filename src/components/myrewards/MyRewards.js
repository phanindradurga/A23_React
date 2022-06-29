
import React from 'react'

import EmptyReward from './EmptyReward'
import MyRewardsList from './MyRewardsList'

const MyRewards = ({ clickHandler, myRewardsData }) => {


    return (
        <div>
            {/* {(myRewardsData.successfulInvites) ? EmptyReward({ clickHandler: clickHandler }) : MyRewardsList({ myRewardsData: myRewardsData })} */}
            {myRewardsData.successfulInvites ?
                <EmptyReward clickHandler={clickHandler} /> : <MyRewardsList myRewardsData={myRewardsData} />}
        </div>
    )
}

export default MyRewards