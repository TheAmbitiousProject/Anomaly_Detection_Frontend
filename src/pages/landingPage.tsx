import type { NextPage } from 'next'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from './account'
import Footer from '../components/Footer'
import { height } from '@mui/system'
import HomePage from './homePage'
import { useRouter } from 'next/router'

const LandingPage: NextPage = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  
  return (
    <div className="container">
      {!session ? (
        <div className="row flex flex-row flex-center items-center w-screen h-screen">
          <div className="basis-3/5">
            <h1 className="header text-5xl text-white">Anomaly Detection</h1>
            <p className="text-center text-white">
            protecting people from all anomalies at all time..
            </p>
          </div>
          <div className="auth-widget basis-2/5">
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
          </div>
        </div>
      ) : (
        <>
          {/* <Account session={session} /> */}
          <HomePage session={session} />
        </>
      )}

      <Footer />
    </div>
  )
}

export default LandingPage