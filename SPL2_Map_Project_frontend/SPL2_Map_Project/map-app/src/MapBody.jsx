import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import "./styles/MapBody.css";
import * as L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";
import "leaflet-routing-machine";
import "lrm-graphhopper";
import { useNavigate, useLocation } from "react-router-dom";

import "./UserInterface";
// function buttonClick() {
//   console.log("Hello, World!")
// }

function MapBody() {
  const [policeData, setPoliceData] = useState([]);

  const [currentPosition, setCurrentPosition] = useState(null);
  const [destinationPosition, setDestinationPosition] = useState(null);
  const [routing, setRouting] = useState(null);
  const [center, setCenter] = useState([23.7457455, 90.4237244]);

  const [showIncidentForm, setShowIncidentForm] = useState(false);
  const [incidentDescription, setIncidentDescription] = useState("");
  const [incidentTime, setIncidentTime] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const routeData = location.state;

  // var map = L.map('map')

  // map.setView([23.7457455, 90.4237244], 13)

  async function getPoliceData() {
    const response = await fetch("http://localhost:5001/api/incident/all");
    let data = await response.json();
    // console.log(data);
    setPoliceData(data);
  }

  // getPoliceData();

  const iconMarkup = renderToStaticMarkup(
    <i className="material-symbols-outlined" style={{ color: "red" }}>
      warning
    </i>
  );
  const customMarkerIcon = divIcon({
    html: iconMarkup,
  });

  // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   maxZoom: 19,
  //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  // }).addTo(map);

  // let marker, circle;

  // const MapClickEvent = () => {
  //   useMapEvents({
  //     click: (e) => {
  //       const { lat, lng } = e.latlng;
  //       if (!currentPosition) {
  //         setCurrentPosition([lat, lng]);
  //       } else if (!destinationPosition) {
  //         setDestinationPosition([lat, lng]);
  //       } else {
  //         setCurrentPosition([lat, lng]);
  //         setDestinationPosition(null);
  //       }
  //     },
  //   });
  //   return null;
  // };
  const addTofavourite = async (
    current_lat,
    current_lng,
    destination_lat,
    destination_lng
  ) => {
    try {
      const user_id = localStorage.getItem("user_id");
      const response = await fetch("http://localhost:5001/api/user/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          current_lat,
          current_lng,
          destination_lat,
          destination_lng,
        }),
      });

      const data = await response.json();
      if (!data.error) {
        // Optionally, save the user data to localStorage or context
        console.log(data);
      } else {
        console.log(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addTofavourite2 = async (
    current_lat,
    current_lng,
    destination_lat,
    destination_lng
  ) => {
    try {
      const user_id = localStorage.getItem("user_id");
      const response = await fetch("http://localhost:5001/api/user/favourite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          current_lat,
          current_lng,
          destination_lat,
          destination_lng,
        }),
      });

      const data = await response.json();
      if (!data.error) {
        // Optionally, save the user data to localStorage or context
        console.log(data);
      } else {
        console.log(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addToIncident = async (current_lat, current_lng, incident, date) => {
    try {
      // const user_id = localStorage.getItem('user_id');
      const response = await fetch(
        "http://localhost:5001/api/incident/userinput",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ current_lat, current_lng, incident, date }),
        }
      );

      const data = await response.json();
      if (!data.error) {
        // Optionally, save the user data to localStorage or context
        console.log(data);
      } else {
        console.log(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const handleGoClick = () => {
  //   if (currentPosition && destinationPosition) {
  //     // Calculate the route using GraphHopper (similar to your existing code)
  //     // Update the map with the new route
  //     // You can remove the existing route if needed
  //     console.log("Calculating route...");
  //   } else {
  //     console.log("Please set both current position and destination.");
  //   }
  // };
  // const handleClickFavourite = () => {
  //   // console.log("hello world");
  //    addTofavourite2(currentPosition[0], currentPosition[1], destinationPosition[0],destinationPosition[1]);

  // };

  const MapRouting = () => {
    const map = useMap();

    // if (routing) {
    //   map.removeControl(routing);
    // }

    if (routeData) {
      // if (routing) {
      //   map.removeControl(routing);
      // }
      const leafletRouting = L.Routing.control({
        waypoints: [
          L.latLng([routeData.source_lat, routeData.source_lng]),
          L.latLng([routeData.destination_lat, routeData.destination_lng]),
        ],
        routeWhileDragging: true,
        router: new L.Routing.graphHopper(
          "65a6ed8f-3edf-44ca-a7cf-a83806334864"
        ),
      }).addTo(map);
      // setRouting(leafletRouting);
    }

    return null;
  };

  const MapClickEvent = () => {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        if (!currentPosition) {
          setCurrentPosition([lat, lng]);
        } else if (!destinationPosition) {
          setDestinationPosition([lat, lng]);
          if (routing) {
            map.removeControl(routing);
          }
          const leafletRouting = L.Routing.control({
            waypoints: [L.latLng(currentPosition), L.latLng([lat, lng])],
            routeWhileDragging: true,
            router: new L.Routing.graphHopper(
              "65a6ed8f-3edf-44ca-a7cf-a83806334864"
            ),
          }).addTo(map);
          setRouting(leafletRouting);
          addTofavourite(currentPosition[0], currentPosition[1], lat, lng);
          // addTofavourite2(currentPosition[0], currentPosition[1],lat,lng);
        } else {
          setCurrentPosition([lat, lng]);
          setDestinationPosition(null);
          if (routing) {
            map.removeControl(routing);
          }
        }
      },
    });

    return null;
  };

  // const handleGoClick = () => {
  //   if (currentPosition && destinationPosition) {
  //     // Calculate the route using GraphHopper (similar to your existing code)
  //     // Update the map with the new route
  //     // You can remove the existing route if needed
  //     console.log("Calculating route...");
  //   } else {
  //     console.log("Please set both current position and destination.");
  //   }
  // };

  const handleClickFavourite = () => {
    // console.log("hello world");
    addTofavourite2(
      currentPosition[0],
      currentPosition[1],
      destinationPosition[0],
      destinationPosition[1]
    );
  };

  const handleClickIncident = () => {
    setShowIncidentForm(!showIncidentForm);
  };

  const handleIncidentSubmit = async (e) => {
    e.preventDefault();
    const date = incidentTime;
    const incident = incidentDescription;
    // if (isAuthenticated) {
    //   addToIncident(currentPosition[0], currentPosition[1], incident, date);
    //   setIncidentDescription("");
    //   setIncidentTime("");
    //   setShowIncidentForm(false);
    // } else {
    //   // Handle unauthorized user
    //   console.log("Unauthorized user. Please log in to submit incident.");
    // }
    addToIncident(currentPosition[0], currentPosition[1], incident, date);
    setIncidentDescription("");
    setIncidentTime("");
    setShowIncidentForm(false);
    setCurrentPosition(null);
  };

  const handleClickLogOut = () => {
    // console.log("hello world");
    localStorage.clear();
    setIsAuthenticated(false);
  };

  const handleClickGoUI = () => {
    // console.log("hello world");
    navigate("/userinterface");
  };

  useEffect(() => {
    let email = localStorage.getItem("email");

    if (email) {
      setIsAuthenticated(true);
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        // const accuracy = position.coords.accuracy

        setCenter([lat, lng]);

        const isAuthenticatedUser = localStorage.getItem("user_id"); // Assuming you store a token upon successful login
        setIsAuthenticated(isAuthenticatedUser ? true : false);

        // map.setViimport "leaflet-routing-machine";ew([lat, lng], 13);

        // if (marker) {
        //   map.removeLayer(marker)
        //   map.removeLayer(circle)
        // }

        // marker = L.marker([lat, lng]).addTo(map);
        // circle = L.circle([lat, lng], {
        //   color: 'red',
        //   fillColor: '#f03',
        //   fillOpacity: 0.5,
        //   radius: accuracy
        // }).addTo(map);
      },
      (error) => {
        console.log(error);
      }
    );
    getPoliceData();
  }, []);

  const groupedPoliceData = policeData.reduce((acc, curr) => {
    const key = `${curr.latitude}-${curr.longitude}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(curr);
    return acc;
  }, {});

  return (
    <div>
      {isAuthenticated ? (
        <div className="topbar">
          {/* <button className="button" onClick={buttonClick()}>Get Direction</button> */}

          {/* <button onClick={handleClickFavourite}>Add To Favourite</button>
          <button onClick={handleClickIncident}>Add Incident</button>
          <button onClick={handleClickGoUI}>Go To User Interface</button>
          <button onClick={handleClickLogOut}>Log Out</button> */}

          <button className="button" onClick={handleClickFavourite}>
            Add To Favourite
          </button>
          <button className="button" onClick={handleClickIncident}>
            Add Incident
          </button>
          <button className="button" onClick={handleClickGoUI}>
            Go To User Interface
          </button>
          <button className="button" onClick={handleClickLogOut}>
            Log Out
          </button>
          {/* {isAuthenticated && <button onClick={handleClickIncident}>Add Incident</button>} */}
        </div>
      ) : (
        <div></div>
      )}

      {showIncidentForm && (
        <form onSubmit={handleIncidentSubmit}>
          <input
            type="text"
            value={incidentDescription}
            onChange={(e) => setIncidentDescription(e.target.value)}
            placeholder="Incident Description"
            required
          />
          <input
            type="datetime-local"
            value={incidentTime}
            onChange={(e) => setIncidentTime(e.target.value)}
            placeholder="Time"
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}

      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "650px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* {policeData.map((data) => (
          <Marker
            key={data["id"]}
            className="incident-marker"
            position={[data["latitude"], data["longitude"]]}
            icon={customMarkerIcon}
          >
            <Popup>
              
              {`Incident: ${data["incident"]}, Date: ${data["date_of_incident"]}`}
              </Popup>
            
          </Marker>
        ))} */}

        {Object.entries(groupedPoliceData).map(([key, incidents]) => {
          const [latitude, longitude] = key.split("-").map(Number);
          return (
            <Marker
              key={key}
              className="incident-marker"
              position={[latitude, longitude]}
              icon={customMarkerIcon}
            >
              <Popup>
                {/* {incidents.map((incident, index) => (
                  <div key={index}>
                    <strong>Incident:</strong> {incident.incident}
                    <br />
                    <strong>Date:</strong> {incident.date_of_incident}
                    <br />
                    <hr />
                  </div>

                  ))} */}

                {incidents
                  .sort(
                    (a, b) =>
                      new Date(b.date_of_incident) -
                      new Date(a.date_of_incident)
                  )
                  .map((incident, index) => (
                    <div key={index}>
                      <strong>{incident.incident}</strong>
                      <br />
                      {new Date(incident.date_of_incident).toLocaleString()}
                      <br />
                      <br />
                    </div>
                  ))}
              </Popup>
            </Marker>
          );
        })}

        <Marker position={[center[0], center[1]]}></Marker>
        {currentPosition && <Marker position={currentPosition} />}
        {destinationPosition && <Marker position={destinationPosition} />}

        <MapClickEvent />
        <MapRouting />
      </MapContainer>
    </div>
  );
}

export default MapBody;
