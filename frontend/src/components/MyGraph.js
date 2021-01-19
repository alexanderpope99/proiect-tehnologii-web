import React from 'react';
import axios from 'axios';
import { server } from './server-address';
import { PieChart } from 'react-minimal-pie-chart';

export default class MyGraph extends React.Component {
  constructor() {
    super();
    this.getCategories = this.getCategories.bind(this);
    this.state = {
      data: [],
      sum: null,
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
    if (data) {
      const array = [];
      var sum = 0;
      data.forEach(function (val) {
        if (val.expensesSum) sum += val.expensesSum;
        array.push({
          title: val.name,
          value: val.expensesSum ? val.expensesSum : null,
          color: val.color,
        });
      });
      this.setState({
        data: array,
        sum: sum,
      });
    }
  }
  render() {
    return this.state.sum ? (
      <PieChart
        viewBoxSize={[120, 120]}
        labelStyle={{ fontSize: '7' }}
        onMouseOver={(e, index) => console.log(e)}
        data={this.state.data}
        label={({ dataEntry }) =>
          parseFloat((dataEntry.value / this.state.sum) * 100).toFixed(2) + '%'
        }
      />
    ) : (
      <div>Nu există categorii sau sunt nule</div>
    );
  }
}
