import { Col, Row } from 'antd';
import React, { Fragment } from 'react';
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import DetailMedia from './Pages/DetailMedia';
import ListMedia from './Pages/ListMedia';

const Home = () => {
  return (
    <Fragment>
      <Navigate to="/media" replace />
      <Outlet />
    </Fragment>
  )
}

const MediaLayout = () => {
  return (
    <Row justify="center" style={{paddingTop: "4rem"}}>
      <Col xs={22} sm={20} xl={18}>
        <Outlet />
      </Col>
    </Row>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
      </Route>
      <Route path="/media" element={<MediaLayout />}>
        <Route index element={<ListMedia />}/>
        <Route path=":mediaId" element={<DetailMedia />} />
      </Route>
    </Routes>
  );
}

export default App;
