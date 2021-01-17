import React from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { Trash2, Edit } from 'react-feather';

export default class MyTable extends React.Component {
  constructor() {
    super();
    this.getExpenses = this.getExpenses.bind(this);
    this.state = {
      expenses: [],
    };
  }

  async componentDidMount() {
    await this.getExpenses();
  }

  async getExpenses() {
    const data = await axios
      .get('http://localhost:8080/api/expenses')
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
              <td>{val.category.name}</td>
              <td>{val.date.slice(0, 10)}</td>
              <td>{val.amount}</td>
              <td>
                <Button variant="outline-primary" size="sm">
                  <Edit />
                </Button>
                <Button variant="outline-primary" size="sm">
                  <Trash2 />
                </Button>
              </td>
            </tr>
          );
        }),
      });
  }

  render() {
    return (
      <Table responsive>
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
    );
  }
}
