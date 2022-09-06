
import {Route, Routes} from "react-router-dom";
import './App.css';
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import CommentDetails from "./components/commentDetails/CommentDetails";

function App() {
  return (
      <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/comment/:id" element={<CommentDetails />} />
              <Route path="*" element={<Home />} />
          </Route>
      </Routes>
  );
}

export default App;

