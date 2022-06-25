const MyInvitesList = () => {

    const headerTitles = ["Select", "Email/Mobile", "Last Invite", "Accept Date", "Status"]
    const widthPercentage = [15, 25, 20, 25, 15]
    const records = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

    const styles = {
        mainContainer: {
            width: '95vw',
            height: 'auto',
            margin: '0 auto',

        },
        listheader: {
            display: 'flex',
            width: '100%'

        },
        headerTitle: {

        }
    }

    const getListHeader = () => {
        return (
            <div style={{ ...styles.listheader, marginTop: '1rem', backgroundColor: '#ebbe69', boxSizing: 'border-box', borderColor: '#C9C9C9', borderRadius: '0.2rem', borderStyle: 'solid' }}>
                {headerTitles.map((title, index) => {
                    return <span style={{ width: `${widthPercentage[index]}%`, paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '0.8rem' }}>{title}</span>
                })}
            </div>
        )
    }

    const getListItems = () => {
        return (
            <div>
                {records.map((records, index) => {
                    return <div style={{ display: 'flex', width: '100%', boxSizing: 'border-box', backgroundColor: (index % 2 === 0) ? '#FFFFFF' : '#F7F7F7' }}>
                        {headerTitles.map((title, index) => {
                            return (
                                <span style={{ width: `${widthPercentage[index]}%`, paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '0.8rem' }}>{title}</span>
                            )
                        })}
                    </div>

                })}
            </div>
        )
    }

    return (
        <div style={{ ...styles.mainContainer }}>
            {getListHeader()}
            {getListItems()}
        </div>
    )
}

export default MyInvitesList