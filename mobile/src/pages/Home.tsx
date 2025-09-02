import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from '@ionic/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => (
	<IonPage>
		<IonHeader>
			<IonToolbar>
				<IonTitle>Subscriptions Tracker</IonTitle>
			</IonToolbar>
		</IonHeader>
		<IonContent className="ion-padding">
			Welcome to the mobile app!
			<Link to="/login">Ссылка</Link>
		</IonContent>
	</IonPage>
)

export default Home
