import React, { useRef } from 'react'

import backArrow from '../../images/pf_header_arrow.png'
import a23Logo from '../../images/pf_a23_logo.png'
import bonusCouponBg from '../../images/pf_bonus_coupon.png'
import timerIcon from '../../images/pf_bonus_coupon_timer.png'
import infoIcon from '../../images/pf_wallet_info_icon.png'
import a23CaresIcon from '../../images/pf_a23cares_iv_new.png'








const AddCash = () => {
    const inputRef = useRef(null);


    const navHeader = () => {
        return <div style={{ ...styles.navHeader }}>
            <img src={backArrow} style={{ width: '24px', height: '24px', marginRight: '10px' }} />
            <div style={{ display: 'flex', fontWeight: 600, color: '#032146' }}>
                Add Cash
            </div>
            <img src={a23Logo} style={{ position: 'absolute', right: '0', width: '35px', height: '25px', marginRight: '10px', alignSelf: 'flex-end' }} />
        </div>
    }

    const focusOnInput = () => {
        inputRef.current.focus();
    }

    const body = () => {
        return (
            <div style={{ flexGrow: 1, padding: '1rem', backgroundColor: '#FAF9F6', display: 'flex', flexDirection: 'column' }}>
                {enterAmountView()}
                <div style={{ margin: '0.5rem 0' }}><span style={{ fontSize: 16, fontWeight: 500 }} >Bonus code</span> <span style={{ fontSize: 16, color: 'green', fontWeight: 500 }}>WELCOME175</span>  <span style={{ fontSize: 16, fontWeight: 500 }}>applied</span></div>
                {getBonusLayout()}
                <img src={a23CaresIcon} style={{ width: '60%', alignSelf: 'center', margin: '0.5rem 0' }} />
            </div>
        )
    }

    const getBonusLayout = () => {
        return (
            <div style={{
                width: '90%',
                display: 'flex',
                flexDirection: 'column',
                height: '140px',
                margin: '0 auto',
                boxSizing: 'border-box',
                backgroundSize: '100% 100%', backgroundImage: `url(${bonusCouponBg})`
            }}>
                <div style={{ height: '25%', justifyContent: 'space-between', display: 'flex', alignItems: 'center', padding: '0 0.6rem' }}>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>Get up to 175% Bonus (Max: ₹ 5200 )</span>
                    <span style={{ fontSize: 12 }}>You get ₹1300</span>
                </div>
                <div style={{ height: '75%', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0 0.6rem' }}>
                    <div>
                        <img src={timerIcon} style={{ width: 25 }} />
                    </div>
                    <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column', textAlign: 'start', margin: '0 0.5rem' }}>
                        <span style={{ fontSize: 14, color: '#075063', marginBottom: '0.5rem' }}>Valid till 30-jul @4:18 PM</span>
                        <span style={{ fontSize: 12, color: '#032146' }}>Code: WELCOME175</span>
                    </div>
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ ...styles.btnContainer }}>
                                <div style={{ ...styles.btn }} >Apply</div>
                            </div>
                            <span style={{ fontSize: 10, color: '#075063' }}> More Details</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const enterAmountView = () => {
        return (
            <div style={{ ...styles.enterAmountContainer }}>
                <span style={{ fontSize: 16, fontWeight: 400 }}>Enter Amount</span>
                <div style={{ display: 'flex', borderBottomStyle: 'solid', borderBottomColor: '#000', marginTop: 10 }}>
                    <span style={{ fontSize: 20 }} onClick={() => focusOnInput()}>
                        ₹
                    </span>
                    <input ref={inputRef} style={{ flexGrow: 1, background: 'transparent', borderStyle: 'none', border: 0, outline: 'none', paddingBottom: '0.5rem' }} />
                    <span style={{ fontSize: 12, color: 'gray' }} onClick={() => focusOnInput()}>(₹25 to ₹10000)</span>
                </div>

                <span style={{ margin: '0.5rem 0', fontSize: 12, color: 'red' }}>Pleae enter amount</span>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ backgroundColor: 'white', borderColor: '#CBCBCB', borderStyle: 'solid', borderRadius: '0.3rem', width: '23%', justifyContent: 'center', display: 'flex', margin: '0.5rem 0', alignSelf: 'center', padding: '0.4rem 0' }}>
                        ₹1000
                    </div>
                    <div style={{ backgroundColor: 'white', borderColor: '#CBCBCB', borderStyle: 'solid', borderRadius: '0.3rem', width: '23%', justifyContent: 'center', display: 'flex', margin: '0.5rem 0', alignSelf: 'center', padding: '0.4rem 0' }}>
                        ₹500
                    </div>
                    <div style={{ backgroundColor: 'white', borderColor: '#CBCBCB', borderStyle: 'solid', borderRadius: '0.3rem', width: '23%', justifyContent: 'center', display: 'flex', margin: '0.5rem 0', alignSelf: 'center', padding: '0.4rem 0' }}>
                        ₹200
                    </div>
                    <div style={{ backgroundColor: 'white', borderColor: '#CBCBCB', borderStyle: 'solid', borderRadius: '0.3rem', width: '23%', justifyContent: 'center', display: 'flex', margin: '0.5rem 0', alignSelf: 'center', padding: '0.4rem 0' }}>
                        ₹100
                    </div>
                </div>

            </div>
        )
    }

    const addCashFooter = () => {
        return (
            <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '1rem 0', alignItems: 'center' }}>

                <span style={{ fontSize: 16, fontWeight: '500', color: '#0F407B' }}>YOU GET</span>

                <div style={{ display: 'flex', flexDirection: 'row', margin: '0.5rem 0' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <span style={{ color: '#0F407B', fontWeight: '400' }}>
                            Cash
                        </span>
                        <span style={{ color: '#0F407B', fontWeight: '600' }}>
                            ₹1050
                        </span>
                    </div>

                    <div style={{ width: '1.5px', height: '100%', backgroundColor: 'gray', margin: '0 0.5rem' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ color: '#21889A', fontWeight: '400', marginRight: '0.2rem' }}>
                                Free Bonus
                            </span>
                            <img src={infoIcon} style={{ width: '15px', height: '15px' }} />
                        </div>
                        <span style={{ color: '#21889A', fontWeight: '600' }}>
                            ₹1050
                        </span>
                    </div>
                </div>

                <div style={{ ...styles.btnContainer, marginTop: '0.5rem' }}>
                    <div style={{ ...styles.btn, width: '70vw', textAlign: 'center', padding: '0.5rem', fontSize: 20 }} >Add ₹1000</div>
                </div>
            </div>
        )
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {navHeader()}
            {body()}
            {addCashFooter()}


        </div>
    )
}

const styles = {
    navHeader: {
        display: 'flex',
        backgroundColor: '#EABF69',
        padding: '0.5rem',
        alignItems: 'center'

    },
    enterAmountContainer: {
        display: 'flex',

        backgroundColor: '#FFFDEA',
        borderColor: '#EABF6945',
        borderRadius: '6px',
        borderStyle: 'solid',
        borderWidth: '1px',
        boxSizing: 'border-box',

        padding: 12,
        width: '100%',
        flexDirection: 'column'
    },
    btn: {
        background: 'linear-gradient(270deg ,#35A753, #276E3A)',
        fontWeight: '500',
        fontSize: 16,
        color: 'white', padding: '0.2rem 1.2rem',
        borderStyle: 'solid', borderRadius: '0.5rem',

    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '0.3rem'

    }
}

export default AddCash