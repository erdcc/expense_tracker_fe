import { Button, Form, Input, Result } from 'antd';
import showError from '../utils/showError';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store';
import { LoginForm } from '../types/user';
import { login } from '../store/actions/userActions';
import { useEffect } from 'react';
import showSuccess from '../utils/showSuccess';


const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch<any>()
    const { data, error } = useSelector((state: AppState) => state.user)

    const onFinish = (values: LoginForm) => {
        dispatch(login(values))
    }

    useEffect(() => { error && showError(error) }, [error])

    useEffect(() => {
        data.username && showSuccess("You have successfully logged in!")
    }, [data.username])

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            navigate("/")
        }
    }, [data])

    return (
        <div style={{
            display: 'flex',
            justifyContent: "center"
        }}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"

            >
                <h2 style={{ textAlign: "center", marginBottom: "40" }}>
                    Please Login
                </h2>
                {location.state?.newSignUp &&
                    <Result
                        status="success"
                        title="You successfully signed up!"
                        subTitle="Please login using your credentials."
                    />}

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login