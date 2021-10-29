import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import UserService from '../services/UserService'


function LoginScreen({ location, history }) {
    const userService = new UserService()
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'
    console.log('search:', location.search)

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(userService.login(username, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>

            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}

            <Form onSubmit={submitHandler}>

                <Form.Group controlId='username'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type='username'
                        placeholder='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}    
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}    
                    >
                    </Form.Control>
                </Form.Group>

                <Button className='mt-3' type='submit' variant='primary'>Sign In</Button>

                <Row className='py-3'>
                    <Col>
                        First time? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Sign Up</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen
