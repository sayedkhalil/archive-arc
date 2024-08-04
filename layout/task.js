import Head from "next/head";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from "react";
import Image from 'next/image'
import { useAppContext } from "../AppContext";
import { useRouter } from "next/router";

const Task = (props) => {
// backgroun task title
const[task_bg,settask_bg]=useState("bg0")


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
    // ----------------------------------------------------------
   const onedit=()=>{
    props.setactive("active1")
    props.setdiv(1)
    props.setetit_request(props.data)
   }
    return (  
        <div className=" p-1 w-100">
        <Head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>

        </Head>


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" 
crossOrigin="anonymous">
</script>
<div className=" w-100 task-shadow row">
<div className={`col-12 p-2 task-title ${task_bg} row`}>
<p className="col-8  text-light">{props.data.id}</p>
<p className="col-4  bg-light bs h-100 text-center text-dark rounded m-0">{props.data.version}</p>
</div>
<div className={`col-12 p-2 text-info text-center  border-bottom task-name `}>
{props.data.name}
</div>
<div className={`col-12 p-2 text-dark text-start task-name1 `}>
{props.data.title}
</div>
<div className={`col-12 p-2 text-info text-start task-body p-1  `}>
    <div className=" w-100 row task-body1 p-1 rounded">
    {   
    props.data.notes.map(x=>
        <div className=" w-100 row note-task mx-0 mt-1  ">
        <i className="fas  fa-user fa-lg  px-2  col-1"></i>
        <p className=" px-3 col-11 text-dark ">{props.data.notes[0].name}</p>
        <p className=" p-1 col-12 text-success ">   
            {x.note}
        </p>
        <p className=" p-1 col-12 text-secondary text-end ">    
        {x.date}
        </p>
        </div>
                    )
       }
    </div>
</div>
<div className={`col-12 p-2  text-start task-fotter row `}>
<p className="col-2  text-secondary pointer "> <i className="fas w-100 fa-edit fa-lg" onClick={onedit}></i></p>
<div className="col-4  bs  m-0   row">
    <a className=" col-6 text-secondary fs9 text-end" href=""><i className="fas fa-paperclip"></i></a>
</div>
<p className="col-6 text-fotter-p bg-light bs h-100 text-center text-dark rounded m-0">تحت الاجراء </p>
</div>
</div>
 
</div>
    );
}
 
export default Task;