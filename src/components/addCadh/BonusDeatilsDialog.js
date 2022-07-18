import { Dialog, DialogContentText } from "@material-ui/core";
import { BorderStyle } from "@material-ui/icons";
import React from "react";
import logo from '../../images/pf_avatar_patteraj_popup.png'
import CancelIcon from "@material-ui/icons/Cancel";



const BonusDetailsDialog = ({ open, closeClick, bonusInfo = {} }) => {
    const header = ["Add Cash(in Rs.)", "Bonus %", "Max Bonus (in Rs.)", "Locked Bonus Release Ratio"]


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
        return <div style={{ marginTop: '1rem', boxSizing: 'border-box', display: 'flex', width: '100%', justifyContent: 'space-between', backgroundColor: '#EABF69', borderColor: '#EABF69', borderTopLeftRadius: '0.3rem', borderTopRightRadius: '0.3rem', borderRightStyle: 'solid', borderLeftStyle: 'solid', borderTopStyle: 'solid', }}>
            {header.map((title) => {
                return <div style={{ padding: '0.2rem', width: '25%', alignSelf: 'center', textAlign: 'center', fontSize: 14 }}>{title}</div>
            })}
        </div>
    }


    const getBulletPoints = () => {
        return <div style={{ marginTop: '1rem' }}>
            <li style={{ color: 'red', fontSize: 13 }}>Bonus will expire within 10 days from issued date</li>
            <li style={{ color: 'red', fontSize: 13 }}>Bonus will expire within 10 days from issued date</li>
            <li style={{ color: 'red', fontSize: 13 }}>Bonus will expire within 10 days from issued date</li>
            <li style={{ color: 'red', fontSize: 13 }}>Bonus will expire within 10 days from issued date</li>
        </div>
    }


    const getBonusDetails = () => {
        return <div>
            {
                header.map((title) => {
                    return <div style={{ display: 'flex', boxSizing: 'border-box', width: '100%', boxSizing: 'border-box', justifyContent: 'space-between', justifyItems: 'center', backgroundColor: '#FFF', borderRightStyle: 'solid', borderLeftStyle: 'solid', borderBottomStyle: 'solid', borderColor: '#EABF69' }}>
                        <div style={{ fontSize: 12, padding: '0.5rem 0', textAlign: 'center', width: '25%', borderRightStyle: 'solid', borderRightColor: '#EABF69', borderRightWidth: '0.2px' }}>
                            <span >100-20000</span>
                        </div>
                        <div style={{ fontSize: 12, padding: '0.5rem 0', textAlign: 'center', width: '25%', borderRightStyle: 'solid', borderRightColor: '#EABF69', borderRightWidth: '0.2px' }}>
                            <span >50%(100% Locked)</span>
                        </div>

                        <div style={{ fontSize: 12, padding: '0.5rem 0', textAlign: 'center', width: '25%', borderRightStyle: 'solid', borderRightColor: '#EABF69', borderRightWidth: '0.2px' }}>
                            <span >Locked: 600
                                <br />Instant: 500</span>
                        </div>

                        <div style={{ fontSize: 12, padding: '0.5rem 0', alignSelf: 'center', textAlign: 'center', width: '25%', }}>
                            <span >All 10:1</span>
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
                    margin: 16,
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
                    <span style={{ fontWeight: 500 }}>{bonusInfo.bonusCode} Bonus details</span>
                    {getBonusTable()}

                    <div style={{ ...styles.btnContainer }}>
                        <div style={{ ...styles.btn }} >Apply</div>
                    </div>
                </div>

                <div>

                </div>
            </div>
        </Dialog >
    )

}

export default BonusDetailsDialog