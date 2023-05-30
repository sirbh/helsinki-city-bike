import { ReactNode, createContext, useEffect, useState, useMemo } from 'react';
import { LoginAPIResponse } from '../types';

interface IStationContext {
  //   userDetails: LoginAPIResponse | undefined;
  //   setUserDetails: undefined | ((details: LoginAPIResponse | undefined) => void);
  openAddStationModal: boolean;
  setOpenAddStationModal: undefined | ((isOpen: boolean) => void);
  openConfirmModal: boolean;
  setOpenConfirmModal: undefined | ((isOpen: boolean) => void);
}

const StationContext = createContext<IStationContext>({
  //   userDetails: undefined,
  //   setUserDetails: undefined,
  openAddStationModal: false,
  setOpenAddStationModal: undefined,
  openConfirmModal: false,
  setOpenConfirmModal: undefined,
});

interface StationContextProviderProps {
  children: ReactNode;
  // any props that come into the component
}

export function StationContextProvider({
  children,
}: StationContextProviderProps) {
  //   const [userDetails, setUserDetails] = useState<
  //     LoginAPIResponse | undefined
  //   >();
  const [openAddStationModal, setOpenAddStationModal] =
    useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  const memoizedState = useMemo(
    () => ({
      //   userDetails,
      //   setUserDetails,
      openAddStationModal,
      setOpenAddStationModal,
      openConfirmModal,
      setOpenConfirmModal,
    }),
    [
      openAddStationModal,
      setOpenAddStationModal,
      openConfirmModal,
      setOpenConfirmModal,
    ]
  );

  //   useEffect(() => {
  //     const user = localStorage.getItem('user');
  //     if (user) {
  //       setUserDetails(JSON.parse(user));
  //     }
  //   }, []);

  //   useEffect(() => {
  //     if (userDetails) {
  //       localStorage.setItem('user', JSON.stringify(userDetails));
  //     } else {
  //       localStorage.removeItem('user');
  //     }
  //   }, [userDetails]);

  return (
    <StationContext.Provider value={memoizedState}>
      {children}
    </StationContext.Provider>
  );
}

export default StationContext;
