import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { getStatistics } from '../api/api'; // Import hàm lấy thống kê từ api.ts

const Dashboard: React.FC = () => {
  const [statistics, setStatistics] = useState<any>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await getStatistics(); // Gọi API lấy thống kê
        setStatistics(data);
      } catch (error) {
        message.error('Có lỗi khi tải thống kê!');
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard - Tổng Quan Quản Trị</h2>

      <Row gutter={16}>
        {/* Card Tổng Số Điểm Đến */}
        <Col span={8}>
          <Card>
            <Statistic title="Tổng số điểm đến" value={statistics ? statistics.totalDestinations : 0} />
            <Link to="/admin/destinations">
              <Button type="primary" style={{ marginTop: 10 }}>Quản lý điểm đến</Button>
            </Link>
          </Card>
        </Col>

        {/* Card Tổng Số Lượt Tham Quan */}
        <Col span={8}>
          <Card>
            <Statistic title="Tổng lượt tham quan" value={statistics ? statistics.totalVisits : 0} />
          </Card>
        </Col>

        {/* Card Địa Điểm Phổ Biến */}
        <Col span={8}>
          <Card>
            <Statistic title="Địa điểm phổ biến" value={statistics ? statistics.popularDestination : 'Đang tải...'} />
          </Card>
        </Col>
      </Row>

      {/* Button để vào trang thống kê */}
      <Link to="/admin/statistics">
        <Button type="default" style={{ marginTop: 20 }}>
          Xem Thống Kê Chi Tiết
        </Button>
      </Link>
    </div>
  );
};

export default Dashboard;
