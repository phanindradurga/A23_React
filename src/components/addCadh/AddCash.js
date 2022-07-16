import React, { useEffect, useRef, useState } from 'react'

import backArrow from '../../images/pf_header_arrow.png'
import a23Logo from '../../images/pf_a23_logo.png'
import bonusCouponBg from '../../images/pf_bonus_coupon.png'
import timerIcon from '../../images/pf_bonus_coupon_timer.png'
import infoIcon from '../../images/pf_wallet_info_icon.png'
import a23CaresIcon from '../../images/pf_a23cares_iv_new.png'
import axios from 'axios'








const AddCash = () => {


    const [consolidatedAddCashDetails, setConsolidatedAddCashDetails] = useState({})
    const [selectedAmountPos, setSelectedAmountPos] = useState(-1)
    const [addCashAmount, setAddCashAmount] = useState()
    const [appliedCode, setAppliedBonusCode] = useState("")
    const isAmountAutoSelected = false

    const inputRef = useRef(null);

    const A23_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI4NW96YXc2OHQ2dmxrMHgiLCJzY3JlZW5OYW1lIjoibmV3YWRkY2FzaHoiLCJtb2JpbGUiOiIrOTE5NDI1MjQyMzQyIiwic3RhdHVzIjp0cnVlLCJkZXZpY2VfaWQiOiIxYTU0NzIxNDVjZjQxODY5IiwiY2hhbm5lbCI6IkEyM0FQUyIsInBsYXllclN0YXR1cyI6Im51bGwiLCJpYXQiOjE2NTc5MDkyNTQsImV4cCI6MTY1Nzk5NTY1NH0.yrrxLOZ57jgZqsjFTxF5TV1lsgCfc0p0AKjmlF6E7FE"

    const fetchConsolidatedAddCashDetails = async () => {
        const headers = {
            'Authorization': A23_TOKEN,
        };

        const body = {
            "channel": "A23APS",
            "playerType": "regular"
        }

        await axios.post('https://api.qapfgames.com/addcash/consolidated_addcash/', body, { headers })
            .then((response => {
                setConsolidatedAddCashDetails(response.data);

            }))
            .catch((e) => { console.log('error here', e) })
    }

    const setDefaultAddCashSuggestion = () => {
        console.log("ok", consolidatedAddCashDetails);
        if (consolidatedAddCashDetails.suggestions && consolidatedAddCashDetails.suggestions.R0Suggestions) {
            consolidatedAddCashDetails.suggestions.R0Suggestions.map((record) => {
                if (record.disable === false) {

                }
            })
        }
    }

    useEffect(() => {
        fetchConsolidatedAddCashDetails()
    }, [])


    const handleSuggestionAmountClick = (index) => {
        setSelectedAmountPos(index)
        setAddCashAmount(consolidatedAddCashDetails.suggestions.R0Suggestions[index].amount)
    }

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
                <div style={{ margin: '0.5rem 0' }}><span style={{ fontSize: 16, fontWeight: 500 }} >Bonus code</span> <span style={{ fontSize: 16, color: 'green', fontWeight: 500 }}>{appliedCode}</span>  <span style={{ fontSize: 16, fontWeight: 500 }}>applied</span></div>
                {getBonusLayout()}
                <img src={a23CaresIcon} style={{ width: '60%', alignSelf: 'center', margin: '0.5rem 0' }} />
            </div>
        )
    }

    const getBonusLayout = () => {

        return (
            <div style={{ display: 'flex', width: '95%', height: '150px', flexDirection: 'row', overflow: 'hidden', overflowY: 'hidden', overflowX: 'scroll' }}>
                {(consolidatedAddCashDetails
                    && consolidatedAddCashDetails.playerbonus
                    && consolidatedAddCashDetails.playerbonus.listOfBonus
                    && consolidatedAddCashDetails.playerbonus.listOfBonus.length > 0) &&

                    consolidatedAddCashDetails.playerbonus.listOfBonus.map((bonus) => {
                        return <div key={bonus.bonusCode} style={{
                            display: 'flex',
                            width: '1000px',
                            marginRight: '1rem',
                            flexDirection: 'column',
                            height: '140px',
                            backgroundSize: '100% 100%', backgroundImage: `url(${bonusCouponBg})`
                        }}>

                            <div style={{ height: '25%', justifyContent: 'space-between', display: 'flex', alignItems: 'center', padding: '0 0.6rem' }}>
                                <span style={{ fontSize: 12, fontWeight: 600 }}>Get up to {bonus.bonusPercent}% Bonus (Max: ₹ {bonus.maxBonus} )</span>
                                <span style={{ fontSize: 12 }}>You get ₹1300</span>
                            </div>
                            <div style={{ height: '75%', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0 0.6rem' }}>
                                <div>
                                    <img src={timerIcon} style={{ width: 25 }} />
                                </div>
                                <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column', textAlign: 'start', margin: '0 0.5rem' }}>
                                    <span style={{ fontSize: 14, color: '#075063', marginBottom: '0.5rem' }}>Valid till 30-jul @4:18 PM</span>
                                    <span style={{ fontSize: 12, color: '#032146' }}>Code: {bonus.bonusCode}</span>
                                </div>
                                <div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div style={{ ...styles.btnContainer }}>
                                            <div style={{ ...(appliedCode === bonus.bonusCode ? styles.btnApplied : styles.btn) }} onClick={() => handleBonusApply(bonus.bonusCode)} >{appliedCode === bonus.bonusCode ? 'Applied' : 'Apply'} </div>
                                        </div>
                                        <span style={{ fontSize: 10, color: '#075063' }}> More Details</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        )
    }

    const handleBonusApply = (bonusCode) => {
        setAppliedBonusCode(bonusCode)
    }

    const isSelectionRequired = (index, amount) => {
        if (selectedAmountPos === index || amount == addCashAmount) {
            return true
        } else {
            return false
        }
    }

    const enterAmountView = () => {
        return (
            <div style={{ ...styles.enterAmountContainer }}>
                <span style={{ fontSize: 16, fontWeight: 400 }}>Enter Amount</span>
                <div style={{ display: 'flex', borderBottomStyle: 'solid', borderBottomColor: '#000', marginTop: 10 }}>
                    <span style={{ fontSize: 20 }} onClick={() => focusOnInput()}>
                        ₹
                    </span>
                    <input ref={inputRef} value={addCashAmount} onChange={(event) => {
                        setSelectedAmountPos(-1)
                        setAddCashAmount(event.target.value)
                    }} style={{ flexGrow: 1, background: 'transparent', borderStyle: 'none', border: 0, outline: 'none', paddingBottom: '0.5rem' }} />
                    <span style={{ fontSize: 12, color: 'gray' }} onClick={() => focusOnInput()}>(₹25 to ₹10000)</span>
                </div>

                <span style={{ margin: '0.5rem 0', fontSize: 12, color: 'red' }}>Pleae enter amount</span>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    {(consolidatedAddCashDetails.suggestions && consolidatedAddCashDetails.suggestions.R0Suggestions) &&

                        consolidatedAddCashDetails.suggestions.R0Suggestions.map((record, index) => {
                            return <div onClick={() => handleSuggestionAmountClick(index)} key={record.amount} style={{ backgroundColor: (isSelectionRequired(index, record.amount) === true) ? 'gray' : 'white', borderColor: '#CBCBCB', borderStyle: 'solid', borderRadius: '0.3rem', width: '23%', justifyContent: 'center', display: 'flex', margin: '0.5rem 0', alignSelf: 'center', padding: '0.4rem 0' }}>
                                ₹{record.amount}
                            </div>
                        })
                    }


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
    btnApplied: {
        borderColor: 'green',
        backgroundColor: 'white',
        borderStyle: 'solid',
        fontWeight: '400',
        fontSize: 14,
        color: 'green', padding: '0.2rem 1.2rem',
        borderStyle: 'solid', borderRadius: '0.5rem',

    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '0.3rem'

    }
}

export default AddCash