import React from 'react';

import { AuthContainer } from './Auth.container';
import { MeContainer } from './Me.container';

export const ContainerWrapper: React.FunctionComponent = ({ children }) =>
  <AuthContainer.Provider>
    <MeContainer.Provider>
      {children}
    </MeContainer.Provider>
  </AuthContainer.Provider>;
