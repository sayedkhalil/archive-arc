import Head from "next/head";
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { db, storage } from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AuthRoute from "../authrout";
import Layout1 from "../layout/Layout1";


const Project = (props) => {
  const init ={name:"",id:"",scope:"",cover:"",owner:"",cost:"",region:"",city:"",loction:"",loction:"",
    finrecorse:"",manger:"",teamuser:"",contractor:"",contuser:"",startdate:"",enddate:"",periot:"",archive:"",
    docs:{file1:"",file2:"",file3:"",file4:"",file5:"",file6:""},extract:[],orders:{}}  
  const [projects,setprojects]=useState(props.data)
  const [project,setproject]=useState(projects[0]?projects[0]:init)
  const [projectitem,setprojectitem]=useState({})
  const [contractors,setcontractors]=useState(props.contracors)
  const[progress,setprogress]=useState(0)
  const[progress1,setprogress1]=useState(0)
  const[progress2,setprogress2]=useState(0)
  const[progress3,setprogress3]=useState(0)
  const[progress4,setprogress4]=useState(0)
  const[progress5,setprogress5]=useState(0)
  const[progress6,setprogress6]=useState(0)
  const[active,setactive]=useState(0)
  const onname = (e) =>   {setprojectitem({...projectitem,name:e.target.value,});setproject({...project,name:e.target.value})}
const onid = (e) =>     {setprojectitem({...projectitem,id:e.target.value});setproject({...project,id:e.target.value})}
const onscope = (e) =>     {setprojectitem({...projectitem,scope:e.target.value});setproject({...project,scope:e.target.value})}
const onregion = (e) => {setprojectitem({...projectitem,region:e.target.value});setproject({...project,region:e.target.value})}
const oncity = (e) => { setprojectitem({...projectitem,city:e.target.value});setproject({...project,case:e.target.value})}
const onlocation = (e) =>  { setprojectitem({...projectitem,location:e.target.value});setproject({...project,location:e.target.value})}
const oncost = (e) => { setprojectitem({...projectitem,cost:e.target.value});setproject({...project,cost:e.target.value})}
const onowner = (e) => { setprojectitem({...projectitem,owner:e.target.value});setproject({...project,owner:e.target.value})}
const oncorrect = (e) => { setprojectitem({...projectitem,correct:e.target.value});setproject({...project,correct:e.target.value})}
const onmanger = (e) => { setprojectitem({...projectitem,manger:e.target.value});setproject({...project,manger:e.target.value})}
const onteamuser = (e) => { setprojectitem({...projectitem,teamuser:e.target.value});setproject({...project,teamuser:e.target.value})}
const oncontuser = (e) => { setprojectitem({...projectitem,contuser:e.target.value});setproject({...project,contuser:e.target.value})}
const onfinrecorse = (e) => { setprojectitem({...projectitem,finrecorse:e.target.value});setproject({...project,finrecorse:e.target.value})}
const onarchive = (e) => { setprojectitem({...projectitem,archive:e.target.value});setproject({...project,archive:e.target.value})}
const onstartdate = (e) => { setprojectitem({...projectitem,startdate:e.target.value});setproject({...project,startdate:e.target.value})}
const onenddate = (e) => { setprojectitem({...projectitem,Denddate:e.target.value});setproject({...project,enddate:e.target.value})}
const onperiot = (e) => { setprojectitem({...projectitem,periot:e.target.value});setproject({...project,periot:e.target.value})}
const onconstractor = (e) => { setprojectitem({...projectitem,contractor:e.target.value});setproject({...project,contractor:e.target.value})}
const oncover  = (e) =>
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
                                setprojectitem({...projectitem,cover:downloadURL})
                                setproject({...project,cover:downloadURL})
                                });
                                        }
                                      );
                                      };}
const onfile1  = (e) =>
                                        {    
                                            const fileopn = e.target.files[0];
                                            if(fileopn){    
                                            const storage = getStorage();
                                            const storageRef = ref(storage, fileopn.name);
                                            const uploadTask = uploadBytesResumable(storageRef, fileopn);
                                            uploadTask.on('state_changed', 
                                            (snapshot) => {
                                              const progre = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                              setprogress1(progre)
                                            }, 
                                            (error) => {
                                            }, 
                                            () => {
                                                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                                setprogress1(0);
                                                setprojectitem({...projectitem,docs:{
                                              ...projectitem.docs, file1:downloadURL
                                                }})
                                                });
                                                        }
                                                      );
                                                      };}
