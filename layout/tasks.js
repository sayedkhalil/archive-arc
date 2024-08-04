import Head from "next/head";
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { db, storage } from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AuthRoute from "../authrout";
import Layout1 from "./Layout1";


const Tasks = () => {  
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
        <button type="button" className="btn btn-info text-light m-2 add-admin px-5 btn-sm " onClick={""}>إضــافة  <i className="fas text-light mx-2 fa-plus"></i> </button>
  <div className="row bs m-0  w-100">
   {/* --------form------------------------------------------------------------------------------------------- */}
  <div className="m-0 bs p-2 col-4 scrol vhc">
  <div className="newform-1 bs mx-0 bs fs-form rtl p-1 w-100">
  <form>
      <div className={`col-12 fs-5 text-dark text-center   `}>
        تفاصيل الطلب 
      </div>
      <div className="form-group  text-info">
       <label  htmlFor="formGroupExampleInput">اسم المهندس</label>
       <input type="text" className="mt-1 fs-form form-control" id="formGroupExampleInput" placeholder="اسم الطلب" required/>
     </div>
     <div className="form-group text-info mt-1">
       <label htmlFor="formGroupExampleInput">code</label>
       <input type="text" className="mt-1 fs-form  form-control" id="formGroupExampleInput" placeholder="code" required/>
     </div>
     <div className="form-group  text-info">
       <label  htmlFor="formGroupExampleInput">مسار</label>
       <input type="text" className="mt-1 fs-form form-control" id="formGroupExampleInput" placeholder="مسار" required/>
     </div>
     <div className="form-group mt-2  text-info">
       <label  htmlFor="formGroupExampleInput">مرفقات</label>
       <input type="checkbox" className="mt-1 fs-form " id="formGroupExampleInput" placeholder="" required/>
     </div>
      <div className="form-group rtl  mt-0 w-100">
        <label htmlFor="exampleFormControlSelect1"></label>
       <select className="form-control" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
  <div className="form-group rtl  mt-0 w-100">
        <label htmlFor="exampleFormControlSelect1"></label>
       <select className="form-control" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
  <div className="form-group rtl  mt-0 w-100">
        <label htmlFor="exampleFormControlSelect1"></label>
       <select className="form-control" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
     <div className=" my-3 w-100 ms-auto p-4 newform-input required">
     <div className="input-group">
     <div className="custom-file w-100">
    <input type="file" className="custom-file-input" id="inputGroupFile04"/>
    <label className="custom-file-label text-info" htmlFor="inputGroupFile04">ارفاق صورة شخصية</label>
   
  </div>
  <div className="form-group rtl  mt-0 w-25">
        <label htmlFor="exampleFormControlSelect1"></label>
       <select className="form-control" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
</div>   <div className="progress my-3 mx-auto w-75">
  <div className="progress-bar" role="progressbar"  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
   </div>
   <div className="form-group rtl  mt-0 w-100">
        <label htmlFor="exampleFormControlSelect1"></label>
       <select className="form-control" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
  <div className="form-group rtl  mt-0 w-100">
        <label htmlFor="exampleFormControlSelect1"></label>
       <select className="form-control" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
    <div className="rtl mt-2 p-3">
    <input className=" btn px-3 mx-3 bttn btn-sm btn-info"  type="submit" value="إرسال" />
   <button type="button" className="btn bttn btn-secondary px-3 btn-sm" onClick={""}>إلغاء</button>
   </div>
</form>
</div>
   </div>
   {/* --------show detail------------------------------------------------------------------------------------------- */}
   <div className="m-0 bs p-2 col-5  vhc">
        <div className="   p-1 mt-1  mx-0 bs row">
         <i className="fas fa-edit text-start co2-1 p-1"></i>
         <div className="m-auto text-center w-50">
         <p className="  text-end  w-100 text-center">  الطلب</p>
       </div>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11">  الكود</p>
         <i className="fas fa-key text-start col-1 p-1"></i>
       </div> 
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11">  المرسل </p>
         <i className="fas fa-share text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11">  الفترة الزمنية </p>
         <i className="fas fa-share text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11">  المرسل له</p>
         <i className="fas fa-vote-yea text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11">  الرد</p>
         <i className="fas fa-info text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11">  المسار</p>
         <i className="fas fa-project-diagram text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11">  المرفقات</p>
         <i className="fas fa-link text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-11">  المرفقات</p>
         <i className="fas fa-link text-start col-1 p-1"></i>
       </div>
 
   </div>
   {/* --------show contarctor------------------------------------------------------------------------------------------- */}
   <div className="m-0 bs p-2 col-3 scrol vhc">
       <div className=" pointer bg1 text-dark  p-2 mt-1  mx-0 bs row">
         <i className="fas fa-file text-start col-1 p-1"></i>
         <p className="  text-end  col-11">  الطلب</p>
       </div>
   </div>
  </div>  
  
</div>
     );
}
 
export default Tasks;