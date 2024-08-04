import Head from "next/head";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from "react";
import Image from 'next/image'
import { useAppContext } from "../AppContext";
import { useRouter } from "next/router";

const Cards = (props) => {

    return (  
        <div className=" p-1 cards  row mx-auto rtl bs mt-3">
        <Head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>

        </Head>


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" 
crossOrigin="anonymous">
</script>
         <div className="col-6 col-lg-2 p-2 ">
        <p className="text-center bg-cards h3 fs-3 p-2 mt-1 ">{props.data.filter(x=>x.ction=="0").length?props.data.filter(x=>x.ction=="0").length:0}</p>
        <p className="text-center border-card py-3 box p-1 text-light bg0 box ">طلبات جديدة <i className="far fa-file-alt me-3"></i></p>
        </div>
        <div className="col-6 col-lg-2 p-2 ">
        <p className="text-center h3 bg-cards fs-3 p-2 mt-1 ">{props.data.filter(x=>x.ction=="1").length?props.data.filter(x=>x.ction=="1").length:0}</p>
        <p className="text-center border-card py-3 box p-1 text-light  bg1">تحت الاجراء<i className="far fa-file-alt me-3"></i></p>
        </div>   
        <div className="col-6 col-lg-2 p-2 ">
        <p className="text-center h3 bg-cards fs-3 haaa1 p-2 mt-1 ">{props.data.filter(x=>x.ction=="2").length?props.data.filter(x=>x.ction=="2").length:0}</p>
        <p className="text-center border-card py-3  box p-1 text-light bg3  ">تم الاعتماد<i className="far fa-file-alt me-3"></i></p>
        </div> 
        <div className="col-6 col-lg-2 p-2 ">
        <p className="text-center h3 bg-cards fs-3 haaa2 p-2 mt-1 ">{props.data.filter(x=>x.ction=="3").length?props.data.filter(x=>x.ction=="3").length:0}</p>
        <p className="text-center border-card py-3 box p-1 text-light bg4 ">معاد تقديمه<i className="far fa-file-alt me-3"></i></p>
        </div>
        <div className="col-6 col-lg-2 p-2 ">
        <p className="text-center h3 bg-cards fs-3 haaa3 p-2 mt-1 ">{props.data.length?props.data.length:0}</p>
        <p className="text-center border-card  py-3 box p-1 text-light bg2">جميع الطلبات <i className="far fa-file-alt me-3"></i></p>
        </div>
        <div className="col-6 col-lg-2 p-2 ">
        <p className="text-center h3 bg-cards fs-3 p-2 mt-1 ">{props.data.filter(x=>x.ction=="5").length?props.data.filter(x=>x.ction=="5").length:0}</p>
        <p className="text-center box  border-card py-3 p-1 text-light bg-secondary ">تمت الأرشفة <i className="far fa-file-alt me-3"></i></p>
        </div>
</div>
    );
}
 
export default Cards;