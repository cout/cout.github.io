axios.get('400cards.json').then((response) => {
  const questions = response.data
    .sort(() => { return 0.5 - Math.random(); })
    .slice(0, 5);
  ReactDOM.render(
      <ul className="list-group">
        {questions.map(question =>
          <li className="list-group-item"> {question} </li>
        )}
      </ul>,
      document.getElementById('root')
  );
});

