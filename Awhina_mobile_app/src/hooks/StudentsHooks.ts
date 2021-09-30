import { UserContext } from './../App';
import { useState, useContext } from 'react';
import { BarcodeScanner } from '@ionic-native/barcode-scanner'

export function StudentsHooks() {
    const user = useContext(UserContext)
    const [popoverState, setShowPopover] = useState({showPopover: false, event: undefined})
    const [showActionSheet, setShowActionSheet] = useState(false)

    async function createQrCode(data: string) {
        BarcodeScanner.encode(BarcodeScanner.Encode.TEXT_TYPE, data)
    }

    return { showActionSheet, setShowActionSheet, popoverState, setShowPopover, createQrCode, user }
}