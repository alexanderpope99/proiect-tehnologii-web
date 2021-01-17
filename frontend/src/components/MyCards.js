import React from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

export default class MyCards extends React.Component {
  constructor() {
    super();
    this.getCategories = this.getCategories.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      categories: [],
      show: false,
      categoryName: '',
    };
  }

  async componentDidMount() {
    await this.getCategories();
  }

  async getCategories() {
    const data = await axios
      .get('http://localhost:8080/api/categories')
      .then(function (res) {
        return res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    if (data)
      this.setState({
        categories: data.map((val, ind) => {
          return <th key={ind}>{val.name}</th>;
        }),
      });
  }

  async addCategory() {
    console.log(this.state.categoryName);
    const data = await axios
      .post('http://localhost:8080/api/categories', {
        name: this.state.categoryName,
      })
      .then(function (res) {
        return res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    if (data) {
      this.setState({
        show: false,
        categoryName: '',
      });
      await this.getCategories();
    }
  }

  handleClose() {
    this.setState({ show: false, categoryName: '' });
  }

  render() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Adaugă Categorie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.addCategory}>
              <Form.Group controlId="formName">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={(e) => this.setState({ categoryName: e.target.value })}
                  type="text"
                  placeholder="Nume categorie"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Anulează
            </Button>
            <Button variant="primary" onClick={this.addCategory}>
              Adaugă
            </Button>
          </Modal.Footer>
        </Modal>
        <Table responsive>
          <thead>
            <tr>
              {this.state.categories}
              <th>
                <Button onClick={() => this.setState({ show: true })}>+</Button>
              </th>
            </tr>
          </thead>
        </Table>
      </div>
    );
  }
}
