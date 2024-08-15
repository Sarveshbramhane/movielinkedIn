import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResponsiveDrawer from "./components/Sidebar";
import Header from "./components/Header";
import MovieGrid from "./components/MovieGrid"; // Import MovieGrid
import MovieDetail from "./pages/MovieDetail"; // Import MovieDetail
import SearchResults from "./components/SearchResults";
import LoginPage from "./components/LoginPage";
import MovieGridRedux from "./components/MovieGridRedux";


function App() {
  return (
    <Router>
      <div>
        <Header />
        <ResponsiveDrawer />
        <main
          style={{ marginLeft: "240px", marginTop: "64px", padding: "20px" }}
        >
          <Routes>
            <Route path="/" element={<MovieGrid />} /> {/* Default route to MovieGrid */}
            <Route path="/movie/:id" element={<MovieDetail />} /> {/* Route to MovieDetail */}
            <Route path="/action" element={<MovieGridRedux category="action" />} />
            <Route path="/adventure" element={<MovieGridRedux category="adventure" />} />
            <Route path="/comedy" element={<MovieGridRedux category="comedy" />} />
            <Route path="/drama" element={<MovieGridRedux category="Drama" />} />
            <Route path="/animation" element={<MovieGridRedux category="Animation" />} />
            <Route path="/musical" element={<MovieGridRedux category="Musical" />} />
            <Route path="/historical" element={<MovieGridRedux category="Historical" />} />
            <Route path="/family" element={<MovieGridRedux category="Family" />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
