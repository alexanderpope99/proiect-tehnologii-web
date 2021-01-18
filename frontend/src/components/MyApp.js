import React from 'react';
import MyNavbar from './MyNavbar';
import MyCards from './MyCards';
import MyTable from './MyTable';
import MyGraph from './MyGraph';
import MyFooter from './MyFooter';
import { Container, Row, Col } from 'react-bootstrap';

export default class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.myTable = React.createRef();
    this.myCards = React.createRef();
    this.myGraph = React.createRef();
  }
  refreshMyCards = () => {
    this.myCards.current.getCategories();
    this.myGraph.current.getCategories();
  };
  refreshMyTable = () => {
    this.myTable.current.getExpenses();
    this.myGraph.current.getCategories();
  };
  render() {
    return (
      <div>
        <MyNavbar />
        <Container style={{ backgroundColor: '#f5f7fb', marginBottom: '50' }}>
          <MyCards ref={this.myCards} update={this.refreshMyTable} />
          <Container>
            <Row style={{ marginTop: '500' }}>
              <MyTable ref={this.myTable} update={this.refreshMyCards} />
              <Col>
                <h2>Grafic</h2>
                <MyGraph ref={this.myGraph} />
              </Col>
            </Row>
          </Container>
          {/* <MyFooter /> */}
        </Container>
      </div>
    );
  }
}
