import { Session } from '@supabase/auth-helpers-react'
import Account from '@/components/Account'
import Admin from './admin_dashboard/admin'

function callAdmin () { 
    console.log("callAdmin")
    return(
        <div className="admin">
            <h1 className='text-white' style={{color: 'white'}}>hey</h1>
            <Admin/>
        </div>
) };

export default function HomePage({ session }: { session: Session }) {
    
    return(
        <div className="container">
            <button onClick={() => Account({session})}>Account</button>
            <button onClick={() => callAdmin()}>Admin</button>
        </div>        
    )
}