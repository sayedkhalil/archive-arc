import Head from "next/head";
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { db, storage,database} from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AuthRoute from "../authrout";
import Layout1 from "../layout/Layout1";
import Contractor from "../layout/contractor";
import Manger from "../layout/manger";
import Conteng from "../layout/conteng";
import Teamuser from "../layout/teamuser";
import Project from "../layout/project";
import Requisite from "../layout/requisite";
import Tecproject from "../layout/tecproject";
import Help from "../layout/help";
import Tasks from "../layout/tasks";
export const getStaticProps =async()=>{
  const contlist = collection(db, 'contractors');
  const contsnapshot = await getDocs(contlist);
  const contractors = await contsnapshot.docs?contsnapshot.docs.map(doc => (doc.data())):[]
  const projlist = collection(db, 'projects');
  const projsnapshot = await getDocs(projlist);
  const projects =   await projsnapshot.docs?projsnapshot.docs.map(doc =>(doc.data())):[]
  const userlist = collection(db, 'user');
  const usersnapshot = await getDocs(userlist);
  const users =   await usersnapshot.docs?usersnapshot.docs.map(doc =>(doc.data())):[]
  const requisitelist = collection(db, 'requisites');
  const requisitesnapshot = await getDocs(requisitelist);
  const requisites =   await requisitesnapshot.docs?requisitesnapshot.docs.map(doc =>(doc.data())):[] 
  const tecprojectlist = collection(db, 'tecprojects');
  const tecprojectsnapshot = await getDocs(tecprojectlist);
  const tecprojects =   await tecprojectsnapshot.docs?tecprojectsnapshot.docs.map(doc =>(doc.data())):[] 
    
  return{
      props:{getdata:{contracors:contractors ,projects:projects,users:users,requisites:requisites,tecprojects:tecprojects}}
         }
}

const Admin = ({getdata}) => {  
  var  acti =["bg3","bg3","bg3","bg3","bg3","bg3","bg3","bg3","bg3"]
  const clas =["","bg3","bg3","bg3","bg3","bg3","bg3","bg3","bg3"]
  const[tag,settag]=useState(0)
  const[bg,setbg]=useState(clas)
  const ontaj=()=>{
    switch (tag) {
        case 0:{return(<Contractor data={getdata.contracors} projects={getdata.projects} />)}        
        break;
        case 1:{return(<Project   data={getdata.projects} users={getdata.users} contracors={getdata.contracors}/>)}        
        break;
        case 2:{return(<Teamuser  data={getdata.users} projects={getdata.projects}/>)}        
        break;
        case 3:{return(<Conteng data={getdata.users} projects={getdata.projects} contracors={getdata.contracors}/>)}        
        break;
        case 4:{return(<Manger data={getdata.users} projects={getdata.projects}/>)}        
        break;
        case 5:{return(<Requisite data={getdata.requisites} />)}        
        break;
        case 6:{return(<Help />)}        
        break;
        case 7:{return(<Tasks />)}        
        break;
        case 8:{return(<Tecproject data={getdata.requisites} projects={getdata.projects}/>)}        
        break;
      default:
        break;
    }
  }
 const onselect =(x)=>{
    settag(x)
    const cla = acti
    cla[x]=""
    setbg(cla)
 }
 
return ( 
  <AuthRoute>
  <Layout1 >
  <div className="w-100">
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
  <div className="row bs m-auto   cards">
    <div className="col-10 container-admin  m-0 bs p-0 ">
        {
          ontaj()
        }
    </div>
      <div className="col-2  p-2 admin-bt bs m-0 row">
      <div className=" mt-1 bg-secondary text-light p-2 ">
        لوحـــة التحـــكم
      </div>
      <div className={` pointer ${bg[0]}  p-2 mt-1  mx-0 bs row`} onClick={()=>onselect(0)}>
      <i className="fas fa-warehouse text-start col-1 p-1"></i>
      <p className="  text-end  col-11">
         شركات المقاولات
      </p>
      </div>
      <div className={` pointer ${bg[1]}  p-2 mt-1  mx-0 bs row`} onClick={()=>onselect(1)}>
      <i className="fas fa-archway text-start col-1 p-1"></i>
      <p className="  text-end  col-11">
         المشاريع  
      </p>
      </div>
      <div className={` pointer ${bg[2]}  p-2 mt-1  mx-0 bs row`} onClick={()=>onselect(2)}>
      <i className=" far fa-user text-start col-1 p-1"></i>
      <p className="  text-end  col-11">
         مهندسين الدعم الفني   
      </p>
      </div>
      <div className={` pointer ${bg[3]}  p-2 mt-1  mx-0 bs row`} onClick={()=>onselect(3)}>
      <i className="far fa-user text-start col-1 p-1"></i>
      <p className="  text-end  col-11">
         مهندسين المقاول   
      </p>
      
      </div>
      <div className={` pointer ${bg[4]}  p-2 mt-1  mx-0 bs row`} onClick={()=>onselect(4)}>
      <i className=" far fa-user text-start col-1 p-1"></i>
      <p className="  text-end  col-11">
         مدراء المشاريع    
      </p>
      </div>
      <div className={` pointer ${bg[5]}  p-2 mt-1  mx-0 bs row`} onClick={()=>onselect(5)}>
      <i className="fas fa-file-alt text-start col-1 p-1"></i>
      <p className="  text-end  col-11">
        الطلبات   
      </p>
      </div>
      <div className={` pointer ${bg[6]}  p-2 mt-1  mx-0 bs row`} onClick={()=>onselect(6)}>
      <i className="fas fa-info text-start col-1 p-1"></i>
      <p className="  text-end  col-11">
        التعليمات       
      </p>
      </div>
      <div className={` pointer ${bg[7]}  p-2 mt-1  mx-0 bs row`} onClick={()=>onselect(7)}>
      <i className="fas fa-file-alt text-start col-1 p-1"></i>
      <p className="  text-end  col-11">
      الطلبات الدورية    
      </p>
      </div>
      <div className={` pointer ${bg[8]}  p-2 mt-1  mx-0 bs row`} onClick={()=>onselect(8)}>
      <i className="fas fa-chart-bar text-start col-1 p-1"></i>
      <p className="  text-end  col-11">
      بيانات المشاريع الفنية    
      </p>
      </div>

    </div>  
  </div>  
  
</div>
</Layout1>
</AuthRoute>
     );
}
 
export default Admin;