import Head from "next/head";
import styles from '../styles/layout1.module.css'
import Image from 'next/image'
import { useAppContext } from "../AppContext";
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { db, storage } from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Link from "next/link";
import { useRouter } from 'next/router'

const Layout1 = ({children}) => {
  const[name,setname]=useState("")
  const[proj,setproj]=useState("")
  const de=[]
  var init ={}
  const [appState, setAppState] = useAppContext();
  const[cart,setcart]=useState([])
 useEffect(async()=>{
  const codelist = collection(db, 'category');
  const codesnapshot = await getDocs(codelist);
  const infoRef = doc(db, "info", "info");
  const infoSnap = await getDoc(infoRef)
  const getinfo =  infoSnap.data()?setinfo(infoSnap.data().info):{}
  const catolist = codesnapshot.docs?codesnapshot.docs.map(doc =>{ de.push(doc.data());   }):de
  setcategory(de)
  setcategory1(de)
  setcategory2(de)
  return catolist,getinfo
 },[])
 const [category1,setcategory1]=useState([]);
const [category2,setcategory2]=useState([]);
const [category,setcategory]=useState([]);
const [info,setinfo]=useState({});
const[activ,setactiv]=useState()
const[call,setcall]=useState('discall')
const[activ1,setactiv1]=useState('')
const[nav,setnav]=useState("nav-side")
const router = useRouter()
 const routering =(e)=> router.push(`Project/${e.target.value}`)

 const onnave=()=>{
   nav=="nav-side-active"?setnav("nav-side"):setnav("nav-side-active")
 }
 const onncal=()=>{
  call=="call"?setcall("discall"):setcall("call")
 }
 const logout=()=>{
  localStorage.removeItem("id");
  window.location.reload();
 }
 useEffect(async() => {
  const id = localStorage.getItem("id") 
  var docRef = doc(db, "user", id);
  const infoSnap = await getDoc(docRef)
  setname(infoSnap.data().name)
  setproj(infoSnap.data().proj)

  });
  
  return (  
< div >
<Head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css'></link>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" 
crossOrigin="anonymous"></script>
</Head>

<div className={`divlarg d-none d-lg-block   `}>
<nav className="navbar navbar-light ">
  <div className="container">

<Link className="mt-5" href={`/`}>
    <a className="navbar-brand mt-5" href="/">
      <img src={info.logo} alt="" width="300" height="70" className="d-inline-block align-text-top"/>
    </a>
    </Link>

  </div>
</nav>
<ul className={`nav justify-content-between px-5  ${styles.navdesk}`}>
<li className="nav-item  ">
  <button type="button" className="btn btn-light px-3 my-1 " onClick={logout}> تسجيل خروج<i className="fas px-2 fa-sign-out-alt text-danger "></i></button>

</li>
<li className="nav-item w-25 ">
 <div className="row w-100">
<p className=" col-5 pt-2 text-primary">{proj}</p>
<p className="pt-2 px-2 col-5 text-end">{name}</p>
<i className="fas fa-user fa-lg pt-3 px-2 text-warning col-1"></i>
<i className="far fa-bell fa-lg pt-3 col-1 text end"></i>
 </div>

</li>
 

 


 {/* <li className="nav-item ">
    <Link href="/">
    <a className="nav-link ul-text " >الرئيسية</a>
    </Link>    
  </li>   */}
</ul>
</div>
<div className="divsmal d-block d-lg-none">
<nav className="navbar navbar-light bg-white">
  <div className="container">
    <a className="navbar-brand mx-auto" href="/">
      <img src={info.logo} alt="" width="100" height="70" className="d-inline-block align-text-top"/>
    </a>
  </div>
</nav>
<nav className={`navbar navbar-expand-lg navbar-light bg-light ${styles.navmob}`}>
  <div className="container-fluid">
   {/* <Link href='/cart'>
    <a className="navbar-brand" >
         <span className="nof">{appState.length?appState.length:""}</span>
     <img src="/cart.svg" alt="" width="50" height="30" className="d-inline-block align-text-top"/>
        </a>
        </Link> */}

     <button className="btn btn-secondary btn-sm"onClick={onncal} >اتصل بنا </button>  
    <button className="navbar-toggler" type="button" onClick={onnave}>
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="  navbar-collapse " >
      <ul className={`navbar-nav ${nav} `}>
        <li className="nav-item ms-auto">
           <Link href={`/`}>
          <a className="nav-link active" aria-current="page" >الرئيسية</a>
          </Link>
        </li>
        <li className="nav-item ms-auto">
           <Link href={`/pmo`}>
          <a className="nav-link active" aria-current="page" >معالم المشروع</a>
          </Link>
        </li>
        
            

      </ul>
    </div>
  </div>
</nav>
</div>


{/* --------------------------------------------------------------------------------------------------- */}
{children}
<div className={`p-1 ${styles.footerx}`}>

<div className="row justify-content-around">
   
</div>
<h6 className="card-title text-center text-light">{`الحقوق محفوظة${info.name} © 2024`}</h6>
<h6 className="card-title text-center text-light">powered by <a  href="http://sayedkhalil.com">مركز المشاريع التراثية</a></h6>
</div>
</div>
    );
}
 

export default Layout1;
