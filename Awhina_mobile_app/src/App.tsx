import { Redirect, Route } from 'react-router-dom';
import {IonApp,} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import socket from './socket'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import StudentTabs from './studentTabs';
import StaffTabs from './staffTabs';
import { useState, createContext, useContext } from 'react';
import Register from './pages/Register';

import { MentoringSessionRequestModel } from './models/MentoringSessionRequestModel'
import { WorkshopModel } from './models/WorkshopModel';

// Interface and Object for User context. Represents Person Using the app
interface UserManager {
  setIsLoggedIn: Function
  setIsStaff: Function
  setIsMentor: Function
  setOnRegister: Function
  setCreatingEvent: Function
  setUserName: Function
  userName: string
  creatingEvent: boolean
  isStaff: boolean
  isMentor: boolean
  onChat: boolean
  setOnChat: Function
  setOnWorkshopDetails: Function
  onWorkshopDetails: boolean
  setOnMentoringSessionRequests: Function
  onMentoringSessionRequests: boolean
  setMentoringSessionRequest: Function
  mentoringSessionRequest: MentoringSessionRequestModel
  workshops: WorkshopModel[]
  setWorkshops: Function
}
const user: UserManager = {
  setUserName: () => {},
  setIsLoggedIn: () => {},
  setIsStaff: () => {},
  setIsMentor: () => {},
  setOnRegister: () => {},
  setCreatingEvent: () => {},
  creatingEvent: false,
  isStaff: false,
  isMentor: false,
  onChat: false,
  userName: '',
  setOnChat: () => {},
  onWorkshopDetails: false,
  setOnWorkshopDetails: () => {},
  setOnMentoringSessionRequests: () => {},
  onMentoringSessionRequests: false,
  setMentoringSessionRequest: () => {},
  mentoringSessionRequest: {eventName:'', student:'', description:'', time:'', _id:''},
  workshops: [],
  setWorkshops: () => {}
}
export const UserContext = createContext<UserManager>(user)
// TODO: Change into multiple contexts for users, staff, mentors, and students?

// Lower level component. Directs users to login page unless User context shows their logged in
const AwhinaApp: React.FC = () => {

  socket.on('connect', () => {
    console.log('connected to backend!')
  })

  // Link User context to states eg isLoggedIn
  const [userName, setUserName] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [onRegister, setOnRegister] = useState(false)
  const [isStaff, setIsStaff] = useState(false)
  const [isMentor, setIsMentor] = useState(false)
  const [creatingEvent, setCreatingEvent] = useState(false)
  const [onChat, setOnChat] = useState(false)
  const [onWorkshopDetails, setOnWorkshopDetails] = useState(false)
  const [onMentoringSessionRequests, setOnMentoringSessionRequests] = useState(false)
  const [mentoringSessionRequest, setMentoringSessionRequest] = useState<MentoringSessionRequestModel>({eventName:'', student:'', description:'', time:'', _id:''})
  
  // Start with some workshops as database not being used
  const [workshops, setWorkshops] = useState<WorkshopModel[]>([
    {
      name: "Study session",
      date: new Date('2021-06-07T09:30'),
      duration: 60,
      location: "CO567",
      description: "Learn some study skills and have a quiet room for study",
      participants: 0,
      userAttending: false,
      createdDate: new Date('2021-06-11T10:00').getTime(),
      seatsLeft: 35
    }, {
      name: "Essay Skills",
      date: new Date('2021-08-18T10:00'),
      duration: 45,
      location: "AM621",
      description: "Learn essay writing tips and tricks",
      participants: 4,
      userAttending: false,
      createdDate: new Date('2021-08-22T14:00').getTime(),
      seatsLeft: 30
    }
  ])

  const user = useContext(UserContext)
  user.setIsLoggedIn = setIsLoggedIn
  user.setIsStaff = setIsStaff
  user.setIsMentor = setIsMentor
  user.setOnRegister = setOnRegister
  user.setCreatingEvent = setCreatingEvent
  user.creatingEvent = creatingEvent
  user.isStaff = isStaff
  user.isMentor = isMentor
  user.onChat = onChat
  user.setOnChat = setOnChat
  user.onWorkshopDetails = onWorkshopDetails
  user.setOnWorkshopDetails = setOnWorkshopDetails
  user.onMentoringSessionRequests = onMentoringSessionRequests
  user.setOnMentoringSessionRequests = setOnMentoringSessionRequests
  user.setMentoringSessionRequest = setMentoringSessionRequest
  user.mentoringSessionRequest = mentoringSessionRequest
  user.userName = userName
  user.setUserName = setUserName
  user.workshops = workshops
  user.setWorkshops = setWorkshops
  return (
    <IonApp>
      <IonReactRouter>
        <Redirect path='/*' to='/' />
        <Route path='/login' component={Login} exact={true} />
        <Route path='/register' component={Register} exact={true} />
        <Route path='/' component={ getStartComponent(isLoggedIn, isStaff, isMentor, onRegister) } />
      </IonReactRouter>
    </IonApp>
  )
};

const getStartComponent = (isLoggedIn: boolean, isStaff: boolean, isMentor: boolean, onRegister: boolean) => {
  if(isLoggedIn){
    if(isStaff || isMentor) return StaffTabs
    else return StudentTabs
  }
  else if(onRegister) return Register
  else return Login
}

// Top level component with 'User' context, as Context needs to be made before app starts
const App: React.FC = () => {
  return (
    <UserContext.Provider value={user}>
      <AwhinaApp />
    </UserContext.Provider>
  )
}

export default App;
