// basic imports
import React, { useState, useEffect } from "react";
//css imports
import "../App.css";
import { Button, Modal } from "react-bootstrap";
//npm package imports
import axios from "axios";

function Home() {
  //state for video listings
  const [mostRecent, setMostRecent] = useState(undefined);
  const [searchedVideos, setSearchedVideos] = useState(undefined);
  //state for changing grid
  const [fourthColumn, setFourthColumn] = useState(false);
  //stat for search inputs
  const [searchVal, setSearchVal] = useState();
  const [showOnlySearch, setShowOnlySearch] = useState(false);
  const [noResults, setNoResults] = useState(false);
  //state for modal
  const [modalTitle, setModalTitle] = useState();
  const [modalVideo, setModalVideo] = useState();
  const [modalDescription, setModalDescription] = useState();
  const [modalChannelTitle, setModalChannelTitle] = useState();
  const [show, setShow] = useState(false);
  //state for loading data
  const [loading, setLoading] = useState(true);

  //lifecycle methods
  useEffect(() => {
    async function getData() {
      try {
        console.log("enter use effect");
        // const { data } = await axios.get("http://localhost:5000/api/channel");
        const { data } = await axios.get("https://youtube-app-server-app.herokuapp.com/api/channel");

        console.log("data is", data);
        setMostRecent(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, []);

  //function to close modal
  const handleClose = () => setShow(false);
  //function to show modal
  const handleShow = (title, video, description, channelTitle) => {
    setShow(true);
    setModalTitle(title);
    setModalVideo(video);
    setModalDescription(description);
    setModalChannelTitle(channelTitle);
  };

  //function to submit search form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { search } = event.target.elements;
    try {
      console.log("enter search function");
      const { data } = await axios({
        method: "POST",
        // url: "http://localhost:5000/api/channel/search",
        url: "https://youtube-app-server-app.herokuapp.com/api/channel/search",
        data: {
          keyword: search.value,
        },
      });
      console.log("searched data is", data);
      setShowOnlySearch(true);
      setSearchedVideos(data);
      if(data.items.length==0) {
          setNoResults(true);
      } else {
          setNoResults(false);
      }
      setSearchVal(search.value);
    } catch (e) {
      console.log(e);
    }
  };

  //function to go to next page for searched videos
  const handleNext = async () => {
    try {
      console.log("enter use effect");
      const { data } = await axios({
        method: "POST",
        // url: "http://localhost:5000/api/channel/search",
        url: "https://youtube-app-server-app.herokuapp.com/api/channel/search",

        data: {
          keyword: searchVal,
          pageToken: searchedVideos.nextPageToken,
          // part:'snippet',
          // playlistId:'UUzb8YnyvIzyRLGXARpUAZlg',
          // key:'AIzaSyBKzTK79JJ_2CWcaiD-hFHXVNLSLUhpNq0',
          // maxResults:5
        },
      });
      console.log("searched data is", data);
      setSearchedVideos(data);
    } catch (e) {
      console.log(e);
    }
  };

  //function to see more videos of the channel
  const handleNextUploads = async () => {
    try {
      console.log("enter use effect");
      const { data } = await axios({
        method: "POST",
        // url: "http://localhost:5000/api/channel/page",
        url: "https://youtube-app-server-app.herokuapp.com/api/channel/page",

        data: {
          //   keyword: searchVal,
          pageToken: mostRecent.nextPageToken,
          // part:'snippet',
          // playlistId:'UUzb8YnyvIzyRLGXARpUAZlg',
          // key:'AIzaSyBKzTK79JJ_2CWcaiD-hFHXVNLSLUhpNq0',
          // maxResults:5
        },
      });
      console.log("more uploads are", data);
      setMostRecent(data);
    } catch (e) {
      console.log(e);
    }
  };

  //function to go to previous page for searched videos
  const handlePrevious = async () => {
    try {
      console.log("enter use effect");
      const { data } = await axios({
        method: "POST",
        // url: "http://localhost:5000/api/channel/search",
        url: "https://youtube-app-server-app.herokuapp.com/api/channel/search",

        data: {
          keyword: searchVal,
          pageToken: searchedVideos.prevPageToken,
          // part:'snippet',
          // playlistId:'UUzb8YnyvIzyRLGXARpUAZlg',
          // key:'AIzaSyBKzTK79JJ_2CWcaiD-hFHXVNLSLUhpNq0',
          // maxResults:5
        },
      });
      console.log("searched data is", data);
      setSearchedVideos(data);
    } catch (e) {
      console.log(e);
    }
  };

  //funtion for previous page of all uploads
  const handlePreviousUploads = async () => {
    try {
      console.log("enter use effect");
      const { data } = await axios({
        method: "POST",
        // url: "http://localhost:5000/api/channel/page",
        url: "https://youtube-app-server-app.herokuapp.com/api/channel/page",

        data: {
          //   keyword: searchVal,
          pageToken: mostRecent.prevPageToken,
          // part:'snippet',
          // playlistId:'UUzb8YnyvIzyRLGXARpUAZlg',
          // key:'AIzaSyBKzTK79JJ_2CWcaiD-hFHXVNLSLUhpNq0',
          // maxResults:5
        },
      });
      console.log("searched data is", data);
      setMostRecent(data);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return (
      <div className="container container1 ">
        <img
          className="loadingGIF"
          width="5%"
          src="/imgs/loading.gif"
          alt="img"
        />
      </div>
    );
  }
  return (
    <div className="container">
      {/* <h1>My videos</h1> */}

      {/* search form */}
      <div className="searchDiv">
        <form onSubmit={handleSubmit}>
          <div className="row frm">
            <div className="form-group col-lg-10 col-10">
              <input
                required
                className="inpt form-control"
                type="text"
                name="search"
                id="search"
                placeholder="Enter keyword"
              />
            </div>
            <div className="form-group col-lg-2 col-2">
              <button className="formButton btn " type="submit">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* search form ends*/}

      {/* toggle column grid */}
      <div className="toggleColumns">
        {showOnlySearch ? (
          <h1 className="heading">Search Results</h1>
        ) : (
          <h1 className="heading">My videos</h1>
        )}
        <button
          className="toggleButton"
          onClick={() => setFourthColumn(!fourthColumn)}
        >
          <i className="fas fa-grip-horizontal"></i>
        </button>
      </div>
      {/* toggle column grid ends */}

      {/* search video listings */}
      <div className="row">
          {noResults ? (<p>No results found</p>) : (null)}
        {searchedVideos && searchedVideos
          ? searchedVideos.items.map((item) => {
              return (
                <div
                  key={item.id.videoId}
                  className={
                    fourthColumn
                      ? "videoCard col-lg-3 col-sm-6"
                      : "videoCard col-lg-4 col-sm-12"
                  }
                >
                  <div
                    onClick={() =>
                      handleShow(
                        item.snippet.title,
                        item.id.videoId,
                        item.snippet.description,
                        item.snippet.channelTitle
                      )
                    }
                    className="thumbnailContainer"
                  >
                    <img
                      className="videoThumbnail"
                      src={item.snippet.thumbnails.medium.url}
                      alt="thumbnail"
                    />
                    <div className="overlayImg">
                      <p className="overlayText">
                        <i className="fab fa-youtube"></i>
                      </p>
                    </div>
                  </div>
                  <p className="videoTitle">{item.snippet.title}</p>
                  <p className="channelTitle">{item.snippet.channelTitle}</p>
                  {/* <button
                      onClick={() =>
                        handleShow(
                          item.snippet.title,
                          item.snippet.resourceId.videoId
                        )
                      }
                    >
                      Play video
                    </button> */}
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>
                        {modalTitle}
                        <br></br>
                        <p className="channelTitle">{modalChannelTitle}</p>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modalBody">
                      <div className="video-container">
                        <iframe
                          src={`https://www.youtube.com/embed/${modalVideo}`}
                          frameborder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        ></iframe>
                      </div>
                      <p className="videoDescriptionModal">
                        {modalDescription}
                      </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <p className="videoDescription">{item.snippet.description}</p>
                </div>
              );
            })
          : null}
      </div>
      {/* search pagination  */}
      {searchVal ? (
        <div className="pagination">
          {searchedVideos && searchedVideos.prevPageToken ? (
            <button
              // href={`/page/${channelData.prevPageToken}`}
              onClick={handlePrevious}
              className="btn pageBtn"
            >
              Previous
            </button>
          ) : null}

          {searchedVideos && searchedVideos.nextPageToken ? (
            <button
              onClick={handleNext}
              // href={`/page/${channelData.nextPageToken}`}
              className="btn pageBtn"
            >
              Next
            </button>
          ) : null}
        </div>
      ) : null}
      {/* search pagination ends */}
      {/* search  video listing ends */}

      {/* most recent video listings */}
      {showOnlySearch ? null : (
        <div>
          <div className="row">
            {mostRecent && mostRecent
              ? mostRecent.items.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={
                        fourthColumn
                          ? "videoCard col-lg-3 col-6"
                          : "videoCard col-lg-4 col-12"
                      }
                    >
                      <div
                        onClick={() =>
                          handleShow(
                            item.snippet.title,
                            item.snippet.resourceId.videoId,
                            item.snippet.description,
                            item.snippet.channelTitle
                          )
                        }
                        className="thumbnailContainer"
                      >
                        <img
                          className="videoThumbnail"
                          src={item.snippet.thumbnails.medium.url}
                          alt="thumbnail"
                        />
                        <div className="overlayImg">
                          <p className="overlayText">
                            <i className="fab fa-youtube"></i>
                          </p>
                        </div>
                      </div>
                      <p className="videoTitle">{item.snippet.title}</p>
                      <p className="channelTitle">
                        {item.snippet.channelTitle}
                      </p>
                      {/* <button
                      onClick={() =>
                        handleShow(
                          item.snippet.title,
                          item.snippet.resourceId.videoId
                        )
                      }
                    >
                      Play video
                    </button> */}
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>
                            {modalTitle}
                            <br></br>
                            <p className="channelTitle">{modalChannelTitle}</p>
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="modalBody">
                          <div className="video-container">
                            <iframe
                              src={`https://www.youtube.com/embed/${modalVideo}`}
                              frameborder="0"
                              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                              allowfullscreen
                            ></iframe>
                          </div>
                          <p className="videoDescriptionModal">
                            {modalDescription}
                          </p>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                      <p className="videoDescription">
                        {item.snippet.description}
                      </p>
                    </div>
                  );
                })
              : null}
          </div>
          {/* most Recent pagination  */}

          <div className="pagination">
            {mostRecent && mostRecent.prevPageToken ? (
              <button
                // href={`/page/${channelData.prevPageToken}`}
                onClick={handlePreviousUploads}
                className="btn pageBtn"
              >
                Previous
              </button>
            ) : null}

            {mostRecent && mostRecent.nextPageToken ? (
              <button
                onClick={handleNextUploads}
                // href={`/page/${channelData.nextPageToken}`}
                className="btn pageBtn"
              >
                Next
              </button>
            ) : null}
          </div>

          {/* most Recent pagination ends */}
        </div>
      )}

      {/* most recent  video listing ends */}
    </div>
  );
}

export default Home;
