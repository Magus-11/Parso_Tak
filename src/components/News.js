import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 9,
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
  };

  defaultImage =
    "https://static.wpb.tam.us.siteprotect.com/var/m_6/64/644/63319/707786-default-svp_news.jpg";

  capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `Parso Tak - ${this.capitalize(this.props.category)}`;
  }

  async updateNews(pageNo) {
    this.props.setProgress(0);
    this.setState({
      page: pageNo,
      loading: true,
    });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c5dfb74602504ad095db1c39d51ed1a2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(40);
    let parseData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews(this.state.page);
  }

  fetchMoreData = async () => {
    
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c5dfb74602504ad095db1c39d51ed1a2&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({page :this.state.page + 1});
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        articles: this.state.articles.concat(parseData.articles),
        totalResults: parseData.totalResults,
      });
    };

  render() {
    return (
        <>
        <center>
          <h1> Trending News Dozes for You </h1>
        </center>
        {/* { this.state.loading && <Spinner/> } */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">

            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 40) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 80)
                          : element.title.slice(0, 80)
                      }
                      ImageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : this.defaultImage
                      }
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>

        </>
    );
  }
}
export default News;
