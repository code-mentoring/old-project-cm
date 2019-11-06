import { useLazyQuery } from '@apollo/react-hooks';
import { EUser } from 'cm-api';
import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';

import { verify as verifyQuery } from '../lib/API/queries';


export const AuthContainer = createContainer(() => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token') || null);
  const [verified, setVerified] = useState<boolean>(false);
  const [verify, { data, error, loading: verifying }] = useLazyQuery<EUser>(verifyQuery);

  useEffect(() => {
    if (error) setVerified(false);
    else if (data) setVerified(true);
  }, [error, data]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      verify();
    } else if (error) localStorage.removeItem('token');
  }, [token]);

  return { verified, verify, verifying, token, setToken };
});
