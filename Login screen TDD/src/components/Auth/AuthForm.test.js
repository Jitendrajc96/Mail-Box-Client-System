import AuthForm from "./AuthForm";
import { render,screen } from "@testing-library/react";
import store from "../../store/store";
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event'




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
        const linkElement = screen.getByText('Login With', {exact:false})
        expect(linkElement).toBeInTheDocument
    })

    test('Redirect to Login Page', ()=>{
        render(<Provider store={store}>
            <AuthForm/>
        </Provider>)

        const linkElement = screen.getByText('Login with existing account')
        userEvent.click(linkElement)

        const loginText = screen.getByText('Your Email') 
        expect(loginText).toBeInTheDocument



    })

    test('Create New Account Exists', ()=>{
        render(<Provider store={store}>
            <AuthForm/>
        </Provider>)

        const linkElement = screen.getByText('Login with existing account')
        userEvent.click(linkElement)

        const loginText = screen.getByText('Create new account') 
        expect(loginText).toBeInTheDocument



    })
})