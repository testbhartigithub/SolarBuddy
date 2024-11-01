import { Grid, FormControl, InputLabel, MenuItem, FormHelperText, Select, TextField, Button, Avatar } from "@mui/material";
import TitleComponent from "../components/TitleComponent";
import { useState, useEffect } from "react";
import { getData, postData } from "../../services/fetchnodeservices";
import Swal from "sweetalert2";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../css/productdetail.css"; // Importing the external CSS file
import DetailPlusMinus from "../../userinterface/components/DetailPlusMinus";

export default function ProductDetails() {
    const [brandList, setBrandList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [brandId, setBrandId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const [productId, setProductId] = useState('');
    const [productSubName, setProductSubName] = useState('');
    const [description, setDescription] = useState('');
    const [weight, setWeight] = useState('');
    const [weightType, setWeightType] = useState('');
    const [packaging, setPackaging] = useState('');
    const [qty, setQty] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const [offerType, setOfferType] = useState('');
    const [picture, setPicture] = useState({ file: [] });
    const [errorMessage, setErrorMessage] = useState({});

    useEffect(() => {
        fetchAllBrands();
    }, []);

    const fetchAllBrands = async () => {
        var result = await getData('brands/display_all_brands');
        setBrandList(result.data);
    };

    const displayBrandList = () => {
        return brandList?.map((item) => {
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>;
        });
    };

    const handleChangeBrand = (event) => {
        fetchAllCategory(event.target.value);
        setBrandId(event.target.value);
    };

    const fetchAllCategory = async (bid) => {
        var result = await postData('category/search_by_brand', { brandid: bid });
        setCategoryList(result.data);
    };

    const displayCategoryList = () => {
        return categoryList?.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
        });
    };

    const handleChangeCategory = (event) => {
        fetchAllSubCategory(event.target.value);
        setCategoryId(event.target.value);
    };

    const fetchAllSubCategory = async (cid) => {
        var result = await postData('subcategory/search_by_category', { categoryid: cid });
        setSubCategoryList(result.data);
    };

    const displaySubCategoryList = () => {
        return subCategoryList?.map((item) => {
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>;
        });
    };

    const handleChangeSubCategory = (event) => {
        fetchAllProduct(event.target.value);
        setSubCategoryId(event.target.value);
    };

    const fetchAllProduct = async (scid) => {
        var result = await postData('products/search_by_subcategory', { subcategoryid: scid });
        setProductList(result.data);
    };

    const displayProductList = () => {
        return productList?.map((item) => {
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>;
        });
    };

    const handlePictureChange = (event) => {
        if (Object.values(event.target.files).length < 3) {
            Swal.fire({
                icon: "error",
                title: "Please Upload 4 or more files",
                timer: 1500,
                toast: true
            });
        } else {
            setPicture({ file: Object.values(event.target.files) });
        }
    };

    const showPictures = () => {
        return picture?.file.map((item) => {
            return <div className="avatarContainer">
                <Avatar src={URL.createObjectURL(item)} alt="picture" variant="rounded" />
            </div>;
        });
    };

    const handleError = (message, label) => {
        setErrorMessage((prev) => ({ ...prev, [label]: message }));
    };

    const submit = async () => {
        var error = false;

        if (productSubName.length === 0) {
            handleError("Please Enter Product Subname...", 'productsubname');
            error = true;
        }

        if (description.length === 0) {
            handleError("Please Enter Description...", 'description');
            error = true;
        }

        if (weight.length === 0) {
            handleError("Please Enter Weight...", 'weight');
            error = true;
        }

        if (weightType.length === 0) {
            handleError("Please Enter Weight Type...", 'weighttype');
            error = true;
        }

        if (packaging.length === 0) {
            handleError("Please Select Packaging...", 'packaging');
            error = true;
        }

        if (qty.length === 0) {
            handleError("Please Enter Quantity...", 'qty');
            error = true;
        }

        if (price.length === 0) {
            handleError("Please Enter Price...", 'price');
            error = true;
        }

        if (offerPrice.length === 0) {
            handleError("Please Enter Offer Price...", 'offerprice');
            error = true;
        }

        if (offerType === 0) {
            handleError("Please Select Offer Type...", 'offertype');
            error = true;
        }

        if (brandId.length === 0) {
            handleError("Please Select Brand...", 'brand');
            error = true;
        }

        if (categoryId.length === 0) {
            handleError("Please Select Category...", 'category');
            error = true;
        }

        if (subCategoryId.length === 0) {
            handleError("Please Select Sub Category...", 'subcategory');
            error = true;
        }

        if (productId.length === 0) {
            handleError("Please Select Product...", 'product');
            error = true;
        }

        if (picture.file.length === 0) {
            handleError("Please Select Pictures...", 'picture');
            error = true;
        }

        if (!error) {
            var formData = new FormData();
            formData.append('brandid', brandId);
            formData.append('categoryid', categoryId);
            formData.append('subcategoryid', subCategoryId);
            formData.append('productid', productId);
            formData.append('productsubname', productSubName);
            formData.append('description', description);
            formData.append('weight', weight);
            formData.append('weighttype', weightType);
            formData.append('packaging', packaging);
            formData.append('qty', qty);
            formData.append('price', price);
            formData.append('offerprice', offerPrice);
            formData.append('offertype', offerType);

            picture.file.map((item, i) => {
                formData.append('picture' + i, item);
            });

            var result = await postData('productdetails/add_new_productdetails', formData);
            if (result.status) {
                Swal.fire({
                    icon: "success",
                    title: "Product Details Registered",
                    text: result.message,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Product Details Register Failed",
                    text: result.message,
                });
            }
        }
    };

    return (
        <div className="root">
            <div className="box">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TitleComponent title="Product Details" link="/admindashboards/displayallproductdetails" />
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
                            <FormHelperText className="formHelperText">{errorMessage.brand}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                label="Category"
                                onChange={handleChangeCategory}
                                onFocus={() => handleError('', 'category')}
                                error={!!errorMessage.category}
                            >
                                {displayCategoryList()}
                            </Select>
                            <FormHelperText className="formHelperText">{errorMessage.category}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel>SubCategory</InputLabel>
                            <Select
                                label="SubCategory"
                                onChange={handleChangeSubCategory}
                                onFocus={() => handleError('', 'subcategory')}
                                error={!!errorMessage.subcategory}
                            >
                                {displaySubCategoryList()}
                            </Select>
                            <FormHelperText className="formHelperText">{errorMessage.subcategory}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel>Products</InputLabel>
                            <Select
                                label="Products"
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                                onFocus={() => handleError('', 'product')}
                                error={!!errorMessage.product}
                            >
                                {displayProductList()}
                            </Select>
                            <FormHelperText className="formHelperText">{errorMessage.product}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            label="Product Sub Name"
                            fullWidth
                            value={productSubName}
                            onChange={(e) => setProductSubName(e.target.value)}
                            onFocus={() => handleError('', 'productsubname')}
                            error={!!errorMessage.productsubname}
                            helperText={errorMessage.productsubname}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <ReactQuill
                            value={description}
                            onChange={(value) => setDescription(value)}
                        />
                        <div className="uploadError">{errorMessage.description}</div>
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            label="Weight"
                            fullWidth
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            onFocus={() => handleError('', 'weight')}
                            error={!!errorMessage.weight}
                            helperText={errorMessage.weight}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            label="Weight Type"
                            fullWidth
                            value={weightType}
                            onChange={(e) => setWeightType(e.target.value)}
                            onFocus={() => handleError('', 'weighttype')}
                            error={!!errorMessage.weighttype}
                            helperText={errorMessage.weighttype}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            label="Packaging"
                            fullWidth
                            value={packaging}
                            onChange={(e) => setPackaging(e.target.value)}
                            onFocus={() => handleError('', 'packaging')}
                            error={!!errorMessage.packaging}
                            helperText={errorMessage.packaging}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            label="Quantity"
                            fullWidth
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            onFocus={() => handleError('', 'qty')}
                            error={!!errorMessage.qty}
                            helperText={errorMessage.qty}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            label="Price"
                            fullWidth
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            onFocus={() => handleError('', 'price')}
                            error={!!errorMessage.price}
                            helperText={errorMessage.price}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            label="Offer Price"
                            fullWidth
                            value={offerPrice}
                            onChange={(e) => setOfferPrice(e.target.value)}
                            onFocus={() => handleError('', 'offerprice')}
                            error={!!errorMessage.offerprice}
                            helperText={errorMessage.offerprice}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            label="Offer Type"
                            fullWidth
                            value={offerType}
                            onChange={(e) => setOfferType(e.target.value)}
                            onFocus={() => handleError('', 'offertype')}
                            error={!!errorMessage.offertype}
                            helperText={errorMessage.offertype}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handlePictureChange}
                        />
                        <FormHelperText className="formHelperText">{errorMessage.picture}</FormHelperText>
                    </Grid>

                    <Grid item xs={12}>
                        <div className="center">
                            {showPictures()}
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <Button onClick={submit} variant="contained" fullWidth>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
