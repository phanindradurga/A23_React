import icon from '../../images/pf_rne_success_invites_img.png'
import icon1 from '../../images/pf_rne_bonus_img.png'
import plusIcon from '../../images/pf_rne_myrewards_plusicon.png'

import bg from '../../images/my_rewards_bg.png'

const MyRewardsList = ({ myRewardsData }) => {


    myRewardsData = JSON.parse(myRewardsData);
    console.log('MyRewardsData : ', myRewardsData);
    console.log('MyRewardsData1 : ', myRewardsData.successfulInvites);

    var unicode = '\u20b9';

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


            {myRewardsData.bonusList.map((record, index) => {
                return <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginTop: '3rem' }}>
                    <img src={plusIcon} height={'25px'} width={'25px'} style={{ marginRight: '0.5rem' }} />
                    <span> {unicode + "20"}</span>
                    <span> Bonus Received</span>
                    <span> 28 Jun'22</span>
                </div>
            })}



        </div>
    )

}

export default MyRewardsList