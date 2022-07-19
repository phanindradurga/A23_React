import React from "react";
import backArrow from '../../images/pf_header_arrow.png'
import a23Logo from '../../images/pf_a23_logo.png'
import animationData from '../../images/pf_successful_payment.json'
import Lottie from "react-lottie";


const AddCashStatus = ({ gobackClick }) => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const navHeader = () => {
        return <div style={{ ...styles.navHeader }}>
            <img src={backArrow} style={{ width: '24px', height: '24px', marginRight: '10px' }} onClick={() => { gobackClick() }} />
            <div style={{ display: 'flex', fontWeight: 600, color: '#032146' }}>
                Add Cash
            </div>
            <img src={a23Logo} style={{ position: 'absolute', right: '0', width: '35px', height: '25px', marginRight: '10px', alignSelf: 'flex-end' }} />
        </div>
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {navHeader()}
            <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Lottie options={defaultOptions}
                    height={120}
                    width={120} />
                <span style={{ fontSize: 24, fontWeight: 400, color: '#0F407B' }}>Add Cash Successful</span>
                <span style={{ fontSize: 32, fontWeight: 600, margin: '0.5rem 0' }}>Rs.100</span>
                <span style={{ fontSize: 14, color: '#0F407B' }}>Total amount added: $100</span>
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', flexDirection: 'column', alignSelf: 'center', borderStyle: 'solid', borderRadius: '0.5rem', borderColor: '#14032146', width: '80%', padding: '1rem' }}>
                <span style={{ marginBottom: '1rem', color: '#032146' }}>Transcation Details</span>
                <span style={{ color: '#032146' }}>Transcation ID: 7tyn9Dz6MVVEgmG1</span>
                <span style={{ color: '#032146' }}>Date & Time: 14 Jul 2022 | 12:12 PM</span>
                <span style={{ color: '#032146' }}>Payment Mode: Amazonpay wallet</span>
            </div>

            <div style={{ ...styles.btnContainer }}>
                <div style={{ ...styles.btn }} onClick={() => { gobackClick() }}>GO BACK</div>
            </div>

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
    btn: {
        background: 'linear-gradient(270deg ,#35A753, #276E3A)',
        fontWeight: '500',
        fontSize: 16,
        marginTop: '1rem',
        color: 'white', padding: '0.5rem 1rem',
        borderStyle: 'solid', borderRadius: '0.3rem',

    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '0.3rem'

    }
}

export default AddCashStatus