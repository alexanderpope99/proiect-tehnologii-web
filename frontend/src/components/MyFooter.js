import React from 'react';
import { Navbar } from 'react-bootstrap';

export default class MyFooter extends React.Component {
  render() {
    return (
      <Navbar sticky="bottom" bg="primary" variant="dark" className="justify-content-center">
        <Navbar.Brand>
          <div style={{ fontSize: '25px' }}>Proiect realizat de:</div>
          <div style={{ textAlign: 'center', fontSize: 'small' }}>Domenteanu Adrian (1071 A)</div>
          <div style={{ textAlign: 'center', fontSize: 'small' }}>Pop Alexandru (1073 B)</div>
        </Navbar.Brand>
      </Navbar>
    );
  }
}
