import { Button, Form, Input, Result, message } from 'antd';
import showError from '../utils/showError';
import Api from '../utils/Api';
import { useLocation, useNavigate } from 'react-router-dom';


const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const navigate = useNavigate()
    const location = useLocation()
    const onFinish = async (values: any) => {
        console.log('Success:', values);
        try {
            await Api.post("/users/login", values)
            navigate("/")
        }
        catch (error) { console.log(error) }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        showError(messageApi, errorInfo)
    };
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
                onFinishFailed={onFinishFailed}
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