import React from 'react';
import Loader from 'react-loader-spinner';

export default function Spinner() {
  return (
	<div className="
		spinner-element
		d-flex
		h-100
		w-100
		position-fixed
		justify-content-center
		align-items-center
	">
		<Loader type="BallTriangle" color="#00BFFF" height={50} width={50} />
 	</div>
  );
}