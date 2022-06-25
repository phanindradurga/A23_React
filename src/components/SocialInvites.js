import wa_share_icon from '../images/rne_whatsapp_icon.png'
import fb_share_icon from '../images/rne_fb_icon.png'
import gmail_share_icon from '../images/rne_email_icon.png'
import message_share_icon from '../images/rne_messages_icon.png'
import more_share_icon from '../images/rne_plus_icon.png'

import info_icon from '../images/rne_info_icon.png'
import copy_icon from '../images/rne_copy_icon.png'
import { useState } from 'react'

const SocialInvites = () => {

    const [refCode, setRefCode] = useState("");



    return (
        <div style={{ ...styles.maincontainerStyle }}>
            <div style={{ ...styles.span_container }}>
                <span style={{ ...styles.spanText }}>
                    Invite your friends now to join you at A23
                </span>
                <a href='https://www.google.com' style={{ ...styles.spanText, color: 'blue' }}>
                    T&c's
                </a>
            </div>

            <div style={{ ...styles.soicalInvitesContainer }}>
                <div style={{ ...styles.span_container }}>
                    <span style={{ ...styles.spanText, marginLeft: '0.6rem' }}>Invite Friends via</span>
                </div>
                <div style={{ ...styles.iconsContainer }}>
                    <img src={wa_share_icon} style={{ ...styles.iconStyle }} />
                    <img src={fb_share_icon} style={{ ...styles.iconStyle }} />
                    <img src={gmail_share_icon} style={{ ...styles.iconStyle }} />
                    <img src={message_share_icon} style={{ ...styles.iconStyle }} />
                    <img src={more_share_icon} style={{ ...styles.iconStyle }} />
                </div>
            </div>

            <div style={{ ...styles.soicalInvitesContainer, marginTop: '1rem', padding: '0.5rem' }}>
                <div style={{ ...styles.shareCodeHeader }}>
                    <span style={{ ...styles.spanText }}>Share your code with your friend</span>
                    <img src={info_icon} style={{ height: '20px', width: '20px' }} />
                </div>
                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ ...styles.shareCode }}>
                        <span>46YALY</span>
                        <img src={copy_icon} style={{ height: '20px', width: '20px', marginLeft: '0.5rem' }} />
                    </div>
                </div>
            </div>

            <div style={{ ...styles.soicalInvitesContainer, marginTop: '1rem', padding: '0.5rem' }}>
                <div style={{ ...styles.shareCodeHeader }}>
                    <span style={{ ...styles.spanText }}>Enter code shared by your friend</span>
                </div>
                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ ...styles.applyCode }}>
                        <input
                            type="text"
                            value={refCode}
                            onChange={(e) => setRefCode(e.target.value)}
                            style={{ width: '55%', height: '60%' }}
                        />
                        <div style={{ ...styles.applyBtn }}>
                            Apply
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


const styles = {
    maincontainerStyle: {
        display: 'flex',
        flexDirection: 'column',
        width: '95vw',
        height: 'fit-content',
        margin: '0 auto',
        boxSizing: 'border-box',
    },
    span_container: {
        display: 'flex',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        paddingRight: '0.3rem',
        paddingLeft: '0.3rem',
        justifyContent: 'space-between',
        width: '100%',
        boxSizing: 'border-box',

    },
    spanText: {
        fontSize: '0.7rem',
        fontWeight: 'bold',
        color: '#032146'
    },
    soicalInvitesContainer: {
        width: '95vw',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'flex-start',
        backgroundColor: '#F5F6F8',
        borderStyle: 'solid',
        borderRadius: '0.5rem',
        borderColor: '#E2E5EA',
        flexDirection: 'column',
        boxSizing: 'border-box'

    },
    iconStyle: {
        width: '60px',
        height: '60px'
    },
    iconsContainer: {
        display: 'flex',
        width: '100%',
        marginBottom: '0.5rem',
        justifyContent: 'space-evenly'
    },
    shareCodeHeader: {
        display: 'flex', width: '100%',
        justifyContent: 'space-between', alignItems: 'center'
    },
    shareCode: {
        display: 'flex', backgroundColor: '#FFFFFF',
        width: 'fit-content', padding: '0.5rem',
        borderStyle: 'dotted', borderRadius: '0.3rem',
        borderColor: '#DFBA58', alignItems: 'center'
    },
    applyCode: {
        display: 'flex', width: '100%',
        padding: '0.5rem', justifyContent: 'space-between',
        alignItems: 'center',
    },
    applyBtn: {
        background: 'linear-gradient(270deg ,#35A753, #276E3A)',
        fontWeight: '600', width: '25%',
        color: 'white', padding: '0.5rem',
        borderStyle: 'solid', borderRadius: '0.5rem'
    }
}

export default SocialInvites