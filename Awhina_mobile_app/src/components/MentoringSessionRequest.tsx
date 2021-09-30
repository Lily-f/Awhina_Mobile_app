import { IonLabel, IonCard, IonCardHeader, IonCardContent, IonText, IonButton } from '@ionic/react';
import './MentoringSessionRequest.css';
import { RequestMentoringSessionHooks } from '../hooks/RequestMentoringSessionHooks'
import { MentoringSessionRequestModel } from '../models/MentoringSessionRequestModel'

const MentoringSessionRequest: React.FC<MentoringSessionRequestModel> = (props: MentoringSessionRequestModel) => {
  const { user } = RequestMentoringSessionHooks()
  return (
    <IonCard class="mentoring_session_request" >
        <IonCardHeader color="primary" class="mentor-session-header">{props.student}</IonCardHeader>
        <IonCardContent>
            <IonLabel color="dark">{props.eventName}</IonLabel>
            <IonLabel color="dark">{props.time}</IonLabel>
            <IonText color="dark"  class='mentoring-description' >{props.description}</IonText>
            {user.isStaff ? <IonButton expand='full' fill='outline' shape='round' 
            onClick={
              ()=>{
                user.setMentoringSessionRequest(props)
                user.setCreatingEvent(true);
              }
            }>Create Session</IonButton> : null}
            
        </IonCardContent>
    </IonCard>
  );
};

export default MentoringSessionRequest;
