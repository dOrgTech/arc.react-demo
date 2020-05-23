import React, { useState, SetStateAction, Dispatch } from 'react'
import { Snackbar } from "@material-ui/core";

interface ISession {
  address: string | null
  setAddress: Dispatch<SetStateAction<string | null>>;
  checkAddress: () => boolean;
}

export const Web3Context = React.createContext<ISession>({
  address: null,
  setAddress: () => {},
  checkAddress: () => false
})

interface IProps {
  children: any;
}

function Web3Provider(props: IProps) {
  const [ address, setAddress ] = useState<string | null>(null)
  const [ showNotification, setShowNotification ] = useState<boolean>(false)
  const checkAddress = () => {
    if (!address) {
      setShowNotification(true)
      return false
    }
    return true
  }

  return (
    <Web3Context.Provider value={{ address, setAddress, checkAddress }}>
      <Snackbar
        open={showNotification}
        message={"You must log in first :-)"}
        transitionDuration={1000}
        autoHideDuration={3000}
        onClose={() => setShowNotification(false)}
      />
      {props.children}
    </Web3Context.Provider>
  )
}

export default Web3Provider