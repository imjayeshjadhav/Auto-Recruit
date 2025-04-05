import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('The form was submitted with the following data:');
    console.log(this.state);
  }

  render() {
    return (
      <div className="h-screen flex text-white">
        {/* Aside Section */}
        <div className="w-1/2 bg-teal-300"></div>

        {/* Form Section */}
        <div className="w-1/2 bg-[#2E4158] p-10 overflow-auto">
          {/* Page Switcher */}
          <div className="flex justify-end mb-10">
            <Link
              to="/signin"
              className="bg-[#5ED0C0] text-white px-6 py-2 text-sm rounded-l-full"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-[#4C5D72] text-[#9DA6B1] px-6 py-2 text-sm rounded-r-full"
            >
              Sign Up
            </Link>
          </div>

          {/* Form */}
          <div className="mb-24">
            <form className="space-y-10" onSubmit={this.handleSubmit}>
              <div>
                <div className="text-[#707C8B] font-light text-2xl mb-10">
                  <Link
                    to="/signin"
                    className="text-white border-b border-[#199087] pb-1 mr-4"
                  >
                    Sign In
                  </Link>
                  or
                  <Link to="/signup" className="ml-4 pb-1 text-[#707C8B]">
                    Sign Up
                  </Link>
                </div>

                {/* Email Field */}
                <div className="mb-10">
                  <label htmlFor="email" className="uppercase text-sm block">
                    E-Mail Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-10/12 bg-transparent border-b border-[#445366] mt-2 py-2 text-white outline-none placeholder-[#616E7F] text-base font-light"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>

                {/* Password Field */}
                <div className="mb-10">
                  <label htmlFor="password" className="uppercase text-sm block">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-10/12 bg-transparent border-b border-[#445366] mt-2 py-2 text-white outline-none placeholder-[#616E7F] text-base font-light"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>

                {/* Button and Link */}
                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    className="bg-[#52C4B9] text-white rounded-full px-12 py-3 text-sm font-medium"
                  >
                    Sign In
                  </button>
                  <Link to="/" className="text-[#66707D] border-b-2 border-[#225E62] pb-1 text-sm">
                    Create an account
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignInForm;
