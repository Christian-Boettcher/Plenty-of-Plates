import React, { useState, useEffect } from "react";
import { baseUrl } from "../../Shared/baseUrl";
import { Link, useParams } from "react-router-dom";
import {
  getEventByEventId,
  getGuestByEventIdAndGuestId,
  getRestaurantById,
} from "../SearchBar/SearchFunctions";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselCaption,
  ButtonGroup,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import axios from "axios";
import CountdownTimer from "../CountDown/CountdownTimer";
import {eventTimeFormat, eventDateFormat} from '../CountDown/TimeFormatFunctions'
import "./VotingPage.css";

function VotingPage() {
  let { eventId, guestId } = useParams();

  /** parameters from page URL */

  const [event, setEvent] = useState();
  const [guest, setGuest] = useState();
  const [restaurantDTOs, setRestaurantDTOs] = useState();
  const [restaurantDetails, setRestaurantDetails] = useState();

  /** controls restaurant details */
  const [modal, setModal] = useState(false);

  const [expired, setExpired] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [items, setItems] = useState();

  /** carousel controls */
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  /** expiration state from countdown timer */
  function handleExpired(ex) {
    setExpired(ex)
  }

  useEffect(() => {
    /** IDs in URL used to get data */
    Promise.resolve(getEventByEventId(eventId)).then((value) => {
      setEvent(value);
    });

    Promise.resolve(getGuestByEventIdAndGuestId(eventId, guestId)).then(
      (value) => {
        setGuest(value);
      }
    );
  }, [eventId, guestId]);

  useEffect(() => {
    if (event !== undefined) {
      setItems(event.restaurantList);
      /** info we need to keep track of votes */
      setRestaurantDTOs(() => {
        return event.restaurantList.map((restaurant) => {
          return {
            restaurantId: restaurant.restaurantId.restaurantId,
            upVoted: false,
            downVoted: false,
          };
        });
      });
    }
  }, [event]);

  function getRestaurantDetails(restaurantId) {
    /** pull restaurant details from API */
    let result = getRestaurantById(restaurantId);
    Promise.resolve(result).then((value) => {
      setRestaurantDetails(value);
    });

    setModal(!modal);
  }

  /** update votes, 1 for yes, 2 for no */
  function changeVote(restaurantId, n) {
    setRestaurantDTOs((prevDTOs) => {
      return prevDTOs.map((current) => {
        if (current.restaurantId === restaurantId) {
          if (n === 1) {
            return { ...current, upVoted: true, downVoted: false };
          } else if (n === 2) {
            return { ...current, upVoted: false, downVoted: true };
          } else return current;
        } else return current;
      });
    });
  }

  /** save vote to database and refreshes page
   * guests cannot vote twice
   */
  function submitVote(e) {
    e.preventDefault();
    const data = {
      eventId: eventId,
      guestId: guestId,
      restaurantDTOs: restaurantDTOs,
    };

    axios
      .post(baseUrl + "/vote", data)
      .then(() => window.location.reload())
      .catch((error) => console.log(error));
  }

  return (
    <div>
      {/** check if guest has voted */}
      {event !== undefined && guest !== undefined && !guest.voted ? (
        <div className="voting--container">
          <h1>Hello {guest.guestName}!</h1>
          <h2>
            You've been invited to {event.title} on {eventDateFormat(event.time)} at{" "}
            {eventTimeFormat(event.time)}.
          </h2>
          <CountdownTimer targetdate={event.deadline} handleExpired={handleExpired} isGuest={true}/>
          {/** voting disabled if deadline is passed */}
          { expired ? <></> : 
          <div className="voting--restaurant-thumbnail-container">
            <Carousel
              activeIndex={activeIndex}
              next={next}
              previous={previous}
              interval={false}
              className="voting--carousel"
            >
              {event.restaurantList.map((restaurant, i) => {
                return (
                  <CarouselItem
                    onExiting={() => setAnimating(true)}
                    onExited={() => setAnimating(false)}
                    key={i}
                    id={restaurant.restaurantId.restaurantId}
                    tag="div"
                    className="voting--carousel-item"
                  >
                    <img
                      src={restaurant.image_url}
                      alt={restaurant.name}
                      className="voting--carousel-image"
                    />

                    <CarouselCaption
                      captionHeader={restaurant.name}
                      captionText={
                        <div className="voting--carousel-btns">
                          <p>
                            <Button
                            className="voting--details-btn"
                              id="Popover1"
                              type="button"
                              onClick={() =>
                                getRestaurantDetails(
                                  restaurantDTOs[i].restaurantId
                                )
                              }
                            >
                              Restaurant Details
                            </Button>
                            <Modal
                              isOpen={modal}
                              toggle={() =>
                                getRestaurantDetails(
                                  restaurantDTOs[i].restaurantId
                                )
                              }
                            >
                              {restaurantDetails !== undefined && (
                                <ModalBody>
                                  <RestaurantCard
                                    restaurant={restaurantDetails}
                                    hideAddBtn={true}
                                    hideFavBtn={true}
                                  />
                                </ModalBody>
                              )}
                              <ModalFooter>
                                <button
                                  className="modal-closeBtn"
                                  onClick={() => setModal(false)}
                                >
                                Close
                                </button>
                              </ModalFooter>
                            </Modal>
                          </p>

                          <ButtonGroup>
                            <Button
                            className="voting-page--btn yes-btn"
                              color="success"
                              outline
                              active={
                                restaurantDTOs !== undefined &&
                                restaurantDTOs[i].upVoted === true
                              }
                              onClick={() =>
                                changeVote(
                                  restaurant.restaurantId.restaurantId,
                                  1
                                )
                              }
                            >
                              Yes
                            </Button>
                            <Button
                            className="voting-page--btn no-btn"
                            outline
                              color="danger"
                              active={
                                restaurantDTOs !== undefined &&
                                restaurantDTOs[i].downVoted === true
                              }
                              onClick={() =>
                                changeVote(
                                  restaurant.restaurantId.restaurantId,
                                  2
                                )
                              }
                            >
                              No
                            </Button>
                          </ButtonGroup>
                        </div>
                      }
                      className="voting--carousel-item-caption"
                    />
                  </CarouselItem>
                );
              })}
              <CarouselControl
                direction="prev"
                directionText="Previous"
                className="voting--carousel-control"
                onClickHandler={previous}
              />
              <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={next}
              />
            </Carousel>
            
          </div>}
          <form onSubmit={(e) => submitVote(e)} className="voting--submit-form">
            <button className="voting--submit-btn" type="submit" onCLick={submitVote}>
              Submit Votes
            </button>
          </form>
         
        </div>
      ) : event !== undefined && guest !== undefined && guest.voted ?
      {/** show if guest has already voted */}
      (
        <div className="thankyou--container">
          <h1 className="voting--thankyou">Thank you for voting!</h1>
          <Link to='/home'><button className="voting--homeBtn">Home</button></Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default VotingPage;
