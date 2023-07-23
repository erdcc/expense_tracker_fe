import { Button, Form, Input, message } from "antd"
import Api from "../utils/Api";
import { useNavigate } from "react-router-dom";
import showError from "../utils/showError";


const SignUp = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const validateMessages = {
        required: `{label} is required!`,
        types: {
            email: `{label} is not a valid email!`,
            number: `{label} is not a valid number!`,
        },
        number: {
            range: `{label} must be between {min} and {max}`,
        },
    };
    const navigate = useNavigate()
    const onFinish = async (values: any) => {
        try {
            console.log(values)
            await Api.post("/users/register", values)
            navigate("/login", { state: { newSignUp: true } })
        }
        catch (error) {
            console.log(error)
            showError(messageApi, (error as any).response.data.errorMessage)
        }

    };
    return (
        <>
            {contextHolder}
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                validateMessages={validateMessages}
            >
                <h2 style={{ textAlign: "center", marginBottom: "40" }}>REGISTER</h2>
                <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{
                        required: true,
                        min: 6,
                        message: 'Please input your password!'
                    }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="full_name" label="Full Name">
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default SignUp