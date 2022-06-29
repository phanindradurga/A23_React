import icon from '../../images/pf_rne_success_invites_img.png'
import icon1 from '../../images/pf_rne_bonus_img.png'
import plusIcon from '../../images/pf_rne_myrewards_plusicon.png'
import { useState } from 'react'

import bg from '../../images/my_rewards_bg.png'
import { getFormattedDate } from '../../utils/common'
import { A23_TOKEN } from '../../Constants'
import axios from 'axios'

const MyRewardsList = ({ myRewardsData, fetchMyRewards }) => {

    const [value, setValue] = useState('1');
    myRewardsData = JSON.parse(myRewardsData);
    console.log('MyRewardsData : ', myRewardsData);
    console.log('MyRewardsData1 : ', myRewardsData.successfulInvites);

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
                        <span style={{ marginRight: '0.5rem', color: 'white' }}>Successful Invites: </span>
                        <span style={{ color: 'white' }}>{myRewardsData.successfulInvites}</span>
                    </div>


                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={icon1} height={'25px'} width={'25px'} style={{ marginRight: '0.5rem' }} />
                        <span style={{ marginRight: '0.5rem', color: 'white' }}>Bonus: </span>
                        <span style={{ color: 'white' }}>{myRewardsData.totalBonus}</span>
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
                return <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginTop: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }} >
                        <img src={plusIcon} height={'25px'} width={'25px'} style={{ marginRight: '0.5rem' }} />
                        <span> {unicode + record.amount}</span>
                    </div>
                    <span style={{ alignItems: 'left' }}> {record.description}</span>
                    <span> {getFormattedDate(record.createdAt)}</span>
                </div>
            })}



        </div>
    )

}

export default MyRewardsList