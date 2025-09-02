import React from 'react'
import { IonApp } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Route, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Route path="/login" component={Login} exact />
      <Route path="/home" component={Home} exact />
      <Route exact path="/" render={() => <Redirect to="/home" />} />
    </IonReactRouter>
  </IonApp>
)

export default App
