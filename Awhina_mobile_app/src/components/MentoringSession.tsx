import { IonLabel, IonCard, IonCardHeader, IonCardContent, IonTextarea, IonText, IonButton } from '@ionic/react';
import './MentoringSession.css';
import { StudentsHooks } from '../hooks/StudentsHooks'
import { MentoringSessionModel } from '../models/MentoringSessionModel'

const MentoringSession: React.FC<MentoringSessionModel> = (props: MentoringSessionModel) => {
  const { createQrCode, user } = StudentsHooks()
  return (
    <IonCard class="mentoring_session">
        <IonCardHeader color="primary" class="mentor-session-header">{props.eventName}</IonCardHeader>
        <IonCardContent>
          <IonLabel color="dark">With {user.isMentor || user.isStaff ? props.student : props.mentor}</IonLabel>
          <IonLabel color="dark">{props.time}</IonLabel>
          <IonLabel color="dark">{props.location}</IonLabel>
          <IonText color="dark"  class='mentoring-description' >{props.description}</IonText>
          <IonLabel color="dark">{props.attended ? "Attended" : "Not attended"}</IonLabel>
          {user.isStaff ? <IonButton expand='full' fill='outline' shape='round' onClick={()=>createQrCode(`mentoring_${props._id}`)} >Open QR Code</IonButton> : null}
        </IonCardContent>
    </IonCard>
  );
};

export default MentoringSession;
