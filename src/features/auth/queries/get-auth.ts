'use server';

import { cache } from 'react';
import { validateSession } from '../utils/session';

export const getAuth = cache(async () => {
  return await validateSession();
});
