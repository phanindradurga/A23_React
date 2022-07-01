import React from 'react'


import EmptyReward from '../myrewards/EmptyReward'
import MyInvitesList from './MyInvitesList'

const MyInvites = ({ clickHandler, myInvitesData, fetchMyIvites }) => {

    const isBtnDisabled = true
    const isRewardsEmpty = false

    return (
        <div>
            {(isRewardsEmpty === true) ? <EmptyReward clickHandler={clickHandler} /> : <MyInvitesList myInvitesData={myInvitesData} fetchMyIvites={(selection) => fetchMyIvites(selection)} />}
            <div style={{ ...styles.btnContainer }}>
                <div style={{ ...(isBtnDisabled ? styles.btnDisabled : styles.btn) }} >Invite again</div>
            </div>
        </div >
    )
}

const styles = {
    btn: {
        background: 'linear-gradient(270deg ,#35A753, #276E3A)',
        fontWeight: '600', width: '25%',
        color: 'white', padding: '0.5rem',
        borderStyle: 'solid', borderRadius: '0.5rem',

    },
    btnDisabled: {

        fontWeight: '600', width: '25%',
        color: 'grey', padding: '0.5rem',
        borderColor: 'grey',
        borderStyle: 'solid', borderRadius: '0.5rem',

    },
    btnContainer: {
        marginTop: '1rem',
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'center'

    }
}

export default MyInvites