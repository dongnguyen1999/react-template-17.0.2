import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';


const HomePage = lazy(() => import('../pages/Home'));

const Routes = () => {

  return (
    <Suspense fallback={<div />}>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
