import React, { useEffect, useState } from "react";
import { Card, Container, Stack } from "react-bootstrap";
import { Footer } from "../components/Footer";
import NavBar from "../components/NavBar";
import { TopNav } from "../components/TopNav";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";
import axios from "axios";
import Moment from "react-moment";
import { NumericFormat } from "react-number-format";

function EventList() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const getEvents = () => {
    axios
      .get(`https://tugas.website/event?title=${search}`)
      .then((response) => {
        setEvents(response.data.event);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDetailEvent = (id) => {
    navigate(`/detailevent/${id}`, {
      state: {
        id: id,
      },
    });
  };

  return (
    <>
      <TopNav setSearch={setSearch} />
      <NavBar />
      <Container className="min-vh-100">
        <main>
          <h3 className="text-center mt-3">Event List</h3>
          {events ? (
            <>
              {events.map((event) => {
                return (
                  <Card className="text-center mt-3 mb-4 shadow hover" onClick={() => handleDetailEvent(event.id)} key={event.id}>
                    <Card.Header className="fw-bold fs-5 bg-primary text-white">Event</Card.Header>
                    <Card.Body className="d-flex">
                      <div className="overflow-hidden d-flex align-items-center justify-content-center d-none d-md-block" style={{ width: "17rem", height: "17rem" }}>
                        <Card.Img variant="left" src={event.logo} className="img-fluid rounded w-100 h-auto" style={{ objectFit: "cover" }} />
                      </div>
                      <Stack className="gap-2 ms-4 text-start">
                        <Card.Title className="fw-semibold fs-4 ">{event.title}</Card.Title>
                        <Card.Text className="fw-semibold fs-6 d-none d-md-block ">{event.descriptions.slice(0, 80)}...</Card.Text>
                      </Stack>
                      <Stack className="justify-content-between ms-4 text-end">
                        <Card.Text className="fw-semibold fs-6 ">
                          <Moment format="DD-MM-YYYY">{event.date}</Moment>
                        </Card.Text>
                        <Card.Text className="fw-semibold fs-6 ">
                          Harga Event :
                          <NumericFormat value={event.price} displayType={"text"} thousandSeparator={true} prefix={" Rp."} />
                        </Card.Text>
                      </Stack>
                    </Card.Body>
                  </Card>
                );
              })}
            </>
          ) : (
            <div className="d-flex justify-content-center align-items-center vh-100">
              <h5>No Event With That Name</h5>
            </div>
          )}
        </main>
      </Container>
      <Footer />
    </>
  );
}

export default EventList;
