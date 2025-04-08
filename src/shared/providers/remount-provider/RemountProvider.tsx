import { ReactElement, useEffect, useMemo, useState } from 'react';
import { RemountContext } from './RemountContext';

export const RemountProvider: FCC<{ loader: ReactElement }> =
  function RemountProvider({ children, loader = null }) {
    const [remount, setForceRemount] = useState(false);
    const value = useMemo(
      () => ({
        remountComponent: () => setForceRemount(() => true),
      }),
      [setForceRemount]
    );

    useEffect(() => {
      if (remount) {
        setTimeout(() => setForceRemount(false), 0);
      }
    }, [remount, setForceRemount]);

    if (remount) {
      return loader;
    }

    return (
      <RemountContext.Provider value={value}>
        {children}
      </RemountContext.Provider>
    );
  };
