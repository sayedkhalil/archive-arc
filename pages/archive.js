import Head from "next/head";
import Image from 'next/image'
import AuthRoute from '../authrout'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { db, storage,database} from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Layout1 from "../layout/Layout1";
import Task from "../layout/task";

export const getStaticProps =async()=>{
  const archivetlist = collection(db, 'archivet');
  const archivetsnapshot = await getDocs(archivetlist);
  const archivet = await archivetsnapshot.docs?archivetsnapshot.docs.map(doc => (doc.data())):[]
  const reqlist = collection(db, 'requisite');
  const reqsnapshot = await getDocs(reqlist);
  const requisite = await reqsnapshot.docs?reqsnapshot.docs.map(doc => (doc.data())):[]
  const projlist = collection(db, 'projects');
  const projsnapshot = await getDocs(projlist);
  const projects =   await projsnapshot.docs?projsnapshot.docs.map(doc =>(doc.data())):[]
  
  return{
      props:{getdata:{archivet:archivet,requisite:JSON.stringify(requisite ),projects:projects }}
         }
}

const Archive = ({getdata}) => {  
 const[archive,setarchive]=useState(getdata.archivet[0].x)
 const[larchive,setlarchive]=useState(getdata.archivet[0].x)
 const[back,setback]=useState([])
 const id = localStorage.getItem("id") 
 const[active,setactive]=useState("active0")
 const[items,setitems]=useState([])
 const[searsh,setsearsh]=useState([])
 const[etit_request,setetit_request]=useState({} )
 const[link,setlink]=useState(getdata.projects[0].id)
 const[req,setreq]=useState(JSON.parse(getdata.requisite))
 const filt = []   

 useEffect(()=>{
 },[])

const onback=()=>{
   if(archive.find(x=>x.id==back))
   {
      setlarchive(archive)
   }else {
      archive.forEach(x=>{if(x.child){
         if(
         x.child.find(s=>s.id==back)){
         setlarchive(x.child)
         setback(x.id)
      } else{
      x.child.forEach(t => {if(t.child){
         if(t.child.find(i=>i.id==back)){
            setlarchive(t.child)
         setback(t.id)
         }
      }
         
      });
       
      }
      }
   })


   }


 }
 const onproject = (e)=>{
   setlink(e.target.value)

 }
 const get = async(w)=>{
   const archiveelist = collection(db, `archive/${w}/${s}`);
   const archiveesnapshot = await getDocs(archiveelist);
   const archivee = await archiveesnapshot.docs?archiveesnapshot.docs.map(doc => (doc.data())):[]
   setsearsh([...searsh,archivee])

 }
 const r = async(o) => {
setsearsh([])  
larchive.forEach (x=>{if(!x.child){
   get(o)
}else{
   x.child.forEach(c=>{
      if(!c.child){
         get(o)
      }else{
         c.child.forEach (v=>{
            if(!v.child){
               get(o)
            }else{
               v.child.forEach(b=>{
                  if(!b.child){
                     get(o) 
                  }
               })
            }
         })
      }
   })
}
})

}

const onlink = async(s)=>{
   const archiveelist = collection(db, `archive\/${link}\/${s}`);
   const archiveesnapshot = await getDocs(archiveelist);
   const archivee = await archiveesnapshot.docs?archiveesnapshot.docs.map(doc => (doc.data())):[]
   setsearsh(archivee)
 }
 const onsearsh = (e)=>{
  const m = searsh.filter(
   (el) => el.code.toLowerCase().includes(e.target.value.toLowerCase())||el.code.toLowerCase().includes(e.target.value.toLowerCase())
 )
 setitems(m)
 }
 const fg =(e)=>{
   e.preventDefault()

 }

return ( 
  <AuthRoute>
  <Layout1 >
  <div className="archive-c ">
        <Head>
           <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
           <title>مشروع الدعم الفني</title>
           <link rel="icon" href="" type="image/x-icon" />
           <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
           <link href="https://fonts.googleapis.com/css2?family=Almarai&display=swap" rel="stylesheet"></link>
        </Head>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" 
        crossOrigin="anonymous">
        </script>
        <div className="w-100  p-0 mx-0 bs row p-0 ">
        <form className="col-3 mt-2" onSubmit={fg}>
  <div class="input-group">
    <input type="text" class="form-control" placeholder="Search" onChange={onsearsh}/>
    <div class="input-group-btn">
      <button class="btn btn-default" type="submit">
      <i class="fas fa-search"></i>
      </button>
    </div>
  </div>
</form>
        <div className="form-group text-dark col-5 fs9 mt-3">
         <p className="w-100 text-center text-secondary p-2">{getdata.projects.find(x=>x.id==link).name}</p>
        </div>

   <div className="form-group text-dark col-3 mx-1 fs9 mt-3">
    <select className="form-control" id="exampleFormControlSelect1" onChange={onproject} required>
    <option selected disabled className="text-secondary mt-1 fs9"> اختار المشروع</option>
{
      getdata.projects.map(x=>
         <option value={x.id}className="text-secondary mt-1  fs9">{x.name}</option>

      )

}
    


    </select>
    </div>
        </div>
       
      { archive!=larchive?     
         <p className="p-1 pointer text-success h4 mt-2 w-25 text-start" onClick={onback}>   <i class="fas fa-caret-square-left fa-lg fs1 text-success   "></i> BACK  </p>
      :""
      }
      
      <div className="w-100  p-0 mx-0 bs row p-0 rtl ">
             {
                larchive.map(x=>
                    <div className=" col-2 row p-2 mx-0 mt-2 pointer " onClick={()=>{if(x.child){setback(x.id); setlarchive(x.child)}else{ onlink(x.path); setback(x.id)} }}>
                    <p className="text-center w-100  h3 bg-cards fs-3 col-12  p-2 mt-1 ">0</p>
                    <p className="text-center border-card col-10 fs9 archive-d  py-2 text-dark bg3  ">{x.name}</p>{x.child?<i className=" col-2 archive-d text-light py-3  bg3  fas fa-folder-plus fa-lg"></i>:<i className=" col-2 archive-d text-light py-3  bg3  fas fa-folder-minus fa-lg"></i>}
                    </div> 
                )
             }
           

        </div>     
        <hr/>
        <div className="w-100 h-100 p-0 mx-0 bs filedev row p-0 rtl mt-2  ">
             {
                searsh.map(x=>
                    <a href={x.file}className=" col-1 row bg-light row p-2 filt mx-0 mt-2 pointer ">
                     <i class="fas fa-file-pdf col-12 text-center fa-lg "></i>
                     <p className="text-center col-12  p-21 mt-1 ">{x.code}</p>
                    </a>
                )
             }
           

        </div>    
  
</div>
</Layout1>
</AuthRoute>
     );
}
 
export default Archive;