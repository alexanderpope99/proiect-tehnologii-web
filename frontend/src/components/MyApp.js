import React from 'react';
import MyNavbar from './MyNavbar';
import MyCards from './MyCards';
import MyTable from './MyTable';
import MyGraph from './MyGraph';
import { Container, Row, Col } from 'react-bootstrap';

function MyApp() {
  return (
    <div>
      <MyNavbar />
      <Container>
        <MyCards />
        <Container>
          <Row>
            <Col>
              <h2>Tabel cheltuieli</h2>
              <MyTable />
            </Col>
            <Col>
              <h2>Grafic cheltuieli</h2>
              <MyGraph />
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default MyApp;
