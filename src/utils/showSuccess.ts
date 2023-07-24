import { MessageInstance } from "antd/es/message/interface";

const showSuccess = (messageApi: MessageInstance, message: string) => {
    messageApi.open({
        type: 'success',
        content: message,
    });
};

export default showSuccess