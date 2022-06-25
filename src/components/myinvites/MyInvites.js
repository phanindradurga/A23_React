

import EmptyReward from '../myrewards/EmptyReward'
import MyInvitesList from './MyInvitesList'

const MyInvites = ({ clickHandler }) => {


    const isRewardsEmpty = false

    return (
        <div>
            {(isRewardsEmpty === true) ? EmptyReward({ clickHandler: clickHandler }) : MyInvitesList()}
        </div>
    )
}

export default MyInvites