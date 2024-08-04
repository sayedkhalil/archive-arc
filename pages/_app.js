import { Suspense } from 'react/cjs/react.production.min'
import Layout1 from '../layout/Layout1'
import '../styles/globals.css'
import { AppWrapper } from "../AppContext";
import { AuthProvider } from '../AuthContext';
function MyApp({ Component, pageProps }) {
  return (
    <>
    <AuthProvider>
    <AppWrapper>
<Component {...pageProps} />
    </AppWrapper>
    </AuthProvider>
   </>
  )
}

export default MyApp
export async function getServerSideProps() {


  // Pass data to the page via props
  return { props: { data:"555" } }
}

