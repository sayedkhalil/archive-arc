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
import { sendEmail } from "../mailjet";

const NewForm = (props) => {
  const [active ,setactive]=useState(0)
  const[task,settask]=useState({})
  const[requisites,setrequisites]=useState(props.requisites.filter(x=>x.send ==props.user.ref))
  const[note,setnote]=useState({})
  const[mention,setmention]=useState(()=>{ if (props.user.ref =="constarctor") { return(
    props.project.teamuser )
   }else{return('')}})
  const[progress,setprogress]=useState(0)
  const[code,setcode]=useState(0)
  const v=0
 
  // --------------------------------------------------------------------- chose requisite-----------------------------------
  const onreq =async(e)=>{
  const   req = requisites.find(x=>x.id == e.target.value);   
 
  if(req.chose==0){
    const arshivelist = collection(db, `arshive\/${props.project.id}\/${req.path}`);
    const arshivesnapshot = await getDocs(arshivelist);
    const arshive =   await arshivesnapshot.docs?arshivesnapshot.docs.map(doc =>(doc.data())):[] ;
      
        settask({...task,code:`${props.project.id}-${req.id}-${arshive.length}`,path: `arshive\/${props.project.id}\/${req.path}`,action:"0",
          init:props.user.name,date:new Date(),project:props.project.name,projectId:props.project.id,version:`v0${v}`,tags:[props.user.id],mention:mention})
        setactive(0)
  }
  else{
    setcode(e.target.value)
    setactive(1)
    }
  }
  // --------------------------------------------------------------------- chose kind-----------------------------------

  const onkind =async(e)=>{
    const   req = requisites.find(x=>x.id == code);   
    const arshivelist = collection(db, `arshive\/${props.project.id}\/${req.path}${e.target.value}\/${code}`);
    const arshivesnapshot = await getDocs(arshivelist);
    const arshive =   await arshivesnapshot.docs?arshivesnapshot.docs.map(doc =>(doc.data())):[] ;
      
     settask({...task,code:`${props.project.id}-${req.id}-${arshive.length}`,path: `arshive\/${props.project.id}\/${req.path}${e.target.value}\/${code}`,action:"0",
          init:props.user.name,date:new Date(),project:props.project.name,projectId:props.project.id,version:`v0${v}`,tags:[props.user.id],mention:mention})
  }
  // --------------------------------------------------------------------- chose comment-----------------------------------

const onnots =(e)=>{    
setnote({...note,name:props.user.name,note:e.target.value,date:new Date()})  
settask({...task,notes:[note]})
}
  // --------------------------------------------------------------------- chose title-----------------------------------
  const ontitle =(e)=>{    
  settask({...task,title:e.target.value})  
  }
  // --------------------------------------------------------------------- file-----------------------------------
  const onfile  = (e) =>
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
            setnote({...note,file:downloadURL})
            settask({...task,file:downloadURL,notes:[note]})
            });
                    }
                  );
                  };}
  // ---------------------------------------------------------------------send-----------------------------------

      const onsend=async(e)=>{
        e.preventDefault()
        console.log(task)
        const docRef = await setDoc(doc(db, "requisite", task.code),task);
        const email =props.users.find(x=>x.id==task.mention)
        try {
          await sendEmail({
            to: 'sayedkhalil992@gmail.com',
            from: "syednoman@saudiarc.com",
            subject: 'Hello from Next.js',
            message: 'This is a test email sent from Next.js using Mailjet.',
          });
          console.log('Email sent successfully!');
        } catch (error) {
          console.error('Error sending email:', error);
          // Handle error
        }
      }
                  
  // ---------------------------------------------------------------------canseled-----------------------------------
