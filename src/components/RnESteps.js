import React from 'react'

import referNEarn1 from '../images/pf_rne_1.png'
import referNEarn2 from '../images/pf_rne_2.png'
import referNEarn3 from '../images/pf_rne_3.png'
import arrow from '../images/pf_rne_banner_arrow.png'


const RnESteps = ({ data }) => {



    const styles = {
        mainContainer: {
            backgroundColor: '#FFFDEA',
            width: '95%',
            height: 'auto',
            margin: '0 auto',
            borderStyle: 'solid',
            borderWidth: '2px',
            borderRadius: '8px',
            borderColor: '#F9EED6',
        },

        stepContent: {
            display: 'flex',
            flexDirection: 'column',
            width: '28%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        },

        stepImage: {
            display: 'flex',
            flexDirection: 'column',
            width: '5%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'baseline',
            marginTop: '0.2rem'
        },

        stepContentContainer: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: '5px'
        },
        stepText1: {
            fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.2rem'
        },
        stepText2: {
            fontSize: '0.75rem', marginBottom: '0.2rem'
        },
        stepText3: {
            fontSize: '1rem', fontWeight: 'bold'
        }

    }


    return (
        <div style={{ ...styles.mainContainer }}>
            <div style={{ ...styles.stepContentContainer }}>
                <div style={{ ...styles.stepContent }}>
                    <img src={referNEarn1} style={{ width: '25px', height: '32px', marginBottom: '5px' }} />
                    <span style={{ ...styles.stepText1 }}>Friend Registers</span>
                    <span style={{ ...styles.stepText2 }}>Friend gets upto</span>
                    <span style={{ ...styles.stepText3 }} >{data.friendRegisters ? `\u20B9${data.friendRegisters}` : ''}</span>
                </div>

                <div style={{ ...styles.stepImage }}>
                    <img src={arrow} style={{ width: '30px', height: '32px', marginBottom: '5px' }} />
                </div>

                <div style={{ ...styles.stepContent }}>
                    <img src={referNEarn2} style={{ width: '30px', height: '32px', marginBottom: '5px' }} />
                    <span style={{ ...styles.stepText1 }}>Friend Purchases</span>
                    <span style={{ ...styles.stepText2 }}>You get upto</span>
                    <span style={{ ...styles.stepText3 }}>{data.friendPurchases ? `\u20B9${data.friendPurchases}` : ''}</span>
                </div>

                <div style={{ ...styles.stepImage }}>
                    <img src={arrow} style={{ width: '30px', height: '32px', marginBottom: '5px' }} />
                </div>

                <div style={{ ...styles.stepContent }}>
                    <img src={referNEarn3} style={{ width: '45px', height: '32px', marginBottom: '5px' }} />
                    <span style={{ ...styles.stepText1 }}>Friend Plays</span>
                    <span style={{ ...styles.stepText2 }}>You get upto</span>
                    <span style={{ ...styles.stepText3 }}>{data.friendPlays ? `\u20B9${data.friendPlays}` : ''}</span>
                </div>
            </div>
        </div>
    )
}

export default RnESteps;