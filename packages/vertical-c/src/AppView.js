import React from 'react';
import { createComponent } from '@lit/react';

// import { ApplicationView } from 'module-application/controller';
import ApplicationView from './AppViewCE.js';

const AppView = createComponent({
  tagName: 'application-view',
  elementClass: ApplicationView,
  react: React
});

export default AppView;