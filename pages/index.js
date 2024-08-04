   
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { db, storage } from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc, query, where} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AuthRoute from '../authrout'
import Layout1 from '../layout/Layout1'
import Task from '../layout/task';
import NewForm from '../layout/newform';
import EditForm from '../layout/editform';
import { useEffect, useState } from 'react';
import Cards from '../layout/cards';

export default function Home({getdata }) {
  const id = localStorage.getItem("id") 
  const[active,setactive]=useState("active0")
  const[div,setdiv]=useState()
  const[CurrentUser,setCurrentUser]=useState(getdata.users.find(x=>x.id==id))
  const[project,setproject]=useState()
  const[tasks,settasks]=useState(getdata.requisite.filter(x=>x.mention==id))
  const[NewTasks,setNewTasks]=useState(getdata.requisite.filter(x=>x.tag==id))


  



  const[etit_request,setetit_request]=useState( {id:"archplan214",title:"بدأ أعمال ",path:"arch/dfd/jhgf/012",name:"مشروع ترميم قصر إبراهيم",date:"122/05/2024",action:"0",version:"v001",notes:[{date:"02/05/2024",name:"محمد حامد",note:"مراجعة المخططات المخططات المخططات المخططات المخططات المخططاتالمخططات المخططات المخططات"},{date:"02/05/2024",name:"المقاول",note:"مراجعة المخططات"},{date:"02/05/2024",name:"عادل عثمان",note:"مراجعة المخططات"}]},
  )

  const onnew=()=> {
    setactive("active1")
    setdiv(0)
  }
  useEffect(()=>{
    if(CurrentUser.ref =="constarctor"){
    setproject(getdata.projects.find(x=>x.contuser==id))
    }
    if(CurrentUser.ref =="teamuser"){
      setproject(getdata.projects.find(x=>x.teamuser==id))
      }
     if (CurrentUser.ref=="teamuser"&& CurrentUser.access){
      settasks(getdata.requisite)
     }
      
  },[])

  console.log(NewTasks)



  return (
    <AuthRoute>
      <Layout1 >
    <div className="ccc0n">
    
      <Head>
        <title>{getdata.getinfo.name}</title>
        <meta name="description" content={getdata.getinfo.des} />
        <meta name="keywords" content={getdata.getinfo.key} />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Almarai&display=swap" rel="stylesheet"></link>
        <link rel="icon" href={getdata.getinfo.logo} type="image/x-icon" />
        <meta name="google-site-verification" content="_OtuybINzdg_u7HN4n2xCk83du_TC8CdaKcPR0p-2Bg" />
      </Head>
      <div className='rtl p-3'>
      <button type="button" className="btn btn-info text-dark m-2 font-weight-bold px-3 btn-sm" onClick={onnew}>طلب جديد <i className="fas text-light mx-2 fa-plus"></i> </button>
      </div>
      <Cards data={tasks}/>
      <div className={`nav-slide ${active} `}>
      {div==0?<NewForm setactive={setactive} user={CurrentUser} users={getdata.users} project={project} requisites={getdata.requisites} arshive={getdata.arshive}/>:<EditForm data={etit_request} setactive={setactive}/>}

      </div>
      <div className='row cards m-auto'>
        {
          tasks.map(x=>
            <div className='col-2 p-1'> <Task data={x} setactive={setactive} setdiv={setdiv} setetit_request={setetit_request}  />
        </div> 
         )
        }
           
      </div>
                 
    </div>
    </Layout1>

    </AuthRoute>
  )
}
  export async function getServerSideProps(){
    const infoRef = doc(db, "info", "info");
    const infoSnap = await getDoc(infoRef)
    const getinfo =  infoSnap.data()?infoSnap.data().info:{}
    const reqlist = collection(db, 'rquisite');
    const reqsnapshot = await getDocs(reqlist);
    const requisite = await reqsnapshot.docs?reqsnapshot.docs.map(doc => (doc.data())):[]
    const projlist = collection(db, 'projects');
    const projsnapshot = await getDocs(projlist);
    const projects =   await projsnapshot.docs?projsnapshot.docs.map(doc =>(doc.data())):[]
    const userlist = collection(db, 'user');
    const usersnapshot = await getDocs(userlist);
    const users =   await usersnapshot.docs?usersnapshot.docs.map(doc =>(doc.data())):[]
    const requisitelist = collection(db, 'requisites');
    const requisitesnapshot = await getDocs(requisitelist);
    const requisites =   await requisitesnapshot.docs?requisitesnapshot.docs.map(doc =>(doc.data())):[] 
    const arshivelist = collection(db, 'arshive');
    const arshivesnapshot = await getDocs(arshivelist);
    const arshive =   await arshivesnapshot.docs?arshivesnapshot.docs.map(doc =>(doc.data())):[] 
      
    return{
        props:{getdata:{requisite:requisite ,projects:projects,users:users,requisites:requisites,arshive:arshive,getinfo:getinfo}}
           }
  }
  

