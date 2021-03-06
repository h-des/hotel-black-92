import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter, Redirect } from 'react-router-dom';
import { Input } from '../../Components/Inputs';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Checkbox from '../../Components/Checkbox';
import { Form, Field } from 'react-final-form';
import Total from './Total';

const StyledForm = styled.form`
  width: 100%;
  text-align: center;
`;

const CheckoutContainer = styled.div`
  background-color: white;
  margin: 0 auto;
  width: 100%;
  max-width: 96rem;
  margin-top: 10rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);

  @media only screen and (max-width: 625px) {
    flex-direction: column;
  }
`;

const CheckoutBody = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 4rem 5rem;
  width: 67%;
  color: ${props => props.theme.colors.black};

  @media only screen and (max-width: 625px) {
    width: 100%;
  }
`;

const FormTitle = styled.h3`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 4rem;
`;

const FormSubTitle = styled.h4`
  font-size: 2.4rem;
  font-weight: 600;
  color: #414141;
  margin-bottom: 3rem;
`;

const Label = styled.label`
  font-size: 1.6rem;
  color: #666;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const BackButton = styled.button`
  color: ${props => props.theme.colors.grey};
  font-size: 1.6rem;
  border: none;
  background-color: transparent;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  max-width: 10rem;
  transition: all 0.2s;
  padding: 0.5rem 0;

  &:hover {
    background-color: #ddd;
  }
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: red;
  margin-bottom: 0.9rem;
`;

const NextButton = styled.button`
  border-radius: 2rem;
  justify-self: flex-end;
  border: none;
  height: 4rem;
  width: 8rem;
  color: white;
  background-color: ${props => props.theme.colors.primary};
  font-size: 1.6rem;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #1fb6ff;
  }

  &:disabled {
    background-color: #ccc;
    color: ${props => props.theme.colors.black};
    cursor: initial;
  }
`;

const required = value => (value ? undefined : 'Required');

class Checkout extends Component {
  componentWillUnmount() {
    this.props.resetCheckoutData();
  }

  pay = e => {
    const data = { ...e, ...this.props.checkout.data };
    console.log('e: ', e);
    console.log('data: ', data);
    this.props.proceedToPayment(data);
  };

  render() {
    const { hash } = this.props.checkout;
    const {
      firstName,
      lastName,
      email,
      zipCode,
      phone,
      address,
      city
    } = this.props.user.data;
    if (!this.props.checkout.data) {
      return <Redirect to="/hotels" />;
    }
    if (hash) {
      return <Redirect to="/pay" />;
    }
    return (
      <Form
        onSubmit={this.pay}
        initialValues={{
          firstName,
          lastName,
          email,
          zipCode,
          phone,
          address,
          city,
          breakfast: false
        }}
        render={({ handleSubmit, pristine, invalid, values }) => {
          return (
            <StyledForm onSubmit={handleSubmit}>
              <CheckoutContainer>
                <CheckoutBody>
                  <FormTitle>Checkout</FormTitle>
                  <FormSubTitle>Details</FormSubTitle>
                  <Field
                    name="breakfast"
                    type="checkbox"
                    render={({ input }) => (
                      <React.Fragment>
                        <Checkbox {...input} margin="0 0 2.5rem 0">
                          Breakfast included
                        </Checkbox>
                      </React.Fragment>
                    )}
                  />
                  <FormSubTitle>Personal</FormSubTitle>
                  <Field
                    name="firstName"
                    validate={required}
                    render={({ input, meta }) => (
                      <React.Fragment>
                        <Label htmlFor="firstName">First name</Label>
                        <Input
                          {...input}
                          error={meta.touched && meta.error}
                          marginBottom={
                            meta.touched && meta.invalid ? '0' : '2.5rem'
                          }
                        />
                        {meta.touched && meta.error && (
                          <Message>{meta.error}</Message>
                        )}
                      </React.Fragment>
                    )}
                  />
                  <Field
                    name="lastName"
                    validate={required}
                    render={({ input, meta }) => (
                      <React.Fragment>
                        <Label htmlFor="lastName">Last name</Label>
                        <Input
                          {...input}
                          error={meta.touched && meta.error}
                          marginBottom={
                            meta.touched && meta.invalid ? '0' : '2.5rem'
                          }
                        />
                        {meta.touched && meta.error && (
                          <Message>{meta.error}</Message>
                        )}
                      </React.Fragment>
                    )}
                  />
                  <FormSubTitle>Contact</FormSubTitle>
                  <Field
                    name="email"
                    validate={required}
                    render={({ input, meta }) => (
                      <React.Fragment>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          {...input}
                          error={meta.touched && meta.error}
                          marginBottom={
                            meta.touched && meta.invalid ? '0' : '2.5rem'
                          }
                        />
                        {meta.touched && meta.error && (
                          <Message>{meta.error}</Message>
                        )}
                      </React.Fragment>
                    )}
                  />
                  <Field
                    name="address"
                    validate={required}
                    render={({ input, meta }) => (
                      <React.Fragment>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          {...input}
                          error={meta.touched && meta.error}
                          marginBottom={
                            meta.touched && meta.invalid ? '0' : '2.5rem'
                          }
                        />
                        {meta.touched && meta.error && (
                          <Message>{meta.error}</Message>
                        )}
                      </React.Fragment>
                    )}
                  />
                  <Field
                    name="city"
                    validate={required}
                    render={({ input, meta }) => (
                      <React.Fragment>
                        <Label htmlFor="city">City</Label>
                        <Input
                          {...input}
                          error={meta.touched && meta.error}
                          marginBottom={
                            meta.touched && meta.invalid ? '0' : '2.5rem'
                          }
                        />
                        {meta.touched && meta.error && (
                          <Message>{meta.error}</Message>
                        )}
                      </React.Fragment>
                    )}
                  />
                  <Field
                    name="zipCode"
                    validate={required}
                    render={({ input, meta }) => (
                      <React.Fragment>
                        <Label htmlFor="zipcCode">Zip code</Label>
                        <Input
                          {...input}
                          error={meta.touched && meta.error}
                          marginBottom={
                            meta.touched && meta.invalid ? '0' : '2.5rem'
                          }
                        />
                        {meta.touched && meta.error && (
                          <Message>{meta.error}</Message>
                        )}
                      </React.Fragment>
                    )}
                  />
                  <Field
                    name="phone"
                    validate={required}
                    render={({ input, meta }) => (
                      <React.Fragment>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          {...input}
                          error={meta.touched && meta.error}
                          marginBottom={
                            meta.touched && meta.invalid ? '0' : '2.5rem'
                          }
                        />
                        {meta.touched && meta.error && (
                          <Message>{meta.error}</Message>
                        )}
                      </React.Fragment>
                    )}
                  />
                  <BackButton onClick={() => this.props.history.goBack()}>
                    Back
                  </BackButton>
                </CheckoutBody>
                <Total
                  data={this.props.checkout.data}
                  breakfast={values.breakfast}
                >
                  <NextButton disabled={invalid} type="submit">
                    Pay
                  </NextButton>
                </Total>
              </CheckoutContainer>
            </StyledForm>
          );
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    checkout: state.checkout
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(Checkout)
);
