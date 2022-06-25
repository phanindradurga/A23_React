import { useState } from "react"

const HeaderTab = ({ tabs, onPageSelected, pageID }) => {

    const [selectedTab, setSelectedTab] = useState(0)
    const tabWidth = 80 / tabs.length

    if (pageID !== selectedTab) {
        setSelectedTab(pageID)
    }

    const styles = {
        containerStyle: {
            marginTop: '1rem'
        },

        buttonContainer: {
            display: 'flex',
            justifyContent: 'center'

        },
        tabButtonStyle: {
            backgroundColor: '#EABF69',
            color: '#092b54',
            fontWeight: 'bold',
            marginRight: '0.1rem',
            borderStyle: 'none',
            padding: '0.5rem',
            width: `${tabWidth}vw`,
            fontSize: '1rem',
            borderStartEndRadius: '0.2rem',
            borderStartStartRadius: '0.2rem'

        },
        tabButtonUnSelectedStyle: {
            backgroundColor: '#E5E8EC',
            color: '#092b54',
            fontWeight: 'bold',
            width: `${tabWidth}vw`,
            borderBottomStyle: 'none',
            marginRight: '0.1rem',
            padding: '0.5rem',
            fontSize: '1rem',
            borderStartEndRadius: '0.2rem',
            borderStartStartRadius: '0.2rem',
            boderColor: '#42032146'

        }
    }


    const getTabButtons = () => {
        return (
            <div style={{ ...styles.buttonContainer }}>
                {tabs.map((tabName, index) => { return <div onClick={() => handleTabClick(index)} key={tabName} style={{ ...((selectedTab === index) ? styles.tabButtonStyle : styles.tabButtonUnSelectedStyle) }}>{tabName}</div> })}
            </div>
        )
    }

    const handleTabClick = (selectedIndex) => {
        setSelectedTab(selectedIndex)
        onPageSelected(selectedIndex)
    }

    return (
        <div style={{ ...styles.containerStyle }}>
            {getTabButtons()}
        </div>
    )
}




export default HeaderTab