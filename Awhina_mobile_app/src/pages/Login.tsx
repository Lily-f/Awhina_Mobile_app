import { IonButton, IonCol, IonContent, IonGrid, IonToast, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Login.css';
import { personCircle } from 'ionicons/icons';
import { LoginHooks } from '../hooks/LoginHooks'

const Login: React.FC = () => {

  const {password, showToastSuccess, showToastFailure, setShowToastSuccess, 
    setShowToastFailure, setPassword, failureToastReason, handleLogin, user} = LoginHooks()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Āwhina Mobile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonIcon style={{ fontSize: '70px', color: '#000000'}} icon={personCircle} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
                <IonInput value={user.userName} placeholder="Enter Username" onIonChange={e => user.setUserName(e.detail.value!)} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
                <IonInput value={'*'.repeat(password.length)} placeholder="Enter Password" onIonChange={e => setPassword(e.detail.value!)} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="block" color='primary' onClick={() => {handleLogin()}} >LOGIN</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <p className="account-reminder" style={{fontSize: 'medium'}}>Don't have an account?</p>
              <IonButton expand="block" color='primary' onClick={() => {user.setOnRegister(true)}} >Register</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Show register Success*/}
        <IonToast
          isOpen={showToastSuccess}
          onDidDismiss={()=>{setShowToastSuccess(false); user.setIsLoggedIn(true); }}
          message='Success!'
          position='top'
          duration={500}
          color='success'
        />

        {/* Show register Failure*/}
        <IonToast
          isOpen={showToastFailure}
          onDidDismiss={()=>{setShowToastFailure(false)}}
          message={`${failureToastReason}`}
          position='top'
          duration={1000}
          color='danger'
        />

      </IonContent>
    </IonPage>
  );
};

export default Login;
