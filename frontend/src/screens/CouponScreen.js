import React, { useEffect, useState } from "react";
import { Button, Form, Row, Table } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../components/Loader";
import ItemSearch from "../components/ItemSearch";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import {
  createCoupon,
  deleteCoupon,
  listCoupon,
} from "../actions/couponActions";
import { useAlert } from "react-alert";
import {
  COUPON_CREATE_RESET,
  COUPON_DELETE_RESET,
} from "../constants/couponConstants";
import { useNavigate } from "react-router-dom";
import Colors from "../components/Colors";

const CouponScreen = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState(new Date());
  const [discount, setDiscount] = useState("");
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  //check logged in user
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const couponCreate = useSelector((state) => state.couponCreate);
  const { loading, success, error } = couponCreate;

  const couponList = useSelector((state) => state.couponList);
  const { loading: loadingList, coupons, error: errorList } = couponList;

  const couponDelete = useSelector((state) => state.couponDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = couponDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listCoupon());
      if (success) {
        alert.success("Coupon Created");
        setName("");
        setExpiry(new Date());
        setDiscount("");
        dispatch({ type: COUPON_CREATE_RESET });
      }
      if (successDelete) {
        alert.success(successDelete);
        dispatch({ type: COUPON_DELETE_RESET });
      }
    } else {
      navigate("/login");
    }
  }, [alert, success, dispatch, userInfo, navigate, successDelete]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCoupon({ name, expiry, discount }));
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure?")) {
      dispatch(deleteCoupon(id));
    }
  };

  const searched = (keyword) => (item) =>
    item.name.toLowerCase().includes(keyword);

  return (
    <>
      <FormContainer>
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={handleSubmit} className="my-5">
          <Form.Group controlId="name" style={{ marginBottom: "1em" }}>
            <Form.Label style={{ color: Colors.white }}>Coupon</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Coupon"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="expire" style={{ marginBottom: "1em" }}>
            <Form.Label style={{ color: Colors.white }}>Expire</Form.Label>
            <DatePicker
              selected={expiry}
              onChange={(date) => setExpiry(date)}
            />
          </Form.Group>
          <Form.Group controlId="discount" style={{ marginBottom: "1em" }}>
            <Form.Label style={{ color: Colors.white }}>Discount %</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter discount (%)"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              min="0"
              max="100"
            ></Form.Control>
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="my-3"
            style={{ backgroundColor: Colors.orange }}
            disabled={loading}
          >
            Create Coupon {loading && <Loader size="size-sm" />}
          </Button>
        </Form>
      </FormContainer>
      <Row>
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        {loadingList || loadingDelete ? (
          <Loader />
        ) : errorList ? (
          <Message variant="danger">{errorList}</Message>
        ) : (
          <>
            <ItemSearch setKeyword={setKeyword} keyword={keyword} />
            <Table
              striped
              bordered
              hover
              responsive
              className="table-sm"
              variant="dark"
              style={{
                backgroundColor: "rgb(34 43 69)",
                borderColor: Colors.SubWhite,
                backgroundImage:
                  "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                boxShadow: "rgb(0 0 0 / 25%) 0px 3px 6px 0px",
                color: Colors.white,
              }}
            >
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>Expiry</th>
                  <th>Discount Rate (%)</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {coupons.filter(searched(keyword)).map((coupon) => (
                  <tr key={coupon._id}>
                    <td>{coupon.name}</td>
                    <td>{new Date(coupon.expiry).toLocaleDateString()}</td>
                    <td>{coupon.discount}%</td>
                    <td>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(coupon._id)}
                      >
                        {/* <FontAwesomeIcon icon={faTrash} /> */}

                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Row>
    </>
  );
};

export default CouponScreen;
