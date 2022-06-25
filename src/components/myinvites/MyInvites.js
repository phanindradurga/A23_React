

import EmptyReward from '../myrewards/EmptyReward'

const MyInvites = ({ clickHandler }) => {


    const isRewardsEmpty = true

    return (
        <div>
            {(isRewardsEmpty === true) ? EmptyReward({ clickHandler: clickHandler }) : <div>Rewards UI</div>}
        </div>
    )
}

export default MyInvites