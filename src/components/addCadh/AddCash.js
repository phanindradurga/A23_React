import React, { useEffect, useRef, useState } from 'react'

import backArrow from '../../images/pf_header_arrow.png'
import a23Logo from '../../images/pf_a23_logo.png'
import bonusCouponBg from '../../images/pf_bonus_coupon.png'
import timerIcon from '../../images/pf_bonus_coupon_timer.png'
import infoIcon from '../../images/pf_wallet_info_icon.png'
import a23CaresIcon from '../../images/pf_a23cares_iv_new.png'
import axios from 'axios'
import BonusDetailsDialog from './BonusDeatilsDialog'
import { getNodeText } from '@testing-library/react'
import AddCashStatus from './AddCashStatus'
import { SmsOutlined } from '@material-ui/icons'

var bonusSelected = undefined

var lockedBonus = 0
var instantBonus = 0

const paymentGateway = 1 //0 - razorpay, 1- juspay

const loadPaymentAggregatorScript = async (src) => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        console.log("Src: ", src);
        script.src = src;
        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
        // console.log("Script: ", script);
    })
}

const loadjusPayAggregatorScript = async (src) => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src
        script.clientId = "A23Games_android"
        script.service = "in.juspay.hyperpay"

        console.log("Src: ", src);

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
        // console.log("Script: ", script);
    })
}

