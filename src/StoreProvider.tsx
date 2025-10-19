'use client';

import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import { AppStore, store } from './app/redux/store/store';
import { setSessionValues, User } from './app/redux/slice/session';

type Props = {
  children: ReactNode
  initialReduxState?: unknown
}
export default function StoreProvider({
  children,
  initialReduxState,
}: Props) {
  const storeRef = useRef<AppStore | undefined>(undefined);

  if (!storeRef.current) {
    storeRef.current = store(initialReduxState || {});
    storeRef.current.dispatch(setSessionValues({user: {} as User}))
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}

