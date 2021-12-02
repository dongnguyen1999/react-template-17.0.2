import React, { useEffect, useState } from 'react';


const AppLayout = ({ children }) => {
  return (
      <div style={{ position: "relative" }}>
        App layout
        <main>{children}</main>
      </div>
  );
};

export default AppLayout;