const AddCash = () => {


    const [open, setOpen] = useState(false);
    const [manualEnteredBonus, setManualEnteredBonus] = useState("")
    const [manualBonusErrorMsg, setmanualBonusErrorMsg] = useState("")

    const [validationError, setValidationError] = useState("")

    const [bonusInfo, setBonusInfo] = useState({
        "amount": -1,
        "bonus": -1
    })

    const handleClickToOpen = (bonus) => {
        console.log("Bonus", bonus);
        bonusSelected = bonus
        setOpen(true);
    };

    const handleToClose = () => {
        console.log("handle close");
        setOpen(false);
    };

    const [consolidatedAddCashDetails, setConsolidatedAddCashDetails] = useState({})
    const [selectedAmountPos, setSelectedAmountPos] = useState(-1)
    const [addCashAmount, setAddCashAmount] = useState("")
    const [appliedCode, setAppliedBonusCode] = useState("")
    const isAmountAutoSelected = false
    const [showAddCashStatus, setShowAddCashStatus] = useState(false)

    const inputRef = useRef(null);


    useEffect(() => {
        if (paymentGateway == 0) {
            loadPaymentAggregatorScript('https://checkout.razorpay.com/v1/checkout.js');
        } else {
            loadjusPayAggregatorScript('https://public.releases.juspay.in/hyper-sdk-web/HyperServices.js')

        }

    }, [])


    const initJusPayPayment = (orderInfo) => {
        var paymentPageDiv = document.querySelector("#juspayDiv");
        var juspayIframe = document.createElement("iframe");
        juspayIframe.src = 'https://sandbox.juspay.in/orders/ordeh_eac0193d9d5541feb03ad295899c0df1/payment-page';
        juspayIframe.width = "1000";
        juspayIframe.height = "920";
        paymentPageDiv.appendChild(juspayIframe);

    }

    async function initRazorPayPayment(orderInfo) {
        console.log("loading Razor pay: *", orderInfo);

        var options = {
            "key": "rzp_test_QYJZ9Ug0K4d7ky", // Enter the Key ID generated from the Dashboard
            "amount": orderInfo.data.payloadData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Acme Corp1",
            "description": "Test Transaction",
            "image": "https://play-lh.googleusercontent.com/5tZYyFuHb9Gf2OkXbuZuQzqWHdPq0S-6Wo79wTFNFackRwnUKQ9AqY3JRYGtdBUaMsY",
            "order_id": orderInfo.data.payloadData.razorPayOrderId,
            "handler": function (response) {
                console.log(response);
                setShowAddCashStatus(true)
            },

            "prefill": {
                "name": "A23 User",
                "email": "a23@a23.com",
                "contact": "9999999999"
            },
            "notes": {
                "address": "A23 Sample address"
            },
            "theme": {
                "color": "#eabf69"
            }

        };

        var razorpay = new window.Razorpay(options);

        razorpay.on('payment.failed', function (response) {

        });



        razorpay.open();
    }

    const A23_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YW81cHFzcmNhYWlwcmciLCJzY3JlZW5OYW1lIjoiZ2hvc3RyaWRlcjE3IiwibW9iaWxlIjoiKzkxNjg4NjUzNzM2NyIsInN0YXR1cyI6dHJ1ZSwiZGV2aWNlX2lkIjoiOGI3YzlhNzYxMTM5ZDQxMiIsImNoYW5uZWwiOiJBMjNBUFMiLCJwbGF5ZXJTdGF0dXMiOiJudWxsIiwiaWF0IjoxNjU4Mzk5MDE1LCJleHAiOjE2NTg0ODU0MTV9.IwxBNpuk8brCnfdOIo8LBwoNJ0EHxPnvjpdJea_XNKE"

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

    const calculateBonus = (enteredAmount) => {
        if (bonusSelected === undefined) {
            return
        }

        if (enteredAmount === undefined) {
            enteredAmount = addCashAmount
        }

        const selectedBonus = bonusSelected
        console.log("selectedBonus", enteredAmount);
        const amount = enteredAmount === "" ? 0 : parseInt(enteredAmount)

        lockedBonus = 0
        instantBonus = 0

        if (amount < parseInt(selectedBonus.minPurchase)) {
            setBonusInfo({
                "amount": -1,
                "bonus": -1
            })
            return
        }

        const levels = selectedBonus.levelDetails
        const maxBonus = parseInt(selectedBonus.maxBonus)

        levels.map((level, index) => {
            const minPurchase = level.minPurchase
            const maxPurchase = level.maxPurchase

            //if ((index == levels.length - 1 && amount >= minPurchase) || (amount >= minPurchase && amount <= maxPurchase)) {

            if (amount >= minPurchase && amount <= maxPurchase) {
                const bonusPercentage = parseInt(level.bonusPercent)
                const instantBonusPercentage = parseInt(level.instantBonusPercentage)
                const flatInstantBonus = parseInt(level.flatInstantBonus)

                var bonus = (amount * bonusPercentage) / 100
                bonus = Math.min(bonus, maxBonus - flatInstantBonus);

                const instantBonuss = (bonus * instantBonusPercentage) / 100
                instantBonus = instantBonuss + flatInstantBonus
                lockedBonus = bonus - instantBonuss

                setBonusInfo({
                    "amount": amount + instantBonus,
                    "bonus": lockedBonus
                })

                console.log("amount : ", amount + instantBonus);
                console.log("locked : ", lockedBonus)
                return true
            }
        })




    }

    const gobackClick = () => {
        setAddCashAmount("")
        setAppliedBonusCode("NA")
        setManualEnteredBonus("")
        setBonusInfo({
            "amount": -1,
            "bonus": -1
        })
        setSelectedAmountPos(-1)
        setShowAddCashStatus(false)
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
        calculateBonus(consolidatedAddCashDetails.suggestions.R0Suggestions[index].amount)
    }

    const fetchJusPayPayload = async () => {


        const canProceed = consolidatedAddCashDetails && consolidatedAddCashDetails.playerbonus && addCashAmount >= consolidatedAddCashDetails.playerbonus.minAmountAddCashInput

        if (!canProceed) {
            return
        }


        console.log("appliedCode", appliedCode);
        console.log("addCashAmount", addCashAmount);

        var url = "https://api.qapfgames.com/a23pg/process_payload_sign/"
        if (paymentGateway == 0) {
            url = "https://api.qapfgames.com/a23pg-razorpay/initiate_payload_and_sign/"
        }
        const body = {
            "amount": addCashAmount, "channel": 'A23APS',
            "bonusCode": appliedCode === "" ? "NA" : appliedCode, "isAcePoints": false, "apRedeemRequested": 0, "PPR": false, "pprMargin": {}, "gpsState": 'Telangana'
        }
        const headers = {
            "Authorization": A23_TOKEN
        }
        await axios.post(url, body, { headers })
            .then((response) => {

                if (paymentGateway == 0) {
                    initRazorPayPayment(response)
                } else {
                    initJusPayPayment(response)
                }



            })
            .catch((e) => { console.log('error here', e) })
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



                {getAddCashNodeText()}
                <img src={a23CaresIcon} style={{ width: '60%', alignSelf: 'center', margin: '0.5rem 0' }} />
            </div>
        )
    }

    const getAddCashNodeText = () => {
        const text = "Please note that in order to play real money games, you must be 18 years of age and you should not be residing in states of Assam, Nagaland, Orissa, Sikkim, Telangana and Andra Pradesh."
        return <div style={{ borderStyle: 'solid', borderColor: '#8B99AB', borderRadius: '0.3rem', borderWidth: '0.5px', boxSizing: 'border-box', padding: '0.2rem', margin: '0.5rem 0' }}>
            <div style={{ fontSize: 10, color: '#8B99AB' }}>{text}</div>
        </div>
    }


    const getBonusLayout = () => {

        return (
            <div style={{ display: 'flex', height: '150px', flexDirection: 'row', overflowY: 'hidden', overflowX: 'scroll' }}>
                {(consolidatedAddCashDetails
                    && consolidatedAddCashDetails.playerbonus
                    && consolidatedAddCashDetails.playerbonus.listOfBonus
                    && consolidatedAddCashDetails.playerbonus.listOfBonus.length > 0) &&

                    consolidatedAddCashDetails.playerbonus.listOfBonus.map((bonus) => {
                        return bonus.hiddenBonusFlag === false && <div key={bonus.bonusCode} style={{
                            display: 'flex',
                            width: '400px',
                            marginRight: '1rem',
                            flexDirection: 'column',
                            height: '140px',
                            float: 'left',
                            backgroundSize: '100% 100%', backgroundImage: `url(${bonusCouponBg})`
                        }}>

                            <div style={{ height: '25%', justifyContent: 'space-between', display: 'flex', alignItems: 'center', padding: '0 0.6rem' }}>
                                <span style={{ fontSize: 12, fontWeight: 600 }}>Get up to {bonus.bonusPercent}% Bonus (Max: ₹ {bonus.maxBonus} )</span>
                                <span style={{ fontSize: 12 }}>{addCashAmount < bonus.minPurchase ? 'Add Min ₹' + bonus.minPurchase : 'You get '}</span>
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
                                            <div style={{ ...(appliedCode === bonus.bonusCode ? styles.btnApplied : styles.btn) }} onClick={() => handleBonusApply(bonus)} >{appliedCode === bonus.bonusCode ? 'Applied' : 'Apply'} </div>
                                        </div>
                                        <span style={{ fontSize: 10, color: '#075063' }} onClick={() => handleClickToOpen(bonus)}> More Details</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })


                }

                <div style={{ backgroundSize: '100% 100%', backgroundImage: `url(${bonusCouponBg})`, display: 'flex', flexDirection: 'column', width: "100%", height: 140 }}>
                    <div style={{ height: '25%', justifyContent: 'space-between', display: 'flex', alignItems: 'center', padding: '0 0.6rem' }}>
                        <span style={{ fontSize: 12, fontWeight: 600 }}>Enter Bonus Code</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '75%', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', margin: '0.5rem 0.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <input style={{ flexGrow: 1, fontSize: 16, padding: '0.5rem' }} value={manualEnteredBonus} placeholder='Enter Bonus Code' onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9a-zA-Z]+/ig, "").toUpperCase()
                                if (value === "") {
                                    setmanualBonusErrorMsg("")
                                }
                                setManualEnteredBonus(value)
                            }} maxLength={10} />
                            <div style={{ ...styles.btnContainer, marginBottom: 0 }}>
                                <div style={{ ...styles.btn }} onClick={() => applyManualEneteredBonusCode()}>{manualEnteredBonus === appliedCode ? 'Applied' : 'Apply'}</div>
                            </div>
                        </div>
                        <div style={{ alignSelf: 'flex-start', marginTop: '0.2rem', color: 'red', fontSize: 12 }}>{manualBonusErrorMsg}</div>
                    </div>

                </div>

            </div>
        )
    }

    const applyManualEneteredBonusCode = () => {
        const bonusToApply = consolidatedAddCashDetails.playerbonus.listOfBonus.filter((bonus) => bonus.bonusCode.toUpperCase() === manualEnteredBonus.toUpperCase())
        console.log("length ", bonusToApply.length);
        if (bonusToApply.length > 0) {
            setmanualBonusErrorMsg("")
            setManualEnteredBonus("")
            handleBonusApply(bonusToApply[0])
        } else {
            setmanualBonusErrorMsg("Invalid Bonus Code")
        }
    }

    const handleBonusApply = (bonus) => {
        bonusSelected = bonus
        setAppliedBonusCode(bonus.bonusCode)
        calculateBonus()
    }

    const isSelectionRequired = (index, amount) => {
        if (selectedAmountPos === index || amount == addCashAmount) {
            return true
        } else {
            return false
        }
    }

    const setErrorMessage = (amount) => {
        // if (amount === "") {
        //     setValidationError("Edo okati enter chey")
        // } else if (parseInt(amount) < bonusInfo.minPurchase) {
        //     setValidationError("")
        // }

    }

    const enterAmountView = () => {
        const min = consolidatedAddCashDetails && consolidatedAddCashDetails.playerbonus && consolidatedAddCashDetails.playerbonus.minAmountAddCashInput ? consolidatedAddCashDetails.playerbonus.minAmountAddCashInput : ""
        const max = consolidatedAddCashDetails && consolidatedAddCashDetails.playerbonus && consolidatedAddCashDetails.playerbonus.maxAmountAddCashInput ? consolidatedAddCashDetails.playerbonus.maxAmountAddCashInput : ""
        return (
            <div style={{ ...styles.enterAmountContainer }}>
                <div style={{ fontSize: 16, fontWeight: 400 }}>Enter Amount</div>
                <div style={{ display: 'flex', borderBottomStyle: 'solid', borderBottomColor: '#000', marginTop: 10 }}>
                    <span style={{ fontSize: 20 }} onClick={() => focusOnInput()}>
                        ₹
                    </span>
                    <input maxLength={10} ref={inputRef} value={addCashAmount} onChange={(event) => {
                        const value = event.target.value.replace(/\D/g, "");
                        setSelectedAmountPos(-1)
                        setAddCashAmount(value)
                        calculateBonus(value)
                        setErrorMessage(value)

                    }} style={{ flexGrow: 1, background: 'transparent', borderStyle: 'none', border: 0, outline: 'none', paddingBottom: '0.5rem', fontSize: 22, fontWeight: 600 }} />
                    <div style={{ fontSize: 8, color: 'gray', display: 'flex', justifyContent: 'center', alignSelf: 'center' }} onClick={() => focusOnInput()}>(₹{min} to ₹{max})</div>
                </div>

                <span style={{ margin: '0.5rem 0', fontSize: 12, color: 'red' }}>{validationError}</span>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    {(consolidatedAddCashDetails.suggestions && consolidatedAddCashDetails.suggestions.R0Suggestions) &&

                        consolidatedAddCashDetails.suggestions.R0Suggestions.map((record, index) => {
                            return <div onClick={() => handleSuggestionAmountClick(index)} key={record.amount} style={{
                                backgroundColor: (isSelectionRequired(index, record.amount) === true) ? '#FCEBB6' : 'white',
                                borderColor: (isSelectionRequired(index, record.amount) === true) ? '#EABF69' : '#CBCBCB', borderStyle: 'solid', borderRadius: '0.3rem',
                                width: '23%', justifyContent: 'center', display: 'flex', margin: '0.5rem 0', alignSelf: 'center', padding: '0.4rem 0', fontSize: 16, fontWeight: 600
                            }}>
                                ₹{record.amount}
                            </div>
                        })
                    }

                </div>

            </div>
        )
    }

    const openAlert = () => {

    }

    const addCashFooter = () => {
        return (
            <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '1rem 0', alignItems: 'center' }}>

                <span style={{ fontSize: 16, fontWeight: '500', color: '#0F407B' }}>YOU GET</span>

                {bonusSelected && addCashAmount > 0 && bonusInfo.amount > 0 ? <div style={{ display: 'flex', flexDirection: 'row', margin: '0.5rem 0', width: '100%', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '49%' }}>
                        <span style={{ color: '#0F407B', fontWeight: '400' }}>
                            Cash
                        </span>
                        <span style={{ color: '#0F407B', fontWeight: '600' }}>
                            ₹{bonusInfo.amount}
                        </span>
                    </div>

                    <div style={{ width: '1px', height: '100%', backgroundColor: 'gray', margin: '0 0.5rem' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '49%' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ color: '#21889A', fontWeight: '400', marginRight: '0.2rem' }}>
                                Free Bonus
                            </span>
                            <img src={infoIcon} style={{ width: '15px', height: '15px' }} />
                        </div>
                        <span style={{ color: '#21889A', fontWeight: '600' }}>
                            ₹{parseInt(bonusInfo.bonus)}
                        </span>
                    </div>
                </div>
                    : <span style={{ margin: '0.5rem 0' }}> ₹{addCashAmount}</span>}
                <div style={{ ...styles.btnContainer, marginTop: '0.5rem' }}>
                    <div style={{ ...(consolidatedAddCashDetails && consolidatedAddCashDetails.playerbonus && addCashAmount < consolidatedAddCashDetails.playerbonus.minAmountAddCashInput ? styles.btnDisabled : styles.btn), width: '70vw', textAlign: 'center', padding: '0.5rem', fontSize: 20 }} onClick={() => fetchJusPayPayload()}>Add ₹{addCashAmount}</div>
                </div>
            </div>
        )
    }


    return (
        <div>
            <div id="juspayDiv"></div>
            {showAddCashStatus ? <AddCashStatus gobackClick={gobackClick} /> : <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                {navHeader()}
                {body()}
                {addCashFooter()}
                <BonusDetailsDialog open={open} closeClick={handleToClose} bonusInfo={bonusSelected} handleBonusApply={handleBonusApply} appliedCode={appliedCode} />
            </div>}
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
        boxSizing: 'border-box',
        backgroundColor: '#FFFDEA',
        borderColor: '#EABF6945',
        borderRadius: '6px',
        borderStyle: 'solid',
        borderWidth: '1px',
        padding: 6,
        width: '100%',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    btn: {
        background: 'linear-gradient(270deg ,#35A753, #276E3A)',
        fontWeight: '500',
        fontSize: 16,
        color: 'white', padding: '0.2rem 1.2rem',
        borderStyle: 'solid', borderRadius: '0.5rem',

    },
    btnDisabled: {
        background: 'white',
        fontWeight: '500',
        fontSize: 16,
        color: 'gray', padding: '0.2rem 1.2rem',
        borderColor: 'gray',
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