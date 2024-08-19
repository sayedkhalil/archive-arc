import Head from "next/head";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from "react";
import Image from 'next/image'
import { useAppContext } from "../AppContext";
import { useRouter } from "next/router";
import { db, storage } from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import toast, { Toaster } from 'react-hot-toast';
import { version } from "react/cjs/react.production.min";

const EditForm = (props) => {
// backgroun task title
const[task_bg,settask_bg]=useState("bg0")
const [active ,setactive]=useState(0)
const[task,settask]=useState(props.data)
const[note,setnote]=useState({})
const[teamuser,setteamuser]=useState(props.users.filter(x=>x.jop!= "مهندس موقع"&&x.ref=="teamuser"))
const[vis,setvis]=useState("unvisform")
const[loading,setloading]=useState("0")
const[init,setinit]=useState("")
const[user,setuser]=useState(props.users.find(x=>x.id == props.user.id))

 const[progress,setprogress]=useState(0)
 const[code,setcode]=useState(props.data.notes)
 const v = 0

  // --------------------------------------------------------------------- chose comment-----------------------------------

  const onnots =(e)=>{    
    setnote({...note,name:props.user.name,note:e.target.value,date:new Date().toDateString()})  

    }
    // ----------------------------------------------------------------------onarch-------------------------------
    const onarch =async()=>{
      if(props.user.jop=="موؤرشف"){
        const docRef = await setDoc(doc(db, "requisite", props.data.code),{...props.data,archivet:"1"});
        const Ref = await setDoc(doc(db, `archive\/${props.data.projectId}\/${props.data.path}`, props.data.code),{title:props.data.title,file:props.data.file,id: props.data.code,date:new Date().toDateString()});
        props.setactive("active0")
      }else if (props.user.ref =="constarctor"){
        const docRef = await setDoc(doc(db, "requisite", props.data.code),{...props.data,archivec:"1",mention:""});
        props.setactive("active0")
      }
    }
    // ----------------------------------------------------------------------aprove-------------------------------
    const onaprove =(e)=>{
      switch (e.target.value) {
        case "aprove-a":{
          if(props.user.jop=="مهندس موقع"){
            settask({...task,aprove:e.target.value,mention:props.users.find(x=>x.name==props.data.init).id,action:"3",tags:[...task.tags,props.user.id]})
            


          }else{
            settask({...task,aprove:e.target.value,mention:props.projects.find(x=>x.id==props.data.projectId).teamuser,tags:[...task.tags,props.user.id]})
            


          }
        }        
        break;
      case "aprove-b":{
        if(props.user.jop=="مهندس موقع"){
          settask({...task,aprove:e.target.value,mention:props.users.find(x=>x.name==props.data.init).id,action:"3",tags:[...task.tags,props.user.id]})
          

          
        }else{
          settask({...task,aprove:e.target.value,mention:props.projects.find(x=>x.id==props.data.projectId).teamuser,tags:[...task.tags,props.user.id]})
          

        }
      }        
      break;
    case "aprove-c":{
      if(props.user.jop=="مهندس موقع"){
        settask({...task,aprove:e.target.value,mention:props.users.find(x=>x.name==props.data.init).id,action:"2",tags:[...task.tags,props.user.id]})
        
        
      }else{
        settask({...task,aprove:e.target.value,mention:props.projects.find(x=>x.id==props.data.projectId).teamuser,tags:[...task.tags,props.user.id]})
        
      }
    }        
    break;
    case "aprove-d":{
      if(props.user.jop=="مهندس موقع"){
        settask({...task,aprove:e.target.value,mention:props.users.find(x=>x.name==props.data.init).id,action:"5",tags:[...task.tags,props.user.id]})
        
        
      }else{
        settask({...task,aprove:e.target.value,mention:props.projects.find(x=>x.id==props.data.projectId).teamuser,tags:[...task.tags,props.user.id]})
        
      }
    }        
    break;
    case "send":{
      if(props.user.jop=="مهندس موقع"){
       
        settask({...task,mention:props.users.find(x=>x.jop=="منسق").id,action:"1",tags:[props.data.tags,props.user.id]})
        
        
      }else{
        settask({...task,tags:[task.tags,props.user.id],action:"1"})
        
        setactive(1)
      }
    }        
    break;
      default:
        break;
    }
    }
    // --------------------------------------------------------------------resend---------------------------------
   const onresend =(e)=>{
    settask({...task,mention:e.target.value})
   }
  // --------------------------------------------------------------------- file-----------------------------------
  const onfile  = (e) =>
    {    
        const fileopn = e.target.files[0];
        if(fileopn){    
        const storage = getStorage();
        const storageRef = ref(storage, fileopn.name);
        const uploadTask = uploadBytesResumable(storageRef, fileopn);
        uploadTask.on('state_changed', 
        (snapshot) => {
          const progre = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setprogress(progre)
        }, 
        (error) => {
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setprogress(0);
            setnote({...note,file:downloadURL})
            settask({...task,file:downloadURL,notes:[note]})
            });
                    }
                  );
                  };}

                   
  // ---------------------------------------------------------------------send-----------------------------------

  const onsend=async(e)=>{
    e.preventDefault()
    setloading("1")
    if (props.user.ref =="constarctor"){

    const docRef = await setDoc(doc(db, "requisite", task.code),{...task,mention:props.project.teamuser,version:`v0${v+1}`,action:"2",notes:[...task.notes,note]});

    }else{

    const docRef = await setDoc(doc(db, "requisite", task.code),{...task,notes:[...task.notes,note]});
    

    }
    const email =props.users.find(x=>x.id==task.mention)
    const rres ={note:note,emailTo:email.email,name:props.users.find(x=>x.id==task.mention).name,title:task.title,code:task.code,email:props.user.email}
    try {
      // Send a POST request to the API route with the todo item
      const response = await fetch('/api/rout', {
        method: 'POST',
        body:JSON.stringify(rres),
        headers: {
          'Content-Type': 'application/json',
        }
        
      });if (response.ok) {
        setloading("0")
        toast('تم الارسال بنجاح',{
          duration: 5000,
          position: 'top-center',     
         
          icon: '👏',
        
          iconTheme: {
            primary: '#000',
            secondary: '#fff',
          },
      
        });
        props.setactive("active0")
        setnote({note:""})
        settask({})

            } else {
              setloading("0")
              toast('لم يتم الارسال',{
                duration: 5000,
                position: 'top-center',     
               
                icon: '❌',
              
                iconTheme: {
                  primary: '#000',
                  secondary: '#fff',
                },
            
              });   }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  // ----------------------------------------------------------------------------------------------------------------------------------
// backgroun task title
const[data,setdata]=useState({})
const[contractor,setcontractor]=useState("")
const d= "0"
const ss=props.data.notes
    //  set backgroun task title 
useEffect(() => {
    if(props.data.action =="0")
        {
         settask_bg("bg0")
        } 
        else if (props.data.action =="1")
        {
         settask_bg("bg1")
         } 
         else if (props.data.action =="2") 
         {
         settask_bg("bg4")
         }
         else if (props.data.action =="3") 
         {
         settask_bg("bg3")
         } 
         else
         {
         settask_bg("bg2")
         } 
      setinit( props.data.init?props.users.find(x=>x.name == props.data.init).id:"")  
      setcontractor( props.data.init?props.users.find(x=>x.name == props.data.init).contractor:"")

    },[props.data]);
    const onnoactive=()=>{
      props.setactive("active0")
      setvis("unvisform")
      setnote({note:""})

    }  
    const onvis =()=>{
      setvis("visform");
      settask(props.data);
    }
    const onalarm = async()=>{
      const email =props.users.find(x=>x.id==props.data.mention)

      const rres ={note:"تابع المنصة لاتخاذ اجراء على الطلبات المتعلقة",emailTo:email.email,name:email.name,title:props.data.title,code:props.data.code,email:user.email}
      try {
        // Send a POST request to the API route with the todo item
        const response = await fetch('/api/rout', {
          method: 'POST',
          body:JSON.stringify(rres),
          headers: {
            'Content-Type': 'application/json',
          }
          
        });if (response.ok) {
          setloading("0")
          toast('تم الارسال بنجاح',{
            duration: 5000,
            position: 'top-center',     
           
            icon: '👏',
          
            iconTheme: {
              primary: '#000',
              secondary: '#fff',
            },
        
          });
  
  
              } else {
                setloading("0")
                toast('لم يتم الارسال',{
                  duration: 5000,
                  position: 'top-center',     
                 
                  icon: '❌',
                
                  iconTheme: {
                    primary: '#000',
                    secondary: '#fff',
                  },
              
                });   }
      } catch (error) {
        setloading("0")
        toast('لم يتم الارسال',{
          duration: 5000,
          position: 'top-center',     
         
          icon: '❌',
        
          iconTheme: {
            primary: '#000',
            secondary: '#fff',
          },
      
        }); 
      }
    }

    // ----------------------------------------------------------

    return (  
        <div className=" new-form w-100 editform">
        <Head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>

        </Head>


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" 
crossOrigin="anonymous">
</script>
<div className=" w-100 h-100 m-0 bs row">
<div className={`col-12 py-2 px-2 task-title ${task_bg} row`}>
     <p className="col-8  text-light">{props.data.code}</p>
     <p className="col-2  bg-light bs h-100 text-center text-dark rounded m-0">{props.data.version}</p>
     <i className="fas col-2 text-end text-light fa-arrow-circle-left fa-lg pointer"  onClick={onnoactive}></i>
  </div>
  <Toaster />

  <div className={`col-12 p-2 text-info text-center  border-bottom task-name `}>
{props.data.name}
</div>

<div className="newform-1 row bs mx-auto mt-4 p-5">
<i className="fas mt-3 text-end  fa-user fa-lg   col-1"></i>
  <div className="col-6">
    <p className=" col-12 text-info ">{props.data.init}</p>
    <p className="  col-12 text-secondary ">{contractor?props.contractors.find(x=>x.id==contractor).name:""}</p>
  </div>
  <div className="col-5">
    <p className="  col-12 text-light bg-info text-center ">{props.data.date}</p>
  </div>
  <div className="col-12 border-bottom bs  m-0 p-2 row">
    <p className=" col-6 text-dark fs9 text-end">{props.data.project}</p>
    <p className="  col-6 text-secondary text-end fs8 ">المشروع<i className="far mx-2 text-info fa-file-alt"></i></p>
  </div>
  <div className="col-12 border-bottom bs  m-0 p-2 row">
    <p className=" col-6 text-dark fs9 text-end">{props.data.title}</p>
    <p className="  col-6 text-secondary text-end fs8 ">منطوق الطلب<i className="far mx-2 text-info fa-file-alt"></i></p>
  </div>
  <div className="col-12 border-bottom bs  m-0 p-2 row">
    <p className=" col-6 text-dark fs9 text-end">{props.data.code}</p>
    <p className="  col-6 text-secondary text-end fs8 "> رقم الطلب<i className="fas mx-2 text-info fa-code-branch"></i></p>
  </div>
  <div className="col-12 border-bottom bs  m-0  p-2 row">
    <a className=" col-6 text-dark fs9 text-end" href={props.data.file}><i className="fas fa-paperclip"></i></a>
    <p className="  col-6 text-secondary text-end fs8 "> المرفقات<i className="fab  mx-2 text-info fa-cloudscale"></i></p>
  </div>
</div>  
<div className={`w-100 px-4 my-3 text-dark text-end mx-0 bs   `}>
مسار الطلب
</div>

<div className={`col-12 p-2 text-info text-start rtl p-1  `}>
    <div className=" w-100 row high  p-1 rounded">
    <div className="time-linee">

</div>
    {   
      ss?
    ss.map(x=>
        <div className=" w-100 bs  row ml-5  mx-auto my-4 border-bottom  ">
        <div className="rounded-circle bg-wight z-ind p-2 text-center  col-1">
        <i className="fas  fa-user fa-lg "></i>
        </div>
        <p className=" ps-3 col-4 fs9 text-primary ">{x.name}</p>
        <p className=" p-1 col-3 text-secondary text-start ">    
        {x.date}
        </p>
        <p className=" p-1 col-4 text-secondary text-end ">    
        
        </p>
        <p className=" py-2 me-5 col-12 fs8 text-end text-secondary ">   
            {x.note}
        </p>
        <div className="w-75  bs rtl  m-0   row">
        <a className=" w-100 text-secondary py-3 fs9 text-start" href={x.file}>المرفقات <i className="fas text-info fa-paperclip"> </i></a>
        </div>
        </div>
                    ):[]
       }
       {
         user.id==props.data.mention&&props.data.aprove!="aprove-a"&&props.data.aprove!="aprove-b"?
        <div className=" w-100 bs  row ml-5  mx-auto my-4 border-bottom  ">
        <div className="rounded-circle bg-wight z-ind p-2 text-center   col-1">
        <i className="fas  fa-user fa-lg text-danger"></i>
        </div>
        <p className=" ps-3 col-4 fs9 text-danger ">{props.data.mention?props.users.find(x=>x.id==props.data.mention).name:""}</p>
       {user.access=="4"||user.access=="5"||user.id==init?
        <p className=" p-1 col-3 text-secondary text-start ">    
        <a className="mt-2" target="blank" href={`https://wa.me/${props.data.mention?props.users.find(x=>x.id==props.data.mention).mobile:""}`}><i class="fab fa-whatsapp"></i></a>
        <i onClick={onalarm} class="fas mx-2 pointer fa-bell"></i>
        </p>:""}
        <p className=" py-2 me-5 col-12 fs8 text-end text-secondary ">   
        "في انتظــــــــار  اتخاذ إجراء"

        </p>
  
        </div>
        :
        ""
       }
    </div>
    <div  className="w-75">
      { user.id==props.data.mention&&props.data.aprove!="aprove-a"&&props.data.aprove!="aprove-b"?
        <button type="button" className="btn btn-info m-4 px-3 text-light rtl  btn-sm"onClick={onvis}
        >إتخاذ إجراء</button>:""
    }
   
       {
       props.data.aprove=="aprove-a"?
       <p type="p" className="btn btn-success m-4 px-3 text-light rtl  btn-sm"
        >تم الاعتماد كود -A </p>:""
    }
    {
     props.data.aprove=="aprove-b"?
       <p type="p" className="btn btn-waring m-4 px-3 text-light rtl  btn-sm"
        >تم الاعتماد بملاحظات- B</p>:""
    }
    {
     props.data.aprove=="aprove-d"?
       <p type="p" className="btn btn-waring m-4 px-3 text-light rtl  btn-sm"
        >مرفوض ولا يعاد تقديمه</p>:""
    }
    {
     props.user.ref =="constarctor"||props.user.jop=="موؤرشف"?
     <button type="button" className="btn btn-info m-4 px-3 text-light rtl  btn-sm"onClick={onarch}
     > أرشفــــة</button>:""
     
    }
  
    </div>
    <div className={`newform-1 bs mx-auto mt-4 ${vis}  p-5`}>
  <form  onSubmit={onsend}>
      <div className={`col-12 text-dark text-center   `}>
             تفاصيل الطلب  
      </div>
    
 
    <div className="form-group mt-3">
    <label htmlFor="exampleFormControlTextarea1 text secondary h6">اكتب ملاحظات</label>
    <textarea className="form-control mt-2" id="exampleFormControlTextarea1" rows="3" onChange={onnots} value={note.note} required></textarea>
  </div>
  <div className=" my-3 w-100 ms-auto p-4 newform-input required">
<div className="input-group">
  <div className="custom-file w-100">
    <input type="file" className="custom-file-input" id="inputGroupFile04" onChange={onfile}/>
    <label className="custom-file-label" htmlFor="inputGroupFile04">ارفاق الملفات</label>
   
  </div>
</div>   <div className="progress my-3 mx-auto w-75">
<div className="progress-bar" role="progressbar" style={{width:` ${progress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress}</div>
  </div>
  <div className="w-100 mt-3 p-2 text-end note-newform text-danger text-secondary">
      <p>  <i className="fas fa-info text-dark mx-2"></i>
      لابد من إرفاق الطلب مع المرفقات في ملف بي دي  اف واحد</p>
      <a href="https://www.ilovepdf.com/ar" target="blank"> <i className="fas fa-info text-dark mx-2"></i> استخدم هذا الموقع في الدمج<i className="fas text-info mx-2 fa-link"></i></a>
    </div>
   </div>
   {props.user.ref!="constarctor"?
   <div className="form-group mt-3">
   <div className="form-group text-dark fs9 mt-3">
    <label htmlFor="exampleFormControlSelect1 "className="text-info m-1">الاجراء</label>
    <select className="form-control" id="exampleFormControlSelect1" onChange={onaprove} required>
    <option selected disabled className="text-secondary mt-1 fs9">اختر الاجراء</option>
    <option value="aprove-a" className="text-secondary mt-1  fs9">اعتماد - A -</option>
    <option value="aprove-b" className="text-secondary mt-1  fs9">اعتماد - B -</option>
    <option value="aprove-c" className="text-secondary mt-1  fs9">إعادة تقديم - C -</option>
    <option value="aprove-b" className="text-secondary mt-1  fs9">مرفوض ولا يعاد تقديمه - B -</option>
    <option value="send" className="text-secondary mt-1  fs9">توجيـــــــه</option>
    


    </select>
    </div>
  {
active==1?

<div className="form-group text-dark mt-3">
  <label htmlFor="exampleFormControlSelect1 "className="text-info m-1">المرسل له</label>
  <select className="form-control" id="exampleFormControlSelect1" required onChange={onresend}>
  <option selected disabled className="text-secondary mt-1 fs9">اختار الموظف</option>
 {teamuser.map(x=>
 <option value={x.id} className="text-secondary mt-1  fs9">{x.name}{props.requisites.filter(x=>x.mention==x.id).length}</option>
 )} 
  </select>
  </div>

  :""
}
</div>:""}
    <div className="rtl mt-2 p-3">
   <button type="button" className="btn bttn btn-secondary px-3 btn-sm"  onClick={onnoactive}>إلغاء</button>
   {loading=="0"? <input className=" btn px-3 mx-3 bttn btn-sm btn-info"  type="submit" value="إرسال" />:
         <button className=" btn px-3 mx-3 bttn btn-sm btn-info" >
         <div class="spinner-border h-100 text-light" role="status">
         <span class="sr-only">Loading...</span>
         </div>
         </button>
      }   
   </div>
</form>
</div>
</div>
</div> 
</div>
    );
}
 
export default EditForm;