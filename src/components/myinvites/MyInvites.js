import axios from 'axios'
import React, { useRef, useState } from 'react'
import { A23_TOKEN } from '../../Constants'


import EmptyReward from '../myrewards/EmptyReward'
import MyInvitesList from './MyInvitesList'

var selectedArray = {}

const MyInvites = ({ clickHandler, myInvitesData, fetchMyIvites }) => {

    const [btndisabled, setBtnDisabled] = useState(true)
    const isRewardsEmpty = false

    const childRef = useRef()

    const onItemsSelction = (recordList) => {
        var selectedRecordsArray = recordList.filter(checkSelected)
        selectedArray = [...selectedRecordsArray]
        setBtnDisabled(!(selectedRecordsArray && selectedRecordsArray.length > 0))
    }

    const checkSelected = (record) => {
        return record.setSelection;
    }

    const handleInviteAgain = () => {
        if (selectedArray && selectedArray.length > 0) {
            sendInviteAgainRequestToServer(selectedArray)
        }
    }

    const sendInviteAgainRequestToServer = async (selectedRecordsArray) => {
        const list = selectedRecordsArray.map((record) => record.identity)
        const body = { list: list, type: 'both' }
        const headers = {
            'Authorization': A23_TOKEN,
            'Content-Type': 'application/json'
        };
        await axios.post('https://api.qapfgames.com/a23user/send_invite/', body, { headers }).then(response => {
            if (response.data.statusCode === 1181) {
                childRef.current.resetSelections()
                alert(response.data.message)
            }
        }).catch((e) => {

        })
    }

    return (
        <div>
            {(myInvitesData && myInvitesData.Items.length > 0) ? <div><MyInvitesList ref={childRef} myInvitesData={myInvitesData} fetchMyIvites={(selection) => fetchMyIvites(selection)} onItemsSelction={onItemsSelction} />
                <div style={{ ...styles.btnContainer }}>
                    <div style={{ ...(btndisabled === true ? styles.btnDisabled : styles.btn) }} onClick={() => handleInviteAgain()} >Invite again</div>
                </div>
            </div> : <EmptyReward clickHandler={clickHandler} />}

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