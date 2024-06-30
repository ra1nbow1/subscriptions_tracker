import { useState } from 'react';
import { ISubscription } from '../../../features/interfaces/user.interface';

interface ISubscriptionProps {
    subscription: ISubscription;
  }


function Subscription({subscription}: Readonly<ISubscriptionProps>) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState<ISubscription['title']>(subscription.title)
  const [renewalPeriod, setRenewalPeriod] = useState<ISubscription['renewalPeriod'] | ''>(subscription.renewalPeriod)
  const [price, setPrice] = useState<ISubscription['price']>(subscription.price)
  const [startDate, setStartDate] = useState<ISubscription['startDate']>(subscription.startDate)

  function convertToHumanTimestamp(date: number): string {
      const obj = new Date(date)
      return `${obj.toLocaleDateString()}`;
  }

  function convertToDate(ms: number): string {
    let date = new Date(ms);
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`
  }

  const deleteSubscription = () => {
    console.log(`Delete ${subscription.sid}`);
  }

  return (
     !isEditing ?
      <div key={subscription.title} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-60">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-2">Каждый {renewalPeriod}</p>
        <p className="mb-4">{price}₽</p>
        <p className="mb-2">Начало: {convertToHumanTimestamp(startDate)}</p>
        <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors duration-300">Изменить</button>
      </div>
    :
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <input
            type="text"
            name="title"
            id="title"
            min="1"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            className="block w-full outline-none rounded-md py-1 px-3 mb-2 bg-transparent border-2 text-white focus:placeholder-white border-blue-800 focus:border-blue-600 sm:text-sm sm:leading-4"
            placeholder="Название"
            required
          />
      <select
      defaultValue={renewalPeriod}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRenewalPeriod(e.target.value as 'месяц' | 'год')}
        className="w-full outline-none py-1 px-3 mb-2 bg-transparent sm:text-sm sm:leading-4 text-white border-2 border-blue-800 focus:border-blue-600 rounded- appearance-none focus:shadow-outline">
        <option value="месяц">Каждый месяц</option>
        <option value="год">Каждый год</option>
      </select>
      <div className="relative rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <span className="text-gray-500 sm:text-sm">₽</span>
        </div>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(parseInt(e.target.value))}
          type="number"
          name="price"
          id="price"
          min="1"
          value={price}
          className="block w-full outline-none rounded-md mb-2 py-1 align-middle px-3 pl-7 bg-transparent border-2 focus:placeholder-white text-white border-blue-800 focus:border-blue-600 sm:text-sm sm:leading-4"
          placeholder="0"
          required
        />
      </div>
      <input
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(new Date(e.target.value).getTime())}
        type="date"
        required
        value={convertToDate(startDate)}
        className="block w-full mb-3 bg-transparent border-2 border-blue-800 focus:border-blue-600 mt-2 py-0 px-3 rounded-md sm:text-sm sm:leading-4 outline-none text-white"
      />
      <button className="bg-blue-600 font-bold text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors duration-300 mr-3">Сохранить</button>
      <button onClick={deleteSubscription} className="bg-red-500 font-bold text-white px-4 py-2 rounded hover:bg-red-800 transition-colors duration-300">Удалить</button>
    </div>

    )
}

export default Subscription
