import { Badge } from './ui/Badge'

const DifficultyBadge = ({level=0}:{
    level: number
}) => {
  return (
    <>
        {level === 0 && (<div></div>)}
        {level === 1 && (<Badge className='bg-green-500'>Easy</Badge>)}
        {level === 2 && (<Badge className='bg-yellow-500'>Medium</Badge>)}
        {level === 3 && (<Badge className='bg-red-500'>Hard</Badge>)}
    </>
  )
}

export default DifficultyBadge