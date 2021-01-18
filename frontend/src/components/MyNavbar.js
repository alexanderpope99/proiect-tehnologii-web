import React from 'react';
import { Navbar } from 'react-bootstrap';

export default class MyNavbar extends React.Component {
  render() {
    return (
      <Navbar sticky="top" bg="primary" variant="dark" className="justify-content-center">
        <Navbar.Brand>Expense Tracker</Navbar.Brand>
      </Navbar>
    );
  }
}
