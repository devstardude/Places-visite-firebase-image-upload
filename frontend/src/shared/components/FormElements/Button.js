import React from "react";
import { Link } from "react-router-dom";
import {Button as Bt} from "@material-ui/core";
import "./Button.css";

const Button = (props) => {
  if (props.href) {
    return (
      <a
        className={`button button--${props.size || "default"} ${
          props.inverse && "button--inverse"
        } ${props.danger && "button--danger"}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link to={props.to} exact={props.exact} >
        <Bt
          className={`button button--${props.size || "default"} ${
            props.inverse && "button--inverse"
          } ${props.danger && "button--danger"}`}
        >
          {props.children}
        </Bt>
      </Link>
    );
  }
  return (
    <Bt
      className={`button button--${props.size || "default"} ${
        props.inverse && "button--inverse"
      } ${props.danger && "button--danger"}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </Bt>
  );
};

export default Button;
