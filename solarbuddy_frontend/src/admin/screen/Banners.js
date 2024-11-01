import { useState,useEffect } from "react";
import {FormControl,MenuItem,Select,InputLabel, Grid,TextField,Button,Avatar, FormHelperText } from "@mui/material";
import { BannerStyle } from "../css/BannerCss";
import TitleComponent from "../components/TitleComponent";
import Swal from "sweetalert2";
import { postData, getData } from "../../services/fetchnodeservices";

export default function Banners()

{ const classes=BannerStyle()
  const [brandId,setBrandId]=useState('')
  const [bannerName,setBannerName]=useState('')
  const [picture,setPicture]=useState({file:[]})
  const [errorMessage,setErrorMessage]=useState({}) 
  const [brandList,setBrandList] =useState([])
  const fetchAllBrands=async()=>{
    var result=await getData('brands/display_all_brands')
    setBrandList(result.data)
  }

  
  useEffect(function(){
    fetchAllBrands()
  },[])

  const fillBrands=()=>{
    return brandList?.map((item)=>{
      return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
    })
  }
  
  const handleError=(message,label)=>{
    setErrorMessage((prev)=>({...prev,[label]:message}))
  }

  const handleSubmit=async()=>{
    var error=false
  if(bannerName.length==0)
  {
      handleError("Pls input Banner Name...",'bannername')
      error=true
  }

  if(picture.file.length==0)
  {
      handleError("Pls Select Picture...",'picture')
      error=true
  }
  if(brandId.length==0)
  {
    handleError("Pls input Brand Id...",'brandid')
    error=true
  }
  
  if(error==false)
  {
  var formData=new FormData()
  formData.append('bannername',bannerName)
  formData.append("brandid", brandId)
  picture.file.map((item,i)=>{
    formData.append('picture'+i,item)
})
  var result=await postData('banners/add_new_banner',formData)
  if(result.status)
  {
      Swal.fire({
          icon: "success",
          title: "Banner Register",
          text: result.message,
          toast:true,
        });
  }
  else
  {
      Swal.fire({
          icon: "error",
          title: "Banner Register",
          text: result.message
        });
  
      }
  }

}

////////////////////functions///////////////

const handlePictureChange=(event)=>{
  if(Object.values(event.target.files).length<=4)
  {
    Swal.fire({
      icon:"error",
      title:"Pls Upload 5 or more files",
      timer:1500,
      toast:true
    });
  }
  else{
    setPicture({file:Object.values(event.target.files)})
  }
}

const showImages=()=>{
  return picture?.file?.map((item)=>{
    return (<div style={{margin:2}}><Avatar alt="Remy Sharp" src={URL.createObjectURL(item)} variant="rounded" /></div>)
  })
}

    return(<div className={classes.root}>
            <div className={classes.box}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TitleComponent title="Banner Register"/>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Brands</InputLabel>
                    <Select label="Brands" onChange={(e)=>setBrandId(e.target.value)} error={errorMessage.brandid} helperText={errorMessage.brandid} onFocus={()=>handleError('','brandid')}>
                      <MenuItem>Select Brand</MenuItem>
                      {fillBrands()}
                    </Select>
                    <FormHelperText style={{fontFamily:'"Roboto","Helvetica","Arial",sans-serif',fontWeight: 400,color:'#d32f2f',fontSize: "0.75rem",lineHeight: 1.66,letterSpacing: "0.03333em",textAlign:'left',marginTop:"3px",}}>{errorMessage.brandid}</FormHelperText>
                  </FormControl>
                 </Grid>

                <Grid item xs={12}>
                    <TextField error={errorMessage.bannername} helperText={errorMessage.bannername} onFocus={()=>handleError('','bannername')} onChange={(e)=>setBannerName(e.target.value)} label="Banner Name" fullWidth />
                 </Grid>
                 
                 <Grid item xs={6} className={classes.center} >
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <Button  size="small" component='label' variant="contained" >
                        Upload
                        <input onClick={()=>handleError('','picture')} onChange={handlePictureChange} type="file"  accept="image/*" hidden multiple/>
                    </Button> 
                    {errorMessage.picture==undefined?<div></div>:errorMessage.picture?<div style={{fontFamily:'"Roboto","Helvetica","Arial",sans-serif',fontWeight: 400,color:'#d32f2f',fontSize: "0.75rem",lineHeight: 1.66,letterSpacing: "0.03333em",textAlign:'left',marginTop:"3px",}}>Pls Select Picture...</div>:<div></div>}
                    </div> 

                </Grid>
                <Grid item xs={6} className={classes.center}>
                    {showImages()}
                </Grid>
                <Grid item xs={6} className={classes.center}>
                    <Button  size="small" onClick={handleSubmit}  fullWidth variant="contained">Submit</Button>
                </Grid>
                
                <Grid item xs={6} className={classes.center}>
                    <Button fullWidth variant="contained">Reset</Button>
                </Grid>
              </Grid>   
            </div>
    </div>)
}