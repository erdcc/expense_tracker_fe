import { MessageInstance } from "antd/es/message/interface";

    const showError = (messageApi: MessageInstance,errorMessage: string) => {
        messageApi.open({
            type: 'error',
            content: errorMessage,
        });
    };

export default showError