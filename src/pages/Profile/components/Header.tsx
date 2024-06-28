import React from 'react';
import IUser from '../../../features/interfaces/user.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { logout } from '../../../features/auth/authSlice';

interface IHeaderProps {
    user: IUser;
}

function Header({user}: Readonly<IHeaderProps>){
  const subscriptions = user['subscriptions']
  const dispatch = useDispatch<AppDispatch>();

  const totalSpend = subscriptions.reduce((total, subscription) => total + subscription.price, 0);
  const monthlySpend = subscriptions.reduce((total, subscription) => {
    if (subscription.renewalPeriod.toLowerCase() === 'месяц') {
      return total + subscription.price;
    } else if (subscription.renewalPeriod.toLowerCase() === 'год') {
      return total + subscription.price / 12;
    }
    return total;
  }, 0);

  const handleLogout = () => {dispatch(logout())}

  return (
    <header className="bg-gray-800 text-white mx-auto p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className='flex flex-row'>
          <h1 className="text-2xl font-bold">{user?.first_name} {user?.last_name}</h1>
          <button onClick={handleLogout} className="ml-4 text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-800 transition-colors duration-300">
            <FontAwesomeIcon icon={faSignOutAlt} size="lg" /> Выйти
            </button>
        </div>
        <div className="text-right">
          <p>Потрачено всего: ~{totalSpend.toFixed(2)}₽</p>
          <p>В месяц: ~{monthlySpend.toFixed(2)}₽</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
