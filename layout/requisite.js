import Head from "next/head";
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { db, storage } from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AuthRoute from "../authrout";
import Layout1 from "./Layout1";


const Requisite = (props) => { 
  const [requisites,setrequisites]=useState(props.data)
  const [requisite,setrequisite]=useState(requisites[0]?requisites[0]:{})
  const[requisiteitem,setrequisiteitem]=useState({})
  const[progress,setprogress]=useState(0)
  const[active,setactive]=useState(0)
  const onname = (e) =>   {setrequisiteitem({...requisiteitem,name:e.target.value,ref:"requisite"});setrequisite({...requisite,name:e.target.value})}
const onid = (e) =>     {setrequisiteitem({...requisiteitem,id:e.target.value});setrequisite({...requisite,id:e.target.value})}
const onpath = (e) => {setrequisiteitem({...requisiteitem,path:e.target.value});setrequisite({...requisite,path:e.target.value})}
const onfile = (e) => { setrequisiteitem({...requisiteitem,case:e.target.value});setrequisite({...requisite,case:e.target.value})}
const onsend = (e) =>  { setrequisiteitem({...requisiteitem,send:e.target.value});setrequisite({...requisite,send:e.target.value})}
const onrecev = (e) =>  { setrequisiteitem({...requisiteitem,recev:e.target.value});setrequisite({...requisite,recev:e.target.value})}
const onaction = (e) =>  { setrequisiteitem({...requisiteitem,action:e.target.value});setrequisite({...requisite,action:e.target.value})}
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
                                setrequisiteitem({...requisiteitem,doc:downloadURL})
                                setrequisite({...requisite,avtar:downloadURL})
                                });
                                        }
                                      );
                    };}

                                      
  const addrequisite = async(e)=>{
    e.preventDefault()
    setrequisiteitem({...requisiteitem})
   if(active==1){setrequisites([...requisites,requisiteitem]) }
  const docRef = await setDoc(doc(db, "requisites", requisiteitem.id),requisiteitem);
  setrequisiteitem({name:"",id:"",case:"",path:"",path:"",action:"",send:"",recev:"",doc:""})
  
} 
const form =()=>{
  switch(active){
    case 1:{ 
      return(
        <div className="newform-1 bs mx-0 bs fs-form rtl p-1 w-100">
        <form on onSubmit={addrequisite}>
            <div className={`col-12 fs-5 text-dark text-center   `}>
              تفاصيل الطلب 
            </div>
            <div className="form-group  text-info">
             <label  htmlFor="formGroupExampleInput">اسم الطلب</label>
             <input type="text" className="mt-1 fs-form form-control" id="formGroupExampleInput" placeholder="اسم الطلب" required onChange={onname} value={requisiteitem.name}/>
           </div>
           <div className="form-group text-info mt-1">
             <label htmlFor="formGroupExampleInput">code</label>
             <input type="text" className="mt-1 fs-form  form-control" id="formGroupExampleInput" placeholder="code" required onChange={onid}value={requisiteitem.id}/>
           </div>
           <div className="form-group  text-info">
             <label  htmlFor="formGroupExampleInput">مسار</label>
             <input type="text" className="mt-1 fs-form form-control" id="formGroupExampleInput" placeholder="مسار" required onChange={onpath}value={requisiteitem.path}/>
           </div>
        
            <div className="form-group rtl fs-9  mt-1 w-100">
              <label htmlFor="exampleFormControlSelect1" className="mt-1 text-info"> المرسل</label>
             <select className="form-control" id="exampleFormControlSelect1" required onChange={onsend}value={requisiteitem.send}>
            <option selected disabled>اختر</option>
            <option  value="0" key=""> ممثل المقاول</option>
            <option  value="1" key=""> مهندس الموقع</option>
            <option  value="2" key=""> الدعم الفني</option>
            <option  value="3" key=""> مدير المشروع</option>
            <option  value="4" key=""> الاداري</option>
            <option  value="5" key=""> المؤرشف</option>
            <option  value="6" key=""> المنسق</option>
          </select>
        </div>
        <div className="form-group rtl fs-9  mt-1 w-100">
              <label htmlFor="exampleFormControlSelect1" className="mt-1 text-info"> المستقبل</label>
             <select className="form-control" id="exampleFormControlSelect1" required onChange={onrecev}value={requisiteitem.recev}>
            <option selected disabled>اختر</option>
            <option  value="0" key=""> ممثل المقاول</option>
            <option  value="1" key=""> مهندس الموقع</option>
            <option  value="2" key=""> الدعم الفني</option>
            <option  value="3" key=""> مدير المشروع</option>
            <option  value="4" key=""> الاداري</option>
            <option  value="5" key=""> المؤرشف</option>
            <option  value="6" key=""> المنسق</option>
          </select>
        </div>
        <div className="form-group rtl fs-9  mt-1 w-100">
              <label htmlFor="exampleFormControlSelect1" className="mt-1 text-info"> الاجراء</label>
             <select className="form-control" id="exampleFormControlSelect1" required onChange={onaction}value={requisiteitem.action}>
            <option selected disabled>اختر</option>
            <option  value="0" key=""> اعتماد</option>
            <option  value="1" key="">رفض </option>
            <option  value="2" key=""> اعادة توجيه</option>
            <option  value="3" key="">اعتماد بأكواد</option>
            <option  value="4" key=""> ارسال</option>
           </select>
        </div>
      
           <div className=" my-3 w-100 ms-auto p-4 newform-input required">
           <div className="input-group">
           <div className="custom-file w-100">
          <input type="file" className="custom-file-input" id="inputGroupFile04" onChange={onimg}/>
          <label className="custom-file-label text-info" htmlFor="inputGroupFile04">ارفاق  الطلب</label>
         
        </div>
      
      </div>   <div className="progress my-3 mx-auto w-75">
        <div className="progress-bar" role="progressbar"  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
         </div>
        
          <div className="rtl mt-2 p-3">
          <input className=" btn px-3 mx-3 bttn btn-sm btn-info"  type="submit" value="إرسال" />
         <button type="button" className="btn bttn btn-secondary px-3 btn-sm" onClick={()=>{setactive(0);setrequisiteitem({})}}>إلغاء</button>
         </div>
      </form>
      </div>
      )
    }
    break;
    case 2 :{ return (
      <div className="newform-1 bs mx-0 bs fs-form rtl p-1 w-100">
  <form on onSubmit={addrequisite}>
      <div className={`col-12 fs-5 text-dark text-center   `}>
        تفاصيل الطلب 
      </div>
      <div className="form-group  text-info">
       <label  htmlFor="formGroupExampleInput">اسم الطلب</label>
       <input type="text" className="mt-1 fs-form form-control" id="formGroupExampleInput" placeholder="اسم الطلب"  onChange={onname} value={requisiteitem.name}/>
     </div>
     <div className="form-group text-info mt-1">
       <label htmlFor="formGroupExampleInput">code</label>
       <input type="text" className="mt-1 fs-form  form-control" id="formGroupExampleInput" placeholder="code"  onChange={onid}value={requisiteitem.id}/>
     </div>
     <div className="form-group  text-info">
       <label  htmlFor="formGroupExampleInput">مسار</label>
       <input type="text" className="mt-1 fs-form form-control" id="formGroupExampleInput" placeholder="مسار"  onChange={onpath}value={requisiteitem.path}/>
     </div>
     
      <div className="form-group rtl fs-9  mt-1 w-100">
        <label htmlFor="exampleFormControlSelect1" className="mt-1 text-info"> المرسل</label>
       <select className="form-control" id="exampleFormControlSelect1" required onChange={onsend}value={requisiteitem.send}>
      <option selected disabled>اختر</option>
      <option  value="0" key=""> ممثل المقاول</option>
      <option  value="1" key=""> مهندس الموقع</option>
      <option  value="2" key=""> الدعم الفني</option>
      <option  value="3" key=""> مدير المشروع</option>
      <option  value="4" key=""> الاداري</option>
      <option  value="5" key=""> المؤرشف</option>
      <option  value="6" key=""> المنسق</option>
    </select>
  </div>
  <div className="form-group rtl fs-9  mt-1 w-100">
        <label htmlFor="exampleFormControlSelect1" className="mt-1 text-info"> المستقبل</label>
       <select className="form-control" id="exampleFormControlSelect1"  onChange={onrecev}value={requisiteitem.recev}>
      <option selected disabled>اختر</option>
      <option  value="0" key=""> ممثل المقاول</option>
      <option  value="1" key=""> مهندس الموقع</option>
      <option  value="2" key=""> الدعم الفني</option>
      <option  value="3" key=""> مدير المشروع</option>
      <option  value="4" key=""> الاداري</option>
      <option  value="5" key=""> المؤرشف</option>
      <option  value="6" key=""> المنسق</option>
    </select>
  </div>
  <div className="form-group rtl fs-9  mt-1 w-100">
        <label htmlFor="exampleFormControlSelect1" className="mt-1 text-info"> الاجراء</label>
       <select className="form-control" id="exampleFormControlSelect1"  onChange={onaction}value={requisiteitem.action}>
      <option selected disabled>اختر</option>
      <option  value="0" key=""> اعتماد</option>
      <option  value="1" key="">رفض </option>
      <option  value="2" key=""> اعادة توجيه</option>
      <option  value="3" key="">اعتماد بأكواد</option>
      <option  value="4" key=""> ارسال</option>
     </select>
  </div>

     <div className=" my-3 w-100 ms-auto p-4 newform-input required">
     <div className="input-group">
     <div className="custom-file w-100">
    <input type="file" className="custom-file-input" id="inputGroupFile04" onChange={onimg}/>
    <label className="custom-file-label text-info" htmlFor="inputGroupFile04">ارفاق  الطلب</label>
   
  </div>

</div>   <div className="progress my-3 mx-auto w-75">
  <div className="progress-bar" role="progressbar"  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
   </div>
  
    <div className="rtl mt-2 p-3">
    <input className=" btn px-3 mx-3 bttn btn-sm btn-info"  type="submit" value="إرسال" />
   <button type="button" className="btn bttn btn-secondary px-3 btn-sm" onClick={()=>{setactive(0);setrequisiteitem({})}}>إلغاء</button>
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
        <button type="button" className="btn btn-info text-light m-2 add-admin px-5 btn-sm " onClick={()=>{setactive(1);setrequisite({name:"",id:"",case:"",path:"",path:"",action:"",send:"",recev:"",doc:""})}}>إضــافة  <i className="fas text-light mx-2 fa-plus"></i> </button>
  <div className="row bs m-0  w-100">
   {/* --------form------------------------------------------------------------------------------------------- */}
  <div className="m-0 bs p-2 col-4 scrol vhc">
  {  form()   }

   </div>
   {/* --------show detail------------------------------------------------------------------------------------------- */}
   <div className="m-0 bs p-2 col-5  vhc">
        <div className="   p-1 mt-1  mx-0 bs row">
        <i className="fas fa-edit pointer text-start col-1 p-1" onClick={()=>{setactive(2); setrequisiteitem(requisite)}}></i>
         <div className="m-auto text-center w-50">
         <p className="  text-end  w-100 text-center">{requisite.name?requisite.name:""}</p>
       </div>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11"> {requisite.id?requisite.id:""}</p>
         <i className="fas fa-key text-start col-1 p-1"></i>
       </div> 
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11"> {requisite.send?requisite.send:""}</p>
         <i className="fas fa-share text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11">   {requisite.recev?requisite.recev:""}</p>
         <i className="fas fa-vote-yea text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11">  {requisite.action?requisite.action:""}</p>
         <i className="fas fa-info text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11">  {requisite.path?requisite.path:""}</p>
         <i className="fas fa-project-diagram text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11"> {requisite.doc?<a href= {requisite.doc}>المرفقات</a>:"" }</p>
         <i className="fas fa-link text-start col-1 p-1"></i>
       </div>

 
   </div>
   {/* --------show contarctor------------------------------------------------------------------------------------------- */}
   <div className="m-0 bs p-2 col-3 scrol vhc">
    {
       requisites?
      requisites.map(x=>
        <div className=" pointer bg5 text-dark  p-2 mt-1  mx-0 bs row" onClick={()=>{setrequisite(x);setactive(0);}}>
        <i className="fas fa-file text-start col-1 p-1"></i>
        <p className="  text-end  col-11">{x.name}</p>
      </div>
      ):""
    }
      
   </div>
  </div>  
  
</div>
     );
}
 
export default Requisite;