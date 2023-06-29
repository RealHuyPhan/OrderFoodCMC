import { useParams } from 'react-router-dom'
import HeadNav from '../../common/HeadNav'

function VoteItem() {
    const {id} = useParams();
    return (
        <>
            <HeadNav />
            <div className='mt-20'>
                {id}
            </div>
        </>
    )
}

export default VoteItem