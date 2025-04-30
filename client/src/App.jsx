import React from "react";
import Navbar from "./components/Navbar";
import Filters from "./components/Filters";
import JobList from "./components/JobList";
import { AppProvider } from "./context/AppContext";
import { Toaster } from "react-hot-toast"; // ✅ Add this line

function App() {
  return (
    <AppProvider>
      <Toaster />
      {/* ✅ Add this inside */}
      <Navbar />
      <Filters />
      <JobList />
    </AppProvider>
  );
}

export default App;
