import React, { createContext, useState } from 'react';

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [sidebarActive, setSidebarActive] = useState(false);

  return (
    <SidebarContext.Provider value={{ sidebarActive, setSidebarActive }}>
      {children}
    </SidebarContext.Provider>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> 2d9f897939802285be9abaa85b59ebbaf384a12a
