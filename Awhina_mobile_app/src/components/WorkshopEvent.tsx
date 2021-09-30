import { IonLabel, IonCard, IonCardHeader, IonCardContent, IonTextarea, IonText, IonCheckbox, IonCardTitle, IonModal } from '@ionic/react';
import './WorkshopEvent.css';
import { StudentWorkshopHooks } from '../hooks/StudentWorkshopsHooks'
import { WorkshopModel } from '../models/WorkshopModel'

//<IonCheckbox color='primary' onIonChange={e => handleRegister(e.detail.checked)} checked={props.userAttending} />
const WorkshopEvent: React.FC<WorkshopModel> = (props: WorkshopModel) => {
    const { user } = StudentWorkshopHooks()

    return (
    <IonCard class="workshop-event" type='button' onClick={() => user.setOnWorkshopDetails(true)}>
        <IonCardHeader color="primary" class="workshop-event-header">
            {props.name}
        </IonCardHeader>
        <IonCardContent>
            <IonLabel color="dark">{props.date.toLocaleString()}</IonLabel>
            <IonLabel color="dark">Duration: {props.duration} minutes</IonLabel>
            <IonLabel color="dark">Location: {props.location}</IonLabel>
            <IonText color="dark"  class='workshop-description' >{props.description}</IonText>
            <IonLabel color='dark' >Seats left: {props.seatsLeft}</IonLabel>
            <IonLabel color='dark' >Participants: {props.participants}</IonLabel>
        </IonCardContent>
    </IonCard>
    );
};

export default WorkshopEvent;
