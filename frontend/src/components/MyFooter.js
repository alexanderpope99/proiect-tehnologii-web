import React from 'react';
import { Navbar } from 'react-bootstrap';

export default class MyFooter extends React.Component {
  render() {
    return (
      <Navbar sticky="bottom" bg="primary" variant="dark" className="justify-content-center">
        <Navbar.Brand>Proiect realizat de:</Navbar.Brand>
      </Navbar>
    );
  }
}
