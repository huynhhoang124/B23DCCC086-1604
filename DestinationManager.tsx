import React, { useState } from 'react';
import { Button, Input, Modal, Upload, Card, Row, Col, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { addDestination, getDestinations } from '../api/api'; // Import từ api.ts

const DestinationManager: React.FC = () => {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [newDestination, setNewDestination] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Thêm điểm đến
  const handleAddDestination = async () => {
    if (!newDestination || !image) {
      message.error('Vui lòng nhập tên và tải hình ảnh điểm đến!');
      return;
    }

    setIsSubmitting(true);
    try {
      const newDest = await addDestination(newDestination, image); // Gọi API từ api.ts
      setDestinations([...destinations, newDest]);
      setNewDestination('');
      setImage(null);
      message.success('Đã thêm điểm đến thành công!');
    } catch (error) {
      message.error('Có lỗi khi thêm điểm đến!');
    } finally {
      setIsSubmitting(false);
      setIsModalVisible(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Quản lý điểm đến</h2>
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 20 }}>
        Thêm điểm đến
      </Button>

      {/* Modal Thêm điểm đến */}
      <Modal
        title="Thêm điểm đến"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        <Input
          placeholder="Tên điểm đến"
          value={newDestination}
          onChange={(e) => setNewDestination(e.target.value)} // Cập nhật tên điểm đến
          style={{ marginBottom: 20 }}
        />
        <Upload
          name="image"
          listType="picture-card"
          showUploadList={false}
          beforeUpload={() => false}
          onChange={(info) => setImage(info.file.originFileObj)}
        >
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="Điểm đến"
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <div>
              <UploadOutlined />
              <div>Chọn hình ảnh</div>
            </div>
          )}
        </Upload>
        <Button
          type="primary"
          onClick={handleAddDestination} // Gọi hàm thêm điểm đến
          loading={isSubmitting}
          style={{ marginTop: 20 }}
        >
          Thêm điểm đến
        </Button>
      </Modal>

      {/* Hiển thị danh sách điểm đến */}
      <Row gutter={[16, 16]}>
        {destinations.map((destination) => (
          <Col span={8} key={destination.id}>
            <Card
              hoverable
              cover={<img alt={destination.name} src={destination.image} />}
              actions={[
                <Button type="link" onClick={() => console.log('Sửa')}>Sửa</Button>,
                <Button type="link" danger onClick={() => console.log('Xóa')}>Xóa</Button>
              ]}
            >
              <Card.Meta title={destination.name} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DestinationManager;
