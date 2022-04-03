import { useQuery } from '@apollo/client';
import { Input, Space, Table, Tag, Typography } from 'antd';
import React, {Fragment, useEffect, useState} from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LOAD_MEDIA_LIST } from '../Graphql/Queries';

const { Title } = Typography;
const { Search } = Input;

function ListMedia(props) {
  const [param,setParam] = useState({
    page: 1,
    perPage: 10,
    search:undefined,
    genre:null,
  })
  const [mediaPage,setMediaPage] = useState();
  const dataTable = useQuery(LOAD_MEDIA_LIST, {
    variables: {
      ...param,
      search: param.search ? param.search : null,
    }
  });

  const columns = [
    {
      title:"Name",
      dataIndex: "title",
      render: (text, record) => (
        <Link to={`/media/${record.id}`}>
          <div>{record.title ? record.title.romaji : undefined} </div>
        </Link>
      )
    },
    {
      title:"Genres",
      dataIndex: "genres",
      render: genres => (
        <div>
          {genres && genres.map((genre,id) => {
            return (
              <Tag color={'geekblue'} key={id}>
                {genre.toUpperCase()}
              </Tag>
            );
          })}
        </div>
      )
    },
    {
      title:"Episodes",
      dataIndex: "episodes",
    },
    {
      title:"Season",
      dataIndex: "season",
    },
    {
      title:"Season Yea",
      dataIndex: "seasonYear",
    },
  ]

  useEffect(() => {
    if (dataTable.data) {
      setMediaPage(dataTable.data.Page)
    }
  }, [dataTable.data])

  function handleSearch(dataSearch) {
    setParam((prevState) => ({
      ...prevState,
      search: dataSearch ? dataSearch : undefined
    }))
    dataTable.refetch({
      ...param,
      search: param.search ? param.search : null,
    })
  }

  function onTableChange(pagination,filters,sorter) {
    if (param.page !== pagination.current) {
      setParam((prevState) => ({
        ...prevState,
        page: pagination.current
      }))
    }
  }

  return (
    <Fragment>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Title level={2} style={{marginBottom: "unset"}}>
          List Media
        </Title>
        <Search allowClear placeholder="input search text" onSearch={handleSearch} value={param.search} enterButton />
        {mediaPage && 
          <Table 
            columns={columns}
            dataSource={mediaPage ? mediaPage.media : null}
            onChange={onTableChange}
            loading={dataTable.loading}
            pagination={{
              pageSize: param.perPage,
              total: mediaPage.pageInfo.total,
              showSizeChanger: false,
              showQuickJumper: false
            }}
            style={{width: "100%"}}/>
        }
      </Space>
      <Outlet />
    </Fragment>
  );
}

export default ListMedia;