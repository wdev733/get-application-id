import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useWallet } from "use-wallet";
import styled from "styled-components";
import { toast } from "react-toastify";
import keccak256 from "keccak256";
import { Form, Button } from "react-bootstrap";

import actions from "../redux/app/actions";

const HomePage = () => {
  const dispatch = useDispatch();

  const { status, connect } = useWallet();

  const [applyLoading, setApplyLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [applicationID, setApplicationID] = useState("");

  const callbackApply = (status) => {
    setApplyLoading(false);
    if (status) {
      toast.success("Your transaction has been successfully");
    } else {
      toast.error("Your transaction has been failed");
    }
  }

  const handleApply = () => {
    if (email === "") {
      toast.error("Email is required");
      return;
    }

    const hash = keccak256(email).toString("hex");

    setApplyLoading(true);
    dispatch(actions.apply(hash, callbackApply));
  };

  const callbackGetApplicationId = (id) => {
    setGetLoading(false);
    setApplicationID(id);
  }

  const handleGetMyApplicationID = () => {
    if (email === "") {
      toast.error("Email is required");
      return;
    }

    setGetLoading(true);
    dispatch(actions.getApplicationId(email, callbackGetApplicationId));
  };

  return (
    <HomeWrapper>
      {status === "connected" ? (
        <>
          <div className="section">
            <Form>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={(e) => handleApply()}
                disabled={applyLoading}
              >
                {applyLoading ? "Applying..." : "Apply"}
              </Button>
            </Form>
          </div>
          <div className="section">
            <Form>
              <Form.Group>
                <Form.Label>My Application ID: {email}</Form.Label>
                <Form.Control type="text" disabled value={applicationID} />
              </Form.Group>
              <Button
                variant="primary"
                onClick={(e) => handleGetMyApplicationID()}
                disabled={getLoading}
              >
                {getLoading
                  ? "Getting My Application ID"
                  : "Get My Application ID"}
              </Button>
            </Form>
          </div>
        </>
      ) : (
        <Button variant="primary" onClick={(e) => connect()}>
          Connect Wallet
        </Button>
      )}
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .section {
    min-width: 400px;
    padding: 24px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 20px;
  }
`;

export default HomePage;
