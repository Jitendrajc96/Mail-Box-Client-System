import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import LogIn from "./LogIn";
import store from "../../context/indexReducer";

describe("LogIn component", () => {
  test("renders login text", () => {
    // Arrange
    render(
      <Provider store={store}>
        <LogIn />
      </Provider>
    );
    // Assert
    const loginbtnele = screen.getByText("Log In");
    expect(loginbtnele).toBeInTheDocument();
  });

  test("renders email text", () => {
    // Arrange
    render(
      <Provider store={store}>
        <LogIn />
      </Provider>
    );
    // Assert
    const emailLabelEle = screen.getByText("Email");
    expect(emailLabelEle).toBeInTheDocument();
  });

  test("renders password text", () => {
    // Arrange
    render(
      <Provider store={store}>
        <LogIn />
      </Provider>
    );
    // Assert
    const passwordLabelEle = screen.getByText("Password");
    expect(passwordLabelEle).toBeInTheDocument();
  });

  test("renders forgot password text", () => {
    // Arrange
    render(
      <Provider store={store}>
        <LogIn />
      </Provider>
    );
    // Assert
    const forgotPasswordEle = screen.getByText("Forgot Password?");
    expect(forgotPasswordEle).toBeInTheDocument();
  });

  test("renders click hear to signup text", () => {
    // Arrange
    render(
      <Provider store={store}>
        <LogIn />
      </Provider>
    );
    // Assert
    const clickHearToSignupEle = screen.getByText("Click heare to Sign Up", {exact:false});
    expect(clickHearToSignupEle).toBeInTheDocument();
  });
});