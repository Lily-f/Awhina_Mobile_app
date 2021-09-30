import { IonButton, IonList, IonToast, IonItem, IonInput, IonTextarea, IonContent, IonFooter, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonLabel } from '@ionic/react';
//import './CreateMentoringSession.css';
import { arrowBack } from 'ionicons/icons';
import { RequestMentoringSessionHooks } from '../../hooks/RequestMentoringSessionHooks';

const CreateMentoringSession: React.FC = () => {
    const { setLocation, setMentor, setTime, setDescription, setEventName, accecptMentoringSessionRequest, showToastFailure, showToastSuccess, setShowToastFailure, setShowToastSuccess, failureToastReason, user } = RequestMentoringSessionHooks()

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Create MentoringSession</IonTitle>
                    <IonButton class='back-button' fill='clear' slot='primary' onClick={() => { user.setCreatingEvent(false) }} >
                        <IonIcon icon={arrowBack} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <IonItem>
                        <IonLabel>Student: {user.mentoringSessionRequest.student}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonInput placeholder={user.mentoringSessionRequest.eventName} onIonChange={e => { setEventName(e.detail.value!) }} />
                    </IonItem>
                    <IonItem>
                        <IonInput placeholder="Location" onIonChange={e => { setLocation(e.detail.value!) }} />
                    </IonItem>
                    <IonItem>
                        <IonInput placeholder={user.mentoringSessionRequest.time} onIonChange={e => { setTime(e.detail.value!) }} />
                    </IonItem>
                    <IonItem> {/*TODO: Change to a dropdown or selection of mentors that are in the database. OR throw error server side*/}
                        <IonInput placeholder="Mentor" onIonChange={e => { setMentor(e.detail.value!) }} />
                    </IonItem>
                    <IonItem>
                        <IonTextarea autoGrow={true} placeholder={user.mentoringSessionRequest.description} onIonChange={e => { setDescription(e.detail.value!) }} />
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
                <IonButton expand='full' shape="round" fill='outline' onClick={() => { accecptMentoringSessionRequest() }}>Confirm</IonButton>
            </IonFooter>
        </IonPage>
    );
};

export default CreateMentoringSession;
