import Head from "next/head";
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { db, storage } from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AuthRoute from "../authrout";
import Layout1 from "./Layout1";


const Tecproject = (props) => {  
  const [tecprojects,settecprojects]=useState(props.data)
  const [tecproject,settecproject]=useState([])
  const [project,setproject]=useState(props.projects)
  const[tecprojectitem,settecprojectitem]=useState({})
  const[imgs,setimgs]=useState([])
  const[projectitem,setprojectitem]=useState([])
  const[progress,setprogress]=useState(0)
  const[extracts,setextracts]=useState()
  const[extract,setextract]=useState({})
  const[orders,setorders]=useState({})
  const[active,setactive]=useState("0")
  const[active1,setactive1]=useState("0")

const onweeek = (e) =>   {settecprojectitem({...tecprojectitem,week:e.target.value}); }
const onid = (e) =>     {settecprojectitem({...tecprojectitem,id:e.target.value});onextract(e.target.value)}
const onactualPer = (e) => {settecprojectitem({...tecprojectitem,actualPer:e.target.value});}
const onplannedPer = (e) => {settecprojectitem({...tecprojectitem,plannedper:e.target.value});}
const oncase = (e) => { settecprojectitem({...tecprojectitem,case:e.target.value});}
const onenddate = (e) =>  { settecprojectitem({...tecprojectitem,enddate:e.target.value});}
const onweight = (e) =>  { settecprojectitem({...tecprojectitem,weight:e.target.value});}
const oncorrect = (e) =>  { settecprojectitem({...tecprojectitem,correct:date});}
const onvextract = (e) =>  {setextract({...extract,value:e.target.value});}
const onidextract = (e) =>  {setextract({...extract,id:e.target.value});}
const oncextract = (e) =>  {setextract({...extract,case:e.target.value});}
const onvorder = (e) =>  { setorders({...orders,value:e.target.value});}
const onporder = (e) =>  { setorders({...orders,periot:e.target.value});}
const ondorder = (e) =>  { setorders({...orders,date:e.target.value});}

const addextract = async()=>{
  extracts.push({...extract,date:date})
  setextracts(extracts)
  const d={...projectitem,extracts:extracts}
  const docRef = await setDoc(doc(db, "projects", projectitem.id),projectitem);
  setextract({value:"",case:"",id:""})
  setactive("0")
}
const editextract = async(e,w)=>{
  const x = extracts.find(x=>x.id ==w)
  x.case=e.target.value
  setextracts(extracts)
  const d={...projectitem,extracts:extracts}
  const docRef = await setDoc(doc(db, "projects", projectitem.id),d);
  setextract({value:"",case:"",id:""})
  setactive("0")
}
const addorders = async(e)=>{
  e.preventDefault()
  const d={...projectitem,orders:orders}
  const docRef = await setDoc(doc(db, "projects", projectitem.id
),d);
 
}
const onextract=(s)=>{
  const x = project.find(x=>x.id==s)
setextracts(x.extracts)
setorders(x.orders)
setprojectitem(x)
  }


const date = new Date();
const addimgs =(x)=>{
  imgs.push(x)
  setimgs(imgs)
  settecprojectitem({...tecprojectitem,imgs:imgs})
  console.log(imgs)
}
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
                                addimgs(downloadURL)
                       
                                

                                });
                                        }
                                      );
                    };}

                                      
  const addtecproject=async(e)=>{
    e.preventDefault()
   settecproject([...tecproject,tecprojectitem]) 
   const x=`${tecprojectitem.week}\/${projectitem.id}`
  const docRef = await setDoc(doc(db, "tecprojects\/2024",x ),tecprojectitem);
  setprojectitem({})
  setorders({})
  setextracts([])
  setimgs([])
  settecprojectitem({name:"",id:"",date:"",imgs:[],orders:{},actualPer:"",plannedper:"",correct:"",extracts:"",weight:"",week:""})
  
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

  <div className="row bs m-0  w-100">
      {/* --------show detail------------------------------------------------------------------------------------------- */}
   <div className="m-0 bs p-2 scrol col-5  vhc">
   <div className=" my-3 w-100 ms-auto p-4 newform-input required">
     <div className="input-group">
     <div className="custom-file w-100">
    <input type="file" className="custom-file-input" id="inputGroupFile04"/>
    <label className="custom-file-label text-info" htmlFor="inputGroupFile04">ارفاق ملف json</label>
   
  </div>
 
</div>   <div className="progress my-3 mx-auto w-75">
  <div className="progress-bar" role="progressbar"  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
   </div>
   <div className="form-group  text-info">
       <label  htmlFor="formGroupExampleInput">الأسبوع</label>
       <input type="week" className="mt-1 fs-form form-control" id="formGroupExampleInput" placeholder="" required/>
     </div>
  <form>
  
      <div className={`col-12 fs-5 text-dark text-center   `}>
             البيانات
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
  <div className="   p-1 mt-1  mx-0 bs row" >
         <i className="fas fa-dollar-sign text-start col-1 p-1"></i>
         <p className="  text-end text-success  col-11">  المستخلصات</p>
       </div>  
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className="  text-start  col-4"> القيمة</p>
         <p className=" bg5 text-center  col-4">  القيمة</p>
         <div className="form-group rtl  col-4">
        <label htmlFor="exampleFormControlSelect1"> حالة المشروع</label>
       <select className="form-control" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
       </div>
       </div> 
       <div className="form-group  text-info">
       <label  htmlFor="formGroupExampleInput">القيمة</label>
       <input type="text" className="mt-1 fs-form form-control" id="formGroupExampleInput" placeholder="القيمة" required/>
     </div>
     <div className="form-group text-info mt-1">
       <label htmlFor="formGroupExampleInput">رقم المطالبة</label>
       <input type="text" className="mt-1 fs-form  form-control" id="formGroupExampleInput" placeholder="رقم المطالبة" required/>
     </div>
     <div className="   p-1 mt-1  mx-0 bs row">
         <i className="fas fa-dollar-sign text-start col-1 p-1"></i>
         <p className="  text-end text-success  col-11">  أوامر التغير</p>
       </div>  
  
       <div className="form-group  text-info">
       <label  htmlFor="formGroupExampleInput">القيمة</label>
       <input type="text" className="mt-1 fs-form form-control" id="formGroupExampleInput" placeholder="القيمة" required/>
     </div>
     <div className="form-group text-info mt-1">
       <label htmlFor="formGroupExampleInput">المدة</label>
       <input type="text" className="mt-1 fs-form  form-control" id="formGroupExampleInput" placeholder="المدة" required/>
     </div>
     <div className="form-group text-info mt-1">
       <label htmlFor="formGroupExampleInput">تاريخ النهاية</label>
       <input type="date" className="mt-1 fs-form  form-control" id="formGroupExampleInput" placeholder="رقم المطالبة" required/>
     </div>
     <div className=" my-3 w-100 ms-auto p-4 newform-input required">
     <div className="input-group">
     <div className="custom-file w-100">
    <input type="file" className="custom-file-input" id="inputGroupFile04"/>
    <label className="custom-file-label text-info" htmlFor="inputGroupFile04">ارفاق صور المشروع</label>
   
  </div>
 
</div>   <div className="progress my-3 mx-auto w-75">
  <div className="progress-bar" role="progressbar"  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
   </div>
   <div className="rtl mt-2 p-3">
    <input className=" btn px-3 mx-3 bttn btn-sm btn-info"  type="submit" value="إرسال" />
   <button type="button" className="btn bttn btn-secondary px-3 btn-sm" onClick={""}>إلغاء</button>
   </div>
   </form>
   </div>
   {/* --------form------------------------------------------------------------------------------------------- */}
  <div className="m-0 bs p-2 col-4 scrol vhc">
  <div className="newform-1 bs mx-0 bs fs-form rtl p-1 w-100">
  
  <form onSubmit={addtecproject}>
      <div className={`col-12 fs-5 text-dark text-center   `}>
             البيانات
      </div>
      <div className="form-group  text-info">
       <label  htmlFor="formGroupExampleInput">الأسبوع</label>
       <input type="week" className="mt-1 fs-form form-control" id="formGroupExampleInput" placeholder="" required onClick={onweeek}/>
     </div>
      <div className="form-group rtl  mt-1 fs-9 w-100">
        <label htmlFor="exampleFormControlSelect1" className="text-info fs-9 mt-1"> المشروع</label>
       <select className="form-control fs9" id="exampleFormControlSelect1"  onChange={onid}>
      <option selected disabled>اختار مشروع</option>
      {
        project.map(x=>
          <option value={x.id}>{x.name}</option>
        )
      }
    </select>
  </div>
      <div className="form-group  text-info">
       <label  htmlFor="formGroupExampleInput">النسبة المخططة</label>
       <input type="text" className="mt-1 fs-form form-control" id="formGroupExampleInput" placeholder="النسبة المخططة" required value={tecprojectitem.plannedper}  onChange={onplannedPer}/>
     </div>
     <div className="form-group text-info mt-1">
       <label htmlFor="formGroupExampleInput">الفعلية</label>
       <input type="text" className="mt-1 fs-form  form-control" id="formGroupExampleInput" placeholder="النسبة" required value={tecprojectitem.actualPer} onChange={onactualPer}/>
     </div>
     <div className="form-group  text-info">
       <label  htmlFor="formGroupExampleInput">تاريخ النهاية المتوقع</label>
       <input type="text" className="mt-1 fs-form form-control" id="formGroupExampleInput" placeholder="" value={tecprojectitem.data} required onChange={onenddate}/>
     </div>
     <div className="form-group  text-info">
       <label  htmlFor="formGroupExampleInput">ميزان المشروع</label>
       <input type="text" className="mt-1 fs-form form-control" id="formGroupExampleInput" placeholder="" required value={tecprojectitem.weight} onChange={onweight}/>
     </div>
     <div className="form-group mt-2  text-info">
       <label  htmlFor="formGroupExampleInput">خطة تصحيحية</label>
       <input type="checkbox" className="mt-1 fs-form " id="formGroupExampleInput" placeholder="" value={tecprojectitem.correct} onChange={oncorrect}/>
     </div>
     <div className="   p-1 mt-1  mx-0 bs row">
         <i className="fas fa-dollar-sign text-start col-1 p-1"></i>
         <p className="  text-end text-success  col-11">  المستخلصات</p>
       </div>  
       {
 extracts? extracts.map(x=>
  <div className="   p-1 mt-1  mx-0 bs row">
  <p className="  text-start  col-5"> {`${x.id}`}</p>
  <p className=" bg5 text-center  col-4">  {x.value}</p>
  { 
    x.case=="تم الصرف"?
    <p className=" bg-success text-light text-center  col-3"> تم الصرف</p>:
    <div className="form-group rtl   col-3">
   <select className="form-control bg-danger text-light fs9" id="exampleFormControlSelect1" onChange={(e)=>editextract(e,x.id)}>
   <option className="fs9">اختر الحالة</option>
   <option value={"تم الصرف"}>تم الصرف</option >
   
   </select>
   </div>
  }
  
</div>
):""       }
        <div className="form-group mt-2  text-info">
      <button className="btn btn-info px5 text-light" onClick={()=>setactive("1")}  > + </button>
     </div>
     {
      active=="1"?
      <div className="form-group mt-2  ">
      <div className="form-group  text-info">
        <label  htmlFor="formGroupExampleInput">رقم المطالبة</label>
        <input type="text" className="mt-1 fs-form form-control" id="formGroupExampleInput" placeholder="رقم المطالبة"  onChange={onidextract}/>
      </div>
      <div className="form-group text-info mt-1">
        <label htmlFor="formGroupExampleInput">القيمة</label>
        <input type="text" className="mt-1 fs-form  form-control" id="formGroupExampleInput" placeholder="القيمة"  onChange={onvextract}/>
      </div>
      <div className="form-group rtl fs9  col-3">
    <select className="form-control fs9 my-2" id="exampleFormControlSelect1" onChange={oncextract}>
    <option>اختر الحالة</option>
    <option value={"تم الصرف"}>تم الصرف</option >
    <option value={" لم يتم الصرف"}>لم يتم الصرف</option >  
    </select>
    </div>
    <button className="btn btn-info px5 text-light btn-sm " onClick={addextract} > اضافة مستخلص </button>
 
      </div>:""
     
     }
    
     <div className="   p-1 mt-1  mx-0 bs row">
         <i className="fas fa-dollar-sign text-start col-1 p-1"></i>
         <p className="  text-end text-success  col-11">  أوامر التغير</p>
       </div>  
     { orders.value?
 <div className="   p-1 mt-1  mx-0 bs row">
 <p className="  text-start  col-5"> {` قيمة${orders.value}`}</p>
 <p className=" bg5 text-center  col-4">  {orders.date}</p>
 <p className=" bg5 text-center  col-3"> {orders.periot}</p>
</div>:<div className="form-group mt-2  text-info">
       <button className="btn btn-info px5 text-light" onClick={()=>setactive1("1")}  > + </button>
      </div>
     }
       
     {
      active1=="1"?
      <div className="form-group mt-2  ">
      <div className="form-group  text-info">
        <label  htmlFor="formGroupExampleInput">القيمة</label>
        <input type="text" className="mt-1 fs-form form-control" id="formGroupExampleInput" placeholder="القيمة"  onChange={onvorder}/>
      </div>
      <div className="form-group text-info mt-1">
        <label htmlFor="formGroupExampleInput">المدة</label>
        <input type="text" className="mt-1 fs-form  form-control" id="formGroupExampleInput" placeholder="المدة"  onChange={onporder}/>
      </div>
      <div className="form-group text-info mt-1">
        <label htmlFor="formGroupExampleInput">تاريخ النهاية</label>
        <input type="text" className="mt-1 fs-form  form-control" id="formGroupExampleInput" placeholder="تاريخ النهاية"  onChange={ondorder}/>
      </div>
      <button className="btn btn-info px5 text-light btn-sm " onClick={addorders} > اضافة أمر عمل </button>

 
      </div>:
       
     ""
     }
    <div className="form-group text-info mt-1">

   {
    imgs.map(x=>
      <img className="col-2" width={100} height={70} src={x} alt="" />
    )
   }
     </div>
     <div className=" my-3 w-100 ms-auto p-4 newform-input required">
     <div className="input-group">
     <div className="custom-file w-100">
    <input type="file" className="custom-file-input" id="inputGroupFile04" onChange={onimg}/>
    <label className="custom-file-label text-info" htmlFor="inputGroupFile04">ارفاق صور المشروع</label>
   
  </div>
 
</div>   <div className="progress my-3 mx-auto w-75">
<div className="progress-bar" role="progressbar" style={{width:` ${progress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress}</div>
</div>
   </div>
 
    <div className="rtl mt-2 p-3">
    <input className=" btn px-3 mx-3 bttn btn-sm btn-info"  type="submit" value="إرسال" />
   <button type="button" className="btn bttn btn-secondary px-3 btn-sm" onClick={""}>إلغاء</button>
   </div>
</form>
</div>
   </div>
 
   {/* --------show contarctor------------------------------------------------------------------------------------------- */}
   <div className="m-0 bs p-2 col-3 scrol vhc">
    {
      tecproject.map(x=>
        <div className=" pointer bg5 text-dark  p-2 mt-1  mx-0 bs row">
        <i className="fas fa-file text-start col-1 p-1"></i>
        <p className="  text-end  col-11">  {x.name}</p>
      </div>
      )
    }
      
   </div>
  </div>  
  
</div>
     );
}
 
export default Tecproject;