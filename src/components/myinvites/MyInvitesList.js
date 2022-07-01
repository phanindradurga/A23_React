import axios from 'axios'
import React, { useState } from 'react'
import { A23_TOKEN } from '../../Constants'
import { getFormattedDate } from '../../utils/common'

import { InviteData } from './InviteData'
const MyInvitesList = ({ myInvitesData, fetchMyIvites }) => {


    const [value, setValue] = useState('1')

    const headerTitles = ["Select", "Email/Mobile", "Last Invite", "Accept Date", "Status"]
    const widthPercentage = [10, 30, 22, 22, 16]

    const data1 = new InviteData(false, "Phani2205@gmail.com", "22nd jun", "NA", "P")
    const data2 = new InviteData(false, "+919985788376", "22nd jun", "NA", "P")
    const data3 = new InviteData(false, "+919848109877", "22nd Aug", "NA", "P")



    const options = [
        { label: 'Last Week', value: '1' },
        { label: 'Last Month', value: '2' },
        { label: 'Last 3 Months', value: '3' },
    ];
    const obj = myInvitesData
    const records = obj.Items ? obj.Items : [data1, data2, data3]

    console.log("records ", myInvitesData);


    const styles = {
        mainContainer: {
            width: '95%',
            height: 'auto',
            margin: '0 auto',

        },
        listheader: {
            display: 'flex',
            width: '100%'

        },
        headerTitle: {

        }
    }

    const getListHeader = () => {
        return (
            <div style={{ ...styles.listheader, marginTop: '1rem', backgroundColor: '#ebbe69', boxSizing: 'border-box', borderColor: '#C9C9C9', borderRadius: '0.2rem', borderStyle: 'solid' }}>
                {headerTitles.map((title, index) => {
                    return <span key={index} style={{ width: `${widthPercentage[index]}%`, paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '0.6rem' }}>{title}</span>
                })}
            </div>
        )
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleChange = (event) => {
        const filter = event.target.value
        fetchMyIvites(filter)
        setValue(filter)
    }



    const getListItems = () => {
        return (
            <div>
                {records.map((records, index) => {

                    return <div key={index} style={{ display: 'flex', width: '100%', boxSizing: 'border-box', backgroundColor: (index % 2 === 0) ? '#FFFFFF' : '#F7F7F7' }}>
                        <div style={{ width: `${widthPercentage[0]}%`, paddingTop: '0.5rem', paddingBottom: '0.5rem', alignSelf: 'center' }}>
                            <input type="checkbox" />
                        </div>
                        <div style={{ width: `${widthPercentage[1]}%`, paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '0.6rem', alignSelf: 'center' }}>
                            {records.identity}
                        </div>

                        <div style={{ width: `${widthPercentage[2]}%`, paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '0.6rem', alignSelf: 'center' }}>
                            {getFormattedDate(records.createdAt)}
                        </div>

                        <div style={{ width: `${widthPercentage[3]}%`, paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '0.6rem', alignSelf: 'center' }}>
                            {getFormattedDate(records.updatedAt)}
                        </div>

                        <div style={{ width: `${widthPercentage[4]}%`, paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '0.6rem', alignSelf: 'center' }}>
                            {capitalizeFirstLetter(records.status)}
                        </div>

                    </div>

                })}
            </div>
        )
    }

    return (
        <div style={{ ...styles.mainContainer }}>
            <div style={{ display: 'flex', margin: '1rem', justifyContent: 'flex-end' }}>
                <select value={value} onChange={handleChange}>
                    {options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
            {getListHeader()}
            {getListItems()}
        </div>
    )
}

export default MyInvitesList