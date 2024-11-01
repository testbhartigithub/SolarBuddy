import Header from "../components/Header";
import Filtering from "../components/Filtering";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Checkbox, Divider, Grid } from "@mui/material";
import ShowProductComponent from "../components/ShowProductComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData, postData } from "../../services/fetchnodeservices";
import SolarProduct from "../components/SolarProduct";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TuneIcon from "@mui/icons-material/Tune";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { FitScreen } from "@mui/icons-material";
import FooterComponent from "../components/FooterComponent";
import { footerStyle } from "../CSS/FooterComponentCss";

export default function ShowProductsByCategory() {
  const [productList, setProductList] = useState([]);
  const [pageRefesh, setPageRefesh] = useState(false);
  const [open, setOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState([0, 0]);

  const theme = useTheme();
  const matches1 = useMediaQuery(theme.breakpoints.down("md"));
  const matches2 = useMediaQuery(theme.breakpoints.down("sm"));
  const matches3 = useMediaQuery(theme.breakpoints.down(697));

  let param = useParams();
  let navigate = useNavigate();
  var classes = footerStyle();

  useEffect(function () {
    fetchAllProducts();
    setTitle(param.pattern);
  }, [param.pattern]);

  const fetchAllProducts = async () => {
    var result = await postData("userinterface/fetch_all_products_pattern", {
      pattern: param.pattern,
    });
    console.log("Fetched products:", result.data);
    setProductList(result.data);
    setMaxAndMinPrice();

    let maxi = Number.MIN_SAFE_INTEGER,
      mini = Number.MAX_SAFE_INTEGER;

    if (result.data.length === 0) {
      maxi = 0;
      mini = 0;
    }

    result.data.forEach((item) => {
      maxi = Math.max(maxi, parseInt(item.offerprice));
      mini = Math.min(mini, parseInt(item.offerprice));
    });

    setMaxPrice(maxi);
    setMinPrice(mini);
    setValue([mini, maxi]);
  };

  const setMaxAndMinPrice = () => {};

  var data = productList.sort(() => 0.5 - Math.random());

  const showProducts = () => {
    return (
      <Grid container spacing={2} style={{ width: "100%" }}>
        {data.map((item) => (
          <Grid item xs={matches3 ? 12 : 4} key={item.id} style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                padding: "15px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 4px",
                borderRadius: "8px",
                backgroundColor: "#f1f2f6",
                height: '350px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
               
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <ShowProductComponent
                data={item}
                pageRefesh={pageRefesh}
                setPageRefesh={setPageRefesh}
              />
            </div>
          </Grid>
        ))}
      </Grid>
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(function () {
    fetchAllBrands();
  }, []);

  const fetchAllBrands = async () => {
    var result = await getData("brands/display_all_brands");
    setBrandList(result.data);
  };

  const handleBrandList = (item) => {
    navigate(`/ShowProductsByCategory/${item.brandname}`);
  };

  const showBrandList = (data) => {
    return brandList.map((item) => {
      if (item.brandname.includes("")) {
        return (
          <div>
            <label>
              <input type="checkbox" />
              {item.brandname}
            </label>
          </div>
        );
      }
    });
  };

  const filterDrawer = () => {
    return (
      <Drawer
        open={open}
        onClose={handleClose}
        anchor={"bottom"}
        style={{
          borderRadius: "20px",
          boxSizing: "border-box",
          padding: "0px",
          background: "transparent",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "85vh",
            display: "flex",
            justifyContent: "start",
          }}
        >
          <div style={{ width: "70%", marginLeft: "4%" }}>
            <Filtering
              setProductList={setProductList}
              pattern={param.pattern}
              setTitle={setTitle}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              value={value}
              setValue={setValue}
            />
          </div>
        </div>
      </Drawer>
    );
  };

  return (
    <div
      style={{
        fontFamily: "poppins",
        background: "#f1f2f6",
        height: "100%",
        width: "100%",
        background: "#fff",
      }}
    >
      <Header />
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: matches1 ? "130px" : "85px",
        }}
      >
        <div style={{ width: matches3 ? "100%" : "90%" }}>
          <Grid container spacing={2} style={{ width: "100%", background: "#fff" }}>
            <Grid
              item
              xs={12}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: matches3 ? "1.5rem" : "2rem",
                  marginLeft: matches3 ? "2%" : "23%",
                }}
              >
                Result Of<span style={{ color: "#8e44ad" }}>{title}</span>
              </div>
              {matches3 ? (
                <div
                  style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                  onClick={() => setOpen(true)}
                >
                  <TuneIcon />Filter
                </div>
              ) : (
                <></>
              )}
            </Grid>
            {matches3 ? (
              <></>
            ) : (
              <Grid xs={2.5} style={{ marginBottom: "50%", display: "flex", justifyContent: "center" }}>
                <Filtering
                  setProductList={setProductList}
                  pattern={param.pattern}
                  setTitle={setTitle}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  minPrice={minPrice}
                  setMinPrice={setMinPrice}
                  value={value}
                  setValue={setValue}
                />
              </Grid>
            )}
            <Grid
              item
              xs={matches3 ? 12 : 9.5}
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
                justifyContent: matches3 ? "center" : "start",
              }}
            >
              {showProducts()}
            </Grid>
          </Grid>
        </div>
        {filterDrawer()}
      </div>

      <Divider />
      <div className={classes.root} style={{ marginTop: matches3 ? "8%" : "2%" }}>
        <FooterComponent />
      </div>
    </div>
  );
}
