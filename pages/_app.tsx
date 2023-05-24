// import '@/styles/globals.css'
// import type { AppProps } from 'next/app'

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

import '../styles/globals.css';
import "leaflet/dist/leaflet.css";

import { Session, SessionContextProvider, useUser } from '@supabase/auth-helpers-react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProps } from 'next/app'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { supabase } from '../utils/supabaseClient';
import { useState } from 'react'

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session,
}>
) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
        <ToastContainer />
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}
export default MyApp