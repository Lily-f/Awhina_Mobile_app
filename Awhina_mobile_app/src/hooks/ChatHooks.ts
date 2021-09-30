import { UserContext } from './../App';
import { useState, useContext } from 'react';

export function ChatHooks() {
  const user = useContext(UserContext)

  return {user}
}