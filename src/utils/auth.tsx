import React, { useState, SetStateAction, Dispatch } from 'react'

interface ISession {
  address: string | null
  setAddress: Dispatch<SetStateAction<string | null>>;
}

export const Web3Context = React.createContext<ISession>({
  address: null,
  setAddress: () => {}
})

interface IProps {
  children: any;
}

function Web3Provider(props: IProps) {
  const [ address, setAddress ] = useState<string | null>(null)

  return (
    <Web3Context.Provider value={{ address, setAddress }}>
      {props.children}
    </Web3Context.Provider>
  )
}

export default Web3Provider