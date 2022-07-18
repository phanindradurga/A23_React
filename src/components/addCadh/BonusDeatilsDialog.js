import { Dialog, DialogContentText } from "@material-ui/core";
import { BorderStyle, SmsOutlined } from "@material-ui/icons";
import React from "react";
import logo from '../../images/pf_avatar_patteraj_popup.png'
import CancelIcon from "@material-ui/icons/Cancel";



const BonusDetailsDialog = ({ open, closeClick, bonusInfo = {}, handleBonusApply, appliedCode }) => {
    const header = ["Add Cash (in Rs.)", "Bonus %", "Max Bonus (in Rs.)", "Locked Bonus Release Ratio"]


    console.log('bonu info', bonusInfo);

    const styles = {
        contentArea: {
            backgroundColor: '#FFFDEA',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderRadius: '0.3rem',
            borderColor: '#EABF6945',
            overflow: 'visible',
            display: 'flex',
            flexDirection: 'column'

        },
        btn: {
            background: 'linear-gradient(270deg ,#35A753, #276E3A)',
            fontWeight: '400', width: '25%',
            color: 'white', padding: '0.5rem',
            borderStyle: 'solid', borderRadius: '0.5rem',

        },
        btnContainer: {
            marginTop: '1rem',
            marginBottom: '1rem',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center'

        },
        tableCell1: {
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11,
            padding: '0.5rem 0', textAlign: 'center', width: '25%', borderRightStyle: 'solid', borderRightColor: '#EABF69', borderRightWidth: '0.2px'
        },
        tableCell2: {
            fontSize: 11, padding: '0.5rem 0.2rem', alignItems: 'center', justifyContent: 'center', width: '25%',
            display: 'flex', flexDirection: 'column'
        }
    }

    const getBonusTable = () => {
        return <div>
            {getBonusHeader()}
            {getBonusDetails()}
            {getBulletPoints()}
        </div>
    }

    const getBonusHeader = () => {
        return <div style={{
            marginTop: '1rem', boxSizing: 'border-box', display: 'flex', width: '100%',
            justifyContent: 'space-between', backgroundColor: '#EABF69', borderColor: '#EABF69',
            border: '1px solid #EABF69', borderBottom: 0, borderRadius: '0.3rem 0.3rem 0 0'
        }}>
            {header.map((title) => {
                return <div style={{ padding: '0.2rem', width: '25%', alignSelf: 'center', textAlign: 'center', fontSize: 12 }}>{title}</div>
            })}
        </div>
    }


    const getBulletPoints = () => {
        return <div style={{ marginTop: '1rem' }}>
            <li style={{ fontSize: 13 }}>Bonus will expire within 10 days from issued date</li>
            <li style={{ fontSize: 13 }}>Bonus code is valid till</li>
            <li style={{ fontSize: 13 }}>For details regarding locked bonus visit \'Menu\' → \'Promotions\' → \'Bonus Summary\'</li>
            <li style={{ fontSize: 13 }}>Bonus release criteria varies as per Ace Level</li>
            <li style={{ fontSize: 13 }}>A23 Games T&amp;C\'s apply</li>

        </div>
    }

    const getLockedInstaBonusValues = (bonusData, bonusInfo, isLocked) => {
        const maxPurchase = bonusData.maxPurchase
        const totalBonusPercentage = bonusData.bonusPercent
        var maxValueBonus = (maxPurchase / 100) * totalBonusPercentage

        var maxBonusAmt = 0
        if (bonusInfo.maxBonus && bonusInfo.maxBonus !== "") {
            maxBonusAmt = parseFloat(bonusInfo.maxBonus)
        }

        var instantCash = parseInt(bonusData.flatInstantBonus)

        if ((maxBonusAmt - instantCash) < maxValueBonus) {
            maxValueBonus = maxBonusAmt - instantCash
        }

        var lockedValue = parseInt((maxValueBonus / 100) * parseInt(bonusData.lockedBonusPercentage))
        var locked = parseInt(lockedValue)
        var instantBonus = parseFloat(bonusData.instantBonusPercentage) * parseFloat(maxValueBonus / 100)

        if (locked > maxBonusAmt) {
            locked = maxBonusAmt - instantCash
        }

        const instantBonusVal = instantBonus + instantCash

        if (isLocked === true) {
            return locked
        } else {
            return instantBonusVal
        }

    }


    const getBonusDetails = () => {
        return <div style={{ border: '1px solid #EABF69', borderTop: 0, borderRadius: '0 0 0.3rem 0.3rem', overflow: 'hidden' }}>
            {
                bonusInfo && bonusInfo.levelDetails && bonusInfo.levelDetails.map((bonusData, index) => {
                    return <div style={{
                        display: 'flex', boxSizing: 'border-box', width: '100%', boxSizing: 'border-box', justifyContent: 'space-between',
                        justifyItems: 'center', backgroundColor: (index % 2) === 0 ? '#FFFFFF' : '#EEEEEE'
                    }}>
                        <div style={{ ...styles.tableCell1 }}>
                            <span >{bonusData.minPurchase}-{bonusData.maxPurchase}</span>
                        </div>
                        <div style={{ ...styles.tableCell1 }}>
                            <span >{bonusData.bonusPercent}%<br />({bonusData.lockedBonusPercentage}% Locked)</span>
                        </div>

                        <div style={{ ...styles.tableCell1 }}>
                            <span >Locked: {getLockedInstaBonusValues(bonusData, bonusInfo, true)}
                                <br />Instant: {getLockedInstaBonusValues(bonusData, bonusInfo, false)}</span>
                        </div>

                        <div style={{ ...styles.tableCell2 }}>
                            {bonusData && bonusData.lockedBonusReleaseRatio &&
                                bonusData.lockedBonusReleaseRatio.map((wagerInfo) => {
                                    return <span>{wagerInfo}</span>
                                })}
                        </div>
                    </div>

                })
            }
        </div >

    }




    return (
        <Dialog open={open} style={{ overflow: 'visible' }} className="dialog-outer-content"
            PaperProps={{
                style: {
                    margin: 8,
                    overflow: 'visible'
                }
            }}>
            <div style={{ ...styles.contentArea }}>
                <img src={logo} style={{ height: 50, width: 50, marginLeft: '45%', marginTop: -30 }} />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -20 }}>
                    <CancelIcon
                        style={{
                            color: "#e5c266",
                            margin: "5px 5px 0px auto",
                            cursor: "pointer"
                        }}
                        fontSize="large"
                        onClick={() => {
                            closeClick(false);
                        }}
                    />
                </div>

                <div style={{ margin: '0.5rem 0.5rem' }}>
                    <span style={{ fontWeight: 500, fontSize: 14 }}>{bonusInfo.bonusCode} Bonus details</span>
                    {getBonusTable()}

                    <div style={{ ...styles.btnContainer }} onClick={() => {
                        handleBonusApply(bonusInfo)
                        closeClick(false)
                    }} >
                        <div style={{ ...styles.btn }} > {appliedCode === bonusInfo.bonusCode ? 'Applied' : 'Apply'}</div>
                    </div>
                </div>

                <div>

                </div>
            </div>
        </Dialog >
    )

}

export default BonusDetailsDialog