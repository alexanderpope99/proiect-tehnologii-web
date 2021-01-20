import React from 'react';
import { Table, Button, Modal, Form, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { Trash2, Edit, PlusCircle, Circle } from 'react-feather';
import PropTypes from 'prop-types';
import { server } from './server-address';

export default class MyTable extends React.Component {
  constructor() {
    super();
    this.getExpenses = this.getExpenses.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);
    this.editExpense = this.editExpense.bind(this);
    this.updateExpense = this.updateExpense.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      expenses: [],
      isEdit: false,
      show: false,
      expenseName: '',
      categories: [],
      expenseDate: '',
      expenseAmount: '',
      categoryName: '-',
      categoryId: '',
      expenseId: '',
      pressedSubmit: false,
    };
  }

  async componentDidMount() {
    await this.getExpenses();
    await this.getCategories();
  }

  async getExpenses() {
    const data = await axios
      .get(`${server}/api/expenses`)
      .then(function (res) {
        return res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    if (data)
      this.setState({
        expenses: data.map((val, ind) => {
          return (
            <tr key={ind}>
              <td>{val.name}</td>
              <td>
                {val.category ? (
                  <div>
                    <Circle
                      style={{ fill: val.category.color, marginRight: '10' }}
                      color={val.category.color}
                      size={20}
                    />
                    {val.category.name}
                  </div>
                ) : (
                  '-'
                )}
              </td>
              <td>{val.date.slice(0, 10)}</td>
              <td>{val.amount}</td>
              <td>
                <Button
                  onClick={() => this.editExpense(val)}
                  variant="outline-primary"
                  size="sm"
                  className="m-1 p-1 rounded-circle border-0"
                >
                  <Edit />
                </Button>
                <Button
                  onClick={() => this.deleteExpense(val.id)}
                  variant="outline-primary"
                  size="sm"
                  className="m-1 p-1 rounded-circle border-0"
                >
                  <Trash2 />
                </Button>
              </td>
            </tr>
          );
        }),
      });
  }

  async editExpense(e) {
    await this.getCategories();
    const data = await axios
      .get(`${server}/api/expenses/${e.id}`)
      .then(function (res) {
        return res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    if (data)
      this.setState({
        expenseId: e.id,
        expenseName: e.name,
        expenseDate: e.date,
        expenseAmount: e.amount,
        categoryId: e.category ? e.category.id : null,
        categoryName: e.category ? e.category.name : '-',
        isEdit: true,
        show: true,
      });
  }

  async updateExpense() {
    const data = await axios
      .put(`${server}/api/expenses/${this.state.expenseId}`, {
        name: this.state.expenseName,
        date: this.state.expenseDate,
        amount: this.state.expenseAmount,
        categoryId: this.state.categoryName === '-' ? null : this.state.categoryId,
      })
      .then(function (res) {
        return res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    if (data) {
      this.handleClose();
      await this.getExpenses();
      this.props.update();
    }
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
            <option key={ind} data-key={val.id}>
              {val.name}
            </option>
          );
        }),
      });
  }

  async deleteExpense(e) {
    const data = await axios
      .delete(`${server}/api/expenses/${e}`)
      .then(function (res) {
        return res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    if (data) {
      await this.getExpenses();
      this.props.update();
    }
  }

  async addExpense() {
    const body = {
      name: this.state.expenseName,
      date: this.state.expenseDate,
      amount: this.state.expenseAmount,
      categoryId: this.state.categoryName === '-' ? null : this.state.categoryId,
    };
    const data = await axios
      .post(`${server}/api/expenses/`, {
        name: this.state.expenseName,
        date: this.state.expenseDate,
        amount: this.state.expenseAmount,
        categoryId: this.state.categoryName === '-' ? null : this.state.categoryId,
      })
      .then(function (res) {
        return res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    if (data) {
      this.handleClose();
      await this.getExpenses();
      this.props.update();
    }
  }

  async handleOpen() {
    await this.getCategories();
    this.setState({ isEdit: false, show: true });
  }

  handleClose() {
    this.setState({
      pressedSubmit: false,
      show: false,
      expenseName: '',
      categoryName: '-',
      expenseDate: '',
      expenseAmount: '',
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ pressedSubmit: true });
    if (this.state.isEdit) this.updateExpense();
    else this.addExpense();
  }

  render() {
    return (
      <Col>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Form onSubmit={this.onSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>
                {this.state.isEdit ? 'Editează Cheltuială' : 'Adaugă Cheltuială'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="formName">
                <Form.Label>Nume</Form.Label>
                <Form.Control
                  onChange={(e) => this.setState({ expenseName: e.target.value })}
                  type="text"
                  placeholder="Nume cheltuială"
                  isInvalid={this.state.expenseName === '' && this.state.pressedSubmit}
                  value={this.state.expenseName}
                />
                <Form.Control.Feedback type="invalid">
                  Numele trebuie completat
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formCategory">
                <Form.Label>Categorie</Form.Label>
                <Form.Control
                  onChange={(e) =>
                    this.setState({
                      categoryId: e.target.options[e.target.options.selectedIndex].getAttribute(
                        'data-key'
                      ),
                      categoryName: e.target.value,
                    })
                  }
                  as="select"
                  value={this.state.categoryName}
                >
                  <option>-</option>
                  {this.state.categories}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formDate">
                <Form.Label>Dată</Form.Label>
                <Form.Control
                  onChange={(e) => this.setState({ expenseDate: e.target.value })}
                  type="date"
                  isInvalid={this.state.expenseDate === '' && this.state.pressedSubmit}
                  value={this.state.expenseDate}
                />
                <Form.Control.Feedback type="invalid">
                  Data trebuie completată
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formDate">
                <Form.Label>Sumă</Form.Label>
                <Form.Control
                  onChange={(e) => this.setState({ expenseAmount: e.target.value })}
                  type="number"
                  placeholder="Sumă cheltuială"
                  min="0"
                  step="0.01"
                  value={this.state.expenseAmount}
                  isInvalid={this.state.expenseAmount === '' && this.state.pressedSubmit}
                />
                <Form.Control.Feedback type="invalid">
                  Suma trebuie completată
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                {this.state.isEdit ? 'Actualizează' : 'Adaugă'}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <Row>
          <Col>
            <h2>Tabel</h2>
          </Col>
          <Col xs lg="2">
            <Button
              onClick={this.handleOpen}
              variant="outline-primary"
              size="sm"
              className="m-1 p-1 rounded-circle border-0"
            >
              <PlusCircle size={30} />
            </Button>
          </Col>
        </Row>
        <Table responsive hover>
          <thead>
            <tr>
              <th>Nume</th>
              <th>Categorie</th>
              <th>Dată</th>
              <th>Sumă</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.state.expenses}</tbody>
        </Table>
      </Col>
    );
  }
}

MyTable.propTypes = {
  update: PropTypes.func,
};
