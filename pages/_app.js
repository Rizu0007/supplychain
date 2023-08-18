import '@/styles/globals.css';


import { TrackingProvider }  from '../Context/Tracking'
import Footer from '@/Components/Footer';
import NavBar from '@/Components/NavBar';
export default function App({ Component, pageProps }) {

  return (
    <>
    <TrackingProvider>
    <NavBar/>
    <Component {...pageProps} />
    
    </TrackingProvider>
   <Footer/>

    </>
    
  );
}
