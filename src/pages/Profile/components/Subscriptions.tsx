import React, { useState } from 'react';
import IUser, { ISubscription } from '../../../features/interfaces/user.interface';
import Subscription from './Subscription';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faClose } from '@fortawesome/free-solid-svg-icons';
import axios from '../../../features/auth/axios';


interface ISubscriptionProps {
  subscriptions: ISubscription[];
  uid: IUser['uid']
}


function Subscriptions({ subscriptions, uid }: Readonly<ISubscriptionProps>): JSX.Element {
  const [isAddingNewSubscription, setIsAddingNewSubscription] = useState(false)
  const [alertIsOpened, setAlertIsOpened] = useState(false)
  const [title, setTitle] = useState<ISubscription['title']>('')
  const [renewalPeriod, setRenewalPeriod] = useState<ISubscription['renewalPeriod'] | ''>('')
  const [price, setPrice] = useState<ISubscription['price']>(0)
  const [startDate, setStartDate] = useState<ISubscription['startDate']>(0)

  const handleNewSubscription = () => {
    if (!title || !renewalPeriod || !price || !startDate) {
      setAlertIsOpened(true)
      setTimeout(() => setAlertIsOpened(false), 3000)
    }
    else {
      axios.put(`/api/${uid}/subscriptions`,
        {
          subscriptions: [...subscriptions, {
            "title": title,
            "price": price,
            "renewalPeriod": renewalPeriod,
            "startDate": startDate,
        }]
        }
      ).then(() => window.location.reload())
      .catch(() => {
        alert('Ошибка')
      })
    }
  }
  return (
    <>
    <div className="container mx-auto p-4 min-h-fit">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subscriptions.map((subscription) => (
          <Subscription key={subscription.title} subscription={subscription} />
        ))}
        {!isAddingNewSubscription ?
          <button onClick={() => {setIsAddingNewSubscription(true)}} className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-700 transition-colors duration-200">
            <FontAwesomeIcon icon={faSquarePlus} size="2xl" className='mb-1'/>
            <div className='text-3xl font-bold mb-4'>Добавить</div>
          </button> :
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <input
                  type="text"
                  name="title"
                  id="title"
                  min="1"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                  className="block w-full outline-none rounded-md py-1 px-3 mb-2 bg-transparent border-2 text-gray-400 focus:placeholder-white focus:text-white border-blue-800 focus:border-blue-600 sm:text-sm sm:leading-4"
                  placeholder="Название"
                  required
                />
            <select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRenewalPeriod(e.target.value)}
              className="w-full outline-none py-1 px-3 mb-2 bg-transparent sm:text-sm sm:leading-4 text-gray-400 border-2 border-blue-800 focus:border-blue-600 rounded-md focus:text-white appearance-none focus:shadow-outline">
              <option value="месяц">Каждый месяц</option>
              <option value="год">Каждый год</option>
            </select>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <span className="text-gray-500 sm:text-sm">₽</span>
              </div>
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(parseFloat(e.target.value))}
                type="number"
                name="price"
                id="price"
                min="1"
                className="block w-full outline-none rounded-md mb-2 py-1 align-middle px-3 pl-7 bg-transparent border-2 focus:placeholder-white text-gray-400 focus:text-white border-blue-800 focus:border-blue-600 sm:text-sm sm:leading-4"
                placeholder="0"
                required
              />
            </div>
            <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(new Date(e.target.value).getTime())}
              type="date"
              required
              className="block w-full mb-3 bg-transparent border-2 border-blue-800 focus:border-blue-600 mt-2 py-0 px-3 rounded-md sm:text-sm sm:leading-4 outline-none text-gray-400 focus:text-white"
            />
            <button onClick={() => handleNewSubscription()} className="bg-blue-600 font-bold text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors duration-300 mr-3">Сохранить</button>
            <button onClick={() => setIsAddingNewSubscription(false)} className="bg-red-500 font-bold text-white px-4 py-2 rounded hover:bg-red-800 transition-colors duration-300">Отменить</button>
          </div>
        }

      </div>

    </div>
    { alertIsOpened &&
      <div className="bg-red-100 text-red-700 mx-auto w-52 py-3 px-2 text-center align-center flex justify-between rounded" role="alert">
        <span className="block sm:inline">Заполните все поля</span>
        <FontAwesomeIcon onClick={() => setAlertIsOpened(false)} icon={faClose} size="xl" className="cursor-pointer"/>
      </div>
    }
    </>
  );
}


export default Subscriptions;
