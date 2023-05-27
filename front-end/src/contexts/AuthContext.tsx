import { ReactNode, createContext, useEffect, useState, useMemo } from 'react';
import { LoginAPIResponse } from '../types';

interface IAuthContext {
  userDetails: LoginAPIResponse | undefined;
  setUserDetails: undefined | ((details: LoginAPIResponse | undefined) => void);
  openAuthModal: boolean;
  setOpenAuthModal: undefined | ((isOpen: boolean) => void);
}

const AuthContext = createContext<IAuthContext>({
  userDetails: undefined,
  setUserDetails: undefined,
  openAuthModal: false,
  setOpenAuthModal: undefined,
});

interface AuthContextProviderProps {
  children: ReactNode;
  // any props that come into the component
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [userDetails, setUserDetails] = useState<
    LoginAPIResponse | undefined
  >();
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);

  const memoizedState = useMemo(
    () => ({
      userDetails,
      setUserDetails,
      openAuthModal,
      setOpenAuthModal,
    }),
    [userDetails, setUserDetails, setOpenAuthModal, openAuthModal]
  );

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUserDetails(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    if (userDetails) {
      console.log('called userdetails');
      localStorage.setItem('user', JSON.stringify(userDetails));
    } else {
      console.log('called userdetails with else');
      localStorage.removeItem('user');
    }
  }, [userDetails]);

  return (
    <AuthContext.Provider value={memoizedState}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
