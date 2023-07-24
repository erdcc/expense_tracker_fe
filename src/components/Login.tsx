import { Button, Form, Input, Result, message } from 'antd';
import showError from '../utils/showError';
import Api from '../utils/Api';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store';
import { LoginForm } from '../types/user';
import { login } from '../store/actions/userActions';
import { useEffect } from 'react';
import showSuccess from '../utils/showSuccess';


const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch<any>()
    const { data, loading, error } = useSelector((state: AppState) => state.user)

    const onFinish = (values: LoginForm) => {
        dispatch(login(values))
    }

    useEffect(() => { error && showError(messageApi, error) })

    useEffect(() => {
        data.username && showSuccess(messageApi, "You have successfully logged in!")
    },[data.username])

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(token){
            navigate("/")
        }
    },[data])

    return (
        <>
            {contextHolder}
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
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
        </>
    )
}

export default Login