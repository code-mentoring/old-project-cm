import React from 'react';

import logo from '../../images/logo.png';
import { Page } from '../../components/Page/Page';
import { Button } from '../../components/Button/Button';
import { InputField } from '../../components/InputField/InputField';

// Temporary page to see the styleguide components

export const Styleguide = () => <Page title="Code Mentoring" type="home">
  <img alt="logo" src={logo} />
  <h1>Welcome to the stylguide page</h1>
  <Button text="Text" size="small" />
  <Button text="Text 2" size="medium" />
  <Button text="Text 2" size="large" />
  <InputField type="text" name="normal" disabled={false} value="" label="Normal" placeholder="Normal" />
  <InputField type="text" name="disabled" disabled={true} label="Disabled" placeholder="Disabled" />
  <InputField type="text" name="filled" disabled={false} value="Filled" label="Filled" />
  <InputField type="text" name="error" disabled={false} label="Error" placeholder="Error" error="Error" />
</Page>;