const onfile2  = (e) =>
  {    
      const fileopn = e.target.files[0];
      if(fileopn){    
      const storage = getStorage();
      const storageRef = ref(storage, fileopn.name);
      const uploadTask = uploadBytesResumable(storageRef, fileopn);
      uploadTask.on('state_changed', 
      (snapshot) => {
        const progre = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setprogress2(progre)
      }, 
      (error) => {
      }, 
      () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setprogress2(0);
          setprojectitem({...projectitem,docs:{
        ...projectitem.docs, file2:downloadURL
          }})
          });
                  }
        );
         };}
         const onfile3  = (e) =>
          {    
              const fileopn = e.target.files[0];
              if(fileopn){    
              const storage = getStorage();
              const storageRef = ref(storage, fileopn.name);
              const uploadTask = uploadBytesResumable(storageRef, fileopn);
              uploadTask.on('state_changed', 
              (snapshot) => {
                const progre = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setprogress3(progre)
              }, 
              (error) => {
              }, 
              () => {
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  setprogress3(0);
                  setprojectitem({...projectitem,docs:{
                ...projectitem.docs, file3:downloadURL
                  }})
                  });
                          }
                );
                 };}
                 const onfile4  = (e) =>
                  {    
                      const fileopn = e.target.files[0];
                      if(fileopn){    
                      const storage = getStorage();
                      const storageRef = ref(storage, fileopn.name);
                      const uploadTask = uploadBytesResumable(storageRef, fileopn);
                      uploadTask.on('state_changed', 
                      (snapshot) => {
                        const progre = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setprogress4(progre)
                      }, 
                      (error) => {
                      }, 
                      () => {
                          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                          setprogress4(0);
                          setprojectitem({...projectitem,docs:{
                        ...projectitem.docs, file4:downloadURL
                          }})
                          });
                                  }
                        );
                         };}
                         const onfile5  = (e) =>
                          {    
                              const fileopn = e.target.files[0];
                              if(fileopn){    
                              const storage = getStorage();
                              const storageRef = ref(storage, fileopn.name);
                              const uploadTask = uploadBytesResumable(storageRef, fileopn);
                              uploadTask.on('state_changed', 
                              (snapshot) => {
                                const progre = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                setprogress5(progre)
                              }, 
                              (error) => {
                              }, 
                              () => {
                                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                  setprogress5(0);
                                  setprojectitem({...projectitem,docs:{
                                ...projectitem.docs, file5:downloadURL
                                  }})
                                  });
                                          }
                                );
                                 };}
                                 const onfile6  = (e) =>
                                  {    
                                      const fileopn = e.target.files[0];
                                      if(fileopn){    
                                      const storage = getStorage();
                                      const storageRef = ref(storage, fileopn.name);
                                      const uploadTask = uploadBytesResumable(storageRef, fileopn);
                                      uploadTask.on('state_changed', 
                                      (snapshot) => {
                                        const progre = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                        setprogress6(progre)
                                      }, 
                                      (error) => {
                                      }, 
                                      () => {
                                          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                          setprogress6(0);
                                          setprojectitem({...projectitem,docs:{
                                        ...projectitem.docs, file6:downloadURL
                                          }})
                                          });
                                                  }
                                        );
                                         };}
                                                    

  const add = async(e)=>{
    e.preventDefault()
    setprojectitem({...projectitem})
    console.log(projectitem)
   if(active==1){setprojects([...projects,projectitem]) }
  const docRef = await setDoc(doc(db, "projects", projectitem.id),projectitem);
  setprojectitem(init)
  }
