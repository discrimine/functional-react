import React from "react";

export default function ErrorBlockUser(props) {
  return <div className="alert alert-danger">
    {props.error}
  </div>
}
