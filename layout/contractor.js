import Head from "next/head";
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { db, storage } from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AuthRoute from "../authrout";
import Layout1 from "../layout/Layout1";



const Contractor = (props) => {  
const [contractors,setcontractors]=useState(props.data)
const [contractor,setcontractor]=useState(props.data[0])
const [project,setproject]=useState(props.projects.filter(x=>x.contactor==contractor.id))
const[contractoritem,setcontractoritem]=useState({})
const[progress,setprogress]=useState(0)
const[active,setactive]=useState(0)
const onname = (e) =>   {setcontractoritem({...contractoritem,name:e.target.value});setcontractor({...contractor,name:e.target.value})}
const onid = (e) =>     {setcontractoritem({...contractoritem,id:e.target.value});setcontractor({...contractor,id:e.target.value})}
const onmobile = (e) => {setcontractoritem({...contractoritem,mobile:e.target.value});setcontractor({...contractor,mobile:e.target.value})}
const onadress = (e) => { setcontractoritem({...contractoritem,adress:e.target.value});setcontractor({...contractor,adress:e.target.value})}
const onemail = (e) =>  { setcontractoritem({...contractoritem,email:e.target.value});setcontractor({...contractor,email:e.target.value})}
const onweb = (e) =>    { setcontractoritem({...contractoritem,web:e.target.value});setcontractor({...contractor,web:e.target.value})}
const onprofile  = (e) =>
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
                                setcontractoritem({...contractoritem, profile:downloadURL})
                                });
                                        }
                                      );
                                      };}
  const addconractor=async(e)=>{
    e.preventDefault()
    if(active==1) { setcontractors([...contractors,contractoritem]) }
  const docRef = await setDoc(doc(db, "contractors", contractoritem.id),contractoritem);
  setcontractoritem({name:"",id:"",adress:"",profile:"",mobile:"",email:"",web:""})
  
}
// ---------------------------------------------------------------add & edie function --------------------------------------------------------------------
const form =()=>{
  switch(active){
    case 1:{ 
      return(
        <div className="newform-1 bs mx-0 bs fs-form rtl p-1 w-100">
        <form onSubmit={addconractor}>
            <div className={`col-12 fs-5 text-dark text-center    `}>
              تفاصيل الشركة 
            </div>
            <div className="form-group  text-info">
            <label  htmlFor="formGroupExampleInput">اسم الشركة</label>
            <input type="text" className="mt-1 fs-form form-control" id="formGroupExampleInput" placeholder="اسم الشركة" required onChange={onname} value={contractoritem.name}/>
          </div>
          <div className="form-group text-info mt-1">
            <label htmlFor="formGroupExampleInput">السجل التجاري</label>
            <input type="text" className="mt-1 fs-form  form-control" id="formGroupExampleInput" placeholder="السجل التجاري" required onChange={onid}value={contractoritem.id}/>
          </div>
          <div className="form-group text-info mt-1">
            <label htmlFor="formGroupExampleInput">رقم التليفون</label>
            <input type="tel" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="رقم التليفون" required onChange={onmobile}value={contractoritem.mobile}/>
          </div>
          <div className="form-group text-info mt-1">
            <label htmlFor="formGroupExampleInput">العنوان</label>
            <input type="text" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="العنوان" required onChange={onadress}value={contractoritem.adress}/>
          </div>
          <div className="form-group text-info mt-1">
            <label htmlFor="formGroupExampleInput">البريد الإلكتروني</label>
            <input type="email" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="لبريد الإلكتروني" onChange={onemail}value={contractoritem.email}/>
          </div>
          <div className="form-group text-info mt-1">
            <label htmlFor="formGroupExampleInput">الموقع الاكتروني</label>
            <input type="url" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="الموقع الاكتروني"onChange={onweb}value={contractoritem.web}/>
          </div>
              <div className=" my-3 w-100 ms-auto p-4 newform-input required">
        <div className="input-group">
        <div className="custom-file w-100">
          <input type="file" className="custom-file-input" id="inputGroupFile04" onChange={onprofile} />
          <label className="custom-file-label text-info" htmlFor="inputGroupFile04">ارفاق البروفايل</label>
        
        </div>
      </div>   <div className="progress my-3 mx-auto w-75">
      <div className="progress-bar" role="progressbar" style={{width:` ${progress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress}</div>
      </div>
        </div>
          <div className="rtl mt-2 p-3">
          <input className=" btn px-3 mx-3 bttn btn-sm btn-info" onSubmit={addconractor}type="submit" value="إرسال" />
        <button type="button" className="btn bttn btn-secondary px-3 btn-sm" onClick={()=>{setactive(0);setcontractoritem({})}}>إلغاء</button>
        </div>
      </form>
      </div>
      )
    }
    break;
    case 2 :{ return (
      <div className="newform-1 bs mx-0 bs fs-form rtl p-1 w-100">
      <form onSubmit={addconractor}>
          <div className={`col-12 fs-5 text-dark text-center    `}>
            تفاصيل الشركة 
          </div>
          
        <div className="form-group text-info mt-1">
          <label htmlFor="formGroupExampleInput">رقم التليفون</label>
          <input type="tel" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="رقم التليفون"  onChange={onmobile}value={contractoritem.mobile}/>
        </div>
        <div className="form-group text-info mt-1">
          <label htmlFor="formGroupExampleInput">العنوان</label>
          <input type="text" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="العنوان"  onChange={onadress}value={contractoritem.adress}/>
        </div>
        <div className="form-group text-info mt-1">
          <label htmlFor="formGroupExampleInput">البريد الإلكتروني</label>
          <input type="email" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="لبريد الإلكتروني" onChange={onemail}value={contractoritem.email}/>
        </div>
        <div className="form-group text-info mt-1">
          <label htmlFor="formGroupExampleInput">الموقع الاكتروني</label>
          <input type="url" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="الموقع الاكتروني"onChange={onweb}value={contractoritem.web}/>
        </div>
            <div className=" my-3 w-100 ms-auto p-4 newform-input required">
      <div className="input-group">
      <div className="custom-file w-100">
        <input type="file" className="custom-file-input" id="inputGroupFile04" onChange={onprofile} />
        <label className="custom-file-label text-info" htmlFor="inputGroupFile04">ارفاق البروفايل</label>
      
      </div>
    </div>   <div className="progress my-3 mx-auto w-75">
    <div className="progress-bar" role="progressbar" style={{width:` ${progress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress}</div>
    </div>
      </div>
        <div className="rtl mt-2 p-3">
        <input className=" btn px-3 mx-3 bttn btn-sm btn-info" onSubmit={addconractor}type="submit" value="إرسال" />
      <button type="button" className="btn bttn btn-secondary px-3 btn-sm" onClick={()=>{setactive(0);setcontractoritem({})}}>إلغاء</button>
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

  <div className="w-100 contractor bs m-0 p-0">
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
        <button type="button" className="btn btn-info text-light m-2 add-admin px-5 btn-sm " onClick={()=>{setactive(1);setcontractor({name:"",id:"",adress:"",profile:"",mobile:"",email:"",web:""})}}>إضــافة  <i className="fas text-light mx-2 fa-plus"></i> </button>
  <div className="row bs m-0  w-100">
   {/* --------form------------------------------------------------------------------------------------------- */}
   <div className="m-0 bs p-2 col-4 scrol vhc">
      {
        form()
      }
    </div>
   {/* --------show detail------------------------------------------------------------------------------------------- */}
   <div className="m-0 bs p-2 col-5  vhc">
        <div className="   p-1 mt-1  mx-0 bs row">
         <i className="fas fa-edit pointer text-start col-1 p-1" onClick={()=>{setactive(2); setcontractoritem(contractor)}}></i>
         <p className="  text-end  col-11"> {contractor.name}</p>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11">  {contractor.id}</p>
         <i className="fab fa-ideal text-start col-1 p-1"></i>
       </div> 
       {contractor.adress?
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11">  {contractor.adress}</p>
         <i className="fas fa-map text-start col-1 p-1"></i>
       </div>:""}
       {contractor.mobile?
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11"> {contractor.mobile}</p>
         <i className="fas fa-mobile text-start col-1 p-1"></i>
       </div>:""}
        {contractor.email?
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11">{contractor.email}</p>
         <i className="fas fa-at text-start col-1 p-1"></i>
       </div>:""}
       {contractor.web?
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11">  {contractor.web}</p>
         <i className="fab fa-edge-legacy text-start col-1 p-1"></i>
       </div>:""}
       {contractor.profile?
       <div className="   p-1 mt-1  mx-0 bs row">
         <a className="pointer bg6 text-start  col-11" srchref={contractor.profile}> بروفايل الشركة </a>
         <i className="fas fa-link text-start col-1 p-1"></i>
       </div>:""}
       <div className="   p-1 mt-1  mx-0 bs row">
         <i className="fas fa-archway text-start col-1 p-1"></i>
         <p className="  text-end text-success  col-11">  المشاريع</p>
       </div>  
       {

       } 
       {project.map(x=>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className="  text-start  col-4"> {project.contusre}</p>
         <p className=" bg6 text-center  col-8"> {project.name}</p>
       </div> )
        }
   </div>
   {/* --------show contarctor------------------------------------------------------------------------------------------- */}
   <div className="m-0 bs p-2 col-3 scrol vhc">
    {
    contractors.map(x=>
      <div className=" pointer bg5  p-2 mt-1  mx-0 bs row" onClick={()=>{setcontractor(x) ;setactive(0);setcontractoritem({})}} >
         <i className="fas fa-warehouse  text-start col-1 p-1"></i>
         <p className="  text-end  col-11">{x.name}</p>
       </div>
    )
    } 
       
   </div>
  </div>  
  
</div>
     );
}
 
export default Contractor;