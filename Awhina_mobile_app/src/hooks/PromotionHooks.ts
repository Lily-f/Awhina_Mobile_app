import { UserContext } from './../App';
import { useState, useContext } from 'react';

export function PromotionHooks() {
  const user = useContext(UserContext)
  const [title, setTitle] = useState<string>("")
  const [contents, setContents] = useState<string>("")

  // verify that event to create is valid and send to database via HTTP request
  // params: user token? if not from user context, and event details
  function handlePromote(){
    alert("Under Construction")
  }

  return { setContents, setTitle, handlePromote, user}
}