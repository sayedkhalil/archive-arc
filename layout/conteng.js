import Head from "next/head";
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { db, storage } from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AuthRoute from "../authrout";
import Layout1 from "../layout/Layout1";


const Conteng = (props) => {  
  const [contractorusers,setcontractorusers]=useState(props.data.filter(x=>x.ref=="constarctor"))
  const [contractors,setcontractors]=useState(props.contracors)
  const [contractoruser,setcontractoruser]=useState(contractorusers[0])
  const [project,setproject]=useState(props.projects.filter(x=>x.contactor==contractoruser.id))
  const[contractoruseritem,setcontractoruseritem]=useState({})
  const[progress,setprogress]=useState(0)
  const[active,setactive]=useState(0)
  const onname = (e) =>   {setcontractoruseritem({...contractoruseritem,name:e.target.value});setcontractoruser({...contractoruser,name:e.target.value})}
const onid = (e) =>     {setcontractoruseritem({...contractoruseritem,id:e.target.value});setcontractoruser({...contractoruser,id:e.target.value})}
const onmobile = (e) => {setcontractoruseritem({...contractoruseritem,mobile:e.target.value});setcontractoruser({...contractoruser,mobile:e.target.value})}
const oncase = (e) => { setcontractoruseritem({...contractoruseritem,case:e.target.value});setcontractoruser({...contractoruser,case:e.target.value})}
const onemail = (e) =>  { setcontractoruseritem({...contractoruseritem,email:e.target.value});setcontractoruser({...contractoruser,email:e.target.value})}
const onconstractor = (e) =>  { setcontractoruseritem({...contractoruseritem,contractor:e.target.value});setcontractoruser({...contractoruser,contractor:e.target.value})}
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
                                setcontractoruseritem({...contractoruseritem,avtar:downloadURL})
                                setcontractoruser({...contractoruser,avtar:downloadURL})
                                });
                                        }
                                      );
                                      };}
  const addconractoruser=async(e)=>{
    e.preventDefault()
    setcontractoruseritem({...contractoruseritem,ref:"constarctor"})
    if(active==1){ setcontractorusers([...contractorusers,contractoruseritem]) }
  const docRef = await setDoc(doc(db, "user", contractoruseritem.id),contractoruseritem);
  setcontractoruseritem({name:"",id:"",case:"",avtar:"",contractor:"",mobile:"",email:""})
  
}
// ---------------------------------------------------------------add & edie function --------------------------------------------------------------------
const form =()=>{
  switch(active){
    case 1:{ 
      return(
        <div className="newform-1 bs mx-0 bs fs-form rtl p-1 w-100">
        <form onSubmit={addconractoruser}  >
            <div className={`col-12 fs-5 text-dark text-center   `}>
              تفاصيل المستخدم 
            </div>
            <div className="form-group  text-info">
             <label  htmlFor="formGroupExampleInput">اسم المهندس</label>
             <input type="text" className="mt-1 fs-form form-control" id="formGroupExampleInput" placeholder="اسم المهندس" required onChange={onname} value={contractoruseritem.name}/>
           </div>
           <div className="form-group text-info mt-1">
             <label htmlFor="formGroupExampleInput">uid</label>
             <input type="text" className="mt-1 fs-form  form-control" id="formGroupExampleInput" placeholder="uid" required onChange={onid} value={contractoruseritem.id}/>
           </div>
           <div className="form-group text-info mt-1">
             <label htmlFor="formGroupExampleInput">رقم التليفون</label>
             <input type="tel" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="رقم التليفون" required onChange={onmobile}  value={contractoruseritem.mobile}/>
           </div>
           <div className="form-group text-info mt-1">
             <label htmlFor="formGroupExampleInput">البريد الإلكتروني</label>
             <input type="email" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="لبريد الإلكتروني"required onChange={onemail}  value={contractoruseritem.email}/>
           </div>
           <div className="form-group rtl  mt-1 w-50">
            <label htmlFor="exampleFormControlSelect1 "className="text-info">اختار شركة المقاولات</label>
           <select className="form-control fs8" id="exampleFormControlSelect1" onChange={onconstractor} value={contractoruseritem.contactor}required >
           <option selected disabled>شركة المقاولات</option>
           {contractors.map(x=>
          <option value={x.id}>{x.name}</option>
          )}
          </select>
      </div>
           <div className=" my-3 w-100 ms-auto p-4 newform-input required">
           <div className="input-group">
           <div className="custom-file w-100">
          <input type="file" className="custom-file-input" id="inputGroupFile04" onChange={onimg} value={contractoruseritem.img}/>
          <label className="custom-file-label text-info" htmlFor="inputGroupFile04">ارفاق صورة شخصية</label>   
        </div>
      </div>   <div className="progress my-3 mx-auto w-75">
      <div className="progress-bar" role="progressbar" style={{width:` ${progress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress}</div>
      </div>
         </div>
         <div className="form-group rtl  mt-1 w-50">
            <label htmlFor="exampleFormControlSelect1 " className="text-info">اختار حالة الحساب</label>
           <select className="form-control fs8" id="exampleFormControlSelect1" onChange={oncase} value={contractoruseritem.case} required >
           <option selected disabled>اختار حالة الحساب</option>
          <option value={"1"}>مستخدم نشط</option>
          <option value={"2"}>مستخدم توقف</option>
          <option value={"3"}>حذف المستخدم</option>
          </select>
        </div>
          <div className="rtl mt-2 p-3">
          <input className=" btn px-3 mx-3 bttn btn-sm btn-info" onSubmit={addconractoruser}  type="submit" value="إرسال" />
         <button type="button" className="btn bttn btn-secondary px-3 btn-sm" onClick={()=>{setactive(0);setcontractoruser({})}}>إلغاء</button>
         </div>
      </form>
      </div>
      )
    }
    break;
    case 2 :{ return (
      <div className="newform-1 bs mx-0 bs fs-form rtl p-1 w-100">
      <form onSubmit={addconractoruser}  >
          <div className={`col-12 fs-5 text-dark text-center   `}>
            تفاصيل المستخدم 
          </div>
         <div className="form-group text-info mt-1">
           <label htmlFor="formGroupExampleInput">رقم التليفون</label>
           <input type="tel" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="رقم التليفون"  onChange={onmobile}  value={contractoruseritem.mobile}/>
         </div>
         <div className="form-group text-info mt-1">
           <label htmlFor="formGroupExampleInput">البريد الإلكتروني</label>
           <input type="email" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="لبريد الإلكتروني" onChange={onemail}  value={contractoruseritem.email}/>
         </div>
         <div className="form-group rtl  mt-1 w-50">
            <label htmlFor="exampleFormControlSelect1 " className="text-info">اختار شركة المقاولات</label>
           <select className="form-control fs8" id="exampleFormControlSelect1" onChange={onconstractor} value={contractoruseritem.contactor} >
           <option selected disabled>شركة المقاولات</option>
           {contractors.map(x=>
          <option value={x.id}>{x.name}</option>
          )}
          </select>
      </div>
         <div className=" my-3 w-100 ms-auto p-4 newform-input ">
         <div className="input-group">
         <div className="custom-file w-100">
        <input type="file" className="custom-file-input" id="inputGroupFile04" onChange={onimg} value={contractoruseritem.img}/>
        <label className="custom-file-label text-info" htmlFor="inputGroupFile04">ارفاق صورة شخصية</label>   
      </div>
    </div>   <div className="progress my-3 mx-auto w-75">
    <div className="progress-bar" role="progressbar" style={{width:` ${progress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress}</div>
    </div>
       </div>
       <div className="form-group rtl  mt-1 w-50">
            <label htmlFor="exampleFormControlSelect1 "className="text-info">اختار حالة الحساب</label>
           <select className="form-control fs8" id="exampleFormControlSelect1" onChange={oncase} value={contractoruseritem.case} >
           <option selected disabled>اختار حالة الحساب</option>
          <option value={"1"}>مستخدم نشط</option>
          <option value={"2"}>مستخدم توقف</option>
          <option value={"3"}>حذف المستخدم</option>
          </select>
      </div>
        <div className="rtl mt-2 p-3">
        <input className=" btn px-3 mx-3 bttn btn-sm btn-info" onSubmit={addconractoruser}  type="submit" value="إرسال" />
       <button type="button" className="btn bttn btn-secondary px-3 btn-sm" onClick={()=>{setactive(0);setcontractoruser({})}}>إلغاء</button>
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
// ------------------------------------------------------------------------------------------------------------------------------------------------
return ( 

  <div className="w-100 contractoruser bs m-0 p-0">
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
        <button type="button" className="btn btn-info text-light m-2 add-admin px-5 btn-sm " onClick={()=>{setactive(1);setcontractoruser({name:"",id:"",case:"",avtar:"",mobile:"",email:""})}}>إضــافة  <i className="fas text-light mx-2 fa-plus"></i> </button>
  <div className="row bs m-0  w-100">
   {/* --------form------------------------------------------------------------------------------------------- */}
  <div className="m-0 bs p-2 col-4 scrol vhc">
            {  form()   }
   </div>
   {/* --------show detail------------------------------------------------------------------------------------------- */}
   <div className="m-0 bs p-2 col-5  vhc">
        <div className="   p-1 mt-1  mx-0 bs row">
        <i className="fas fa-edit pointer text-start col-1 p-1" onClick={()=>{setactive(2); setcontractoruseritem(contractoruser)}}></i>
        <div className="m-auto text-center w-50">
          {
            contractoruser.avtar?
         
         <img className="w-50 "src={contractoruser.avtar} alt="" />:
         <img className="w-50 "src="https://www.svgrepo.com/show/192247/man-user.svg" alt="" />

        }
         <p className="  text-end  w-100 text-center">  {contractoruser.name}</p>
       </div>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11">  {contractoruser.id}</p>
         <i className="fas fa-key text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11">{active==0?contractors.find(x=>x.id==contractoruser.contractor).name:""}</p>
         <i className="fas fa-warehouse text-start col-1 p-1"></i>
       </div>  
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11">  {contractoruser.mobile}</p>
         <i className="fas fa-mobile text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11">  {contractoruser.email}</p>
         <i className="fas fa-at text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11">  {contractoruser.case=="1"?"نشط":"غير نشط"}</p>
         <i className="fas fa-user text-start col-1 p-1"></i>
       </div>
 
       <div className="   p-1 mt-1  mx-0 bs row">
         <i className="fas fa-archway text-start col-1 p-1"></i>
         <p className="  text-end text-success  col-11">  المشاريع</p>
       </div>  
       {project.map(x=>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className="  text-start  col-4"> {project.suportuser}</p>
         <p className=" bg6 text-center  col-8"> {project.name}</p>
       </div> )
        }     
   </div>
   {/* --------show contarctor------------------------------------------------------------------------------------------- */}
   <div className="m-0 bs p-2 col-3 scrol vhc">
     { contractorusers.map((x)=>
       <div className=" pointer bg1 text-light  p-2 mt-1  mx-0 bs row" onClick={()=>{setcontractoruser(x);setactive(0);}}>
         <i className="fas fa-user text-start col-1 p-1"></i>
         <p className="  text-end  col-11"> {x.name}</p>
       </div>) }
   </div>
  </div>  
  
</div>
     );
}
 
export default Conteng;