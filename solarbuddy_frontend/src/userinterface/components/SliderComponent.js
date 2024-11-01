import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverurl } from "../../services/fetchnodeservices";
export default function SliderComponent(props)
{ var settings = {
    dots: true,
    infinite: true,
    speed: 180,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1000,

  };
  var images=props.images
  const showImages=()=>{
    return images.map((item)=>{
     return <div><img src={`${serverurl}/images/${item}`} style={{width:'100%'}}/></div>

    })
  }


    return(<div style={{width:'100%'}}>
  <Slider {...settings}>
    {showImages()}
    </Slider>
    </div>)
}