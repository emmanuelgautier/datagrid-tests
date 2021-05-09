import React from 'react';

import { InvestmentsTable } from './components/InvestmentsTable';

function App() {
  return (
    <div className="App">
      <div className="container w-full md:w-4/5 xl:w-3/5  mx-auto px-2">
        <h1 className="flex items-center font-sans font-bold break-normal text-indigo-500 px-2 py-8 text-xl md:text-2xl">
          Investments Table
			  </h1>

        <InvestmentsTable />
      </div>
    </div>
  );
}

export default App;
