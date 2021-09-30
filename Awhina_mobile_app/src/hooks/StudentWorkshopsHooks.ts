import { UserContext } from './../App';
import { useState, useContext } from 'react';

export function StudentWorkshopHooks() {
    const user = useContext(UserContext)

    function handleRegister(register: boolean) {
        alert(`registering: ${register}`)
    }

    return { handleRegister, user }
}