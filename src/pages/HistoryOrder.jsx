import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Card, Container, Stack } from 'react-bootstrap';
import CommunityNavbar from '../components/CommunityNavbar';
import { Footer } from '../components/Footer';
import { TopNav } from '../components/TopNav';

function HistoryOrder() {
  const [orderHistory, setOrderHistory] = useState([]);

  const getHistorySelling = (item) => {
    axios
      .get(`https://tugas.website/community/${Cookies.get('id')}/history`, {
        headers: {
          Authorization: 'Bearer ' + Cookies.get('token'),
        },
      })
      .then((res) => {
        console.log(res);
        setOrderHistory(res.data.history);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getHistorySelling();
  }, []);

  return (
    <>
      <TopNav />
      <CommunityNavbar />
      <Container className="min-vh-100">
        <h3 className="text-center mt-3">History Order</h3>
        {/* this can be map able */}
        {orderHistory ? (
          <>
            {orderHistory.map((historyItem) => {
              return (
                <Card className="text-center mt-3 shadow ">
                  <Card.Header className="fw-bold fs-5 bg-primary text-white">Order</Card.Header>
                  <Card.Body className="d-flex">
                    <Card.Img variant="left" src={historyItem.photo} className="img-fluid rounded ms-3" />
                    <Stack className="gap-2 ms-4 text-start">
                      <Card.Title className="fw-semibold fs-4 ">{historyItem.name}</Card.Title>
                      <Card.Text className="fw-semibold fs-6 ">Buyer Name: {historyItem.buyer}</Card.Text>
                    </Stack>
                    <Stack className="justify-content-between ms-4 text-end">
                      <Card.Text className="fw-semibold fs-6 ">Price : Rp. {historyItem.price}</Card.Text>
                    </Stack>
                  </Card.Body>
                </Card>
              );
            })}
          </>
        ) : (
          <div>
            <h5>Tidak ada Order History</h5>
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default HistoryOrder;
