import React from "react";
import "components/Button.scss";
var classNames = require('classnames');



export default function Button(props) {
   let buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   });

      // let buttonClass = "button";

      // if (props.confirm) {
      //   buttonClass += " button--confirm";
      // }
    
   return <button className={buttonClass} disabled = {props.disabled} 
   onClick={props.onClick}>{props.children}</button>;
   
}
