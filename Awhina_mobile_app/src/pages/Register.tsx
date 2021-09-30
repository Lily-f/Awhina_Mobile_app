import { IonContent, IonToggle, IonIcon, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonInput, IonButton, IonToast, IonButtons, IonRadioGroup, IonItem, IonRadio, IonLabel, IonImg, IonList } from '@ionic/react';
import './Register.css';
import { RegisterHooks } from '../hooks/RegisterHooks'
import { arrowBack } from 'ionicons/icons';

const Register: React.FC = () => {

  const {userName, password, confirmPassword, showToastSuccess, showToastFailure, failureToastReason, 
    setShowToastFailure, setShowToastSuccess, handleRegister, setUserName, setPassword, setConfirmPassword, setIsMentor, setIsStaff, user} = RegisterHooks()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton class='back-button' fill='clear' slot='start' onClick={()=>{user.setOnRegister(false)}} >
            <IonIcon icon={arrowBack} />
          </IonButton>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonImg src="assets\images\temp_pic.png" class="registerImage" />
          </IonRow>
          <IonRow>
            <IonCol>
                <IonInput value={userName} placeholder="Enter Username" onIonChange={e => setUserName(e.detail.value!)} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
                <IonInput value={'*'.repeat(password.length)} placeholder="Enter Password" onIonChange={e => setPassword(e.detail.value!)} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
                <IonInput value={'*'.repeat(confirmPassword.length)} placeholder="Confirm Password" onIonChange={e => setConfirmPassword(e.detail.value!)} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
                <IonLabel>Mentor</IonLabel>
                <IonToggle onIonChange={e => setIsMentor(e.detail.checked)} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>Staff</IonLabel>
              <IonToggle onIonChange={e => setIsStaff(e.detail.checked)} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="block" color='primary' onClick={() => {handleRegister()}} >REGISTER</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Show register Success*/}
        <IonToast
          isOpen={showToastSuccess}
          onDidDismiss={()=>{setShowToastSuccess(false); user.setOnRegister(false)}}
          message='Success!'
          position='top'
          duration={1000}
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

export default Register;
