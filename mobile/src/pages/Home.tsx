import React from 'react'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react'

const Home: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Subscriptions Tracker</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      Welcome to the mobile app!
    </IonContent>
  </IonPage>
)

export default Home
