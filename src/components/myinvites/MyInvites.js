import React from 'react'


import EmptyReward from '../myrewards/EmptyReward'
import MyInvitesList from './MyInvitesList'

const MyInvites = ({ clickHandler, myInvitesData }) => {

    const isRewardsEmpty = false

    return (
        <div>
            {(isRewardsEmpty === true) ? <EmptyReward clickHandler={clickHandler} /> : <MyInvitesList myInvitesData={myInvitesData} />}
        </div>
    )
}

export default MyInvites