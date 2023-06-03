import { ReactNode, createContext, useState, useMemo } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';
import { IAddStation, IStation } from '../types';
import useAddStationMutation from '../hooks/useAddStationMutation';

interface IStationContext {
  openAddStationModal: boolean;
  setOpenAddStationModal: undefined | ((isOpen: boolean) => void);
  openConfirmModal: boolean;
  setOpenConfirmModal: undefined | ((isOpen: boolean) => void);
  mutate:
    | UseMutateFunction<IStation, unknown, IAddStation, unknown>
    | undefined;
  isLoading: boolean;
}

const StationContext = createContext<IStationContext>({
  isLoading: false,
  mutate: undefined,
  openAddStationModal: false,
  setOpenAddStationModal: undefined,
  openConfirmModal: false,
  setOpenConfirmModal: undefined,
});

interface StationContextProviderProps {
  children: ReactNode;
}

export function StationContextProvider({
  children,
}: StationContextProviderProps) {
  const [openAddStationModal, setOpenAddStationModal] =
    useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const { isLoading, mutate } = useAddStationMutation();

  const memoizedState = useMemo(
    () => ({
      isLoading,
      mutate,
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
      isLoading,
      mutate,
    ]
  );

  return (
    <StationContext.Provider value={memoizedState}>
      {children}
    </StationContext.Provider>
  );
}

export default StationContext;
