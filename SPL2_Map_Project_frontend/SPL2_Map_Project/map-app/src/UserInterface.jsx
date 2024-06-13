import { useLocation } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./styles/UserInterface.css";
import "./MapBody";

function UserInterface() {
  const location = useLocation();

  // const hst = useHistory();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [viewProfile, setViewProfile] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [showIncidentForm, setShowIncidentForm] = useState(false);
  const [showFavourites, setShowFavourites] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [history, setHistory] = useState([]);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    personalInfo: user?.personalInfo || "",
  });
  const [incident, setIncident] = useState({
    latitude: "",
    longitude: "",
    description: "",
    time: "",
  });
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Fetch user favourites and history from the backend if needed
    fetchUserData();
    fetchUserFavourites();
    fetchUserHistory();
  }, []);

  const fetchUserData = async () => {
    try {
      const user_id = localStorage.getItem("user_id");
      const response = await fetch(
        `http://localhost:5001/api/user/user/${user_id}`
      );
      const data = await response.json();
      setUser(data.user);
      setRating(data.user.rating);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const fetchUserFavourites = async () => {
    try {
      const user_id = localStorage.getItem("user_id");
      console.log("this is user_id " + user_id);
      const response = await fetch(
        `http://localhost:5001/api/user/favourite/${user_id}`
      );
      const data = await response.json();
      setFavourites(data.result);
    } catch (error) {
      console.error("Error fetching favourite:", error);
    }
  };

  const fetchUserHistory = async () => {
    try {
      const user_id = localStorage.getItem("user_id");
      const response = await fetch(
        `http://localhost:5001/api/user/history/${user_id}`
      );
      const data = await response.json();
      setHistory(data.result);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleIncidentChange = (e) => {
    const { name, value } = e.target;
    setIncident({ ...incident, [name]: value });
  };

  /*const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/user/update-profile/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });
      if (response.ok) {
        alert("Profile Updated!");
        setUpdateProfile(false);
      } else {
        alert("Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
*/
  const handleIncidentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/user/add-history/${user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incident),
      });
      if (response.ok) {
        setHistory([...history, incident]);
        alert("Incident Reported!");
        setIncident({
          latitude: "",
          longitude: "",
          description: "",
          time: "",
        });
        setShowIncidentForm(false);
      } else {
        alert("Error reporting incident");
      }
    } catch (error) {
      console.error("Error reporting incident:", error);
    }
  };

  const addFavourite = async () => {
    const route = prompt("Enter route to add to favourites:");
    if (route) {
      try {
        const response = await fetch(`/user/add-favourite/${user.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ route }),
        });
        if (response.ok) {
          setFavourites([...favourites, route]);
          alert("Route added to favourites!");
        } else {
          alert("Error adding favourite");
        }
      } catch (error) {
        console.error("Error adding favourite:", error);
      }
    }
  };

  const addRating = async (rating) => {
    try {
      const user_id = localStorage.getItem("user_id");
      const response = await fetch(
        `http://localhost:5001/api/user/rating/${user_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating }),
        }
      );
      if (response.ok) {
        alert("rating updated");
      } else {
        alert("Error updating rating");
      }
    } catch (error) {
      console.error("Error adding rating:", error);
    }
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
    addRating(value);
  };

  const redirectToMapBody = () => {
    navigate("/");
  };

  const showInMap = (
    source_lat,
    source_lng,
    destination_lat,
    destination_lng
  ) => {
    navigate("/", {
      state: {
        source_lat: source_lat,
        source_lng: source_lng,
        destination_lat: destination_lat,
        destination_lng: destination_lng,
      },
    });
  };

  return (
    <div id="userInterface">
      <h1>User Interface</h1>
      <div className="buttons">
        <button onClick={() => setViewProfile(!viewProfile)}>
          View Profile
        </button>
        {/* <button onClick={() => setUpdateProfile(!updateProfile)}> */}
        {/* Update Profile */}
        {/* </button> */}
        <button onClick={() => setShowFavourites(!showFavourites)}>
          View Favourites
        </button>
        {/* <button onClick={addFavourite}>Add Favourites</button> */}
        <button onClick={() => setShowHistory(!showHistory)}>
          View History
        </button>

        <button onClick={redirectToMapBody}>Go to Map</button>
      </div>

      {viewProfile && (
        <div className="profile">
          <h2>Profile</h2>
          {/* <p>Name: {profile.name}</p> */}
          <p>Email: {user.email}</p>
          {/* <p>Personal Info: {profile.personalInfo}</p> */}
        </div>
      )}

      {/* {updateProfile && ( 
        <form className="profileForm" onSubmit={handleProfileSubmit}>
          <h2>Update Profile</h2>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
            placeholder="Email"
            required
          />
          <textarea
            name="personalInfo"
            value={profile.personalInfo}
            onChange={handleProfileChange}
            placeholder="Personal Info"
            required
          />
          <button type="submit">Submit</button>
        </form>
      )} */}

      {showFavourites && (
        <div className="favourites">
          <h2>Favourites</h2>
          <ul>
            {favourites.map((fav, index) => (
              <li key={index}>
                <li key={index}>
                  <p>Source Latitude: {fav.current_latitude}</p>
                  <p>Source Longitude: {fav.current_longitude}</p>
                  <p>Destination Latitude: {fav.destination_latitude}</p>
                  <p>Destination Longitude: {fav.destination_longitude}</p>
                  <button
                    onClick={() => showInMap(
                      fav.current_latitude,
                      fav.current_longitude,
                      fav.destination_latitude,
                      fav.destination_longitude
                    )}
                  >
                    View In Map
                  </button>
                </li>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showHistory && (
        <div className="history">
          <h2>History</h2>
          <ul>
            {history.map((incident, index) => (
              <li key={index}>
                <p>Source Latitude: {incident.current_latitude}</p>
                <p>Source Longitude: {incident.current_longitude}</p>
                <p>Destination Latitude: {incident.destination_latitude}</p>
                <p>Destination Longitude: {incident.destination_longitude}</p>
                <p>Time: {incident.timestamp}</p>
                <button
                    onClick={() => showInMap(
                      incident.current_latitude,
                      incident.current_longitude,
                      incident.destination_latitude,
                      incident.destination_longitude
                    )}
                  >
                    View In Map
                  </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* <button onClick={redirectToMapBody}>Go to Map</button> */}

      {/* 
      <div className="reportIncident">
        <a href="#" onClick={() => setShowIncidentForm(!showIncidentForm)}>
          Want to register an incident?
        </a>
        {showIncidentForm && (
          <form onSubmit={handleIncidentSubmit}>
            <input
              type="text"
              name="latitude"
              value={incident.latitude}
              onChange={handleIncidentChange}
              placeholder="Latitude"
              required
            />
            <input
              type="text"
              name="longitude"
              value={incident.longitude}
              onChange={handleIncidentChange}
              placeholder="Longitude"
              required
            />
            <textarea
              name="description"
              value={incident.description}
              onChange={handleIncidentChange}
              placeholder="Description"
              required
            />
            <input
              type="datetime-local"
              name="time"
              value={incident.time}
              onChange={handleIncidentChange}
              required
            />
            <button type="submit">Report</button>
          </form>
        )}
      </div> */}

      <div className="feedback">
        <h2>Feedback</h2>
        <textarea
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder="Write your feedback here..."
        ></textarea>
      </div>

      <div className="rating">
        <h2>Rating</h2>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= rating ? "filled" : ""}
              onClick={() => handleRatingChange(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserInterface;
