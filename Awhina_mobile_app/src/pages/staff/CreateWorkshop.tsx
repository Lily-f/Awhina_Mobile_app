import { IonButton, IonToast, IonList, IonItem, IonInput, IonTextarea, IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
//import './CreateWorkshop.css';
import { arrowBack } from 'ionicons/icons';
import { WorkshopHooks } from '../../hooks/WorkshopHooks'

const CreateEvent: React.FC = () => {
  const { setLocation, setMaxParticipants, setTime, setDuration, setDescription, setEventName, handleEventCreate, user, showToastFailure, showToastSuccess, setShowToastFailure, setShowToastSuccess, failureToastReason } = WorkshopHooks()
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Workshop</IonTitle>
          <IonButton class='back-button' fill='clear' slot='primary' onClick={() => { user.setCreatingEvent(false) }} >
            <IonIcon icon={arrowBack} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonInput placeholder="Event Name" onIonChange={e => { setEventName(e.detail.value!) }} />
          </IonItem>
          <IonItem>
            <IonInput placeholder="Location" onIonChange={e => { setLocation(e.detail.value!) }} />
          </IonItem>
          <IonItem>
            <IonInput placeholder="Time" onIonChange={e => { setTime(e.detail.value!) }} />
          </IonItem>
          <IonItem>
            <IonInput placeholder="Duration" onIonChange={e => { setDuration(e.detail.value!) }} />
          </IonItem>
          <IonItem>
            <IonInput placeholder="Max Participants" onIonChange={e => { setMaxParticipants(e.detail.value!) }} />
          </IonItem>
          <IonItem>
            <IonTextarea autoGrow={true} placeholder="Description" onIonChange={e => { setDescription(e.detail.value!) }} />
          </IonItem>
        </IonList>

        {/* Show Creation Success*/}
        <IonToast
          isOpen={showToastSuccess}
          onDidDismiss={() => { setShowToastSuccess(false); user.setCreatingEvent(false) }}
          message='Success!'
          position='top'
          duration={1000}
          color='success'
        />

        {/* Show Creation Failure*/}
        <IonToast
            isOpen={showToastFailure}
            onDidDismiss={() => { setShowToastFailure(false) }}
            message={`${failureToastReason}`}
            position='top'
            duration={1000}
            color='danger'
        />

      </IonContent>
      <IonFooter>
        <IonButton expand='full' shape="round" fill='outline' onClick={() => { handleEventCreate() }}>Confirm</IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default CreateEvent;
