import React from 'react'

import { InviteData } from './InviteData'
const MyInvitesList = () => {

    const headerTitles = ["Select", "Email/Mobile", "Last Invite", "Accept Date", "Status"]
    const widthPercentage = [15, 35, 15, 20, 15]

    const data1 = new InviteData(false, "Phani2205@gmail.com", "22nd jun", "NA", "P")
    const data2 = new InviteData(false, "+919985788376", "22nd jun", "NA", "P")
    const data3 = new InviteData(false, "+919848109877", "22nd Aug", "NA", "P")

    const records = [data1, data2, data3]



    const styles = {
        mainContainer: {
            width: '95vw',
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
                    return <span style={{ width: `${widthPercentage[index]}%`, paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '0.6rem' }}>{title}</span>
                })}
            </div>
        )
    }

    const getListItems = () => {
        return (
            <div>
                {records.map((records, index) => {
                    return <div style={{ display: 'flex', width: '100%', boxSizing: 'border-box', backgroundColor: (index % 2 === 0) ? '#FFFFFF' : '#F7F7F7' }}>
                        <div style={{ width: `${widthPercentage[0]}%`, paddingTop: '0.5rem', paddingBottom: '0.5rem', alignSelf: 'center' }}>
                            1
                        </div>
                        <div style={{ width: `${widthPercentage[1]}%`, paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '0.6rem', alignSelf: 'center', textAlign: 'start' }}>
                            {records.emailMob}
                        </div>

                        <div style={{ width: `${widthPercentage[2]}%`, paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '0.6rem', alignSelf: 'center' }}>
                            {records.lastInvite}
                        </div>

                        <div style={{ width: `${widthPercentage[3]}%`, paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '0.6rem', alignSelf: 'center' }}>
                            {records.acceptDate}
                        </div>

                        <div style={{ width: `${widthPercentage[4]}%`, paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '0.6rem', alignSelf: 'center' }}>
                            {records.status}
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