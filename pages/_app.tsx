// import '@/styles/globals.css'
// import type { AppProps } from 'next/app'

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

import '../styles/globals.css';
import "leaflet/dist/leaflet.css";

import { Session, SessionContextProvider, useUser } from '@supabase/auth-helpers-react'

import { AppProps } from 'next/app'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { supabase } from '../utils/supabaseClient';
import { useState } from 'react'

/*
function getServerSideProps(
  // { req }
  ) {
  // const { user } = await supabase.auth.api.getUserByCookie(req);
  const user = useUser()
  console.log('USERRRR!!', user)

  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: {} };
}
*/

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session,
}>
) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  /*
  const user = useUser()
  console.log('USERRRR!!', user)

  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  */

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}
export default MyApp