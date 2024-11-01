
import MaterialTable from "@material-table/core"
import { Avatar, Button , Grid , TextField,FormControl,MenuItem,Select,InputLabel,FormHelperText} from "@mui/material"
import { useEffect, useState } from "react"
import { getData, serverurl  , postData} from "../../services/fetchnodeservices"
import {Dialog,DialogTitle,DialogActions,DialogContent} from "@mui/material"
import TitleComponent from "../components/TitleComponent"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"


export default function DisplayAllProductDetails(){

    const [productDetailsData,setProductDetailsData] = useState([])
    const [status,setStatus]=useState(false)
    const [productDetailId,setProductDetailId]=useState('')
    const [brandId,setBrandId]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [productId,setProductId]=useState('')
    const [productSubName,setProductSubName]=useState('')
    const [description,setDescription] = useState('')
    const [weight,setWeight]=useState('')
    const [weightType,setWeightType]=useState('')
    const [packaging,setPackaging]=useState('')
    const [qty,setQty]=useState('')
    const [price,setPrice]=useState('')
    const [offerPrice,setOfferPrice]=useState('')
    const [offerType,setOfferType]=useState('')
    const [picture,setPicture]=useState({bytes:[],file:[]})
    const [errorMessage,setErrorMessage]=useState('')
    const [btnStatus,setBtnStatus] = useState(false)
    const [prevPicture,setPrevPicture] = useState()
    const [brandList,setBrandList] = useState([])
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList] = useState([])
    const [productList,setProductList]=useState([])
    const navigate=useNavigate()

    function twoBtn(){
        return(<div>
          <Button onClick={editProductDetailsPicture}>save</Button>
          <Button onClick={handleCancle}>cancle</Button>
          </div>
        )
      }
  
      const handleCancle = ()=>{
        setBtnStatus(false)
        // setPicture({bytes:'',file:prevPicture})
    
      }
  
      useEffect(function(){
          fetchAllProductDetails()
      },[])
  
      const fetchAllProductDetails = async()=>{
          var result = await getData('productdetails/fetch_all_productdetails')
          setProductDetailsData(result.data)
      }

      useEffect(function(){
        fetchAllBrands()
    },[])

    const fetchAllBrands = async()=>{
        var result=await getData('brands/display_all_brands')
        setBrandList(result.data)
    }

    const displayBrandList = ()=>{
        return brandList?.map((item)=>{
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })
    }

    const handleChangeBrand = (event)=>{
        fetchAllCategory(event.target.value)
        setBrandId(event.target.value)
    }

    const fetchAllCategory = async(bid)=>{
        var result = await postData('category/search_by_brand',{brandid:bid})
        setCategoryList(result.data)
    }

    const displayCategoryList = ()=>{
        return categoryList?.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    const handleChangeCategory = (event)=>{
        fetchAllSubCategory(event.target.value)
        setCategoryId(event.target.value)
    }

    const fetchAllSubCategory = async(cid)=>{
        var result = await postData('subcategory/search_by_category',{categoryid:cid})
        setSubCategoryList(result.data)
    }

    const displaySubCategoryList = ()=>{
        return subCategoryList?.map((item)=>{
            return <MenuItem value={item.subcategoryid} >{item.subcategoryname}</MenuItem>
        })
    }

    const handleChangeSubCategory = (event)=>{
        fetchAllProduct(event.target.value)
        setSubCategoryId(event.target.value)
    }

    const fetchAllProduct = async(scid)=>{
        var result = await postData('products/search_by_subcategory',{subcategoryid:scid})
        setProductList(result.data)
    }

    const displayProductList = ()=>{
        return productList?.map((item)=>{
            return <MenuItem value={item.productid} >{item.productname}</MenuItem>
        })
    }

    const handlePictureChange =(event)=>{

      if(Object.values(event.target.files).length<3){
        Swal.fire({
          icon: "error",
          title: "Please Upload 4 or more files",
          timer:1500,
          toast:true
        });
      }else{
        console.log("details ka icons",Object.values(event.target.files))
       let temp = Object.values(event.target.files).map((item)=>{
        return URL.createObjectURL(item)
       })
        setPicture({bytes:Object.values(event.target.files),file:temp})
      }
        setBtnStatus(true)
    }

    const handleError = (message,label)=>{
        setErrorMessage((prev)=>({...prev,[label]:message}))
    }

    const editProductDetailsPicture = async()=>{
        var error = false
        if(picture.bytes.length==0){
          handleError("Pls select icon....",'icon')
          error = true
      }
    
      if(error == false){
        var formData = new FormData()
        picture?.bytes.map((item,i)=>{
          formData.append('picture'+i,item)
           })
        formData.append('productdetailid',productDetailId)
        var result = await postData('productdetails/edit_productdetail_picture',formData)
    
        if(result.status){
          Swal.fire({
            icon: "success",
            title: "Product Details Register",
            text: result.message,
            toast:true
          });
        }else{
          Swal.fire({
            icon: "error",
            title: "Product Details Register",
            text: result.message,
            toast:true
          });
        }
        setBtnStatus(false)
        fetchAllProductDetails()
      }
      }

    const submit = async()=>{
            var error = false

        if(productSubName.length==0){
            handleError("Plz Enter Product Subname....",'productsubname')
            error=true
        }

        if(description.length==0){
            handleError("Plz Enter Description....",'description')
            error=true
        }

        if(weight.length==0){
            handleError("Plz Enter weight....",'weight')
            error=true
        }

        if(weightType.length==0){
            handleError("Plz Enter weight type....",'weighttype')
            error=true
        }

        // if(packaging.length==0){
        //     handleError("Plz Select Packaging....",'packaging')
        //     error=true
        // }


        if(qty.length==0){
            handleError("Plz Enter qty....",'qty')
            error=true
        }

        if(price.length==0){
            handleError("Plz Enter Price....",'price')
            error=true
        }

        if(offerPrice.length==0){
            handleError("Plz Enter Offer Price....",'offerprice')
            error=true
        }

        if(offerType==0){
            handleError("Plz Select offer Type....",'offertype')
            error=true
        }

        if(brandId.length==0){
            handleError("Plz Select brand....",'brand')
            error=true
        }

        if(categoryId.length==0){
            handleError("Plz Select category....",'category')
            error=true
        }

        if(subCategoryId.length==0){
            handleError("Plz Select Sub Category ....",'subcategory')
            error=true
        }

        // if(productId.length==0){
        //     handleError("Plz Select product....",'product')
        //     error=true
        // }


            if(error==false){
     
        var body ={brandid:brandId,categoryid:categoryId,subcategoryid:subCategoryId,productid:productId,productsubname:productSubName,description:description,weight:weight,weighttype:weightType,packaging:packaging,quantity:qty,price:price,offerprice:offerPrice,offertype:offerType,productdetailid:productDetailId}
// console.log("offerprice",offerPrice)

// var temp =  Object.values(body)
// temp.map((item)=>{
//     alert(item)
// })


        var result = await postData('productdetails/update_productdetails_data',body)
        if(result.status){
            Swal.fire({
              icon: "success",
              title: "Product Details Register",
              text: result.message,
              toast:true
            });
          }else{
            Swal.fire({
              icon: "error",
              title: "Product Details Register",
              text: result.message,
              toast:true
            });
          }
          fetchAllProductDetails()
        }
    }

    const showPictures = ()=>{

      return picture?.file?.map((item)=>{
          return <div style={{margin:2}}>  
            <Avatar src={item} alt="picture" variant="rounded" />
          </div>
      })

  }

    function showProductDetails (){
        return(
          <MaterialTable
          style={{width:'90%'}}
          title="Product List"
          options={{
            maxBodyHeight: 400,
          }}
          columns={[
            { title: 'ProductDetailId', field: 'productdetailid' },
            { title: 'BrandId', render:(rowData)=><div>{rowData.brandid}/{rowData.brandname}</div>},
            { title: 'CategoryId', render:(rowData)=><div>{rowData.categoryid}/{rowData.categoryname}</div>},
            { title: 'SubCategoryId', render:(rowData)=><div>{rowData.subcategoryid}/{rowData.subcategoryname}</div>},
            { title: 'ProductId', render:(rowData)=><div>{rowData.productid}/{rowData.productname}</div>} ,
            {title:'ProductSubname',field:'productsubname'},
            {title:'weight',render:(rowData)=><div>{rowData.weight}/{rowData.weighttype}</div>},
            {title:'Packaging',field:'packaging'},
            {title:'Quantity',field:'quantity'},
            {title:'Price',field:'price'},
            {title:'Offer Price',field:'offerprice'},
            {title:'Offer Type',field:'offertype'},
            {
              title:'picture',
              render:(rowData)=><div><Avatar src={`${serverurl}/images/${rowData.picture}`} variant="rounded"/></div>
              
            },
       
          ]}
          
          data={productDetailsData}        
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit User',
              onClick: (event, rowData) => handleDialog(rowData)
            },
            {
              icon: 'delete',
              tooltip: 'delete User',
              onClick: (event, rowData) => deleteProductDetailsData(rowData)
            },
            {
              icon: 'add',
              tooltip: 'add product details',
              isFreeAction:true,
              onClick: (event, rowData) => navigate('/admindashboards/productdetails')
            }
          ]}
        />
        )
    }
    const handleClose = ()=>{
        setStatus(false)
      }

    const displayDialog = (rowData)=>{
        return(
          <Dialog open={status} onClose={handleClose}>
            <DialogContent>
              {showProductDetailForm()}
            </DialogContent>
            <DialogActions>
              <Button onClick={submit}>save</Button>
              <Button onClick={handleClose}>close</Button>
            </DialogActions>
          </Dialog>
        )
      }

      const handleDialog = (rowData)=>{
        setStatus(true)
        setBrandId(rowData.brandid)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setProductId(rowData.productid)
        setProductDetailId(rowData.productdetailid)
        setProductSubName(rowData.productsubname)
        let nexttemp = rowData.picture.split(',').map((item)=>{
          return `${serverurl}/images/${item}`
        })
        setPicture({file:nexttemp})
        console.log(nexttemp)
        setPrevPicture(`${serverurl}/images/${rowData.picture}`)
        setDescription(rowData.description)
        setWeight(rowData.weight)
        setWeightType(rowData.weighttype)
        setQty(rowData.quantity)
        setPackaging(rowData.packaging)
        setPrice(rowData.price)
        setOfferPrice(rowData.offerprice)
        setOfferType(rowData.offertype)
      }


      const deleteProductDetailsData = (rowData)=>{
        Swal.fire({
          title: "Are you sure to delete this product Details?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
          toast:true,
        }).then(async(result) => {
          if (result.isConfirmed) {
            var result = await postData('productdetails/delete_productdetails_data',{productdetailid:rowData.productdetailid})
            if(result.status){
            Swal.fire({
              title: "Deleted!",
              text: result.message,
              icon: "success",
              toast:true
            });
          }else{
            Swal.fire({
              title: "Sorry!",
              text: result.message,
              icon: "error",
              toast:true
          });
          }
          fetchAllProductDetails()
        }
        }) 
      }

      const showProductDetailForm = () => {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TitleComponent title="Product Details" />
                </Grid>

                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel>Brands</InputLabel>
                        <Select
                            label="Brands"
                            value={brandId}
                            onChange={handleChangeBrand}
                            onFocus={() => handleError('', 'brandid')}
                            error={!!errorMessage.brand}
                        >
                            {displayBrandList()}
                        </Select>
                        <FormHelperText className="errorText">{errorMessage.brand}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                            label="Category"
                            value={categoryId}
                            onChange={handleChangeCategory}
                            onFocus={() => handleError('', 'category')}
                            error={!!errorMessage.category}
                        >
                            {displayCategoryList()}
                        </Select>
                        <FormHelperText className="errorText">{errorMessage.category}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel>SubCategory</InputLabel>
                        <Select
                            label="SubCategory"
                            value={subCategoryId}
                            onChange={handleChangeSubCategory}
                            onFocus={() => handleError('', 'subcategory')}
                            error={!!errorMessage.subcategory}
                        >
                            {displaySubCategoryList()}
                        </Select>
                        <FormHelperText className="errorText">{errorMessage.subcategory}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <InputLabel>Product</InputLabel>
                        <Select
                            label="Product"
                            value={productId}
                            onChange={(event) => setProductId(event.target.value)}
                            onFocus={() => handleError('', 'product')}
                            error={!!errorMessage.product}
                        >
                            {displayProductList()}
                        </Select>
                        <FormHelperText className="errorText">{errorMessage.product}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        label="Product Sub Name"
                        value={productSubName}
                        onChange={(event) => setProductSubName(event.target.value)}
                        onFocus={() => handleError('', 'productsubname')}
                        error={!!errorMessage.productSubName}
                    />
                    <FormHelperText className="errorText">{errorMessage.productSubName}</FormHelperText>
                </Grid>

                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        label="Weight"
                        value={weight}
                        onChange={(event) => setWeight(event.target.value)}
                        onFocus={() => handleError('', 'weight')}
                        error={!!errorMessage.weight}
                    />
                    <FormHelperText className="errorText">{errorMessage.weight}</FormHelperText>
                </Grid>

                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        label="Weight Type"
                        value={weightType}
                        onChange={(event) => setWeightType(event.target.value)}
                        onFocus={() => handleError('', 'weighttype')}
                        error={!!errorMessage.weightType}
                    />
                    <FormHelperText className="errorText">{errorMessage.weightType}</FormHelperText>
                </Grid>

                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        label="Quantity"
                        value={qty}
                        onChange={(event) => setQty(event.target.value)}
                        onFocus={() => handleError('', 'quantity')}
                        error={!!errorMessage.quantity}
                    />
                    <FormHelperText className="errorText">{errorMessage.quantity}</FormHelperText>
                </Grid>

                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        label="Packaging"
                        value={packaging}
                        onChange={(event) => setPackaging(event.target.value)}
                        onFocus={() => handleError('', 'packaging')}
                        error={!!errorMessage.packaging}
                    />
                    <FormHelperText className="errorText">{errorMessage.packaging}</FormHelperText>
                </Grid>

                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        label="Price"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                        onFocus={() => handleError('', 'price')}
                        error={!!errorMessage.price}
                    />
                    <FormHelperText className="errorText">{errorMessage.price}</FormHelperText>
                </Grid>

                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        label="Offer Price"
                        value={offerPrice}
                        onChange={(event) => setOfferPrice(event.target.value)}
                        onFocus={() => handleError('', 'offerprice')}
                        error={!!errorMessage.offerPrice}
                    />
                    <FormHelperText className="errorText">{errorMessage.offerPrice}</FormHelperText>
                </Grid>

                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        label="Offer Type"
                        value={offerType}
                        onChange={(event) => setOfferType(event.target.value)}
                        onFocus={() => handleError('', 'offertype')}
                        error={!!errorMessage.offerType}
                    />
                    <FormHelperText className="errorText">{errorMessage.offerType}</FormHelperText>
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" component="label">
                        Upload File
                        <input
                            type="file"
                            hidden
                            onChange={handleChangeFile}
                        />
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <img src={prevPicture} alt="Previous" className="uploadedImage" />
                </Grid>
            </Grid>
        );
    };

    return (
        <div className="productDetailsContainer"> {/* Applying a class to the main container */}
            {showProductDetails()}
            {displayDialog()}
        </div>
    );
};