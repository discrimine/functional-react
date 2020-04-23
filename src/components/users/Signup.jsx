import React, {useEffect, useState} from 'react';

export default function Signup() {
    // const [options, setFilterOptions] = useState(new URLSearchParams());
    //
    // function handleChange(event) {
    //     options.set(event.target.name, event.target.value);
    //
    //     setFilterOptions(options);
    //     console.log(setFilterOptions);
    // }
    const options = {};
    function handleSubmit(event) {
        console.log(event.target.value());
        debugger;
        options.method = 'POST';
        options.body = JSON.stringify({email: 'test1111@test.com', password: '123456'});
        options.headers = { 'Content-Type': 'application/json' };
        debugger;
        fetch('http://localhost:3001/api/signup', options)
            .then(response => {
                console.log(response);
                debugger;
            })
            .catch(res => {
                console.log(res);
            })
    }

  return (
        <div className="container" style={{marginTop: "15px"}}>
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
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    // onChange={handleChange}
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
                                    // onChange={handleChange}
                                    required/>
                                <div className="invalid-feedback">
                                    Please provide a valid Password.
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
    </div>
  );
}