const onnoactive=()=>{
  props.setactive("active0")
}    

    // ----------------------------------------------------------

    return (  
        <div className=" new-form w-100">
        <Head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>

        </Head>


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" 
crossOrigin="anonymous">
</script>
<div className=" w-100 h-100 m-0 bs row">
  <div className={`col-12 p-2 task-title bg-newform row`}>
      <p className="col-11 text-center  ">طلب جديد</p>
      <i className="fas col-1 text-dark fa-arrow-circle-left fa-lg pointer" onClick={onnoactive}></i>
  </div>
<div className="newform-1 bs mx-auto mt-4 p-5">
  <form onSubmit={onsend}>
      <div className={`col-12 text-dark text-center   `}>
             تفاصيل الطلب  
      </div>
    <div className="form-group text-dark fs9 mt-3">
    <label htmlFor="exampleFormControlSelect1 "className="text-info m-1">اختار الطلب</label>
    <select className="form-control" id="exampleFormControlSelect1" onChange={onreq} required>
    <option selected disabled className="text-secondary mt-1 fs9">اختر الطلب</option>
    {  requisites.map(x=>
            <option value={x.id} className="text-secondary mt-1  fs9">{x.name}</option>

    ) }

    </select>
    </div>
  {
active==1?

<div className="form-group text-dark mt-3">
  <label htmlFor="exampleFormControlSelect1 "className="text-info m-1">اختار الطلب</label>
  <select className="form-control" id="exampleFormControlSelect1" required onChange={onkind}>
  <option selected disabled className="text-secondary mt-1 fs9">اخترالنوع</option>
  <option value="STR" className="text-secondary mt-1  fs9">إنشائي</option>
  <option value="ARCH" className="text-secondary mt-1  fs9">معماري</option>
  <option value="MECH" className="text-secondary mt-1  fs9">ميكانيكا</option>
  <option value="ELEC" className="text-secondary mt-1  fs9">كهرباء</option>
  <option value="LS" className="text-secondary mt-1  fs9">لاند سكيب</option>
  <option value="HS" className="text-secondary mt-1  fs9">هارد سكيب</option>
  <option value="SUR" className="text-secondary mt-1  fs9">مساحة</option>
  <option value="ge" className="text-secondary mt-1  fs9">عام</option>
  </select>
  </div>

  :""
}
  <div className="form-group  text-info">
       <label  htmlFor="formGroupExampleInput">منطوق الطلب</label>
       <input type="text" className="mt-1 fs-form form-control" id="formGroupExampleInput" placeholder="منطوق الطلب" required value={task.title}  onChange={ontitle}/>
     </div>
    <div className="form-group mt-3">
    <label htmlFor="exampleFormControlTextarea1 text secondary h6">اكتب ملاحظات</label>
    <textarea className="form-control mt-2" id="exampleFormControlTextarea1" rows="3" required onChange={onnots} value={note.note} ></textarea>
  </div>
  <div className=" my-3 w-100 ms-auto p-4 newform-input required">
<div className="input-group">
  <div className="custom-file w-100">
    <input type="file" className="custom-file-input" id="inputGroupFile04" onChange={onfile}/>
    <label className="custom-file-label" htmlFor="inputGroupFile04">ارفاق الملفات</label>
   
  </div>
</div>   <div className="progress my-3 mx-auto w-75">
<div className="progress-bar" role="progressbar" style={{width:` ${progress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress}</div>
</div>
  <div className="w-100 mt-3 p-2 text-right note-newform text-danger text-secondary">
      <p>  <i className="fas fa-info text-dark mx-2"></i>
      لابد من إرفاق الطلب مع المرفقات في ملف بي دي  اف واحد</p>
      <a href="https://www.ilovepdf.com/ar" target="blank"> <i className="fas fa-info text-dark mx-2"></i> استخدم هذا الموقع في الدمج<i className="fas text-info mx-2 fa-link"></i></a>
    </div>
   </div>
    <div className="rtl mt-2 p-3">
    <input className=" btn px-3 mx-3 bttn btn-sm btn-info"  type="submit" value="إرسال" />
   <button type="button" className="btn bttn btn-secondary px-3 btn-sm" onClick={onnoactive}>إلغاء</button>
   </div>
</form>
</div>
</div> 
</div>
    );
}
 
export default NewForm;