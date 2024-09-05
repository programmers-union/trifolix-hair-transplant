import React, { useState } from 'react';
import './AddressForm.scss'; // Import the SCSS file

const RequiredAsterisk = () => <span className="required-asterisk">*</span>;

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="label">
    {children}
  </label>
);

const Input = ({ error, ...props }) => (
  <input className={`input ${error ? 'input-error' : ''}`} {...props} />
);

const Textarea = ({ error, ...props }) => (
  <textarea className={`textarea ${error ? 'input-error' : ''}`} {...props} />
);

const Button = ({ children, ...props }) => (
  <button className="button" {...props}>
    {children}
  </button>
);

export const AddressForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postcode: '',
    mobilePhone: '',
    landmark: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postcode: '',
    mobilePhone: ''
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? '' : 'Please enter a valid email.';
  };

  const validateMobilePhone = (mobilePhone) => {
    return mobilePhone.length == 10 ? '' : 'Please enter a valid mobile number.';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only numeric values for mobilePhone and postcode fields
    if ((name === 'mobilePhone' || name === 'postcode') && /\D/.test(value)) {
      return; // Prevent non-numeric characters
    }

    setFormData({ ...formData, [name]: value });

    let error = '';
    if (value === '') {
      error = 'This field is required.';
    } else {
      if (name === 'email') error = validateEmail(value);
      if (name === 'mobilePhone') error = validateMobilePhone(value);
    }

    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for errors
    const newErrors = {
      email: validateEmail(formData.email) || (formData.email === '' && 'This field is required.'),
      firstName: formData.firstName === '' ? 'This field is required.' : '',
      lastName: formData.lastName === '' ? 'This field is required.' : '',
      address: formData.address === '' ? 'This field is required.' : '',
      city: formData.city === '' ? 'This field is required.' : '',
      postcode: formData.postcode === '' ? 'This field is required.' : '',
      mobilePhone: validateMobilePhone(formData.mobilePhone) || (formData.mobilePhone === '' && 'This field is required.')
    };

    setErrors(newErrors);

    // If no errors, submit the form
    if (Object.values(newErrors).every((err) => err === '')) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className='main-billing'>
      <div className="billing-address-form">
        <h2>Billing Address</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Label htmlFor="email">Email Address <RequiredAsterisk /></Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <Label htmlFor="firstName">First Name <RequiredAsterisk /></Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <Label htmlFor="lastName">Last Name <RequiredAsterisk /></Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-group">
            <Label htmlFor="address">Address <RequiredAsterisk /></Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
              rows={3}
            />
            {errors.address && <span className="error-text">{errors.address}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <Label htmlFor="city">City <RequiredAsterisk /></Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={errors.city}
              />
              {errors.city && <span className="error-text">{errors.city}</span>}
            </div>
            <div className="form-group">
              <Label htmlFor="postcode">Postcode <RequiredAsterisk /></Label>
              <Input
                id="postcode"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                error={errors.postcode}
              />
              {errors.postcode && <span className="error-text">{errors.postcode}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <Label htmlFor="mobilePhone">Mobile Phone <RequiredAsterisk /></Label>
              <Input
                id="mobilePhone"
                name="mobilePhone"
                value={formData.mobilePhone}
                onChange={handleChange}
                error={errors.mobilePhone}
              />
              {errors.mobilePhone && <span className="error-text">{errors.mobilePhone}</span>}
            </div>
            <div className="form-group">
              <Label htmlFor="landmark">Landmark <small>(Optional)</small></Label>
              <Input
                id="landmark"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
              />
            </div>
          </div>

          <Button type="submit">Save & Submit</Button>
        </form>
      </div>
    </div>
  );
};
