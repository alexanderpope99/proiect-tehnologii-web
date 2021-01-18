import React from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
  InputGroup,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
import axios from 'axios';
import { PlusCircle, Circle } from 'react-feather';
import PropTypes from 'prop-types';
import { server } from './server-address';
import { CirclePicker } from 'react-color';

export default class MyCards extends React.Component {
  constructor() {
    super();
    this.getCategories = this.getCategories.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.editCategory = this.editCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      categories: [],
      show: false,
      categoryName: '',
      isEdit: false,
      categoryColor: '',
      categoryId: '',
    };
  }

  async componentDidMount() {
    await this.getCategories();
  }

  async getCategories() {
    const data = await axios
      .get(`${server}/api/categories`)
      .then(function (res) {
        return res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    if (data)
      this.setState({
        categories: data.map((val, ind) => {
          return (
            <th
              key={ind}
              style={{ textAlign: 'center', cursor: 'pointer' }}
              onClick={() => this.editCategory(val)}
            >
              <Col>
                <Row className="justify-content-md-center"> {val.name}</Row>
                <Row className="justify-content-md-center">
                  <Circle style={{ fill: val.color }} color={val.color} size={20} />
                </Row>
                <Row className="justify-content-md-center">
                  {val.expensesSum ? val.expensesSum : '0'}
                </Row>
              </Col>
            </th>
          );
        }),
      });
  }

  async addCategory() {
    const data = await axios
      .post(`${server}/api/categories`, {
        name: this.state.categoryName,
        color: this.state.categoryColor,
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

  async updateCategory() {
    await axios
      .put(`${server}/api/categories/${this.state.categoryId}`, {
        color: this.state.categoryColor,
        name: this.state.categoryName,
      })
      .then(function (res) {
        return res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    this.handleClose();
    await this.getCategories();
    this.props.update();
  }

  async editCategory(e) {
    this.setState({
      categoryColor: e.color,
      categoryName: e.name,
      categoryId: e.id,
      isEdit: true,
      show: true,
    });
  }

  async deleteCategory() {
    await axios
      .delete(`${server}/api/categories/${this.state.categoryId}`)
      .then(function (res) {
        return res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    await this.getCategories();
    this.setState({ show: false, categoryName: '', categoryColor: '' });
    this.props.update();
  }

  handleClose() {
    this.setState({ show: false, categoryName: '', categoryColor: '' });
  }

  render() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {' '}
              {this.state.isEdit ? 'Editează Categorie' : 'Adaugă Categorie'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.state.isEdit ? this.updateCategory : this.addCategory}>
              <Form.Group controlId="formName">
                <Form.Label>Nume</Form.Label>
                <Form.Control
                  onChange={(e) => this.setState({ categoryName: e.target.value })}
                  type="text"
                  placeholder="Nume categorie"
                  value={this.state.categoryName}
                />
              </Form.Group>
              <InputGroup className="mb-3">
                <DropdownButton
                  as={InputGroup.Prepend}
                  color="red"
                  title="Culori"
                  id="input-group-dropdown-1"
                >
                  <Dropdown.Item>
                    <CirclePicker
                      color={this.state.categoryColor}
                      fill="red"
                      onChangeComplete={(c) => this.setState({ categoryColor: c.hex })}
                    />
                  </Dropdown.Item>
                </DropdownButton>
                <Form.Control
                  value={this.state.categoryColor}
                  placeholder="Culoare categorie"
                  aria-describedby="basic-addon1"
                  readOnly
                  onChange={(e) => this.setState({ categoryColor: e.target.value })}
                />
              </InputGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            {this.state.isEdit ? (
              <Button variant="outline-danger" onClick={this.deleteCategory}>
                Șterge
              </Button>
            ) : (
              ''
            )}
            <Button
              variant="primary"
              onClick={this.state.isEdit ? this.updateCategory : this.addCategory}
            >
              {this.state.isEdit ? 'Actualizează' : 'Adaugă'}
            </Button>
          </Modal.Footer>
        </Modal>
        <Table responsive>
          <thead>
            <tr>
              {this.state.categories}
              <th>
                <Button
                  onClick={() => this.setState({ isEdit: false, show: true })}
                  variant="outline-primary"
                  className="m-1 p-1 rounded-circle border-0"
                >
                  <PlusCircle size={50} />
                </Button>
              </th>
            </tr>
          </thead>
        </Table>
      </div>
    );
  }
}

MyCards.propTypes = {
  update: PropTypes.func,
};
