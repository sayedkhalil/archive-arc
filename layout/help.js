import Head from "next/head";
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { db, storage } from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AuthRoute from "../authrout";
import Layout1 from "./Layout1";


const Help = () => {  
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
        <button type="button" className="btn btn-success text-light m-2 add-admin px-5 btn-sm " onClick={""}>تحديث الملفات  <i className="fas text-light mx-2 fa-link"></i> </button>

        <div className="form-group rtl  mt-0 w-100">
        <label htmlFor="exampleFormControlSelect1"></label>
       <select className="form-control" id="exampleFormControlSelect1">
      <option active>اختار نوع التعليمات</option>
      <option>مقال</option>
      <option>فيديو</option>
    </select>
  </div>
  <div className="row bs m-0  w-100">
   {/* --------form------------------------------------------------------------------------------------------- */}
  <div className="m-0 bs p-2 col-4 scrol vhc">
  <div className="newform-1 bs mx-0 bs fs-form rtl p-1 w-100">
  <form>
      <div className={`col-12 fs-5 text-dark text-center   `}>
        تفاصيل التعليمات 
      </div>
      <div className="form-group  text-info">
       <label  htmlFor="formGroupExampleInput">العنوان</label>
       <input type="text" className="mt-1 fs-form form-control" id="formGroupExampleInput" placeholder="اسم الطلب" required/>
     </div>
     <div className="form-group text-info mt-1">
       <label htmlFor="formGroupExampleInput">code</label>
       <input type="text" className="mt-1 fs-form  form-control" id="formGroupExampleInput" placeholder="code" required/>
     </div>
     <div className="form-group  text-info">
       <label  htmlFor="formGroupExampleInput">التفاصيل</label>
       <input type="text" className="mt-1 fs-form form-control" id="formGroupExampleInput" placeholder="مسار" required/>
     </div>
     
</form>
</div>
   </div>
   {/* --------show detail------------------------------------------------------------------------------------------- */}
   <div className="m-0 bs p-2 col-5  vhc">
        <div className="   p-1 mt-1  mx-0 bs row">
         <i className="fas fa-edit text-start co2-1 p-1"></i>
         <div className="m-auto text-center w-50">
         <p className="  text-end  w-100 text-center">  العنوان</p>
       </div>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11">  التفاصيل</p>
         <i className="fas fa-key text-start col-1 p-1"></i>
       </div> 
 
 
   </div>
   {/* --------show contarctor------------------------------------------------------------------------------------------- */}
   <div className="m-0 bs p-2 col-3 scrol vhc">
   <button type="button" className="btn btn-info text-light m-2 w-100 px-5 btn-sm " onClick={""}>  <i className="fas text-light mx-2 fa-plus"></i> </button>

       <div className=" pointer bg5 text-dark  p-2 mt-1  mx-0 bs row">
         <i className="fas fa-file text-start col-1 p-1"></i>
         <p className="  text-end  col-11">  التعليمات</p>
       </div>
   </div>
  </div>  
  
</div>
     );
}
 
export default Help;