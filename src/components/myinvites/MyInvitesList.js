import React from 'react'

import { InviteData } from './InviteData'
const MyInvitesList = ({ myInvitesData }) => {

    const headerTitles = ["Select", "Email/Mobile", "Last Invite", "Accept Date", "Status"]
    const widthPercentage = [10, 30, 22, 22, 16]

    const data1 = new InviteData(false, "Phani2205@gmail.com", "22nd jun", "NA", "P")
    const data2 = new InviteData(false, "+919985788376", "22nd jun", "NA", "P")
    const data3 = new InviteData(false, "+919848109877", "22nd Aug", "NA", "P")


    const obj = JSON.parse(myInvitesData);
    const records = obj.Items ? obj.Items : [data1, data2, data3]

    console.log("records ", records);


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

    const getFormattedDate = (timestamp) => {
        var formattedTime = "NA"
        try {
            if (timestamp !== 0) {
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ];
                var date = new Date(timestamp);
                var month = monthNames[date.getMonth()];
                var day = date.getDay();
                var year = date.getFullYear().toString().slice(-2);
                formattedTime = day + ' ' + month + '\'' + year;
            }
        } catch (e) {

        }
        return formattedTime

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
            {getListHeader()}
            {getListItems()}
        </div>
    )
}

export default MyInvitesList