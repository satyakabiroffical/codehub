import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

import { toast } from "react-toastify";

const Product = createContext();

const ProductArray = ({ children }) => {
  const [nav, setNav] = useState({
    home: { name: "Home", dis: " -136px", id: 0 },
    category: { name: "Category", dis: " 0px", id: 1 },
    technology: { name: "Technology", dis: " 136px", id: 2 },
    aboutUs: { name: "How it's work", dis: " 273px", id: 3 },
  });
  const [nav2] = useState({
    product: { name: "Product", dis: " -69px", id: 0 },
    related: { name: "Related", dis: " 69px", id: 1 },
    cart: { name: "Cart", dis: " 204px", id: 2 },
  });
  const [metaId, setMetaId] = useState(null);
  const [metatage, setMetatage] = useState(null);
  const [isCoupon, setIsCoupon] = useState(null);
  const [state, setState] = useState(false);
  const [typeName, setTypeName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const [LoginMenu, setLoginMenu] = useState(false);
  const [category, setCategory] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allTechno, setAllTechno] = useState([]);
  const [apps, setApps] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [priceProd, setPriceProd] = useState([]);
  const [company, setCompany] = useState([]);
  const [search, setSearch] = useState("");
  const [catId, setCatId] = useState("");
  const [technologyId, setTechnologyId] = useState("");
  const [categoriesId, setCategoriesId] = useState("");
  const [user, setUser] = useState("");
  const [policy, setPolicy] = useState([]);
  const [policyData, setPolicyData] = useState([]);
  const [allTypes, setAllTypes] = useState([]);
  const [allCoupons, setAllCoupons] = useState([]);
  const [banner, setBanner] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);
  const userId = localStorage.getItem("id");
  const [discountByCoupon, setDiscountByCoupon] = useState(null);
  //  console.log(allTechno, "allTechno");
  //  console.log(apps, "apps");
  //  console.log(websites, "websites");
  //  console.log(priceProd, "priceProd");

  // console.log(cartItem, "CARTITEM");

  // console.log(category, 'category);
  // console.log(allProducts , allProducts);

  const getAllBanner = async () => {
    setIsLoading(true);

    axios
      .get(`${process.env.REACT_APP_URL}/banner/getBanner`)
      .then((response) => {
        // console.log(response.data, "/type/getAllType");
        setBanner(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Coupons", error);
      });
  };
  const getAllCoupons = async (url) => {
    setIsLoading(true);

    axios
      .get(`${process.env.REACT_APP_URL}/coupon/getAllCoupon`)
      .then((response) => {
        // console.log(response.data, "/type/getAllType");
        setAllCoupons(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Coupons", error);
      });
  };
  const getCompany = async (url) => {
    setIsLoading(true);

    axios
      .get(`${process.env.REACT_APP_URL}/company/getCompany`)
      .then((response) => {
        // console.log(response.data, "/type/getAllType");
        setCompany(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("company", error);
      });
  };
  const getAllTypes = async () => {
    setIsLoading(true);

    axios
      .get(`${process.env.REACT_APP_URL}/type/getAllType`)
      .then((response) => {
        // console.log(response.data, "/type/getAllType");
        setAllTypes(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("setPolicy", error);
      });
  };

  const getPolicyDetails = async () => {
    setIsLoading(true);

    axios
      .get(`${process.env.REACT_APP_URL}/getAllPolicy`)
      .then((response) => {
        // console.log(response.data, "setPolicy");
        setPolicy(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("setPolicy", error);
      });
  };
  const getPolicyDetailsById = async (id) => {
    setIsLoading(true);

    axios
      .get(`${process.env.REACT_APP_URL}/policy/getPolicyById/${id}`)
      .then((response) => {
        // console.log(response.data, "setPolicyid");
        setPolicyData(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("setPolicyid", error);
      });
  };
  const getOrderDetails = async (url) => {
    setIsLoading(true);

    axios
      .get(url)
      .then((response) => {
        // console.log(response.data);
        setOrder(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("getallproduct", error);
        // toast.error('order details not found...!', {
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

  const getCategoryData = async () => {
    setIsLoading(true);

    const data = await axios
      .get(`${process.env.REACT_APP_URL}/getAllCategory`)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
    // console.log('getallproduct' , data);
    setCategory(data.data.data);
    setIsLoading(false);
  };
  const getProducts = async () => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_URL}/getAllProduct`)
      .then((response) => {
        // console.log(response.data);
        setAllProducts(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("getallproduct", error);
        // toast.error('products not found', {
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
  const getProductsByApps = async () => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_URL}/filter/getProductByType?type=Apps`)
      .then((response) => {
        // console.log('apps',response.data);
        setApps(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("apps", error);
      });
  };
  const getProductsByWebsite = async () => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_URL}/filter/getProductByType?type=Website`)
      .then((response) => {
        // console.log('web' , response.data);
        setWebsites(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("web", error);
        // toast.error('Websites Not found...!', {
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

  const getALLProductsByTechnology = async () => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_URL}/getAllTechnology`)
      .then((response) => {
        // console.log('techno',response);
        setAllTechno(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("techno", error);
      });
  };

  const getCartItems = async (userId) => {
    setIsLoading(true);
    if (localStorage.getItem("id")) {
      const data = await axios
        .get(`${process.env.REACT_APP_URL}/getCartByuserId/${userId}`)
        .then((res) => {
          return res;
        })
        .catch((error) => {
          return error;
        });

      setCartItem(data.data.data);
      setTotalPrice(data.data.data?.totalPrice);
    }
    setIsLoading(false);
  };
  const getCartItemsByCoupons = async (userId, coupons) => {
    setIsLoading(true);
    if (localStorage.getItem("id")) {
      const data = await axios
        .get(
          `${process.env.REACT_APP_URL}/getCartByuserId/${userId}?couponCode=${coupons}`
        )
        .then((res) => {
          return res;
        })
        .catch((error) => {
          return error;
        });

      setCartItem(data.data.data);
      setTotalPrice(data.data.data?.totalPrice);
    }
    setIsLoading(false);
  };
  const handleAllRemoveCart = (userId) => {
    setIsLoading(true);
    axios({
      method: "put",
      url: `${process.env.REACT_APP_URL}/removeAllProduct/${userId}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        // console.log('handleAllRemoveCart' ,  response);
        getCartItems(userId);
        setIsLoading(false);
        toast.success("Your cart is Empty now...!!!", {
          position: "top-center",
          autoClose: true,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log(error);
        // alert(error.response.data.message);
        toast.error("please try again...!!!", {
          position: "top-center",
          autoClose: true,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const getUserByUserId = (url) => {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        // console.log("setUser", response.data);
        setUser(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("techno", error);
        // toast.error("user not found please LogIn first..!", {
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
    if (localStorage.getItem("token")) {
      getUserByUserId(`${process.env.REACT_APP_URL}/getUserById/${userId}`);
    }
  }, [localStorage.getItem("token")]);
  return (
    <Product.Provider
      value={{
        category,
        allProducts,
        nav,
        cartItem,
        order,
        isLoading,
        allTechno,
        apps,
        websites,
        priceProd,
        nav2,
        user,
        setUser,
        LoginMenu,
        setLoginMenu,
        setPriceProd,
        catId,
        setCatId,
        search,
        state,
        setState,
        allTypes,
        typeName,
        setTypeName,
        company,
        getALLProductsByTechnology,
        setSearch,
        setIsLoading,
        setNav,
        policyData,
        policy,
        getPolicyDetailsById,
        handleAllRemoveCart,
        technologyId,
        getOrderDetails,
        getCartItems,
        getCartItemsByCoupons,
        setTechnologyId,
        getProductsByApps,
        getProductsByWebsite,
        getUserByUserId,
        allCoupons,
        setAllCoupons,
        getAllCoupons,
        banner,
        totalPrice,
        setTotalPrice,
        discountByCoupon,
        setDiscountByCoupon,
        getCategoryData,
        getProducts,
        getAllTypes,
        getCompany,
        getPolicyDetails,
        getAllBanner,
        isCoupon,
        setIsCoupon,
        categoriesId,
        setCategoriesId,
        metatage,
        setMetatage,
        metaId,
        setMetaId,
      }}
    >
      {children}
    </Product.Provider>
  );
};

export const ProductContext = () => {
  return useContext(Product);
};

export default ProductArray;
