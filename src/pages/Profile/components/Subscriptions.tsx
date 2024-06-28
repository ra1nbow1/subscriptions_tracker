import React, { ReactNode } from 'react';
import { ISubscription } from '../../../features/interfaces/user.interface';
import Subscription from './Subscription';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';


interface ISubscriptionProps {
  subscriptions: ISubscription[];
}


function Subscriptions({ subscriptions }: Readonly<ISubscriptionProps>): JSX.Element {
  const newSubscription = () => {
    console.log('New');
  }
  return (
    <div className="container mx-auto p-4 min-h-fit">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subscriptions.map((subscription) => (
          <Subscription key={subscription.title} subscription={subscription} />
        ))}
        <div onClick={newSubscription} className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-700 transition-colors duration-200">
          <FontAwesomeIcon icon={faSquarePlus} size="2xl" className='mb-1'/>
          <div className='text-3xl font-bold mb-4'>Добавить</div>
        </div>
      </div>
    </div>
  );
}


export default Subscriptions;
