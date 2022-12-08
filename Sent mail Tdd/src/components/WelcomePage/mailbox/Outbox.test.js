import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Outbox from "./Outbox";
import store from '../../../context/indexReducer';

describe("Outbox component", () => {
  test("renders no emails found if there are no emails from fetch", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
        json: async () => {{}},
    })
    // Arrange
    render(
      <Provider store={store}>
        <Outbox/>
      </Provider>
    );

    // Assert
    const noEmailsTextNode = await screen.findByText('no emails found', {exact: false});
    expect(noEmailsTextNode).toBeInTheDocument();
  });

  test("renders emails if there are emails from fetch", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
        json: async () => {return {jisjsjs:{to:'someone', heading: 'hello', body:'<p>Hello boss</p>'},}},
    })
    // Arrange
    render(
      <Provider store={store}>
        <Outbox/>
      </Provider>
    );

    // Assert
    const EmailslistNode = await screen.findAllByRole('listitem');
    expect(EmailslistNode).not.toHaveLength(0);
  });
});