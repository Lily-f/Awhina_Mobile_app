import { BarcodeScanner } from '@ionic-native/barcode-scanner'
import { useContext } from 'react';
import { UserContext } from '../App';

export function MarkEventHooks() {

    const user = useContext(UserContext)

    async function openScanner() {
        const data = await BarcodeScanner.scan()
        alert(`Barcode data text: ${data.text}\nBarcode data format: ${data.format}`)
    }

    return { openScanner, user }
}