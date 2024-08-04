import React, { useState } from 'react';
import Head from "next/head";
import { useRouter } from "next/router"
import Link from "next/link";
import { db, storage } from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc, query, where} from "firebase/firestore";
const Login = () => {
    const [mail, setmail] = useState("");
    const [pass, setpass] = useState("");
    const [error, setError] = useState('');
    const router = useRouter("https://arch-rouge.vercel.app/")
    const handlename = (e) => {
      setmail(e.target.value);
      setError('');
    };
    const handlepass = (e) => {
        setpass(e.target.value);
        setError('');
      };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
     
    var docRef = doc(db, "user", pass);
    const infoSnap = await getDoc(docRef)
    if(infoSnap.data().email==mail){
      localStorage.setItem("id",infoSnap.data().id)
      window.location = 'http://localhost:3000/'
    }
     else{
        alert("تأكد من صحة البريد والرقم السري")
     }
    };
  
    return (
<div className='w-100 m-0 bs row'>
                <Head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
   <title>مشروع الدعم الفني</title>
   <link rel="icon" href="" type="image/x-icon" />
   <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Almarai&display=swap" rel="stylesheet"></link>
        <meta name="google-site-verification" content="_OtuybINzdg_u7HN4n2xCk83du_TC8CdaKcPR0p-2Bg" />
        </Head>
<div className="col-6 position-relative rtl p-5 "> 
<div className=" form-login w-75 m-auto p-5">
        <div className="my-5  row w-100">
          
        <img  src="l1.png"alt="" width="50" height="50" className="d-inline-block w-50 m-auto align-text-top" autoComplete="on"/>
        <form onSubmit={handleSubmit}className="my-5 w-100 ">
  <div className="form-group">
    <label className='m-2 ' htmlFor="exampleInputEmail1">البريد الإلكتروني</label>
    <input type="email" className="form-control"   onChange={handlename} placeholder="Enter email"/>
    
  </div>
  <div className="form-group mt-3">
    <label className='m-2 ' htmlFor="exampleInputPassword1">كلمة المرور</label>
    <input type="password" className="form-control"  placeholder="Password" autoComplete="on" onChange={handlepass}/>
  </div>

  <button type="submit"  className="btn w-100 mt-3 btn-secondary">تسجيل الدخول</button>
  <p className="form__error">{error}</p>
</form>

        
</div>  
      </div></div>
      <div className="col-6 bg-info bg-login vh">
        <div className="trans w-100 h-100 m-0 p-5 bs">
         <p className='text-light p-5 text-center fs-4 mid w-100 m-auto bs'> هو لوحة تم تنفيذها وتطويرها بواسطة مركز المشاريع التراثية  تقوم من خلالها بإدارة كافة المشاريع وتحليل بياناتها واستعراض سير المشروع بالإضافة لإدارة المهام والأرشفة</p>
        </div>
      </div>


  </div>
    );
}
 
export default Login;