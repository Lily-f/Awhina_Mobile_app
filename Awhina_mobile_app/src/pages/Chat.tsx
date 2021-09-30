import { IonButton, IonCard, IonCardContent, IonCardHeader, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
//import './AddEvent.css';
import { arrowBack } from 'ionicons/icons';
import Message from '../components/Message';
import { ChatHooks } from '../hooks/ChatHooks'

const Chat: React.FC = () => {

    const { user } = ChatHooks()

    return (
    <IonPage>
        <IonHeader>
        <IonToolbar>
            <IonTitle>Chat</IonTitle>
            <IonButton class='back-button' fill='clear' slot='primary' onClick={()=>{user.setOnChat(false)}} >
                <IonIcon icon={arrowBack} />
            </IonButton>
        </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonList>
                <Message name='Student' sent='12:30pm' message='How are you?' />
                <Message name='Mentor' sent='12:32pm' message='Good' />
                <Message name='Student' sent='12:34pm' message='Cool' />
                <Message name='Student' sent='12:36pm' message='Im Spamming you with lots of words to see where the text wrap is' />
                <Message name='Mentor' sent='12:37pm' message='lol' />
            </IonList>
        </IonContent>
    </IonPage>
);
};

export default Chat;
