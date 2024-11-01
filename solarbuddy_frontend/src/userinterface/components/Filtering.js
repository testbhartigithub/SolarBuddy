// import { useState, useEffect } from "react"
// import { getData, postData } from "../../services/fetchnodeservices"
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { Divider, Grid, List, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import Box from '@mui/material/Box';
// import { DataGridPro } from '@mui/x-data-grid-pro';
// import FilteringCSS from '../CSS/FilteringCSS.css'
// import { useNavigate } from "react-router-dom"
// import Slider from '@mui/material/Slider';
// import { ExpandMore as ChevronDown, ExpandLess as ChevronUp, Star } from "@mui/icons-material"
// import { Button, Checkbox, FormControlLabel as Label } from "@mui/material"

// export default function Filtering({ setProductList , pattern , setTitle,maxPrice,setMaxPrice,minPrice,setMinPrice,value,setValue}) {
//   const [categoryList, setCategoryList] = useState([])
//   const [brandList, setBrandList] = useState([])
//   const [subCategoryList, setSubCategoryList] = useState([])
//   const [brandId, setBrandId] = useState('')
//   const [categoryId, setCategoryId] = useState('')
//   const [brandAccordionOpen, setBrandAccordionOpen] = useState(false)
//   const [categoryAccordionOpen, setCategoryAccordionOpen] = useState(false)
//   const [subcategoryAccordionOpen, setSubcategoryAccordionOpen] = useState(false)
//   const [brandSearchPattern, setBrandSearchPattern] = useState('')
//   const [categorySearchPattern, setCategorySearchPattern] = useState('')
//   const [filterProductsByBrands, setFilterProductsByBrands] = useState([])
//   const [filterProductsByCategory, setFilterProductsByCategory] = useState([])
  

//   const navigate = useNavigate()

//   console.log("row se id mili", brandId)

//   useEffect(function () {
//     fetchAllBrands()
//     fetchAllCategory()
//   }, [])

//     const handleFillPrice=(data)=>{

//       let maxi=Number.MIN_SAFE_INTEGER,mini=Number.MAX_SAFE_INTEGER;

//       if(data.length == 0){
//         maxi=0
//         mini=0
//       }
      
//       data.map((item)=>{

//         if(maxi <= parseInt(item.offerprice)){
//           maxi = parseInt(item.offerprice)
//         }

//         if(mini >= parseInt(item.offerprice)){
//           mini = parseInt(item.offerprice)
//         }
//       })

//       setMaxPrice(maxi)
//       setMinPrice(mini)
//       setValue([mini,maxi])
//     }

//   const fetchAllCategory = async () => {
//     var result = await getData('category/fetch_all_category')
//     setCategoryList(result.data)
//   }




//   const showCatgeoryList = () => {
//     return categoryList.map((item) => {
//       if (item.categoryname.toLowerCase().includes(categorySearchPattern.toLowerCase())) {
//         return <div style={{ margin: '10px 0px', fontSize: '1.1rem' }}> <label>
//           <input type="checkbox" check onChange={handleSelectCategory} value={item.categoryname.toLowerCase()} />
//           {item.categoryname}
//         </label>
//         </div>
//       }
//     })

//   }


//   const fetchAllBrands = async () => {
//     var result = await getData('brands/display_all_brands')
//     setBrandList(result.data)
    
//   }

//   const handleSelectBrands = async (e) => {
//     let val = e.target.value
//     const index = filterProductsByBrands.indexOf(val);

//     if(e.target.checked){

//       if(filterProductsByCategory.length >=1){
//         setFilterProductsByBrands([...filterProductsByBrands,val])
//         let result = await postData('userinterface/fetch_products_by_brands_and_category', { categorylist:filterProductsByCategory ,  brandlist: [...filterProductsByBrands,val] })
//           setProductList(result.data)
//           handleFillPrice(result.data)
//           setTitle(val+","+[...filterProductsByBrands].toString())
//       }else{
//         setFilterProductsByBrands([...filterProductsByBrands, val ])
//         let result = await postData('userinterface/fetch_products_by_brands', {  brandlist: [...filterProductsByBrands,val]  })
//         setProductList(result.data)
//         handleFillPrice(result.data)
//         setTitle(val+","+[...filterProductsByBrands].toString())
//       }
//     }else{
//       if(filterProductsByCategory.length >=1){
//         setFilterProductsByBrands( [...filterProductsByBrands.toSpliced(index, 1)])
//         if(filterProductsByBrands.length >1){
//         let result = await postData('userinterface/fetch_products_by_brands_and_category', { categorylist:filterProductsByCategory ,  brandlist: filterProductsByBrands.toSpliced(index, 1)})
//         setProductList(result.data)
//         handleFillPrice(result.data)
//         // alert(filterProductsByCategory.toSpliced(index, 1).toString())
//         setTitle(filterProductsByBrands.toSpliced(index, 1).toString())
//         }else{
//           let result = await postData('userinterface/fetch_products_by_category', { categorylist:filterProductsByCategory })
//           setProductList(result.data)
//           handleFillPrice(result.data)
//           setTitle(filterProductsByCategory.toString())
//         }
//       }else{
//         setFilterProductsByBrands(filterProductsByBrands.toSpliced(index, 1))

//         if(filterProductsByBrands.length >1){  
//           let result = await postData('userinterface/fetch_products_by_brands', {bralist:filterProductsByBrands.toSpliced(index, 1)})
//           setProductList(result.data)
//           handleFillPrice(result.data)
//           setTitle(filterProductsByBrands.toSpliced(index, 1).toString())
//         }else{
         
//           let result= await postData('userinterface/fetch_all_products_pattern',{pattern:pattern})
//           setProductList(result.data)
//           handleFillPrice(result.data)
//           setTitle(pattern)
//         }
       
//       }
//     }
//   }

//   const handleSelectCategory = async (e) => {
//     let val = e.target.value
//     const index = filterProductsByCategory.indexOf(val);
//     if(e.target.checked){ 

//         if(filterProductsByBrands.length >=1){
//           setFilterProductsByCategory([...filterProductsByCategory, val])
//           let result = await postData('userinterface/fetch_products_by_brands_and_category', { categorylist:[...filterProductsByCategory, val] ,  brandlist: filterProductsByBrands })
//           setProductList(result.data)
//           handleFillPrice(result.data)
//           setTitle(val+","+[...filterProductsByCategory].toString())
//         }else{
//           setFilterProductsByCategory([...filterProductsByCategory, val])
//           let result = await postData('userinterface/fetch_products_by_category', { categorylist:[...filterProductsByCategory, val] })
//           setProductList(result.data)
//           handleFillPrice(result.data)
//           // alert([...filterProductsByCategory].toString())
//           setTitle(val+","+[...filterProductsByCategory].toString())
//         }

//     }else{
      
//       if(filterProductsByBrands.length >=1){
//         setFilterProductsByCategory( [...filterProductsByCategory.toSpliced(index, 1)])
//         if(filterProductsByCategory.length >1){  
//         let result = await postData('userinterface/fetch_products_by_brands_and_category', { categorylist:filterProductsByCategory.toSpliced(index, 1) ,  brandlist: filterProductsByBrands })
//         setProductList(result.data)
//         handleFillPrice(result.data)
//         setTitle(filterProductsByCategory.toSpliced(index, 1).toString())
//         }else{
          
//           let result = await postData('userinterface/fetch_products_by_brands', {brandlist: filterProductsByBrands })
//         setProductList(result.data)
//         handleFillPrice(result.data)
//         setTitle(filterProductsByBrands.toString())
//         }
//       }else{
//         setFilterProductsByCategory(filterProductsByCategory.toSpliced(index, 1))

//         if(filterProductsByCategory.length >1){
//           let result = await postData('userinterface/fetch_products_by_category', {categorylist:filterProductsByCategory.toSpliced(index,1)})
//           setProductList(result.data)
//           handleFillPrice(result.data)
//           setTitle(filterProductsByCategory.toSpliced(index, 1).toString())
//         }else{
//           let result= await postData('userinterface/fetch_all_products_pattern',{pattern:pattern})
//           setProductList(result.data)
//           handleFillPrice(result.data)
//           setTitle(pattern)
//         }
       
//       }

     
//     }

    
//   }


//   console.log(filterProductsByBrands)

//   const showBrandList = () => {
//     return brandList.map((item) => {
//       if (item.brandname.toLowerCase().includes(brandSearchPattern.toLowerCase())) {
//         return <div style={{ margin: '10px 0px', fontSize: '1.1rem' }}> <label>
//           <input type="checkbox" check onChange={handleSelectBrands} value={item.brandname.toLowerCase()} />
//           {item.brandname}
//         </label>
//         </div>
//       }
//     })
//   }

//   const handleBrandSearchPattern = (e) => {
//     setBrandSearchPattern(e.target.value)
//   }

//   const handleBrandList = (item) => {
//     fetchAllCategory()
//     setBrandAccordionOpen(!brandAccordionOpen)
//     navigate(`/ShowProductsByCategory/${item.brandname}`)
//   }



//   const fetchAllSubcategory = async () => {
//     var result = await postData('subcategory/search_by_category', { categoryid: categoryId })
//     setSubCategoryList(result.data)
//   }


//   const handleCategoryList = (item) => {
//     fetchAllSubcategory()
//     navigate(`/ShowProductsByCategory/${item.categoryname}`)
//   }

//   const handleChange = async(event, newValue) => {
//     setMinPrice(event.target.value[0])
//     setMaxPrice(event.target.value[1])
//     setValue(newValue);

//     if(filterProductsByBrands.length == 0 && filterProductsByCategory.length == 0){// search by only pattern or search by only price

//       let result =await postData('userinterface/fetch_products_by_price',{minPrice:event.target.value[0] , maxPrice:event.target.value[1] , pattern:pattern})
//       setProductList(result.data)

//     }else if(filterProductsByCategory.length == 0){
// // search by price and brands
//       let result = await postData('userinterface/fetch_products_by_price_and_brands',{brandlist:filterProductsByBrands,minPrice:event.target.value[0] , maxPrice:event.target.value[1]})
//       setProductList(result.data)

//     }else if(filterProductsByBrands.length == 0){
// // search by price and category
// let result = await postData('userinterface/fetch_products_by_price_and_category',{categorylist:filterProductsByCategory,minPrice:event.target.value[0] , maxPrice:event.target.value[1]})
//       setProductList(result.data)
//     }else{
// // search by price and brands and category 

// let result = await postData('userinterface/fetch_products_by_price_and_brands_and_category',{brandlist:filterProductsByBrands,categorylist:filterProductsByCategory,minPrice:event.target.value[0] , maxPrice:event.target.value[1]})
//       setProductList(result.data)
//     }
//   };

//   function AccordionExpandDefault() {
//     return (
//       <Grid  container spacing={2}>

//         <Grid item xs={12} className="filter-scrollbar">
//           <div style={{ fontWeight: 550, fontSize: '1.2rem', margin: '10px 0px' }}>Brands</div>
//           <TextField fullWidth variant='outlined' size="small" label="Brands" onChange={(e) => setBrandSearchPattern(e.target.value)} />
//           <div style={{ height: '200px', overflow: 'scroll' }} >
//             {showBrandList()}
//           </div>
//         </Grid>
        
//         <Grid item xs={12} className="filter-scrollbar">
//           <div style={{ fontWeight: 550, fontSize: '1.2rem', margin: '10px 0px', marginTop: '20px' }}>Category</div>
//           <TextField fullWidth variant='outlined' size="small" label="Category" onChange={(e) => setCategorySearchPattern(e.target.value)} />
//           <div style={{ height: '200px', overflow: 'scroll' }} >
//             {showCatgeoryList()}
//           </div>
//         </Grid>

// {/* it is for filter by price  */}

//         <Grid item xs={12}>
//           <div style={{ fontWeight: 550, fontSize: '1.2rem', margin: '10px 0px', marginTop: '20px' }}>Price</div>
//           <div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
//             <div style={{fontSize:'.9rem',fontWeight:'bold'}}>Min: <span style={{fontSize:'1.2rem',color:'green',fontWeight:'bold'}}>{minPrice}</span></div>
//             <div style={{fontSize:'.9rem',fontWeight:'bold'}}>Max: <span  style={{fontSize:'1.2rem',color:'green',fontWeight:'bold'}}>{maxPrice}</span></div>
//           </div>
//           <Box >
//             <Slider
//               // getAriaLabel={() => 'Temperature range'}
//               value={value}
//               onChange={handleChange}
//               valueLabelDisplay="auto"
//               // getAriaValueText={valuetext}
//               max={200000}
//               min={0}
             
//             />
//           </Box>

//         </Grid>

//       </Grid>
//     );
//   }
//   return (<div style={{ width: '100%' }}>
//     {AccordionExpandDefault()}
//     {/* {showBrandList()}
// <Divider />
// {showCatgeoryList()} */}
//   </div>)
// }

import { useState, useEffect } from "react";
import { getData, postData } from "../../services/fetchnodeservices";
import { ExpandMore as ChevronDown, ExpandLess as ChevronUp, Star } from "@mui/icons-material"
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import Divider from "@mui/material/Divider";

export default function AdvancedProductFilter({ setProductList, pattern, setTitle }) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);  
  const [categories, setCategories] = useState({});
  const [brands, setBrands] = useState([]);

  const [brandSearchPattern, setBrandSearchPattern] = useState('');
  const [categorySearchPattern, setCategorySearchPattern] = useState('');

  // Price ranges
  const priceRanges = [
    { label: "Under ₹1,000", min: 0, max: 1000 },
    { label: "₹1,000 - ₹5,000", min: 1000, max: 5000 },
    { label: "₹5,000 - ₹10,000", min: 5000, max: 10000 },
    { label: "Over ₹10,000", min: 10000, max: Infinity },
  ];

  // Review ratings
  const reviewRatings = [5, 4, 3, 2, 1];

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    // Fetch categories and subcategories from the backend
    const result = await getData('subcategory/fetch_all_category_with_subcategories'); // Adjust the endpoint as necessary
    // Transform the data into the format { categoryName: [subcategories] }
    console.log(result);
    const categoryData = {};
    result.data.forEach((item) => {
      const categoryName = item.categoryname;
      const subcategoryName = item.subcategoryname;
      if (!categoryData[categoryName]) {
        categoryData[categoryName] = [];
      }
      categoryData[categoryName].push(subcategoryName);
    });
    console.log(categoryData);
    setCategories(categoryData);
    
  };

  const fetchBrands = async () => {
    const result = await getData('brands/display_all_brands');
    const brandNames = result.data.map((item) => item.brandname);
    setBrands(brandNames);
  };

  const toggleCategory = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const toggleSubcategory = (subcategory) => {
    setSelectedSubcategories(prev =>
      prev.includes(subcategory)
        ? prev.filter(sc => sc !== subcategory)
        : [...prev, subcategory]

    );
  };

  const togglePriceRange = (rangeValue) => {
    setSelectedPriceRanges(prev =>
      prev.includes(rangeValue)
        ? prev.filter(r => r !== rangeValue)
        : [...prev, rangeValue]
    );
  };

  const toggleRating = (rating) => {
    setSelectedRatings(prev =>
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const applyFilters = async () => {
    // Build the filter criteria
    const filters = {
      subcategories: selectedSubcategories,
      brands: selectedBrands,
      priceRanges: selectedPriceRanges.map(rangeValue => {
        const [min, max] = rangeValue.split('-').map(Number);
        return { min, max };
      }),
      ratings: selectedRatings,
    };

    // Prepare the data for the backend
    const filterData = {
      subcategories: filters.subcategories,
      brands: filters.brands,
      priceRanges: filters.priceRanges,
      ratings: filters.ratings,
    };

    // Call the backend API to fetch filtered products
    const result = await postData('userinterface/fetch_filtered_products', filterData);
    setProductList(result.data);
    // Update title or any other state as needed
    setTitle('Filtered Products');
  };

  return (
    <div style={{ width: '100%', maxWidth: '24rem', padding: '1rem', backgroundColor: '#f5f5f5', border: '1px solid #e5e5e5', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Filter Products</h2>
      <Divider style={{ width: '94%', marginTop: 20 }} />
    
      {/* Brands */}
      <div style={{ marginBottom: '1.5rem' }}>
  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Brands</h3>
  <TextField
    fullWidth
    variant="outlined"
    size="small"
    label="Search Brands"
    onChange={(e) => setBrandSearchPattern(e.target.value)}
  />

  {/* Container for brands with scrolling */}
  <div style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #e0e0e0', borderRadius: '0.25rem', padding: '0.5rem' }}>
    {brands
      .filter(brand =>
        brand.toLowerCase().includes(brandSearchPattern.toLowerCase())
      )
     
      .map(brand => (
        <div key={brand} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.01rem' }}>
          <FormControlLabel
            control={
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                style={{ transform: 'scale(0.8)' }}  // Reduced checkbox size
              />
            }
            label={<span style={{ fontSize: '0.9rem' }}>{brand}</span>}  // Adjust label font size
          />
        </div>
      ))}
  </div>
</div>


      <Divider style={{ width: '94%', marginTop: 20 }} />
      {/* Categories */}
      <div style={{ marginBottom: '1rem' }}> {/* Reduced marginBottom for the entire section */}
  <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>Categories</h3> {/* Reduced font size */}
  <TextField
    fullWidth
    variant="outlined"
    size="small"
    placeholder="Search Categories"
    style={{ marginBottom: '0.8rem', fontSize: '0.3rem',color:'black' }} 
    InputProps={{
      style: { height: '30px', fontSize: '0.75rem',color:'black' }  // Adjusting height and font size
    }}
    onChange={(e) => setCategorySearchPattern(e.target.value)}
  />
  
  {/* Container for categories without scrolling */}
  <div style={{ marginBottom: '0.5rem' }}> {/* Removed maxHeight and overflow for scrolling */}
    {Object.entries(categories)
      .filter(([category]) =>
        category.toLowerCase().includes(categorySearchPattern.toLowerCase())
      )
      .map(([category, subcategories]) => (
        <div key={category} style={{ marginBottom: '0.2rem' }}> {/* Reduced marginBottom */}
          <Button
            variant="text"
            style={{ 
              width: '100%', 
              justifyContent: 'space-between', 
              textTransform: 'none', 
              color: 'black', 
              fontFamily: 'poppins', 
              fontSize: '0.8rem',  // Reduced font size for category button
              fontWeight: 'bolder' 
            }}
            onClick={() => toggleCategory(category)}
          >
            {category}
            {expandedCategory === category ? (
              <ChevronUp style={{ height: '0.8rem', width: '0.8rem' }} />
            ) : (
              <ChevronDown style={{ height: '0.8rem', width: '0.8rem' }} />
            )}
          </Button>
          {expandedCategory === category && (
            <div style={{ marginLeft: '1rem', marginTop: '0.25rem', gap: '0.25rem', display: 'flex', flexDirection: 'column' }}>
              {subcategories.map(subcategory => (
                <FormControlLabel
                  key={subcategory}
                  style={{ fontSize: '0.7rem', color: 'black', fontFamily: 'poppins', fontWeight: 'bolder', marginBottom: '0.05rem' }} 
                  control={
                    <Checkbox
                      style={{ color: 'black', transform: 'scale(0.8)' }} 
                      id={subcategory}
                      checked={selectedSubcategories.includes(subcategory)}
                      onChange={() => toggleSubcategory(subcategory)}
                    />
                  }
                  label={<span style={{ fontSize: '0.8rem', color: 'black', fontFamily: 'poppins', fontWeight: 'bolder' }}>{subcategory}</span>}  
                />
              ))}
            </div>
          )}
        </div>
      ))}
  </div>
</div>


      <Divider style={{ width: '94%', marginTop: 20 }} />
     {/* Price Range */}
{/* Price Range */}
<div style={{ marginBottom: '1rem' }}> {/* Reduced marginBottom for the entire section */}
  <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>Price Range</h3> {/* Reduced font size */}
  {priceRanges.map(range => (
    <div key={`${range.min}-${range.max}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.2rem' }}> {/* Reduced marginBottom */}
      <FormControlLabel
        control={
          <Checkbox
            id={`${range.min}-${range.max}`}
            style={{ transform: 'scale(0.8)' }} // Reduced checkbox size
            checked={selectedPriceRanges.includes(`${range.min}-${range.max}`)}
            onChange={() => togglePriceRange(`${range.min}-${range.max}`)}
          />
        }
        label={<span style={{ fontSize: '0.8rem' }}>{range.label}</span>} 
      />
    </div>
  ))}
</div>

<Divider style={{ width: '94%', marginTop: 10 }} /> {/* Reduced marginTop */}

{/* Customer Reviews */}
<div style={{ marginBottom: '1rem' }}> {/* Reduced marginBottom for the entire section */}
  <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>Customer Reviews</h3> {/* Reduced font size */}
  {reviewRatings.map(rating => (
    <div key={rating} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.2rem' }}> {/* Reduced marginBottom */}
      <FormControlLabel
        control={
          <Checkbox
            id={`rating-${rating}`}
            style={{ transform: 'scale(0.8)' }} // Reduced checkbox size
            checked={selectedRatings.includes(rating)}
            onChange={() => toggleRating(rating)}
          />
        }
        label={
          <>
            {[...Array(rating)].map((_, i) => (
              <Star key={i} style={{ height: '0.8rem', width: '0.8rem', color: '#ffc107' }} /> 
            ))}
            {[...Array(5 - rating)].map((_, i) => (
              <Star key={i} style={{ height: '0.8rem', width: '0.8rem', color: '#e4e5e9' }} /> 
            ))}
            <span style={{ marginLeft: '0.15rem', fontSize: '0.8rem' }}>& Up</span> {/* Reduced marginLeft and font size */}
          </>
        }
      />
    </div>
  ))}
</div>

{/* Apply Filters Button */}
<Button
  style={{ width: '100%', backgroundColor: '#1976d2', color: '#fff', fontSize: '0.875rem' }} // Reduced button font size
  variant="contained"
  onClick={applyFilters}
>
  Apply Filters
</Button>


    </div>
  );
}  