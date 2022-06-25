

import EmptyReward from './EmptyReward'

const MyRewards = ({ clickHandler }) => {

    const isRewardsEmpty = true

    return (
        <div>
            {(isRewardsEmpty === true) ? EmptyReward({ clickHandler: clickHandler }) : <div>Rewards UI</div>}
        </div>
    )
}

export default MyRewards