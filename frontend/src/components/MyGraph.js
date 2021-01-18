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
      data.forEach(function (val) {
        array.push({ title: val.name, value: val.expensesSum, color: val.color });
      });
      this.setState({
        data: array,
      });
    }
  }

  render() {
    return (
      <PieChart
        animation
        animationDuration={500}
        animationEasing="ease-out"
        data={this.state.data}
        label={({ dataEntry }) => dataEntry.value}
      />
    );
  }
}
