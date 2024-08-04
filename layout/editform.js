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

const EditForm = (props) => {
// backgroun task title
const[task_bg,settask_bg]=useState("bg0")
const[vis,setvis]=useState("unvisform")
// backgroun task title
const[data,setdata]=useState({})
useEffect(async() => {
 
    });
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
         settask_bg("bg2")
         }
         else if (props.data.action =="3") 
         {
         settask_bg("bg3")
         } 
         else
         {
         settask_bg("bg4")
         } 
  
    });
    const onnoactive=()=>{
      props.setactive("active0")
      setvis("unvisform")

    }    
    const onvis =()=> setvis("visform")
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
     <p className="col-8  text-light">{props.data.id}</p>
     <p className="col-2  bg-light bs h-100 text-center text-dark rounded m-0">{props.data.version}</p>
     <i className="fas col-2 text-end text-light fa-arrow-circle-left fa-lg pointer"  onClick={onnoactive}></i>
  </div>
  <div className={`col-12 p-2 text-info text-center  border-bottom task-name `}>
{props.data.name}
</div>

<div className="newform-1 row bs mx-auto mt-4 p-5">
<i className="fas mt-3 text-end  fa-user fa-lg   col-1"></i>
  <div className="col-6">
    <p className=" col-12 text-info ">{props.data.notes[0].name}</p>
    <p className="  col-12 text-secondary ">الوظيفة</p>
  </div>
  <div className="col-5">
    <p className="  col-12 text-secondary text-end ">التاريخ</p>
  </div>
  <div className="col-12 border-bottom bs  m-0 p-2 row">
    <p className=" col-6 text-dark fs9 text-end">{props.data.title}</p>
    <p className="  col-6 text-secondary text-end fs8 ">منطوق الطلب<i className="far mx-2 text-info fa-file-alt"></i></p>
  </div>
  <div className="col-12 border-bottom bs  m-0 p-2 row">
    <p className=" col-6 text-dark fs9 text-end">{props.data.id}</p>
    <p className="  col-6 text-secondary text-end fs8 "> رقم الطلب<i className="fas mx-2 text-info fa-code-branch"></i></p>
  </div>
  <div className="col-12 border-bottom bs  m-0  p-2 row">
    <a className=" col-6 text-dark fs9 text-end" href=""><i className="fas fa-paperclip"></i></a>
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
    props.data.notes.map(x=>
        <div className=" w-100 bs  row ml-5  mx-auto my-4 border-bottom  ">
        <div className="rounded-circle bg-wight z-ind p-2 text-center  col-1">
        <i className="fas  fa-user fa-lg "></i>
        </div>
        <p className=" ps-3 col-4 fs9 text-primary ">{props.data.notes[0].name}</p>
        <p className=" p-1 col-3 text-secondary text-start ">    
        {x.date}
        </p>
        <p className=" p-1 col-4 text-secondary text-end ">    
        
        </p>
        <p className=" py-2 me-5 col-12 fs8 text-end text-secondary ">   
            {x.note}
        </p>
        <div className="w-75  bs rtl  m-0   row">
        <a className=" w-100 text-secondary py-3 fs9 text-start" href="">المرفقات <i className="fas text-info fa-paperclip"> </i></a>
        </div>
        </div>
                    )
       }
    </div>
    <div  className="w-75">
    <button type="button" className="btn btn-info m-4 px-3 text-light rtl  btn-sm"onClick={onvis}
    >إتخاذ إجراء</button>
    </div>
    <div className={`newform-1 bs mx-auto mt-4 ${vis}  p-5`}>
  <form>
      <div className={`col-12 text-dark text-center   `}>
             تفاصيل الطلب  
      </div>
    <div className="form-group text-dark mt-3">
    <select className="form-control" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
    </div>
    <div className="form-group text-dark mt-3">
    <select className="form-control" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
    </div>
 
    <div className="form-group mt-3">
    <label htmlFor="exampleFormControlTextarea1 text secondary h6">اكتب ملاحظات</label>
    <textarea className="form-control mt-2" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
  <div className=" my-3 w-100 ms-auto p-4 newform-input required">
<div className="input-group">
  <div className="custom-file w-100">
    <input type="file" className="custom-file-input" id="inputGroupFile04"/>
    <label className="custom-file-label" htmlFor="inputGroupFile04">ارفاق الملفات</label>
   
  </div>
</div>   <div className="progress my-3 mx-auto w-75">
  <div className="progress-bar" role="progressbar"  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
  <div className="w-100 mt-3 p-2 text-end note-newform text-danger text-secondary">
      <p>  <i className="fas fa-info text-dark mx-2"></i>
      لابد من إرفاق الطلب مع المرفقات في ملف بي دي  اف واحد</p>
      <a href="https://www.ilovepdf.com/ar" target="blank"> <i className="fas fa-info text-dark mx-2"></i> استخدم هذا الموقع في الدمج<i className="fas text-info mx-2 fa-link"></i></a>
    </div>
   </div>
    <div className="rtl mt-2 p-3">
   <button type="button" className="btn bttn btn-secondary px-3 btn-sm"  onClick={onnoactive}>إلغاء</button>
   <input className=" btn px-3 mx-3 bttn btn-sm btn-info" type="submit" value="إرسال"  />
   </div>
</form>
</div>
</div>
</div> 
</div>
    );
}
 
export default EditForm;