import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './HomeStaff.css';

const Home: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Āwhina mobile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset={false} lines={"none"} >
          <IonListHeader class="list-header">Notifications</IonListHeader>
          <IonItem class="events-posted-date">
            <IonLabel color="dark">
              <p>New Events (Posted 11/9/2021)</p>
            </IonLabel>
          </IonItem>
          <IonItem class="list-item">
            <IonLabel color="dark">
              <p>EVENT NAME on 10/10/2021</p>
            </IonLabel>
          </IonItem>
          <IonItem class="list-item">
            <IonLabel color="dark">
              <p>EVENT NAME on 10/10/2021</p>
            </IonLabel>
          </IonItem>
          <IonItem class="list-item">
            <IonLabel color="dark">
              <p>EVENT NAME on 10/10/2021</p>
            </IonLabel>
          </IonItem>
          <IonItem class="events-posted-date">
            <IonLabel color="dark">
              <p>New Events (Posted 14/9/2021)</p>
            </IonLabel>
          </IonItem>
          <IonItem class="list-item">
            <IonLabel color="dark">
              <p>EVENT NAME on 10/10/2021</p>
            </IonLabel>
          </IonItem>
          <IonItem class="list-item">
            <IonLabel color="dark">
              <p>EVENT NAME on 10/10/2021</p>
            </IonLabel>
          </IonItem>
          <IonItem class="list-item">
            <IonLabel color="dark">
              <p>EVENT NAME on 10/10/2021</p>
            </IonLabel>
          </IonItem>
          <IonItem class="list-item">
            <IonLabel color="dark">
              <p>EVENT NAME on 10/10/2021</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
