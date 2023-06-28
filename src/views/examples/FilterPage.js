import {
  CardMedia,
  CircularProgress,
  useMediaQuery,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "assets/css/FilterPage.module.css";
import SimpleAccordion from "../../components/AccordionFlter";
import Drawer1 from "../../components/Drawer1";
import img22 from "../../assets/img/Asset 2.svg";
import { ProductContext } from "Context/Contex";
import ProductArray from "Context/Contex";
import FilterCard from "components/Cards/FilterCard";
import { useParams } from "react-router-dom";
import axios from "axios";

import { GrTechnology } from "react-icons/gr";
import { GiPriceTag } from "react-icons/gi";
import { BsCodeSquare } from "react-icons/bs";
import DrawerRight from "components/Drawer";

const FilterPage = () => {
  const matches = useMediaQuery(" (max-width:870px)");
  const [isLoading, setIsLoading] = useState(false);
  const [isText, setIsText] = useState(false);
  const [typeNameProduct, setTypeNameProduct] = useState(null);
  const [filterProduct, setFilterProduct] = useState(null);

  const [range, setRange] = useState("");
  // console.log(filterProduct, "filterProduct");
  // console.log(typeName, "typeName");
  // console.log(range, "range");
  // console.log(technologyId, "technologyId");
  const { id } = useParams();
  const ProdData = ProductContext(ProductArray);
  const allTechno = ProdData.allTechno;
  const search = ProdData.search;
  const setSearch = ProdData.setSearch;
  const catId = ProdData.catId;
  const setTypeName = ProdData.setTypeName;
  const typeName = ProdData.typeName;
  const setTechnologyId = ProdData.setTechnologyId;
  const setCategoriesId = ProdData.setCategoriesId;
  const allProducts = ProdData.allProducts;
  const technologyId = ProdData.technologyId;
  const categoriesId = ProdData.categoriesId;
  const categorys = ProdData.category.slice(0, 8);
  // console.log(allTechno, "allTechno");
  const getCategoryData = ProdData.getCategoryData;
  const getProducts = ProdData.getProducts;
  const getAllTypes = ProdData.getAllTypes;
  const getCompany = ProdData.getCompany;
  const getPolicyDetails = ProdData.getPolicyDetails;
  const getAllBanner = ProdData.getAllBanner;
  const getALLProductsByTechnology = ProdData.getALLProductsByTechnology;
  useEffect(() => {
    getCategoryData();
    getProducts();
    getAllTypes();
    getCompany();
    getPolicyDetails();
    getAllBanner();
    getALLProductsByTechnology();
  }, [id, range, technologyId, categoriesId, search]);
  useEffect(() => {
    window.scroll(0, 0);
  }, [filterProduct, id]);
  const getFilterProducts = (url) => {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data, "filter products");
        setFilterProduct(response.data.data);

        setIsLoading(false);

        if (response.data.data.length === 0) {
          setIsText(true);
        }
        // console.log(isText, "resfilte");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.success === true) {
          setIsText(true);
          // console.log(isText, "errrf");
        }
        // toast.error("enter valid filed", {
        //   position: "top-right",
        //   autoClose: true,
        //   hideProgressBar: true,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        // });
      });
  };
  // console.log(typeName, "typeName");
  const getTypesProducts = (url) => {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data, "types");
        setTypeNameProduct(response.data.data);
        setIsLoading(false);
        if (response.data.data.length === 0) {
          setIsText(true);
        }
        // console.log(isText, "res types");
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data.success === true) {
          setIsText(true);
          // console.log(isText, "errrf");
        }
        // toast.error("enter valid filed", {
        //   position: "top-right",
        //   autoClose: true,
        //   hideProgressBar: true,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        // });
      });
  };

  useEffect(() => {
    setFilterProduct(null);
    setTypeNameProduct(null);
    // if(search.length)

    getFilterProducts(
      `${process.env.REACT_APP_URL}/searchProduct?range=${range}&technologyId=${technologyId}&title=${search}&categoryId=${categoriesId}`
    );
  }, [id, range, technologyId, categoriesId, search]);
  // console.log(catId,'id' , range, 're' ,technologyId, search , typeName)
  useEffect(() => {
    setFilterProduct(null);
    setTypeNameProduct(null);

    if (typeName) {
      getTypesProducts(
        `${process.env.REACT_APP_URL}/getAllProductByType?type=${typeName}`
      );
    }
  }, [typeName]);

  const handleClickClear = () => {
    setFilterProduct(null);
    setTypeNameProduct(null);
    setTechnologyId("");
    setCategoriesId("");
    setTypeName("");
    setSearch("");
    if (allProducts && allProducts.length > 0) {
      setFilterProduct(allProducts);
    }
  };
  // console.log(typeNameProduct, 'types ')
  return (
    <>
      {/* <div
        className={style.FilterPage_Top_container}
        style={{ backgroundColor: "var(--color-theme)", margin: "0" }}
      >
        <ExamplesNavbar />
      </div> */}
      <DrawerRight />
      <div className={style.FilterPage_main_container}>
        <div className={style.heroBanner_img}>{/* image here */}</div>
        <div className={style.heroBanner_container}></div>

        {/* product and fiilter */}
        <div className={style.product_filter_container_____1}>
          <div
            className={style.filter_container__2}
            style={{ top: `${matches ? "0" : "15%"}` }}
          >
            {matches ? (
              <div className={style.filter_mene___1}>
                <Drawer1 name={"filter"} rate={true}>
                  <div
                    className={style.filter_text_conainer___3}
                    style={{ marginTop: "4rem" }}
                  >
                    <span
                      className={style.filter_text_2}
                      onClick={handleClickClear}
                    >
                      Clear all
                    </span>
                    <div className={style.filter_text_categories_container___5}>
                      <SimpleAccordion
                        name={
                          <span>
                            <GrTechnology style={{ marginRight: "0.3rem" }} />
                            Technology
                          </span>
                        }
                        filterMap={allTechno}
                      />
                      <br />
                      <SimpleAccordion
                        name={
                          <span>
                            <GrTechnology style={{ marginRight: "0.3rem" }} />
                            Categories
                          </span>
                        }
                        filterMap1={categorys}
                      />
                      <br />

                      <SimpleAccordion
                        name={
                          <span>
                            <BsCodeSquare style={{ marginRight: "0.3rem" }} />
                            Type
                          </span>
                        }
                        setTypeName={setTypeName}
                        typeName={typeName}
                        Type={true}
                      />
                      <br />
                      <SimpleAccordion
                        name={
                          <span>
                            <GiPriceTag style={{ marginRight: "0.3rem" }} />
                            Price
                          </span>
                        }
                        setRange={setRange}
                        range={range}
                        rate={true}
                      />
                      <br />
                    </div>
                  </div>
                </Drawer1>
              </div>
            ) : (
              <div className={style.filter_text_conainer___3}>
                <div className={style.filter_text_title_container___4}>
                  <span className={style.filter_text_1}> Filters</span>
                  <span
                    className={style.filter_text_2}
                    onClick={handleClickClear}
                  >
                    Clear all
                  </span>
                </div>
                <hr className={style.filter_text_line}></hr>
                <div className={style.filter_text_categories_container___5}>
                  <SimpleAccordion
                    name={
                      <span>
                        <GrTechnology style={{ marginRight: "0.3rem" }} />
                        Technology
                      </span>
                    }
                    filterMap={allTechno}
                  />
                  <br />

                  <SimpleAccordion
                    name={
                      <span>
                        <BsCodeSquare style={{ marginRight: "0.3rem" }} />
                        Type
                      </span>
                    }
                    setTypeName={setTypeName}
                    Type={true}
                  />
                  <br />
                  <SimpleAccordion
                    name={
                      <span>
                        <GiPriceTag style={{ marginRight: "0.3rem" }} />
                        Categories
                      </span>
                    }
                    filterMap1={categorys}
                  />
                  <br />
                  <SimpleAccordion
                    name={
                      <span>
                        <GiPriceTag style={{ marginRight: "0.3rem" }} />
                        Price
                      </span>
                    }
                    setRange={setRange}
                    range={range}
                    rate={true}
                  />
                  <br />
                </div>
              </div>
            )}
          </div>
          <div className={style.products_container__2}>
            {/* {simmilarProduct_2.map((value) => {
           return (
             <div
               className={style.flext_itmes_product_container__1}
               key={value.id}
               // style={{ flexBasis: "23%" }}
             >
               <HomeCard data={value} key={value.id} Rate={true} />
             </div>
           );
         })} */}
            {search && (
              <Typography variant="body1">
                The search result is : {search}{" "}
              </Typography>
            )}
            {isLoading ? (
              <CircularProgress
                color="info"
                value={40}
                style={{
                  margin: "auto",
                  padding: "auto",
                }}
              />
            ) : (
              <>
                {typeNameProduct && typeNameProduct.length ? (
                  typeNameProduct.map((value, index) => (
                    <div className={style.card_mapping_container} key={index}>
                      <FilterCard data={value} key={index} />
                    </div>
                  ))
                ) : (
                  <>
                    {filterProduct && filterProduct.length ? (
                      filterProduct.map((value, index) => {
                        return (
                          <div
                            className={style.card_mapping_container}
                            key={index}
                          >
                            <FilterCard data={value} key={index} />
                          </div>
                        );
                      })
                    ) : (
                      <>
                        {isText ? (
                          <CardMedia
                            component="img"
                            image={img22}
                            alt="Profile image"
                            sx={{
                              width: "100%",
                              maxWidth: 360,
                              m: "auto",
                              p: "auto",
                              boxShadow: "0 1px 20px 0 rgb(0 0 0 / 10%)",
                            }}
                          />
                        ) : (
                          <CircularProgress
                            color="info"
                            value={40}
                            style={{
                              margin: "auto",
                              padding: "auto",
                            }}
                          />
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPage;
