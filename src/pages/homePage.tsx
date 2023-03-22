import { Session } from '@supabase/auth-helpers-react'
import Account from '@/pages/account'
import Admin from './admin'
import { useRouter } from 'next/router'

function callAdmin () { 
    console.log("callAdmin")
    return(
        <div className="admin">
            <h1 className='text-white' style={{color: 'white'}}>hey</h1>
            {/* <Admin/> */}
        </div>
) };



export default function HomePage({ session }: { session: Session }) {
    const router = useRouter()

    return(
        <div className="container">
            <button onClick={() => router.push('/admin')}>Account</button>
            <button onClick={() => router.push('/admin')}>Admin</button>
        </div>        
    )
}