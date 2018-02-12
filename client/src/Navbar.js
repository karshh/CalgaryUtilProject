import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
    <nav class="navbar fixed-top navbar-toggleable-md navbar-light bg-faded ">
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="/">Traffic.YYC</a>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#deerfootRow">Deerfoot</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#glenmoreRow">Glenmore</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#crowchildRow">Crowchild</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/about">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/products">Products</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/contact">Contact</a>
            </li>
          </ul>
        </div>
    </nav>
    );
  }
}

export default Navbar;
