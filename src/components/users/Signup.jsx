import React from 'react';
import useCustomForm from '../hooks/FormHooks';

export default function Signup() {

    const {inputs, handleInputChange} = useCustomForm();
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    };
    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
            options.body = JSON.stringify(inputs);
            fetch('http://localhost:3001/api/signup', options)
                .then(response => {
                    const data = response.json();
                    data.then(res => console.log(res));
                });
        }
    };

    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-6 align-self-center">
                    <form className="register-form" onSubmit={handleSubmit}>
                        <div className="form-group row">
                            <label
                                htmlFor="inputEmail1"
                                className="col-4 col-form-label">
                                Email address
                            </label>
                            <div className="col-8">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="inputEmail1"
                                    name="email"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    onChange={handleInputChange}
                                    value={inputs.email}
                                    required/>
                                <div className="invalid-feedback">
                                    Please provide a valid email.
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputPassword" className="col-4 col-form-label">Password</label>
                            <div className="col-8">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="inputPassword"
                                    placeholder="Password"
                                    name="password"
                                    onChange={handleInputChange}
                                    value={inputs.password}
                                    required/>
                                <div className="invalid-feedback">
                                    Please provide a valid Password.
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputConfirmPassword" className="col-4 col-form-label">Confirm
                                password</label>
                            <div className="col-8">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="inputConfirmPassword"
                                    placeholder="Confirm password"
                                    name="confpass"
                                    onChange={handleInputChange}
                                    value={inputs.confpass}
                                    required/>
                                <div className="invalid-feedback">
                                    Please provide a valid Password.
                                </div>
                            </div>
                        </div>
                        <button type="submit" disabled={inputs.password !== inputs.confpass}
                                className="btn btn-primary">Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
