import { Link} from 'react-router';
import { BellIcon, LogOutIcon, ShipWheelIcon, User2Icon } from 'lucide-react';
import useLogout from '../hooks/useLogout';

const Navbar = () => {

 
  const {logoutMutation} = useLogout(); //custom hook logoutMutation

  return <nav className="bg-base-100 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-end w-full">
        

        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
        <Link to={"/appointments"} >
        <button className="btn btn-ghost btn-circle" >
          <BellIcon className='h-6 w-6 text-base-content opacity-70' />
        </button>
        </Link>
        </div>


        <div className="avatar">
          <div className="w-9 rounded-full">
            <User2Icon />
          </div>
        </div>

        {/* LOGOUT BUTTON */}
        <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
          <LogOutIcon className='h-6 w-6 text-base-content opacity-70' />
        </button>

      </div>
    </div>
  </nav>
}

export default Navbar