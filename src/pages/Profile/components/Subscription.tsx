import { ISubscription } from '../../../features/interfaces/user.interface';

interface ISubscriptionProps {
    subscription: ISubscription;
  }


function Subscription({subscription}: Readonly<ISubscriptionProps>) {
    function convertToHumanTimestamp(date: number): string {
        const obj = new Date(date)
        return `${obj.toLocaleDateString()}`;
    }
  return (
    <div key={subscription.title} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-60">
      <h2 className="text-2xl font-bold mb-4">{subscription.title}</h2>
      <p className="mb-2">Каждый {subscription.renewalPeriod}</p>
      <p className="mb-4">{subscription.price}₽</p>
      <p className="mb-2">Начало: {convertToHumanTimestamp(subscription.startDate)}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors duration-300">Изменить</button>
    </div>
  )
}

export default Subscription
