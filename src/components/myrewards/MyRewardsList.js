import icon from '../../images/pf_rne_success_invites_img.png'
import React from 'react'

import icon1 from '../../images/pf_rne_bonus_img.png'
import plusIcon from '../../images/pf_rne_myrewards_plusicon.png'
import { useState } from 'react'

import bg from '../../images/my_rewards_bg.png'
import { getFormattedDate } from '../../utils/common'
import { A23_TOKEN } from '../../Constants'
import axios from 'axios'

const MyRewardsList = ({ myRewardsData, fetchMyRewards }) => {

    const [value, setValue] = useState('1');

    var unicode = '\u20b9';

    const options = [
        { label: 'Last Week', value: '1' },
        { label: 'Last Month', value: '2' },
        { label: 'Last 3 Months', value: '3' },
    ];

    const styles = {
        mainContainer: {
            width: '95%',
            display: 'flex',
            flexDirection: 'column',
            height: 'auto',
            margin: '0 auto',
            boxSizing: 'border-box',
            padding: '1.2rem 1rem',
            backgroundImage: `url(${bg})`

        },
    }

    const handleChange = (event) => {
        const filter = event.target.value
        fetchMyRewards(filter)
        setValue(filter)
    }

    return (
        <div>
            <div style={{ ...styles.mainContainer, backgroundSize: '100% 100%' }}>
                <div style={{ display: 'flex', marginBottom: '1rem', color: 'white', fontWeight: '600' }}>Total Rewards Received</div>
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '2rem' }}>
                        <img src={icon} height={'25px'} width={'25px'} style={{ marginRight: '0.5rem' }} />
                        <span style={{ marginRight: '0.5rem', color: 'white', fontSize: 14 }}>Successful Invites: </span>
                        <span style={{ color: 'white', fontWeight: '800' }}>{myRewardsData.successfulInvites}</span>
                    </div>


                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={icon1} height={'25px'} width={'25px'} style={{ marginRight: '0.5rem' }} />
                        <span style={{ marginRight: '0.5rem', color: 'white', fontSize: 14 }}>Bonus: </span>
                        <span style={{ color: 'white', fontWeight: '800' }}>{unicode + ' ' + myRewardsData.totalBonus}</span>
                    </div>
                </div>
            </div>


            <div style={{ display: 'flex', margin: '1rem', justifyContent: 'flex-end' }}>
                <select value={value} onChange={handleChange}>
                    {options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>


            {myRewardsData.bonusList.map((record, index) => {
                return <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', margin: '0rem 1.2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }} >
                        <img src={plusIcon} height={'25px'} width={'25px'} style={{ marginRight: '0.8rem' }} />
                        <span style={{ color: 'green' }}> {unicode + record.amount}</span>
                        <span style={{ alignItems: 'left', marginLeft: '0.8rem' }}> {record.description}</span>
                    </div>

                    <span style={{ color: 'gray' }}> {getFormattedDate(record.createdAt)}</span>
                </div>
            })}



        </div>
    )

}

export default MyRewardsList