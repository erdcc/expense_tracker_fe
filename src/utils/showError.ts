import { message } from "antd";

    const showError = (errorMessage: string) => {
        message.open({
            type: 'error',
            content: errorMessage,
        });
    };

export default showError