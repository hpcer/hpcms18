import React, { Component } from 'react';
import Markdown from 'markdown-it';
import logo from './logo.svg';
import './App.css';
import './style.css';

const md_source = "content.md";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markdown: '# Loading...',
      error: null,
      isLoaded: false
    };
  }
  componentDidMount() {
    fetch(md_source)
    .then(res => res.text())
    .then((result) => {
        console.log(result)
        var markdown = result;
        this.setState({
          markdown: markdown
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }
  getMarked() {
    var rawMarkup = new Markdown({html:true}).render(this.state.markdown);
    rawMarkup = rawMarkup.replace(new RegExp('<table>', 'gm'), '<div class="table-responsive"><table>').replace(new RegExp('</table>', 'gm'), '</table></div>');
    return { __html: rawMarkup };
  }
  componentWillUnmount() {
    this.serverRequest.abort();
  }
  render() {
    const input = '# This is a header\n\nAnd this is a paragraph';
    return (
      <div className="App">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <header>
          <div id="topbar" className="wide">
            <div className="container">
              <div className="top-heading" id="heading-wide">
                <a href="/">High Performance Computing for Advanced Modeling and Simulation</a>
              </div>
              <div className="top-heading" id="heading-narrow">
                <a href="/">HPCMS2018</a>
              </div>
              <a href="#" id="menu-button">
                <span id="menu-button-arrow">&#9661;</span>
              </a>
              <div id="menu">
                <a href="#">Home</a>
                <a href="#topics">Topics</a>
                <a href="#organizers">Organizers</a>
                <a href="#contact">Contact Us</a>
              </div>
            </div>
          </div>
          <div id="topbanner">
            <div className="container">
              <div className="banner-heading">
                <h3 className="title">Hope to receive your "High Performance Computing for Advanced Modeling and Simulation" Paper</h3>
              </div>
              <div className="top-date">2018-06-12 Beijing,China</div>
              <div style={{ height: '21px' }}></div>
            </div>
          </div>
        </header>
        <main>
          <div id="page">
            <div className="container container-tag">
              <div className="row markdown-render" dangerouslySetInnerHTML={this.getMarked()}>
              </div>
            </div>
          </div>
        </main>
        <footer id="footer">
          <div className="container" id="contact">
              <p>If you have any questions, please feel free to contact us at
                  <a href="mailto:wangan@xs.ustb.edu.cn">wangan@xs.ustb.edu.cn</a>.</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
