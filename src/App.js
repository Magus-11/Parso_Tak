import React, { Component } from 'react'
import Navbar from './components/Navbar';
import { News } from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export class App extends Component {
  pageSize = 9;
  state ={
      progress : 0
    }
  setProgress = (progress)=>{
    this.setState({progress: progress});
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
          length={3}
        color='#f11946'
        progress={this.state.progress}
      />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} pageSize={this.pageSize} country="us" key="general" category="general" />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress} pageSize={this.pageSize} country="us" key="general" category="general" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} pageSize={this.pageSize} country="us" key="bussiness" category="business" />} />
            <Route exact path="/entertainment"  element={<News setProgress={this.setProgress} pageSize={this.pageSize} country="us" key="entertainment" category="entertainment" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} pageSize={this.pageSize} country="us" key="health" category="health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} pageSize={this.pageSize} country="us" key="science" category="science" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} pageSize={this.pageSize} country="us" key="sports" category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} pageSize={this.pageSize} country="us" key="technology" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}


export default App;

