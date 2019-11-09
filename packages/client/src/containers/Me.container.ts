import { EUser } from 'cm-api';
import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import { useLazyQuery } from '@apollo/react-hooks';
import { me as meQuery } from '../lib/API/queries';
import { AuthContainer } from './Auth.container';


export const MeContainer = createContainer(() => {
  const [me, setMe] = useState<EUser | null>(null);
  const [loadMe, data] = useLazyQuery<{ me: EUser }>(meQuery);
  const { verified } = AuthContainer.useContainer();

  useEffect(() => {
    if (data.data) setMe(data.data.me);
  }, [data]);

  useEffect(() => {
    if (verified && !me) loadMe();
  }, [verified]);

  return { me, setMe, loadMe };
});
