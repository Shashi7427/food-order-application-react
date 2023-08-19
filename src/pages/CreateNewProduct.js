import { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import FormRow from "../Components/FormRow";
import { useGlobalContext } from "../context";
import useLocalState from "../utils/localState";
import Cart from "./../Components/Cart/Cart";
import Header from "./../Components/Layout/Header";

import axios from "axios";

function CreateNewProduct() {
  const [showCart, changeShowCart] = useState(false);
  const showCartHandler = () => {
    changeShowCart(true);
  };
  const hideCartHandler = () => {
    changeShowCart(false);
  };

  const { saveUser, user } = useGlobalContext();
  const history = useHistory();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: 0,
  });
  const { alert, showAlert, loading, setLoading, hideAlert } = useLocalState();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    hideAlert();
    setLoading(true);
    const { name, description, price } = values;
    const product = { name, description, price };
    try {
      const { data } = await axios.post(`/api/v1/products`, product);
      setValues({ name: "", name: "", description: "" });
      showAlert({
        text: `Success! Product is created`,
        type: "success",
      });
      setLoading(false);
    } catch (error) {
      showAlert({ text: error.response.data.msg });
      setLoading(false);
    }
  };

  return (
    <>
      {showCart && <Cart onClick={hideCartHandler} />}
      <Header onClick={showCartHandler} />
      <Wrapper className="page">
        {alert.show && (
          <div className={`alert alert-${alert.type}`}>{alert.text}</div>
        )}
        <form
          className={loading ? "form form-loading" : "form"}
          onSubmit={onSubmit}
        >
          {/* single form row */}
          <h2>New Product</h2>
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
          <FormRow
            type="number"
            name="price"
            value={values.price}
            handleChange={handleChange}
          />
          {/* end of single form row */}
          {/* single form row */}
          <FormRow
            type="description"
            name="description"
            value={values.description}
            handleChange={handleChange}
          />
          {/* end of single form row */}
          <button type="submit" className="btn btn-block" disabled={loading}>
            {loading ? "Loading..." : "Create"}
          </button>
        </form>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  .alert {
    margin-top: 3rem;
  }
  h4 {
    text-align: center;
  }
  p {
    margin: 0;
    text-align: center;
  }
  .btn {
    margin-bottom: 1.5rem;
  }
  .register-link,
  .reset-link {
    display: inline-block;
    margin-left: 0.25rem;
    text-transform: capitalize;
    color: var(--primary-500);
    cursor: pointer;
  }
  .reset-link {
    margin-top: 0.25rem;
  }
  .btn:disabled {
    cursor: not-allowed;
  }
`;

export default CreateNewProduct;
