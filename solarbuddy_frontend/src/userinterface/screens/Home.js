import Header from "../components/Header"
import CategoryComponent from "../components/CategoryComponent"
import BrandComponent from "../components/BrandComponent"
import ShippingComponent from "../components/ShippingComponent"
import SliderComponent from "../components/SliderComponent"
import { useState } from "react"
import { getData, postData } from "../../services/fetchnodeservices"
import FooterComponent from "../components/FooterComponent"
import { footerStyle } from "../CSS/FooterComponentCss"
import SolarProduct from "../components/SolarProduct"
import { useEffect } from "react"
import AddAddressComponent from "../components/AddAddressComponent"
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { Divider, useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom"
export default function Home() {
    var classes = footerStyle()
    const [TopconCategoryList, setTopconCategoryList] = useState([])
    const [WaareeCategoryList, setWaareeCategoryList] = useState([])
    const [brandData, setBrandData] = useState([])
    const [pageRefesh, setPageRefesh] = useState(false)
    const [productDetails,setProductDetails]=useState([])
    const [inverterProducts,setInverterProducts]=useState([])
    const [banners, setBanners] = useState([])
    var location=useLocation()
    var userdata=location?.state?.userdata
    // alert(JSON.stringify(userdata))
    const theme = useTheme();
    const matches1=useMediaQuery(theme.breakpoints.down('md'))
    const matches2=useMediaQuery(theme.breakpoints.down('sm'))
    const matches3=useMediaQuery(theme.breakpoints.down(450))

    let navigate = useNavigate()
 
    useEffect(function(){
       fetchAllTopconCategoryByBrands()
       fetchAllWaareeCategoryByBrands()
        fetchAllBrands()
        fetchAllSolarPanels()
        fetchAllBanners()
        fetchAllSolarInverters()
    },[])

    const fetchAllBanners = async () => {
        var result = await getData('userinterface/get_all_banners')
    
        var images = result.data[0].picture.split(",")
        setBanners(images)
      }
    
    const fetchAllSolarPanels=async()=>{
        var result = await postData('userinterface/fetch_all_products_pattern',{pattern:'solar panel'})
        setProductDetails(result.data)
        // console.log(result.data)
    }

    const fetchAllSolarInverters=async()=>{
        var result = await postData('userinterface/fetch_all_products_pattern',{pattern:'inverter'})
        setInverterProducts(result.data)
        // console.log(result.data)
    }


    const fetchAllBrands = async () => {
        var result = await getData('userinterface/display_all_brands')
        setBrandData(result.data)
    }
    const fetchAllTopconCategoryByBrands = async () => {
    var result = await postData('userinterface/display_all_category_by_brand', { brandid: 7 })
    setTopconCategoryList(result.data)
  }

  const fetchAllWaareeCategoryByBrands = async () => {
    var result = await postData('userinterface/display_all_category_by_brand', { brandid: 7 })

    setWaareeCategoryList(result.data)
  }


    // console.log("product detail ======> ",productDetails)

    return (<div style={{ fontFamily: 'poppins', background: '#fff', height: '100%', width: '100%' ,padding:0 ,boxSizing:'border-box'}}>
        <Header />
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',marginTop: matches1?125.5:64.5  }} >

            <div style={{ width: "100%", marginBottom: '40px' }}>
                <SliderComponent images={banners} />
            </div>

            <div style={{ width: '80%', marginTop: '8%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'darkblack', fontSize: '2vw', fontWeight: 'bolder' }}>POPULAR CATEGORIES
                
            </div>

            <CategoryComponent data={TopconCategoryList} title={'Waaree'} />
            </div>
            <div style={{ width: '80%', marginTop: '5%' }}>
            <CategoryComponent data={WaareeCategoryList} title={'Waaree'} />
            </div>


        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' ,marginBottom:matches3?'17%':'5%',marginTop:matches3?'12%':'5%',flexDirection:'column'}}>

        <div style={{width: matches3 ?'90%':'90%',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'3%'}}>
                    <div style={{fontWeight:'bolder',fontSize: matches3 ?'1rem' :matches1?'1rem':'1.3rem'}}>Solar Panels</div>
                    <div style={{color:'grey',fontSize: matches3 ?'.58rem' :matches1?'.8rem':'.8rem',cursor:'pointer'}} onClick={()=>navigate(`/ShowProductsByCategory/solar panel`)}>View all</div>
                </div>

            <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
            <SolarProduct pageRefesh={pageRefesh} setPageRefesh={setPageRefesh} data={productDetails} />
            </div>
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' ,marginBottom:matches3?'17%':'5%',marginTop:matches3?'15%':'8%',flexDirection:'column'}}>

<div style={{width: matches3 ?'85%':'90%',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'3%'}}>
            <div style={{fontWeight:'bolder',fontSize: matches3 ?'1rem' :matches1?'1rem':'1.3rem'}}>Solar Inverters</div>
            <div style={{color:'grey',fontSize: matches3 ?'.58rem' :matches1?'.8rem':'.8rem',cursor:'pointer'}} onClick={()=>navigate(`/ShowProductsByCategory/inverter`)}>View all</div>
        </div>

    <SolarProduct pageRefesh={pageRefesh} setPageRefesh={setPageRefesh} data={inverterProducts} />
</div>

        <div style={{ display: 'flex',flexDirection:'column' ,width: '100%', justifyContent: 'center', marginTop: matches3 ? '8%':'5%', marginBottom: matches3 ? '8%':'4%',alignItems:'center' }} >
        
        <div style={{width:matches3 ?'97%':'88%',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'2%'}}>
                    <div style={{fontWeight:'bolder',fontSize: matches3 ?'1rem' :matches1?'1rem':'1.3rem'}}>Popular Brands</div>
                    {/* <div style={{color:'grey',fontSize: matches3 ?'.58rem' :matches1?'.8rem':'.8rem'}}>View all</div> */}
                </div>

                <div style={{ width: matches3 ? '100%' :'80%' }}>
                <BrandComponent data={brandData} />
            </div>

        </div>

        

<div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',marginBottom:matches3?'12%':'3%'}}>
<ShippingComponent />
</div>

      <Divider /> 
        <div className={classes.root} style={{marginTop:matches3?'8%':'2%'}}>
            <FooterComponent />
        </div>

    </div>)
}