import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import SignUp from "./SignUp";
import store from "../../context/indexReducer";
import userEvent from '@testing-library/user-event';
describe("signup component", () => {
  test("renders sign up test", () => {
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    const signUpEle = screen.getByText("Sign Up");
    expect(signUpEle).toBeInTheDocument();
  });
  test("renders email test", () => {
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    const emailElement = screen.getByText("Email");
    expect(emailElement).toBeInTheDocument();
  });
  test("renders password test", () => {
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    const passwordEle = screen.getByText("Password");
    expect(passwordEle).toBeInTheDocument();
  });
  test("renders confirm password test", () => {
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    const confirmPasswordEle = screen.getByText("Confirm Password");
    expect(confirmPasswordEle).toBeInTheDocument();
  });

  test("renders signing up... after signup click", () => {
  test("does not renders signing up... after signup click without credentials", () => {

    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
        json: async () => {{}},
    })
    // Arrange
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );

    // Act
    const signupEle = screen.getByRole('button');

    const signupEle = screen.getByText('sign up', {exact:false});
    userEvent.click(signupEle);

    // Assert
    const signiguplabel = screen.getByText("Signing Up ...");
    expect(signiguplabel).toBeInTheDocument();
    const signiguplabel = screen.queryByText('signing up....')
    expect(signiguplabel).not.toBeInTheDocument();
  });
});

// describe('Sign up Async Component', ()=>{
//   test("renders Email_Exists if sign up fails", async () => {
//     const data = {error: {message: 'Email_Exists'}};
//     window.fetch = jest.fn();
//     window.fetch.mockResolvedValueOnce({
//       json: async()=>{return {error:{message:'Email_Exists'}}},
//       json: async()=>data,
//     })
//     render(
//       <Provider store={store}>
//         <SignUp />
//       </Provider>
//     );
//     const afterSignupFailEle = await screen.findByText('Email_Exists', {exact: false});
//     expect(afterSignupFailEle).toBeInTheDocument()
//   });
// })
// })