import { RefObject, createContext, useContext, useRef } from 'react';

const PortalContext = createContext<RefObject<HTMLDivElement> | undefined>(
  undefined
);

export const PortalProvider: FCC = ({ children }) => {
  const ref = useRef(null);

  return (
    <PortalContext.Provider value={ref}>
      {children}
      <div ref={ref} id='app_portal' />
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  return useContext(PortalContext);
};