// ---------------------------------------------------------------add & edie function --------------------------------------------------------------------
const form =()=>{
  switch(active){
    case 1:{ 
      return(
        <div className="newform-1 bs mx-0 bs fs-form rtl p-1 w-100">
        <form onSubmit={add}>
            <div className={`col-12 fs-5 text-dark text-center   `}>
              تفاصيل المشروع 
            </div>
            <div className="form-group  text-info">
             <label  htmlFor="formGroupExampleInput">اسم المشروع</label>
             <input type="text" className="mt-1 fs-form form-control" id="formGroupExampleInput" placeholder="اسم المشروع" required onChange={onname}/>
           </div>
           <div className="form-group text-info mt-1">
             <label htmlFor="formGroupExampleInput">رقم التعميد</label>
             <input type="text" className="mt-1 fs-form  form-control" id="formGroupExampleInput" placeholder="رقم التعميد" required onChange={onid}/>
           </div>
           <div className="form-group text-info mt-1">
             <label htmlFor="formGroupExampleInput">نطاق المشروع</label>
             <textarea type="text" className="mt-1 fs-form  form-control" id="formGroupExampleInput" placeholder="نطاق المشروع" required onChange={onscope}/>
           </div>
           <div className="form-group text-info mt-1">
             <label htmlFor="formGroupExampleInput">المنطقة</label>
             <input type="text" className="mt-1 fs-form  form-control" id="formGroupExampleInput" placeholder="المنطقة" required onChange={onregion}/>
           </div>
           <div className="form-group text-info mt-1">
             <label htmlFor="formGroupExampleInput">المحافظة</label>
             <input type="text" className="mt-1 fs-form  form-control" id="formGroupExampleInput" placeholder="المحافظة" required onChange={oncity}/>
           </div>
           <div className="form-group text-info mt-1">
             <label htmlFor="formGroupExampleInput">الموقع</label>
             <input type="url" className="mt-1 fs-form  form-control" id="formGroupExampleInput" placeholder="الموقع" required onChange={onlocation}/>
           </div>
           <div className="form-group rtl  mt-1 w-100 fs9">
              <label htmlFor="exampleFormControlSelect1"className="text-info"> الإدارة المالكة</label>
             <select className="form-control fs9 text-secondary mt-1"  id="exampleFormControlSelect1" required onChange={onowner}>
             <option  selected required>اختر</option>
            <option value={"الأثار"}>الأثار</option>
            <option value={"التراث العمراني"}>التراث العمراني</option>
            <option value={"التراث العالمي"}>التراث العالمي</option>
            </select>
        </div>
        <div className="form-group rtl  mt-1 w-100 fs-8">
              <label htmlFor="exampleFormControlSelect1"className="text-info"> مصدرالميزانية</label>
             <select className="form-control fs8 text-secondary mt-1" id="exampleFormControlSelect1"required onChange={onfinrecorse}>
             <option  selected required>اختر المصدر</option>
             <option value={"هيئة التراث"}>هيئة التراث</option>
             <option value={"برنامج خادم الحرمين"}>برنامج خادم الحرمين</option>
          </select>
        </div>
        <div className="form-group rtl  mt-1 w-100 fs-9">
              <label htmlFor="exampleFormControlSelect1"className="text-info">شركة المقاولات</label>
             <select className="form-control fs9 text-secondary mt-1 " id="exampleFormControlSelect1" required onChange={onconstractor}>
             <option  selected required>اختر الشركة</option>
            {
              contractors.map(x=>
                <option value={x.id}>{x.name}</option>
              )
            }
          </select>
        </div>
        <div className="form-group rtl  mt-1 w-100 fs-9">
              <label htmlFor="exampleFormControlSelect1"className="text-info">مدير المشروع</label>
             <select className="form-control fs9 text-secondary mt-1" id="exampleFormControlSelect1"required onChange={onmanger}>
             <option  selected required fs9 text-secondary mt-1>اختر مدير</option>
            {
              props.users.filter(x=>x.ref=="manger").map(x=>
                <option value={x.id}>{x.name}</option>
              )
            }
          </select>
        </div>
        <div className="form-group rtl  mt-0 w-100">
              <label htmlFor="exampleFormControlSelect1"className="text-info">ممثل الاستشاري</label>
             <select className="form-control fs9 text-secondary mt-1" id="exampleFormControlSelect1" required onChange={onteamuser}>
             <option  selected required>اختر مدير</option>
            {
              props.users.filter(x=>x.ref=="teamuser").map(x=>
                <option value={x.id}>{x.name}</option>
              )
            }
          </select>
        </div>
        <div className="form-group rtl  mt-1 w-100 fs-8">
              <label htmlFor="exampleFormControlSelect1"className="text-info">ممثل المقاول</label>
             <select className="form-control fs9 text-secondary mt-1" id="exampleFormControlSelect1"required onChange={oncontuser}>
             <option  selected required>اختر </option>
            {
              props.users.filter(x=>x.ref=="constarctor").map(x=>
                <option value={x.id}>{x.name}</option>
              )
            }
          </select>
        </div>
           <div className="form-group text-info mt-1">
             <label htmlFor="formGroupExampleInput">تاريخ البداية</label>
             <input type="date" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="تاريخ البداية" required  onChange={onstartdate}/>
           </div>
           <div className="form-group text-info mt-1">
             <label htmlFor="formGroupExampleInput">تاريخ النهاية</label>
             <input type="date" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="تاريخ النهاية" required  onChange={onenddate}/>
           </div>
           <div className="form-group text-info mt-1">
             <label htmlFor="formGroupExampleInput">مدة المشروع</label>
             <input type="text" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="مدة المشروع" required  onChange={onperiot}/>
           </div>
           <div className="form-group text-info mt-1">
             <label htmlFor="formGroupExampleInput">قيمة المشروع</label>
             <input type="text" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="قيمة المشروع"  required onChange={oncost}/>
           </div>
           <div className="form-group text-info mt-1">
             <label htmlFor="formGroupExampleInput">رابط الملفات</label>
             <input type="text" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="" required onChange={onarchive}/>
           </div>
           <div className="form-group text-info mt-1">
             <label htmlFor="formGroupExampleInput">تصحيح جدول زمني  </label>
             <input type="checkbox" className="mt-1 form-control fs-form w-25" id="formGroupExampleInput" placeholder=""  onChange={oncorrect}/>
           </div>
           <div className=" my-3 w-100 ms-auto p-4 newform-input required">
           <div className="input-group">
           <div className="custom-file w-100">
          <input type="file" className="custom-file-input" id="inputGroupFile04" required onChange={oncover}/>
          <label className="custom-file-label text-info" htmlFor="inputGroupFile04">ارفاق صورة الغلاف</label>
         </div>
      </div>   <div className="progress my-3 mx-auto w-75">
      <div className="progress-bar" role="progressbar" style={{width:` ${progress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress}</div>
      </div>
         </div>
      
      
      <div className=" my-2 w-100 ms-auto bg-lght custom-file w-100">
      <label className="custom-file-label text-info mx-2 w-100 p-2" htmlFor="inputGroupFile04">كراسة المشروع</label>
      <input className="custom-file-input" id="htmlFormFileLg" type="file" onChange={onfile1} />
      
         </div>
         
         <div className="progress mb-3 w-100">
         <div className="progress-bar" role="progressbar" style={{width:` ${progress1}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress1}</div>
         </div>
              
              <div className=" mb-3 w-100 ms-auto required">
      <label htmlhtmlFor="htmlFormFileLg" className="custom-file-label text-info mx-2 w-100 p-2"> تسليم الموقع</label>
         <input className="custom-file-input" id="htmlFormFileLg" type="file" onChange={onfile2} />
         </div>
         
         <div className="progress mb-3 w-100">
         <div className="progress-bar" role="progressbar" style={{width:` ${progress2}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress2}</div>
      </div>
              
              <div className=" mb-3 w-100 ms-auto required">
      <label htmlhtmlFor="htmlFormFileLg" className="custom-file-label text-info mx-2 w-100 p-2">العقد</label>
         <input className="custom-file-input" id="htmlFormFileLg" type="file"  onChange={onfile3}/>
         </div>
         
         <div className="progress mb-3 w-100">
         <div className="progress-bar" role="progressbar" style={{width:` ${progress3}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress3}</div>
      </div>
              
              <div className=" mb-3 w-100 ms-auto required">
      <label htmlhtmlFor="htmlFormFileLg" className="custom-file-label text-info mx-2 w-100 p-2">أوامر التغير</label>
         <input className="custom-file-input" id="htmlFormFileLg" type="file"  onChange={onfile4} />
         </div>
         
         <div className="progress mb-3 w-100">
         <div className="progress-bar" role="progressbar" style={{width:` ${progress4}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress4}</div>
      </div>
              
              <div className=" mb-3 w-100 ms-auto required">
      <label htmlhtmlFor="htmlFormFileLg" className="custom-file-label text-info mx-2 w-100 p-2">لاستلام الابتدائي</label>
         <input className="custom-file-input" id="htmlFormFileLg" type="file"  onChange={onfile5} />
         </div>
         
         <div className="progress mb-3 w-100">
         <div className="progress-bar" role="progressbar" style={{width:` ${progress5}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress5}</div>
      </div>
             
              <div className=" mb-3 w-100 ms-auto required">
      <label htmlhtmlFor="htmlFormFileLg" className="custom-file-label text-info mx-2 w-100 p-2">الاستلام النهائي</label>
         <input className="custom-file-input" id="htmlFormFileLg" type="file"  onChange={onfile6} />
         </div>
         
         <div className="progress mb-3 w-100">
         <div className="progress-bar" role="progressbar" style={{width:` ${progress6}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress6}</div>
      </div>
              
      
          <div className="rtl mt-2 p-3">
          <input className=" btn px-3 mx-3 bttn btn-sm btn-info"  type="submit" value="إرسال" />
          <button type="button" className="btn bttn btn-secondary px-3 btn-sm"onClick={()=>{setactive(0);setprojectitem({})}} >إلغاء</button>
         </div>
         
         </form>
      
      </div>
      )
    }
    break;
    case 2 :{ return (
      <div className="newform-1 bs mx-0 bs fs-form rtl p-1 w-100">
      <form onSubmit={add}>
          <div className={`col-12 fs-5 text-dark text-center   `}>
            تفاصيل المشروع 
          </div>
          <div className="form-group  text-info">
           <label  htmlFor="formGroupExampleInput">اسم المشروع</label>
           <input type="text" className="mt-1 fs-form form-control" id="formGroupExampleInput" placeholder="اسم المشروع"  onChange={onname}/>
         </div>
         <div className="form-group text-info mt-1">
           <label htmlFor="formGroupExampleInput">رقم التعميد</label>
           <input type="text" className="mt-1 fs-form  form-control" id="formGroupExampleInput" placeholder="رقم التعميد"  onChange={onid}/>
         </div>
         <div className="form-group text-info mt-1">
           <label htmlFor="formGroupExampleInput">نطاق المشروع</label>
           <textarea type="text" className="mt-1 fs-form  form-control" id="formGroupExampleInput" placeholder="نطاق المشروع"  onChange={onscope}/>
         </div>
         <div className="form-group text-info mt-1">
           <label htmlFor="formGroupExampleInput">المنطقة</label>
           <input type="text" className="mt-1 fs-form  form-control" id="formGroupExampleInput" placeholder="المنطقة"  onChange={onregion}/>
         </div>
         <div className="form-group text-info mt-1">
           <label htmlFor="formGroupExampleInput">المحافظة</label>
           <input type="text" className="mt-1 fs-form  form-control" id="formGroupExampleInput" placeholder="المحافظة"  onChange={oncity}/>
         </div>
         <div className="form-group text-info mt-1">
           <label htmlFor="formGroupExampleInput">الموقع</label>
           <input type="url" className="mt-1 fs-form  form-control" id="formGroupExampleInput" placeholder="الموقع"  onChange={onlocation}/>
         </div>
         <div className="form-group rtl  mt-1 w-100 fs9">
            <label htmlFor="exampleFormControlSelect1"className="text-info"> الإدارة المالكة</label>
           <select className="form-control fs9 text-secondary mt-1"  id="exampleFormControlSelect1"  onChange={onowner}>
           <option  selected >اختر</option>
          <option value={"الأثار"}>الأثار</option>
          <option value={"التراث العمراني"}>التراث العمراني</option>
          <option value={"التراث العالمي"}>التراث العالمي</option>
          </select>
      </div>
      <div className="form-group rtl  mt-1 w-100 fs-8">
            <label htmlFor="exampleFormControlSelect1"className="text-info"> مصدرالميزانية</label>
           <select className="form-control fs8 text-secondary mt-1" id="exampleFormControlSelect1" onChange={onfinrecorse}>
           <option  selected >اختر المصدر</option>
           <option value={"هيئة التراث"}>هيئة التراث</option>
           <option value={"برنامج خادم الحرمين"}>برنامج خادم الحرمين</option>
        </select>
      </div>
      <div className="form-group rtl  mt-1 w-100 fs-9">
            <label htmlFor="exampleFormControlSelect1"className="text-info">شركة المقاولات</label>
           <select className="form-control fs9 text-secondary mt-1 " id="exampleFormControlSelect1"  onChange={onconstractor}>
           <option  selected >اختر الشركة</option>
          {
            contractors.map(x=>
              <option value={x.id}>{x.name}</option>
            )
          }
        </select>
      </div>
      <div className="form-group rtl  mt-1 w-100 fs-9">
            <label htmlFor="exampleFormControlSelect1"className="text-info">مدير المشروع</label>
           <select className="form-control fs9 text-secondary mt-1" id="exampleFormControlSelect1" onChange={onmanger}>
           <option  selected  fs9 text-secondary mt-1>اختر مدير</option>
          {
            props.users.filter(x=>x.ref=="manger").map(x=>
              <option value={x.id}>{x.name}</option>
            )
          }
        </select>
      </div>
      <div className="form-group rtl  mt-0 w-100">
            <label htmlFor="exampleFormControlSelect1"className="text-info">ممثل الاستشاري</label>
           <select className="form-control fs9 text-secondary mt-1" id="exampleFormControlSelect1"  onChange={onteamuser}>
           <option  selected >اختر مدير</option>
          {
            props.users.filter(x=>x.ref=="teamuser").map(x=>
              <option value={x.id}>{x.name}</option>
            )
          }
        </select>
      </div>
      <div className="form-group rtl  mt-1 w-100 fs-8">
            <label htmlFor="exampleFormControlSelect1"className="text-info">ممثل المقاول</label>
           <select className="form-control fs9 text-secondary mt-1" id="exampleFormControlSelect1" onChange={oncontuser}>
           <option  selected >اختر </option>
          {
            props.users.filter(x=>x.ref=="constarctor").map(x=>
              <option value={x.id}>{x.name}</option>
            )
          }
        </select>
      </div>
         <div className="form-group text-info mt-1">
           <label htmlFor="formGroupExampleInput">تاريخ البداية</label>
           <input type="date" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="تاريخ البداية"   onChange={onstartdate}/>
         </div>
         <div className="form-group text-info mt-1">
           <label htmlFor="formGroupExampleInput">تاريخ النهاية</label>
           <input type="date" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="تاريخ النهاية"   onChange={onenddate}/>
         </div>
         <div className="form-group text-info mt-1">
           <label htmlFor="formGroupExampleInput">مدة المشروع</label>
           <input type="text" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="مدة المشروع"   onChange={onperiot}/>
         </div>
         <div className="form-group text-info mt-1">
           <label htmlFor="formGroupExampleInput">قيمة المشروع</label>
           <input type="text" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder="قيمة المشروع"   onChange={oncost}/>
         </div>
         <div className="form-group text-info mt-1">
           <label htmlFor="formGroupExampleInput">رابط الملفات</label>
           <input type="text" className="mt-1 form-control fs-form" id="formGroupExampleInput" placeholder=""  onChange={onarchive}/>
         </div>
         <div className="form-group text-info mt-1">
           <label htmlFor="formGroupExampleInput">تصحيح جدول زمني  </label>
           <input type="checkbox" className="mt-1 form-control fs-form w-25" id="formGroupExampleInput" placeholder=""  onChange={oncorrect}/>
         </div>
         <div className=" my-3 w-100 ms-auto p-4 newform-input ">
         <div className="input-group">
         <div className="custom-file w-100">
        <input type="file" className="custom-file-input" id="inputGroupFile04"  onChange={oncover}/>
        <label className="custom-file-label text-info" htmlFor="inputGroupFile04">ارفاق صورة الغلاف</label>
       </div>
    </div>   <div className="progress my-3 mx-auto w-75">
    <div className="progress-bar" role="progressbar" style={{width:` ${progress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress}</div>
    </div>
       </div>
    
    
    <div className=" my-2 w-100 ms-auto bg-lght custom-file w-100">
    <label className="custom-file-label text-info mx-2 w-100 p-2" htmlFor="inputGroupFile04">كراسة المشروع</label>
    <input className="custom-file-input" id="htmlFormFileLg" type="file" onChange={onfile1} />
    
       </div>
       
       <div className="progress mb-3 w-100">
       <div className="progress-bar" role="progressbar" style={{width:` ${progress1}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress1}</div>
       </div>
            
            <div className=" mb-3 w-100 ms-auto ">
    <label htmlhtmlFor="htmlFormFileLg" className="custom-file-label text-info mx-2 w-100 p-2"> تسليم الموقع</label>
       <input className="custom-file-input" id="htmlFormFileLg" type="file" onChange={onfile2} />
       </div>
       
       <div className="progress mb-3 w-100">
       <div className="progress-bar" role="progressbar" style={{width:` ${progress2}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress2}</div>
    </div>
            
            <div className=" mb-3 w-100 ms-auto required">
    <label htmlhtmlFor="htmlFormFileLg" className="custom-file-label text-info mx-2 w-100 p-2">العقد</label>
       <input className="custom-file-input" id="htmlFormFileLg" type="file"  onChange={onfile3}/>
       </div>
       
       <div className="progress mb-3 w-100">
       <div className="progress-bar" role="progressbar" style={{width:` ${progress3}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress3}</div>
    </div>
            
            <div className=" mb-3 w-100 ms-auto required">
    <label htmlhtmlFor="htmlFormFileLg" className="custom-file-label text-info mx-2 w-100 p-2">أوامر التغير</label>
       <input className="custom-file-input" id="htmlFormFileLg" type="file"  onChange={onfile4} />
       </div>
       
       <div className="progress mb-3 w-100">
       <div className="progress-bar" role="progressbar" style={{width:` ${progress4}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress4}</div>
    </div>
            
            <div className=" mb-3 w-100 ms-auto required">
    <label htmlhtmlFor="htmlFormFileLg" className="custom-file-label text-info mx-2 w-100 p-2">لاستلام الابتدائي</label>
       <input className="custom-file-input" id="htmlFormFileLg" type="file"  onChange={onfile5} />
       </div>
       
       <div className="progress mb-3 w-100">
       <div className="progress-bar" role="progressbar" style={{width:` ${progress5}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress5}</div>
    </div>
           
            <div className=" mb-3 w-100 ms-auto required">
    <label htmlhtmlFor="htmlFormFileLg" className="custom-file-label text-info mx-2 w-100 p-2">الاستلام النهائي</label>
       <input className="custom-file-input" id="htmlFormFileLg" type="file"  onChange={onfile6} />
       </div>
       
       <div className="progress mb-3 w-100">
       <div className="progress-bar" role="progressbar" style={{width:` ${progress6}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress6}</div>
    </div>
            
    
        <div className="rtl mt-2 p-3">
        <input className=" btn px-3 mx-3 bttn btn-sm btn-info"  type="submit" value="إرسال" />
       <button type="button" className="btn bttn btn-secondary px-3 btn-sm"onClick={()=>{setactive(0);setprojectitem({})}} >إلغاء</button>
       </div>
       
       </form>
    
    </div>
    )}
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
        <button type="button" className="btn btn-info text-light m-2 add-admin px-5 btn-sm " onClick={()=>{setactive(1);setproject(init)}}>إضــافة  <i className="fas text-light mx-2 fa-plus"></i> </button>
        <div className="form-group rtl add-admin mt-0 w-25">
        <label htmlFor="exampleFormControlSelect1"></label>
       <select className="form-control" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
  <div className="row bs m-0  w-100">
   {/* --------form------------------------------------------------------------------------------------------- */}
  <div className="m-0 bs p-2 col-4 scrol vhc">
{form()}
   </div>
   {/* --------show detail------------------------------------------------------------------------------------------- */}
   <div className="m-0 bs p-2 col-5 scrol vhc">
        <div className="   p-1 mt-1  mx-0 bs row">
        <i className="fas fa-edit pointer text-start col-1 p-1" onClick={()=>{setactive(2); setprojectitem(project)}}></i>
         <div className="m-auto text-center w-100">
         <img className="w-100 "src={project.cover} alt="" />
         <p className="  text-end text-danger  w-100 text-end">{project.name}</p>
       </div>
       </div>
       <div className="   p-1 mt-1  mx-0   bs row">
         <p className=" bg6 text-start  col-8"> {project.id}</p>
         <p className="  text-start  col-3">رقم التعميد</p>
         <i className="fas fa-key text-start col-1 p-1"></i>
         <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-12">  {project.scope}</p>
       </div>
       </div> 
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-8">  {project.case}</p>
         <p className="  text-start  col-3">حالة المشروع</p>
         <i className="fas fa-map text-start col-1 p-1"></i>
       </div> 
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-8">  {project.region}</p>
         <p className="  text-start  col-3">المنطقة</p>
         <i className="fas fa-map text-start col-1 p-1"></i>
       </div> 
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-8">  {project.city}</p>
         <p className="  text-start  col-3"> المحافظة</p>
         <i className="fas fa-map text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
       <p className=" bg6 text-start  col-8"> {project.location}</p>
         <p className="  text-start  col-3"> الموقع </p>
         <i className="fas fa-map text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-8">  {project.finrecorse}</p>
         <p className="  text-start  col-3">مصدر الميزانية</p>
         <i className="fas fa-dollar-sign text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-8">{project.manger} </p>
         <p className="  text-start  col-3"> مدير المشروع </p>
         <i className="fas fa-user text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-8"> {project.contractor}</p>
         <p className="  text-start  col-3"> المقاول </p>
         <i className="fas fa-archway text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-8"> {project.teamuser}</p>
         <p className="  text-start  col-3">   استشاري </p>
         <i className="fas fa-user text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-8"> {project.contuser}</p>
         <p className="  text-start  col-3">  ممثل المقاول </p>
         <i className="fas fa-user text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-8">{project.owner} </p>
         <p className="  text-start  col-3">الإدارة المالكة </p>
         <i className="fas fa-archway text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
        <p className=" bg6 text-start  col-8"> {project.startdate}</p>
        <p className="  text-start  col-3">تاريخ البداية </p>
         <i className="fas fa-calendar-alt text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-8"> {project.Denddate}</p>
         <p className="  text-start  col-3">  تاريخ النهاية </p>
         <i className="fas fa-calendar-alt text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-8"> {project.periot}</p>
         <p className="  text-start  col-3">  مدة المشروع</p>
         <i className="fas fa-calendar-alt text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-8"> {project.cost}</p>
         <p className=" text-start  col-3"> قيمة المشروع</p>
         <i className="fas fa-dollar-sign text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
       <p className=" bg6 text-start  col-8"> {project.extract?"":"لايوجد"}</p>
         <p className="  text-start text-success col-3">  المستخلصات</p>
         <i className="fas fa-dollar-sign text-start col-1 p-1"></i>
       </div>
       {
        project.extract?
        project.extract.map(x=>
          <div className="   p-1 mt-1  mx-0 bs row">
          <p className="  text-end bg-success text-light p-1  col-5">{x.value}</p>
          <p className="  text-end bg-success text-light p-1  col-4">{x.code}</p>
          <p className="  text-end bg-success text-light p-1  col-3">{x.case}</p>
        </div>
        ):""
       }
        <div className="   p-1 mt-1  mx-0 bs row">
       <p className=" bg6 text-start  col-8"> {project.orders?"":"لايوجد"}</p>
         <p className="  text-start text-success col-3">  أوامرالتغيير</p>
         <i className="fas fa-dollar-sign text-start col-1 p-1"></i>
       </div>
       {
        project.orders?
          <div className="   p-1 mt-1  mx-0 bs row">
          <p className="  text-end bg-success text-light p-1  col-5">{project.orders.value}</p>
          <p className="  text-end bg-success text-light p-1  col-4">{project.orders.enddate}</p>
          <p className="  text-end bg-success text-light p-1  col-3">{project.orders.periot}</p>
        </div>
        :""
       }  
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-8">  {project.correct?`يوجد بتاريخ ${project.correct}`:"لايوجد"}</p>
         <p className="  text-start  col-3">تصحيح  جدول </p>
         <i className="fas fa-file text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <p className=" bg6 text-start  col-8"> {project.archive}</p>
         <p className="  text-start  col-3"> رابط الملفات</p>
         <i className="fas fa-file text-start col-1 p-1"></i>
       </div>
       <div className="   p-1 mt-1  mx-0 bs row">
         <i className="fas fa-folder text-start col-1 p-1"></i>
         <p className="  text-end text-success  col-11">المستندات التعاقدية</p>
       </div>  
       {project.docs?
       <div className=" p-1 mt-1  mx-0 bs ">
       {project.docs.file1?
         <div className="   p-1 mt-1  mx-0 bs row">
         <i className="fas fa-link text-start col-1 p-1"></i>
         <p className="  text-end bg-success text-light p-1  col-9">  <a href={project.docs.file1}>كراسة المشروع</a></p>
       </div>:
       <div className="   p-1 mt-1  mx-0 bs row">
       <i className="fas fa-link text-start col-1 p-1"></i>
       <p className="  text-end bg-secondary  text-light p-1  col-9">كراسة المشروع</p>
     </div>
       } 
        {project.docs.file2?
         <div className="   p-1 mt-1  mx-0 bs row">
         <i className="fas fa-link text-start col-1 p-1"></i>
         <p className="  text-end bg-success text-light p-1  col-9">  <a href={project.docs.file2}>تسليم الموقع</a></p>
       </div>:
       <div className="   p-1 mt-1  mx-0 bs row">
       <i className="fas fa-link text-start col-1 p-1"></i>
       <p className="  text-end bg-secondary  text-light p-1  col-9">تسليم الموقع</p>
     </div>
       } 
      {project.docs.file3?
         <div className="   p-1 mt-1  mx-0 bs row">
         <i className="fas fa-link text-start col-1 p-1"></i>
         <p className="  text-end bg-success text-light p-1  col-9">  <a href={project.docs.file3}>العقد</a></p>
       </div>:
       <div className="   p-1 mt-1  mx-0 bs row">
       <i className="fas fa-link text-start col-1 p-1"></i>
       <p className="  text-end bg-secondary  text-light p-1  col-9">العقد</p>
     </div>
       } 
         {project.docs.file4?
         <div className="   p-1 mt-1  mx-0 bs row">
         <i className="fas fa-link text-start col-1 p-1"></i>
         <p className="  text-end bg-success text-light p-1  col-9">  <a href={project.docs.file4}>أوامرالتغير</a></p>
       </div>:
       <div className="   p-1 mt-1  mx-0 bs row">
       <i className="fas fa-link text-start col-1 p-1"></i>
       <p className="  text-end bg-secondary  text-light p-1  col-9">أوامر التغيير</p>
     </div>
       } 
      {project.docs.file5?
         <div className="   p-1 mt-1  mx-0 bs row">
         <i className="fas fa-link text-start col-1 p-1"></i>
         <p className="  text-end bg-success text-light p-1  col-9">  <a href={project.docs.file5}>المستخلصات</a></p>
       </div>:
       <div className="   p-1 mt-1  mx-0 bs row">
       <i className="fas fa-link text-start col-1 p-1"></i>
       <p className="  text-end bg-secondary  text-light p-1  col-9">المستخلصات</p>
     </div>
       } 
         {project.docs.file5?
         <div className="   p-1 mt-1  mx-0 bs row">
         <i className="fas fa-link text-start col-1 p-1"></i>
         <p className="  text-end bg-success text-light p-1  col-9">  <a href={project.docs.file6}>استلام الابتدائي</a></p>
       </div>:
       <div className="   p-1 mt-1  mx-0 bs row">
       <i className="fas fa-link text-start col-1 p-1"></i>
       <p className="  text-end bg-secondary  text-light p-1  col-9">الاستلام الابتدائي</p>
     </div>
       }
        </div> :""   }
   </div>
   {/* --------show contarctor------------------------------------------------------------------------------------------- */}
   <div className="m-0 bs p-2 col-3 scrol vhc">
           { projects.map((x)=>
         <div className=" pointer bg-secondary text-light  p-2 mt-1  mx-0 bs row" onClick={()=>{setproject(x);setactive(0);}}>
         <i className="fas fa-user text-start col-1 p-1"></i>
         <p className="  text-end  col-11"> {x.name}</p>
       </div>) }
   </div>
  </div>  
  
</div>
     );
}
 
export default Project;