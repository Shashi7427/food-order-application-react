import { Link } from "react-router-dom";
import styled from "styled-components";
import main from "../assets/main.png";
import { Redirect } from "react-router-dom";
import { useGlobalContext } from "../context";
import Header from "./../Components/Layout/Header";
import Cart from './../Components/Cart/Cart'
import { useState } from 'react'


function Profile() {
  const { user } = useGlobalContext();
  const [showCart, changeShowCart] = useState(false);
  const showCartHandler = () => {
    changeShowCart(true);
  };
  const hideCartHandler = () => {
    changeShowCart(false);
  };
  const { isLoading } = useGlobalContext();
  if (isLoading) {
    return (
      <section className="page page-center">
        <div className="loading"></div>
      </section>
    );
  }
  const { name, _id, role } = user;

  return (
    <>
      {showCart && <Cart onClick={hideCartHandler} />}
      <Header onClick={showCartHandler} />
      <Wrapper className="page">
        <h2>Hello there, {user.name}</h2>
        <p>
          Your ID : <span>{_id}</span>
        </p>
        <p>
          Your Role : <span>{role}</span>
        </p>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  p span {
    background: var(--primary-500);
    padding: 0.15rem 0.25rem;
    color: var(--white);
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
  }
`;

export default Profile;
