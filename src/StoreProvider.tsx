'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { AppStore, store } from './app/redux/store/store';
import { setSessionValues, User } from './app/redux/slice/session';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>(undefined)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store();
    storeRef.current.dispatch(setSessionValues({user: {} as User}))
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}

