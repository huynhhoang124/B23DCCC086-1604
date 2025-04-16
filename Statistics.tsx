import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Statistic, message } from 'antd';
import { getStatistics } from '../api/api'; // Import từ api.ts

const Statistics: React.FC = () => {
  const [statistics, setStatistics] = useState<any>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await getStatistics(); // Gọi API để lấy thống kê
        setStatistics(data);
      } catch (error) {
        message.error('Có lỗi khi tải thống kê!');
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Thống kê</h2>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Tổng lượt lịch trình"
              value={statistics ? statistics.totalTrips : 0}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Địa điểm phổ biến"
              value={statistics ? statistics.popularDestination.name : 'Đang tải...'}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Statistics;
