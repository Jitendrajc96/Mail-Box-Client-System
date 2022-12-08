import AuthForm from "./AuthForm";
import { render,screen } from "@testing-library/react";
import store from "../../store/store";
import { Provider } from 'react-redux';




describe('AuthForm Testing', ()=>{
    test('Sign Up Exists', ()=>{
        render(<Provider store={store}>
            <AuthForm/>
        </Provider>)

        const signUpElement = screen.getByText('Sign Up')
        expect(signUpElement).toBeInTheDocument
    })
    test('Email Exists',()=>{
        render(<Provider store={store}>
            <AuthForm/>
        </Provider>)
        const emailElement = screen.getByText('Your Email')
        expect(emailElement).toBeInTheDocument
    })
    test('Password Exists',()=>{
        render(<Provider store={store}>
            <AuthForm/>
        </Provider>)
        const passElement = screen.getByText('Your Password')
        expect(passElement).toBeInTheDocument

    })
    test('Create Account Exits',()=>{
        render(<Provider store={store}>
            <AuthForm/>
        </Provider>)
        const loginElement = screen.getByText('Create Account')
        expect(loginElement).toBeInTheDocument
    })
    test('Login Link Exists', ()=>{
        render(<Provider store={store}>
            <AuthForm/>
        </Provider>)
        const linkElement = screen.getByRole('link')
        expect(linkElement).toBeInTheDocument
    })
})