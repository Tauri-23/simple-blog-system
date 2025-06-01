import { Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile } from 'antd/es/upload/interface';

const ImageUpload = ({pic, setPic}: {pic: File | null, setPic: (val: File | null) => void}) => {

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 20;
        if (!isLt2M) {
            message.error('Image must be smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = (info: UploadChangeParam) => {
        // For manually controlled upload, status can be 'uploading' or 'done'
        const file = info.file.originFileObj;
        if (file) {
            setPic(file);
        }
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
            <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            maxCount={1}
            customRequest={({ onSuccess }) => {
                setTimeout(() => {
                onSuccess && onSuccess("ok");
                }, 0);
            }}
            >
            {pic ? (
                <img src={URL.createObjectURL(pic)} alt="avatar" style={{ width: '100%' }} />
            ) : (
                uploadButton
            )}
            </Upload>
    );
};

export default ImageUpload;