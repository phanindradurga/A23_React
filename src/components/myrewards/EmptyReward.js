import React from 'react'

import noDataImage from '../../images/pf_rne_myrewards_img.png'

const EmptyReward = ({ clickHandler }) => {

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
        image: {
            width: '80%',
            height: 'auto',
        },
        imageContainer: {
            marginTop: '2rem',
            marginBottom: '2rem'

        },
        spanStyle: {
            width: '60%',
            display: 'flex',
            margin: '0 auto',
            fontSize: '0.8rem',
            fontWeight: '600',
            textAlign: 'center'
        },
        btn: {
            background: 'linear-gradient(270deg ,#35A753, #276E3A)',
            fontWeight: '600', width: '25%',
            color: 'white', padding: '0.5rem',
            borderStyle: 'solid', borderRadius: '0.5rem',

        },
        btnContainer: {
            marginTop: '1rem',
            marginBottom: '1rem',
            display: 'flex',
            justifyContent: 'center'

        }
    }


    return (
        <div style={{ ...styles.mainContainer }}>
            <div style={{ ...styles.imageContainer }}>
                <img src={noDataImage} style={{ ...styles.image }} />
            </div>

            <span style={{ ...styles.spanStyle }}>Refer your friends now to A23 & get upto Rs 15000 for every friend</span>
            <div style={{ ...styles.btnContainer }}>
                <div style={{ ...styles.btn }} onClick={() => clickHandler()}>Refer now</div>
            </div>
        </div>
    )
}

export default EmptyReward