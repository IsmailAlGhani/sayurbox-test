import { CaretLeftOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { Descriptions, Space, Spin, Tag, Typography } from 'antd';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { LOAD_MEDIA_DETAIL } from '../Graphql/Queries';

const { Title, Text } = Typography;

function DetailMedia(props) {
  let { mediaId } = useParams();

  const { loading, data } = useQuery(LOAD_MEDIA_DETAIL, {
    variables: {
      id: parseInt(mediaId)
    }
  });

  function handleValue(key) {
    switch (key) {
      case "title":
        return data.Media[key].romaji;
      case "genres":
        return (
          <div>
            {data.Media[key].map((genre,id) => {
              return (
                <Tag color={'geekblue'} key={id}>
                  {genre.toUpperCase()}
                </Tag>
              );
            })}
          </div>
        );
      default:
        return data.Media[key];
    }
  }
  
  return (
    <Spin spinning={loading}>
      {data && 
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Link to={'/media'}>
            <Space direction="horizontal" size="small" style={{ display: 'flex' }}>
              <CaretLeftOutlined />
              <Text strong>Back</Text>
            </Space>
          </Link>
          <Title level={2} style={{marginBottom: "unset"}}>
            Detail Media
          </Title>
          <Descriptions bordered>
            {Object.keys(data.Media).map((dataKey,index) => {
              if (dataKey !== "__typename") {
                return (
                  <Descriptions.Item label={dataKey} key={index}>
                    {handleValue(dataKey)}
                  </Descriptions.Item>
                )
              }
            })}
          </Descriptions>
        </Space>
      }
    </Spin>
  );
}

export default DetailMedia;