import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import CreateEmail from './CreateEmail';
import store from '../../../context/indexReducer';

describe("Create Email component", () => {
  test("renders To: field", () => {
    // Arrange
    render(
      <Provider store={store}>
        <CreateEmail />
      </Provider>
    );
    // Assert
    const toTextNode = screen.getByText("To", {exact:false});
    expect(toTextNode).toBeInTheDocument();
  });

  test("renders heading field text", () => {
    // Arrange
    render(
      <Provider store={store}>
        <CreateEmail />
      </Provider>
    );
    // Assert
    const headingTextNode = screen.getByText("heading", {exact: false});
    expect(headingTextNode).toBeInTheDocument();
  });

  test("renders send mail button text", () => {
    // Arrange
    render(
      <Provider store={store}>
        <CreateEmail />
      </Provider>
    );
    // Assert
    const sendMailTextNode = screen.getByText("send mail", {exact: false});
    expect(sendMailTextNode).toBeInTheDocument();
  });

});