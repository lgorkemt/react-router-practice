import { Fragment } from "react";
import { useParams } from "react-router";
import { Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from '../components/UI/LoadingSpinner';

import useHttp from "../hooks/use-http";

import {getSingleQuote} from "../lib/api";

import{useEffect} from 'react';

const QuoteDetail = () => {
  const params = useParams();
  const {quoteId} = params;
  const match = useRouteMatch();

  const {
    sendRequest,
    status,
    data: quote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (!quote.text) {
    return <p>No quote found!</p>;
  }

  if (error) {
    return <div className="centered focused">{error}</div>;
  }

  return (
    <Fragment>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
