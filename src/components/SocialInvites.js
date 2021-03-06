import React from 'react'

import wa_share_icon from '../images/rne_whatsapp_icon.png'
import fb_share_icon from '../images/rne_fb_icon.png'
import gmail_share_icon from '../images/rne_email_icon.png'
import message_share_icon from '../images/rne_messages_icon.png'
import more_share_icon from '../images/rne_plus_icon.png'

import info_icon from '../images/rne_info_icon.png'
import copy_icon from '../images/rne_copy_icon.png'
import { useState } from 'react'

const SocialInvites = ({ renData, userProfile }) => {

    const [refCode, setRefCode] = useState("");

    const openGamil = () => {
        window.open('https://mail.google.com/mail/u/0/?fs=1&to=someone@example.com&su=SUBJECT&body=BODY&bcc=someone.else@example.com&tf=cm')
    }


    const openFbPopUp = () => {
        var fburl = '';
        var fbimgurl = 'http://';
        var fbtitle = 'Your title';
        var fbsummary = "your description";
        var sharerURL = "http://www.facebook.com/sharer/sharer.php?s=100&p[url]=" + encodeURI(fburl) + "&p[images][0]=" + encodeURI(fbimgurl) + "&p[title]=" + encodeURI(fbtitle) + "&p[summary]=" + encodeURI(fbsummary);
        sharerURL = 'https://www.facebook.com/dialog/share?app_id=87741124305&href=https://youtube.com/watch?v=3hxE7Af98AI&feature=share&display=popup'
        window.open(
            sharerURL,
            'facebook-share-dialog',
            'width=626,height=436');
        return false;
    }

    const sendMail = () => {
        window.open('mailto:test@example.com?subject=subject&body=body');
    }

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
                    <a href={"https://web.whatsapp.com/send?text=" + renData.message}><img src={wa_share_icon} style={{ ...styles.iconStyle }} /></a>
                    <img onClick={() => openFbPopUp()} src={fb_share_icon} style={{ ...styles.iconStyle }} />
                    <img onClick={() => openGamil()} src={gmail_share_icon} style={{ ...styles.iconStyle }} />
                    <a href="sms:?body=somemessage"><img src={message_share_icon} style={{ ...styles.iconStyle }} /></a>
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
                        <span>{userProfile.code ? userProfile.code : ''}</span>
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
        width: '95%',
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
        width: '100%',
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