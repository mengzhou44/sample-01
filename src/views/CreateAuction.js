import React, { useState } from "react";
import { Button } from "reactstrap";

import Axios from 'axios'

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";


const axios = Axios.create({
    baseURL: process.env.REACT_APP_AUCTIONS_ENDPOINT,
})

export const CreateAuctionComponent = () => {


  const audience =  process.env.REACT_APP_AUTH0_AUDIENCE

  const [result, setResult] = useState('')

  const {
    getAccessTokenSilently,
  } = useAuth0();


  const callApi = async () => {
    try {
        setResult('')

      const token = await getAccessTokenSilently(

      );

      await axios.post('/auction', {
             title:'Cat'
      },
      {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

       setResult('Success!')
    } catch (error) {

        setResult('Error')
    }
  };


  return (
    <>
      <div className="mb-5">

        <Button
          color="primary"
          className="mt-5"
          onClick={callApi}
          disabled={!audience}
        >
        Create Auction
        </Button>
      </div>

        <h3>{result}</h3>

    </>
  );
};

export default withAuthenticationRequired(CreateAuctionComponent, {
  onRedirecting: () => <Loading />,
});
