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
    // Arrange
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );

    // Act
    const signupEle = screen.getByRole('button');
    userEvent.click(signupEle);

    // Assert
    const signiguplabel = screen.getByText("Signing Up ...");
    expect(signiguplabel).toBeInTheDocument();
  });
});

// describe('Sign up Async Component', ()=>{
//   test("renders Email_Exists if sign up fails", async () => {
//     window.fetch = jest.fn();
//     window.fetch.mockResolvedValueOnce({
//       json: async()=>{return {error:{message:'Email_Exists'}}},
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