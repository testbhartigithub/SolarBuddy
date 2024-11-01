import { getData, serverurl  , postData} from "../../services/fetchnodeservices"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom"
import { useState,useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function CategoryComponent(props){

    let theme = useTheme()
    const matches1=useMediaQuery(theme.breakpoints.down('md'))
    const matches2=useMediaQuery(theme.breakpoints.down('sm'))
    const matches3=useMediaQuery(theme.breakpoints.down(450))
    const navigate=useNavigate()
    var sldr=useRef()

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: matches1 ?matches2 ? matches3 ?2:3:4:6,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
        autoplaySpeed:1800
      };
   
    //   const handleClick=()=>navigate('/filterscreen')
    
    // const showItems=()=>{
    //     return props?.data.map((item)=>{
    //         return <div style={{display:'flex',
    //         flexDirection:'column',
    //         justifyContent:'center',
    //         alignItems:'center',
    //         marginRight:10}}
    //         onClick={()=>{navigate(`/ShowProductsByCategory/${item.categoryname}`)}}>
    //             <div style={{width:matches3?'65%':'87%',height:'40%',borderRadius:'10%',background:'#dfe4ea',display:'flex',justifyContent:'center',alignItems:'center'}}>
    //             <img src={`${serverurl}/images/${item.icon}`}  style={{width:'100%',height:'100%'}}/>
    //             </div>
    //             <div style={{fontWeight:'bold',fontSize:matches3?'.7rem': matches2?'.8rem':'.8rem',marginTop:'5px',letterSpacing:'0.5',textAlign:'center',width:matches3?'75%':'100%'}}>{item.categoryname}</div>
    //             </div>      
    //     })

    
    // }
    const showItems=()=>{
        return props?.data.map((item)=>{
            return <div style={{display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                marginRight:10}}
                onClick={()=>{navigate(`/ShowProductsByCategory/${item.categoryname}`)}}>
                <div style={{width:matches3?'65%':'87%',height:'80%',borderRadius:'10%',background:'#dcdde1',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <img src={`${serverurl}/images/${item.icon}`} style={{width:'100%',height:'100%'}} />
                </div>
                <div style={{margin:5,fontWeight:'bold',fontSize:matches3?'.7rem': matches2?'.8rem':'.8rem',letterSpacing:0.5,textAlign:'center',width:'78%'}}>
                    {item.categoryname}
                </div>
            </div>
        })
       }
    

    const handleBackword=()=>{
        sldr.current.slickPrev()
    }

    const handleForword=()=>{
        sldr.current.slickNext()
    }

    
    return(<div style={{display:'flex',flexDirection:'column'}}>
        <div style={{margin:10,fontWeight:'bold',fontSize:'1.5vw'}}>{props.title}</div>
        <div style={{width:'100%',position:'relative'}}>
        {matches3?<></>: <ArrowBackIosIcon style={{fontSize:'2vw',color:'grey',position:'absolute',top:'36%',left:'-5%',cursor:'pointer'}} onClick={handleBackword}/> }
        <Slider ref={sldr} {...settings}>
         {showItems()}
        </Slider>
        {matches3?<></>: <ArrowForwardIosIcon style={{fontSize:'2vw',color:'gray',position:'absolute',top:'36%',right:'-5%',cursor:'pointer'}} onClick={handleForword}/> }
     </div>   
     
 </div>)

}