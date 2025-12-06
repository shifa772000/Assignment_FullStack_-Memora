// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Reactstrap from "reactstrap";
import { Provider } from "react-redux";
import memoraStore from "./store/memoraStore";

import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import PeopleList from "./components/PeopleList";
import EventForm from "./components/EventForm";
import MemoraFavouritePeople from "./components/MemoraFavouritePeople";
import EventDetailsPage from "./components/EventDetailsPage";
import Contact from "./components/Contact";

function App() {
  return (
    <Provider store={memoraStore}>
      <Reactstrap.Container fluid className="vh-100 d-flex flex-column p-0">
        <BrowserRouter>
          <Reactstrap.Container className="flex-grow-1 p-0">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/people" element={<PeopleList />} />
              <Route
                path="/MemoraFavouritePeople"
                element={<MemoraFavouritePeople />}
              />
              <Route path="/eventDetailsPage" element={<EventDetailsPage />} />
              <Route path="/event/:eventId" element={<EventForm />} />

              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Reactstrap.Container>
        </BrowserRouter>
      </Reactstrap.Container>
    </Provider>
  );
}

export default App;
