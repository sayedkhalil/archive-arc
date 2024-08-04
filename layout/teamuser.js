import Head from "next/head";
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { db, storage } from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AuthRoute from "../authrout";
import Layout1 from "../layout/Layout1";


const Teamuser = (props) => {
  const [teamusers,setteamusers]=useState(props.data.filter(x=>x.ref=="teamuser"))
  const [teamuser,setteamuser]=useState(props.data[0])
  const [project,setproject]=useState(props.projects.filter(x=>x.contactor==teamuser.id))
  const[teamuseritem,setteamuseritem]=useState({})
  const[progress,setprogress]=useState(0)
  const[active,setactive]=useState(0)
  const onname = (e) =>   {setteamuseritem({...teamuseritem,name:e.target.value,ref:"teamuser"});setteamuser({...teamuser,name:e.target.value})}
const onid = (e) =>     {setteamuseritem({...teamuseritem,id:e.target.value});setteamuser({...teamuser,id:e.target.value})}
const onmobile = (e) => {setteamuseritem({...teamuseritem,mobile:e.target.value});setteamuser({...teamuser,mobile:e.target.value})}
const oncase = (e) => { setteamuseritem({...teamuseritem,case:e.target.value});setteamuser({...teamuser,case:e.target.value})}
const oncer = (e) => { setteamuseritem({...teamuseritem,cer:e.target.value});setteamuser({...teamuser,cer:e.target.value})}
const onjop = (e) => { setteamuseritem({...teamuseritem,jop:e.target.value});setteamuser({...teamuser,jop:e.target.value})}
const ondate = (e) => { setteamuseritem({...teamuseritem,date:e.target.value});setteamuser({...teamuser,date:e.target.value})}
const onaccess = (e) => { setteamuseritem({...teamuseritem,access:e.target.value});setteamuser({...teamuser,access:e.target.value})}



const onemail = (e) =>  { setteamuseritem({...teamuseritem,email:e.target.value});setteamuser({...teamuser,email:e.target.value})}
const onimg  = (e) =>
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
                                console.log(downloadURL)
                                setteamuseritem({...teamuseritem,avtar:downloadURL})
                                setteamuser({...teamuser,avtar:downloadURL})
                                });
                                        }
                                      );
                                      };}
  const addteamuser=async(e)=>{
    e.preventDefault()
    setteamuseritem({...teamuseritem,ref:"teamuser"})
   if(active==1){setteamusers([...teamusers,teamuseritem]) }
  const docRef = await setDoc(doc(db, "user", teamuseritem.id),teamuseritem);
  setteamuseritem({name:"",id:"",case:"",avtar:"",mobile:"",email:"",access:"",jop:"",cer:"",date:""})
  
}
// ---------------------------------------------------------------add & edie function --------------------------------------------------------------------
const form =()=>{
  switch(active){
    case 1:{ 
      return(
        <div className="newform-1 bs mx-0 bs fs-form rtl p-1 w-100">
        <form onSubmit={addteamuser}  >
            <div className={`col-12 fs-5 text-dark text-center   `}>
              تفاصيل المستخدم 
            </div>
            <div className="form-group  text-info">
             <label  htmlFor="formGroupExampleInput">اسم المهندس</label>
             <input type="text" className="mt-1 fs-form form-control" id="formGroupExampleInput" placeholder="اسم المهندس" required onChange={onname} value={teamuseritem.name}/>
           </div>
           <div className="form-group text-info mt-1">
             <label htmlFor="formGroupExampleInput">uid</label>
             <input type="text" className="mt-1 fs-form  form-control" id="formGroupExampleInput" placeholder="uid" required onChange={onid} value={teamuseritem.id}/>
           </div>
           <div className="form-group text-info mt-1">
             <label htmlFor="formGroupExampleInput">رقم التليفون</label>
             <input type="tel" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="رقم التليفون" required onChange={onmobile}  value={teamuseritem.mobile}/>
           </div>
           <div className="form-group text-info mt-1">
             <label htmlFor="formGroupExampleInput">البريد الإلكتروني</label>
             <input type="email" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="لبريد الإلكتروني"required onChange={onemail}  value={teamuseritem.email}/>
           </div>
           <div className="form-group rtl  mt-1 w-50">
            <label htmlFor="exampleFormControlSelect1 "className="text-info">الوظيفة</label>
           <select className="form-control fs8" id="exampleFormControlSelect1" onChange={onjop} value={teamuseritem.jop} >
           <option selected disabled       >اختار الوظيفة</option>
          <option value={"مدير المشروع"}  >مدير مشروع </option>
          <option value={"معماري"}         >معماري</option>
          <option value={"إنشائي"}         >إنشائي</option>
          <option value={"مهندس كهرباء"}   >مهندس كهرباء</option>
          <option value={"مهندس ميكانيكا"}>مهندس ميكانيكا </option>
          <option value={"حاسب كميات"}     >حاسب كميات</option>
          <option value={"مخطط زمني"}      >مخطط زمني</option>
          <option value={"مصمم جرافيك"}    >مصمم جرافيك</option>
          <option value={"منسق"}            >منسق</option>
          <option value={"موؤرشف"}          >مؤرشف</option>
          <option value={"إداري"}           >إداري</option>
          <option value={"مهندس موقع"}          >مهندس موقع</option>
          <option value={"مراقب"}          >مراقب</option>
          </select>
      </div>
           <div className="form-group text-info mt-1">
             <label htmlFor="formGroupExampleInput">تاريخ المباشرة</label>
             <input type="date" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="الوظيفة"required onChange={ondate}  value={teamuseritem.date}/>
           </div>
           <div className="form-group text-info mt-1">
             <label htmlFor="formGroupExampleInput">المؤهل</label>
             <input type="text" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="المؤهل"required onChange={oncer}  value={teamuseritem.cer}/>
           </div>
            <div className=" my-3 w-100 ms-auto p-4 newform-input required">
           <div className="input-group">
           <div className="custom-file w-100">
          <input type="file" className="custom-file-input" id="inputGroupFile04" onChange={onimg} value={teamuseritem.img}/>
          <label className="custom-file-label text-info" htmlFor="inputGroupFile04">ارفاق صورة شخصية</label>   
        </div>
      </div>   <div className="progress my-3 mx-auto w-75">
      <div className="progress-bar" role="progressbar" style={{width:` ${progress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress}</div>
      </div>
         </div>
         <div className="form-group rtl  mt-1 w-50">
            <label htmlFor="exampleFormControlSelect1 " className="text-info">اختار حالة الحساب</label>
           <select className="form-control fs8" id="exampleFormControlSelect1" onChange={oncase} value={teamuseritem.case} required >
           <option selected disabled>اختار حالة الحساب</option>
          <option value={"1"}>مستخدم نشط</option>
          <option value={"2"}>مستخدم توقف</option>
          <option value={"3"}>حذف المستخدم</option>
          </select>
        </div>
          <div className="rtl mt-2 p-3">
          <input className=" btn px-3 mx-3 bttn btn-sm btn-info" onSubmit={addteamuser}  type="submit" value="إرسال" />
         <button type="button" className="btn bttn btn-secondary px-3 btn-sm" onClick={()=>{setactive(0);setteamuser({})}}>إلغاء</button>
         </div>
      </form>
      </div>
      )
    }
    break;
    case 2 :{ return (
      <div className="newform-1 bs mx-0 bs fs-form rtl p-1 w-100">
      <form onSubmit={addteamuser}  >
          <div className={`col-12 fs-5 text-dark text-center   `}>
            تفاصيل المستخدم 
          </div>
         <div className="form-group text-info mt-1">
           <label htmlFor="formGroupExampleInput">رقم التليفون</label>
           <input type="tel" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="رقم التليفون"  onChange={onmobile}  value={teamuseritem.mobile}/>
         </div>
         <div className="form-group text-info mt-1">
           <label htmlFor="formGroupExampleInput">البريد الإلكتروني</label>
           <input type="email" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="لبريد الإلكتروني" onChange={onemail}  value={teamuseritem.email}/>
         </div> 
         <div className="form-group text-info mt-1">
           <label htmlFor="formGroupExampleInput">البريد الإلكتروني</label>
           <input type="email" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="لبريد الإلكتروني" onChange={onemail}  value={teamuseritem.email}/>
           <div className="form-group rtl  mt-1 w-50">
            <label htmlFor="exampleFormControlSelect1 "className="text-info">الوظيفة</label>
           <select className="form-control fs8" id="exampleFormControlSelect1" onChange={onjop} value={teamuseritem.jop} >
           <option selected disabled       >اختار الوظيفة</option>
          <option value={"مدير المشروع"}  >مدير مشروع </option>
          <option value={"معماري"}         >معماري</option>
          <option value={"إنشائي"}         >إنشائي</option>
          <option value={"مهندس كهرباء"}   >مهندس كهرباء</option>
          <option value={"مهندس ميكانيكا"}>مهندس ميكانيكا </option>
          <option value={"حاسب كميات"}     >حاسب كميات</option>
          <option value={"مخطط زمني"}      >مخطط زمني</option>
          <option value={"مصمم جرافيك"}    >مصمم جرافيك</option>
          <option value={"منسق"}            >منسق</option>
          <option value={"موؤرشف"}          >مؤرشف</option>
          <option value={"إداري"}           >إداري</option>
          <option value={"معماري"}          >معماري</option>
          <option value={"مهندس موقع"}          >مهندس موقع</option>
          <option value={"مراقب"}          >مراقب</option>
          </select>
      </div>
      </div>

           <div className="form-group text-info mt-1">
             <label htmlFor="formGroupExampleInput">تاريخ المباشرة</label>
             <input type="date" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="الوظيفة" onChange={ondate}  value={teamuseritem.date}/>
           </div>
           <div className="form-group text-info mt-1">
             <label htmlFor="formGroupExampleInput">المؤهل</label>
             <input type="text" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="المؤهل" onChange={oncer}  value={teamuseritem.cer}/>
           </div>
         <div className=" my-3 w-100 ms-auto p-4 newform-input ">
         <div className="input-group">
         <div className="custom-file w-100">
        <input type="file" className="custom-file-input" id="inputGroupFile04" onChange={onimg} value={teamuseritem.img}/>
        <label className="custom-file-label text-info" htmlFor="inputGroupFile04">ارفاق صورة شخصية</label>   
      </div>
    </div>   <div className="progress my-3 mx-auto w-75">
    <div className="progress-bar" role="progressbar" style={{width:` ${progress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress}</div>
    </div>
       </div>
       <div className="form-group rtl  mt-1 w-50">
            <label htmlFor="exampleFormControlSelect1 "className="text-info">اختار حالة الحساب</label>
           <select className="form-control fs8" id="exampleFormControlSelect1" onChange={oncase} value={teamuseritem.case} >
           <option selected disabled>اختار حالة الحساب</option>
          <option value={"1"}>مستخدم نشط</option>
          <option value={"2"}>مستخدم توقف</option>
          <option value={"3"}>حذف المستخدم</option>
          </select>
      </div>
      <div className="form-group rtl  mt-1 w-50">
            <label htmlFor="exampleFormControlSelect1 "className="text-info">اختار الصلاحيات</label>
           <select className="form-control fs8" id="exampleFormControlSelect1" onChange={onaccess} value={teamuseritem.access} >
           <option selected disabled>اختار الصلاحيات</option>
          <option value={"1"}>مستخدم عادي</option>
          <option value={"2"}>منسق</option>
          <option value={"3"}>مؤرشف</option>
          <option value={"4"}>أدمن</option>
          <option value={"5"}>سوبر أدمن</option>
          </select>
      </div>
        <div className="rtl mt-2 p-3">
        <input className=" btn px-3 mx-3 bttn btn-sm btn-info" onSubmit={addteamuser}  type="submit" value="إرسال" />
       <button type="button" className="btn bttn btn-secondary px-3 btn-sm" onClick={()=>{setactive(0);setteamuser({})}}>إلغاء</button>
       </div>
    </form>
    </div>
    )

    }
  break;
  case 0 :{  return ("")}
  break
  }
}
return ( 
  <div className="w-100 teamuser bs m-0 p-0">
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
  <button type="button" className="btn btn-info text-light m-2 add-admin px-5 btn-sm " onClick={()=>{setactive(1);setteamuser({name:"",id:"",case:"",avtar:"",mobile:"",email:""})}}>إضــافة  <i className="fas text-light mx-2 fa-plus"></i> </button>
<div className="row bs m-0  w-100">
{/* --------form------------------------------------------------------------------------------------------- */}
<div className="m-0 bs p-2 col-4 scrol vhc">
      {  form()   }
</div>
{/* --------show detail------------------------------------------------------------------------------------------- */}
<div className="m-0 bs p-2 col-5  vhc">
  <div className="   p-1 mt-1  mx-0 bs row">
  <i className="fas fa-edit pointer text-start col-1 p-1" onClick={()=>{setactive(2); setteamuseritem(teamuser)}}></i>
  <div className="m-auto text-center w-50">
    {
      teamuser.avtar?
   
   <img className="w-50 "src={teamuser.avtar} alt="" />:
   <img className="w-50 "src="https://www.svgrepo.com/show/192247/man-user.svg" alt="" />

  }
   <p className="  text-end  w-100 text-center">  {teamuser.name}</p>
 </div>
 </div>
 <div className="   p-1 mt-1  mx-0 bs row">
   <p className=" bg6 text-start  col-11">  {teamuser.id}</p>
   <i className="fas fa-key text-start col-1 p-1"></i>
 </div>
 <div className="   p-1 mt-1  mx-0 bs row">
   <p className=" bg6 text-start  col-11">  {teamuser.mobile}</p>
   <i className="fas fa-mobile text-start col-1 p-1"></i>
 </div>
 <div className="   p-1 mt-1  mx-0 bs row">
   <p className=" bg6 text-start  col-11">  {teamuser.email}</p>
   <i className="fas fa-at text-start col-1 p-1"></i>
 </div>
 <div className="   p-1 mt-1  mx-0 bs row">
   <p className=" bg6 text-start  col-11">  {teamuser.jop}</p>
   <i className="fas fa-user text-start col-1 p-1"></i>
 </div>
 <div className="   p-1 mt-1  mx-0 bs row">
   <p className=" bg6 text-start  col-11">  {teamuser.cer}</p>
   <i className="fas fa-user text-start col-1 p-1"></i>
 </div>
 <div className="   p-1 mt-1  mx-0 bs row">
   <p className=" bg6 text-start  col-11">  {teamuser.date}</p>
   <i className="fas fa-calendar-alt text-start col-1 p-1"></i>
 </div>
 <div className="   p-1 mt-1  mx-0 bs row">
   <p className=" bg6 text-start  col-11">  {teamuser.access}</p>
   <i className="fas fa-list-alt text-start col-1 p-1"></i>
 </div>
 <div className="   p-1 mt-1  mx-0 bs row">
   <p className=" bg6 text-start  col-11">  {teamuser.case=="1"?"نشط":"غير نشط"}</p>
   <i className="fas fa-user text-start col-1 p-1"></i>
 </div>

 <div className="   p-1 mt-1  mx-0 bs row">
   <i className="fas fa-archway text-start col-1 p-1"></i>
   <p className="  text-end text-success  col-11">  المشاريع</p>
 </div>  
 {project.map(x=>
 <div className="   p-1 mt-1  mx-0 bs row">
   <p className="  text-start  col-4"> {project.manger}</p>
   <p className=" bg6 text-center  col-8"> {project.name}</p>
 </div> )
  }     
</div>
{/* --------show contarctor------------------------------------------------------------------------------------------- */}
<div className="m-0 bs p-2 col-3 scrol vhc">
{ teamusers.map((x)=>
 <div className=" pointer bg4 text-light  p-2 mt-1  mx-0 bs row" onClick={()=>{setteamuser(x);setactive(0);}}>
   <i className="fas fa-user text-start col-1 p-1"></i>
   <p className="  text-end  col-11"> {x.name}</p>
 </div>) }
</div>
</div>  

</div>
     );
}
 
export default Teamuser;