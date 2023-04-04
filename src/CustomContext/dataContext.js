import React from "react";

let DataContext = React.createContext({});

let DataProvider = DataContext.Provider;
let DataConsumer = DataContext.Consumer;

export { DataConsumer, DataProvider };
