import Navbar from './Navbar'
import {useRouter} from 'next/router'

export default function Layout({ children }) {
  if (useRouter().pathname === '/login'){
  return <>{children}</>
  }
  function toLogin(){
    useRouter().push('/login')
  }
  return (
    <>
      <Navbar toLogin={toLogin}/>
      <main>{children}</main>
    </>
  )
}