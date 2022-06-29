import React from 'react'


import EmptyReward from '../myrewards/EmptyReward'
import MyInvitesList from './MyInvitesList'

const MyInvites = ({ clickHandler, myInvitesData, fetchMyIvites }) => {

    const isRewardsEmpty = false

    return (
        <div>
            {(isRewardsEmpty === true) ? <EmptyReward clickHandler={clickHandler} /> : <MyInvitesList myInvitesData={myInvitesData} fetchMyIvites={(selection) => fetchMyIvites(selection)} />}
        </div>
    )
}

export default MyInvites