
import React from 'react'

import EmptyReward from './EmptyReward'
import MyRewardsList from './MyRewardsList'

const MyRewards = ({ clickHandler }) => {

    const isRewardsEmpty = false

    return (
        <div>
            {(isRewardsEmpty === true) ? EmptyReward({ clickHandler: clickHandler }) : MyRewardsList()}
        </div>
    )
}

export default MyRewards