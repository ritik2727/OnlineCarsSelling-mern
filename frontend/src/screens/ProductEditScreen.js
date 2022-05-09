import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductsDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import Colors from "../components/Colors";
import { Typography } from "@mui/material";

const ProductEditScreen = () => {
  const params = useParams();
  const navigation = useNavigate();
  const productId = params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileObj] = useState([]);
  const [fileArray] = useState([]);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    // uploadMultiImageFileHandler()
    // console.log("hhhhhhhhhhhhhhhh",images)
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigation("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductsDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setImages(product.images);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, navigation, productId, product, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    // UPDATE PRODUCT
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        images,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  const uploadMultiImageFileHandler = async (e) => {
    const file = e.target.files;
    // console.log(file);
    // setImages(file);
    var formdata = new FormData();
    for (const key of Object.keys(e.target.files)) {
      formdata.append("uploadedImages", e.target.files[key]);
    }
    // for (var i = 0; i < e.target.files.length; i++) {
    //   formdata.append("uploadedImages", e.target.files[i]);
    //   console.log("ddddd", e.target.files[i], `${e.target.files[i].name}`);
    // }
    // formdata.append("uploadedImages", e.target.files[0]);
    // formdata.append("uploadedImages", e.target.files[1]);
    //   for (const key of Object.keys(e.target.files)) {
    //     // formdata.append("uploadImages", e.target.files[key])
    // }

    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/upload/upload-images",
        formdata,
        config
      );
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].img);

        // this.setState({ 
        //   arrayvar: this.state.array.concat([newelement])
        // })
        fileArray.push(data[i].img);
        // formdata.append("uploadedImages", e.target.files[i]);
        // console.log("ddddd", e.target.files[i], `${e.target.files[i].name}`);
      }

      setImages(fileArray);
      console.log("images op", images);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // var requestOptions = {
  //   method: "POST",
  //   body: formdata,
  //   redirect: "follow",
  // };

  // fetch("/api/upload/upload-images", requestOptions)
  // .then((response) => response.text())
  // .then((res) => {
  //   console.log(res);
  // setImages(result[0]);
  // console.log(result.yo[0]);
  // console.log("eee", result[0]);
  // for (const key of Object.keys(result)) {
  //   console.log("uploadedImages",result[key]);
  // }
  // for (var i = 0; i < result.length; i++) {
  //   // formdata.append("uploadedImages", e.target.files[i]);
  //   console.log("ddddd", result.length);
  // }
  // for (var i = 0; i < result.yo; i++) {
  //   fileObj.push(result.yo[i]);
  // }
  // console.log("res",fileObj.push(result.yo));
  // console.log(fileObj);
  // })
  // .catch((error) => console.log("error", error));
  // console.log(e.target.files);
  // const formData = new FormData();
  // for (var i = 0; i < e.target.files.length; i++) {
  //   formData.append("uploadImages", e.target.files[i]);
  //   console.log("ddddd", e.target.files[i]);
  // }
  // console.log("ddddd", formData, images);

  // try {
  //   console.log("ddddd", formData, images);
  //   const config = {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   };
  //   const { data } = await axios.post("/api/upload/upload-images", formData);
  //   console.log("res", data);
  //   setImages(data);
  // } catch (error) {
  //   console.error(error);
  // }
  // };

  const uploadFileHandler = async (e) => {
    // const formData = new FormData();
    // for (var i = 0; i <e.target.pictures.length; i++) {
    //     formData.append('uploadImages', e.target.pictures[i])
    // }
    // // formData.append('texts', JSON.stringify(this.state.formTexts))
    // const config = {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     };

    // await axios.post("/api/upload", formData, config)
    //     .then((res)=> {
    //       console.log("succcc",res)
    //     }).catch((err)=>
    //     console.log("error",err)
    //     )
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();

    formData.append("image", file);
    setUploading(true);
    console.log("image", formData);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      console.log(data);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Link
        to="/admin/productlist"
        className="btn btn-light my-3"
        style={{
          backgroundColor: Colors.orange,
          color: Colors.white,
          fontWeight: "bold",
        }}
      >
        Go Back
      </Link>
      <FormContainer>
        <Typography variant="h4" style={{ marginBottom: "1.5em" }}>
          Edit Product
        </Typography>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" style={{ marginBottom: "1em" }}>
              <Form.Label style={{ color: Colors.white }}>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price" style={{ marginBottom: "1em" }}>
              <Form.Label style={{ color: Colors.white }}>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image" style={{ marginBottom: "1em" }}>
              <Form.Label style={{ color: Colors.white }}>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type="file"
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="images" style={{ marginBottom: "1em" }}>
              <Form.Label style={{ color: Colors.white }}>Images</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter images url"
                value={images}
                onChange={(e) => setImages(e.target.value)}
              ></Form.Control>
              <Form.Control
                type="file"
                multiple
                id="images-file"
                label="Choose File"
                custom
                onChange={uploadMultiImageFileHandler}
              ></Form.Control>
              {/* {uploading && <Loader />} */}
            </Form.Group>

            <Form.Group controlId="brand" style={{ marginBottom: "1em" }}>
              <Form.Label style={{ color: Colors.white }}>Brand</Form.Label>
              <Form.Control
                as="select"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                  <option value="">Select...</option>
                <option value="BMW">BMW</option>
                <option value="Ferrari">Ferrari</option>
                <option value="Tesla">Tesla</option>
                <option value="Lamborghini">Lamborghini</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="Bugatti">Bugatti</option>
                <option value="Jaguar">Jaguar</option>
                <option value="Landrover">Landrover</option>
              </Form.Control>
            </Form.Group>

            <Form.Group
              controlId="countInStock"
              style={{ marginBottom: "1em" }}
            >
              <Form.Label style={{ color: Colors.white }}>
                Count In Stock
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category" style={{ marginBottom: "1em" }}>
              <Form.Label style={{ color: Colors.white }}>Category</Form.Label>
              <Form.Control
               as="select"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="Cars">Cars</option>
                <option value="Accessories">Accessories</option>
                
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="description" style={{ marginBottom: "1em" }}>
              <Form.Label style={{ color: Colors.white }}>
                Description
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              disabled={uploading}
              type="submit"
              variant="primary"
              style={{ backgroundColor: Colors.orange }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
