import { Fragment } from 'react';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';
import { useHistory, useLocation } from 'react-router-dom';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {

  const history = useHistory();
  const location = useLocation();

  console.log(location);

  const queryParams = new URLSearchParams(location.search);

  const isAscendingDescending = queryParams.get('sort') === 'asc';

  const sortedQuotes = sortQuotes(props.quotes, isAscendingDescending);

  const changeSortingHandler = () =>{
    history.push({
      path: location.pathname,
      search: `?sort=${(isAscendingDescending ? 'desc' : 'asc')}`
    });
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>Sort {isAscendingDescending ? 'Ascending' : 'Descending'}</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
