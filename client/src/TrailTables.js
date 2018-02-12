import React, { Component } from 'react';

class TrailTables extends Component {
  
  // commuteData = {deerfootData: [], glenmoreData: [], crowchildData: []}


  // componentDidMount() {
  //   fetch('/')
  //     .then(res => res.json())
  //     .then(commuteData => this.commuteData);

  //   console.log(this.commuteData);
  // }

  render() {
    return (
      <div>
        <div class="row tableRow" id="deerfootRow">
          <h3 class="display-4  tableHeader">Deerfoot Tr.</h3>
          <table class="table" id="deerfootTable">
              <tr>
                <th scope="col">From</th>
                <th scope="col"><i class="fa fa-long-arrow-right"></i></th>
                <th scope="col">To</th>
                <th scope="col">Expected</th>
                <th scope="col">Current</th>
                <th scope="col">Delay</th>
              </tr>
          </table>
        </div>
        <div class="row tableRow" id="glenmoreRow">
          <h3 class="display-4  tableHeader">Glenmore Tr.</h3>
          <table class="table" id="glenmoreTable">
              <tr>
                <th scope="col">From</th>
                <th scope="col"><i class="fa fa-long-arrow-right"></i></th>
                <th scope="col">To</th>
                <th scope="col">Expected</th>
                <th scope="col">Current</th>
                <th scope="col">Delay</th>
              </tr>
          </table>
        </div>
        <div class="row tableRow" id="crowchildRow">
          <h3 class="display-4  tableHeader">Crowchild Tr.</h3>
          <table class="table" id="crowchildTable">
              <tr>
                <th scope="col">From</th>
                <th scope="col"><i class="fa fa-long-arrow-right"></i></th>
                <th scope="col">To</th>
                <th scope="col">Expected</th>
                <th scope="col">Current</th>
                <th scope="col">Delay</th>
              </tr>
          </table>
        </div>
      </div>
    );
  }
}

export default TrailTables;
