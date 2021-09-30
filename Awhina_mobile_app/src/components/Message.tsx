import { IonLabel, IonItem, IonRow, IonCol, IonText } from '@ionic/react';
import './Message.css';
import { useContext } from 'react';
import { UserContext } from '../App';

type MentoringEventProps = {
    name: string
    sent: string
    message: string
}

const Message: React.FC<MentoringEventProps> = (props: MentoringEventProps) => {
  const user = useContext(UserContext)
  return (
    <IonItem lines='none'>
        <div>
            <IonRow>
                <IonLabel class='chat-name' >{props.name}</IonLabel>
                <IonLabel class='chat-sent' >{props.sent}</IonLabel>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonText class='chat-message' >{props.message}</IonText>
                </IonCol>
            </IonRow>
        </div>
    </IonItem>
  );
};

export default Message;
