// import React, { useState } from "react";
// import { MapContainer, TileLayer, GeoJSON, Marker } from "react-leaflet";
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
// import 'leaflet-defaulticon-compatibility';// Re-uses images from ~leaflet package
// import * as L from "leaflet";

// import axios from "axios";
// // import "./TEST_MAP.css";

// function MapComponent() {
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [location1, setLocation1] = useState("");
//   const [inputValue, setinputValue] = useState(0);
//   const [Response, setResponse] = useState("");
//   const [UserData, setUserData] = useState({
//     from: "",
//     to: "",
//     location_1: "",
//     location_2: "",
//     location_3: "",
//     location_4: "",
//   });
//   const [multiplier, setMultiplier] = useState(1);
//   const handleChanges = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setUserData({ ...UserData, [name]: value });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setResponse("");
//     if (UserData.from && UserData.to) {
//       let config = {
//         method: "get",
//         maxBodyLength: Infinity,
//         url: `https://nominatim.openstreetmap.org/search?q=${UserData.from}&format=json&countrycodes=IN`,
//         headers: {},
//       };
//       let config2 = {
//         method: "get",
//         maxBodyLength: Infinity,
//         url: `https://nominatim.openstreetmap.org/search?q=${UserData.to}&format=json&countrycodes=IN`,
//         headers: {},
//       };
//       let config1 = {
//         method: "get",
//         maxBodyLength: Infinity,
//         url: `https://nominatim.openstreetmap.org/search?q=${UserData.to}&format=json&countrycodes=IN`,
//         headers: {},
//       };
//       var from = "";
//       var to = "";
//       axios
//         .request(config)
//         .then((response) => {
//           console.log(JSON.stringify(response.data));
//           from = response.data[0].lon + "," + response.data[0].lat;
//           setFrom(response.data[0].lon + "," + response.data[0].lat);
//           axios
//             .request(config1)
//             .then((res) => {
//               console.log(JSON.stringify(res.data));
//               to = res.data[0].lon + "," + res.data[0].lat;
//               setTo(res.data[0].lon + "," + res.data[0].lat);
//               axios
//                 .request(config2)
//                 .then((res) => {
//                   console.log(JSON.stringify(res.data));
//                   to = res.data[0].lon + "," + res.data[0].lat;
//                   setLocation1(res.data[0].lon + "," + res.data[0].lat);

//                   let data = JSON.stringify({
//                     coordinates: [
//                       [8.681495, 49.41461],
//                       [8.686507, 49.41943],
//                       [8.687872, 49.420318],
//                     ],
//                   });

//                   let config = {
//                     method: "get",
//                     maxBodyLength: Infinity,
//                     url: `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248683adac4e0e7468f88ea0f21498555ba&start=${from}&end=${to}`,
//                     headers: {
//                       "Content-Type": "application/json; charset=utf-8",
//                       Accept:
//                         "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
//                     },
//                   };

//                   axios
//                     .request(config)
//                     .then((response) => {
//                       console.log(JSON.stringify(response.data));
//                       setResponse(response.data.features[0]);
//                     })
//                     .catch((error) => {
//                       console.log(error);
//                     });
//                 })
//                 .catch((error) => {
//                   console.log(error);
//                 });
//             })
//             .catch((error) => {
//               console.log(error);
//             });
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } else {
//       alert("Error");
//     }
//   };
//   const handleChangeRate = (event) => {
//     setMultiplier(event.target.value);
//   };
//   function convertSecondsToTime(duration) {
//     const days = Math.floor(duration / (3600 * 24));
//     duration -= days * 3600 * 24;
//     const hours = Math.floor(duration / 3600);
//     duration -= hours * 3600;
//     const minutes = Math.floor(duration / 60);
//     duration -= minutes * 60;
//     const seconds = parseInt(duration % 60, 10);

//     return `days:${days},hours:${hours},minutes:${minutes},seconds:${seconds}`;
//   }
//   let fromLatLng = from
//     .split(",")
//     .map((numStr) => parseFloat(numStr))
//     .reverse();
//   let toLatLng = to
//     .split(",")
//     .map((numStr) => parseFloat(numStr))
//     .reverse();

//   function handleSelectChange(e) {
//     setinputValue(e.target.value);
//   }
//   return (
//     <>
//       <div>
//         <form className="Form" onSubmit={handleSubmit}>
//           <input
//             className="input"
//             type="text"
//             name="from"
//             placeholder="Origin"
//             label="From"
//             value={UserData?.from}
//             onChange={handleChanges}
//           />
//           &nbsp; &nbsp;
//           <input
//             className="input"
//             type="text"
//             name="to"
//             placeholder="Destination"
//             label="To"
//             value={UserData?.to}
//             onChange={handleChanges}
//           />
//           <select
//             className="select_inputValue"
//             id="mySelect"
//             onChange={handleSelectChange}
//           >
//             <option value="0">Box with Dynamic Input Fields</option>
//             <option value="1">1</option>
//             <option value="2">2</option>
//             <option value="3">3</option>
//             <option value="4">4</option>
//           </select>
//           {inputValue >= 1 && (
//             <input
//               className="inputValue"
//               type="text"
//               name="location_1"
//               placeholder="Location 1"
//               label="To"
//               value={UserData?.location_1}
//               onChange={handleChanges}
//             />
//           )}
//           &nbsp; &nbsp;
//           {inputValue >= 2 && (
//             <input
//               className="inputValue"
//               type="text"
//               name="location_2"
//               placeholder="Location 2"
//               label="To"
//               value={UserData?.location_2}
//               onChange={handleChanges}
//             />
//           )}
//           {inputValue >= 3 && (
//             <input
//               className="inputValue"
//               type="text"
//               name="location_3"
//               placeholder="Location 3"
//               label="To"
//               value={UserData?.location_3}
//               onChange={handleChanges}
//             />
//           )}
//           {inputValue >= 4 && (
//             <input
//               className="inputValue"
//               type="text"
//               name="location_4"
//               placeholder="Location 4"
//               label="To"
//               value={UserData?.location_4}
//               onChange={handleChanges}
//             />
//           )}
//           &nbsp; &nbsp;
//           <select className="select_input" onChange={handleChangeRate}>
//             <option value="0">--Select--</option>
//             <option value="38">MXL - 38</option>
//             <option value="48">SXL - 48 </option>
//             <option value="58">Traile - 58</option>
//           </select>
//           <button className="btnSubmit"> submit</button>
//         </form>
//       </div>

//       {Response && (
//         <>
//           <div className="info">
//             <p>
//               <span>Distance: </span>
//               {Math.ceil(Response.properties.summary.distance / 1000)} Kms
//             </p>
//             <p>
//               <span> Amount:</span>
//               {Math.ceil(Response.properties.summary.distance / 1000) *
//                 multiplier}
//               ₹.
//             </p>
//             <p>{convertSecondsToTime(Response.properties.summary.duration)}</p>
//           </div>

//           <MapContainer
//             className="mapContainer"
//             center={[22.0752, 72.8777]}
//             zoom={5}
//           >
//             <TileLayer
//               attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             {from && <Marker position={fromLatLng} />}
//             {to && <Marker position={toLatLng} />}
//             <GeoJSON data={Response} />
//           </MapContainer>
//         </>
//       )}
//     </>
//   );
// }

// export default MapComponent;
import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import * as L from "leaflet";
import "leaflet-defaulticon-compatibility";
import axios from "axios";
import "./TEST_MAP.css";

function MapComponent() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [location1, setLocation1] = useState("");
  const [Loadings, setLoadings] = useState(false);

  const [inputValue, setinputValue] = useState(0);
  const [Response, setResponse] = useState("");
  const [UserData, setUserData] = useState({
    from: "",
    to: "",
    location_1: "",
    location_2: "",
    location_3: "",
    location_4: "",
  });
  const [multiplier, setMultiplier] = useState(1);
  const handleChanges = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...UserData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setResponse("");
    if (UserData.from && UserData.to) {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://nominatim.openstreetmap.org/search?q=${UserData.from}&format=json&countrycodes=IN`,
        headers: {},
      };
      let config2 = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://nominatim.openstreetmap.org/search?q=${UserData.to}&format=json&countrycodes=IN`,
        headers: {},
      };
      let config1 = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://nominatim.openstreetmap.org/search?q=${UserData.to}&format=json&countrycodes=IN`,
        headers: {},
      };
      var from = "";
      var to = "";
      axios
        .request(config)
        .then((response) => {
          setLoadings(true);
          console.log(JSON.stringify(response.data));
          from = response.data[0].lon + "," + response.data[0].lat;
          setFrom(response.data[0].lon + "," + response.data[0].lat);
          axios
            .request(config1)
            .then((res) => {
              console.log(JSON.stringify(res.data));
              to = res.data[0].lon + "," + res.data[0].lat;
              setTo(res.data[0].lon + "," + res.data[0].lat);
              axios
                .request(config2)
                .then((res) => {
                  console.log(JSON.stringify(res.data));
                  to = res.data[0].lon + "," + res.data[0].lat;
                  setLocation1(res.data[0].lon + "," + res.data[0].lat);

                  let data = JSON.stringify({
                    coordinates: [
                      [8.681495, 49.41461],
                      [8.686507, 49.41943],
                      [8.687872, 49.420318],
                    ],
                  });

                  let config = {
                    method: "get",
                    maxBodyLength: Infinity,
                    url: `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248302217cd13cb40f8bdb888c29367e014&start=${from}&end=${to}`,
                    headers: {
                      "Content-Type": "application/json; charset=utf-8",
                      Accept:
                        "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
                    },
                  };

                  axios
                    .request(config)
                    .then((response) => {
                      console.log(JSON.stringify(response.data));
                      setResponse(response.data.features[0]);
                      setLoadings(false);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Error");
    }
  };
  const handleChangeRate = (event) => {
    setMultiplier(event.target.value);
  };
  function convertSecondsToTime(duration) {
    const days = Math.floor(duration / (3600 * 24));
    duration -= days * 3600 * 24;
    const hours = Math.floor(duration / 3600);
    duration -= hours * 3600;
    const minutes = Math.floor(duration / 60);
    duration -= minutes * 60;
    const seconds = parseInt(duration % 60, 10);

    return `days:${days},hours:${hours},minutes:${minutes},seconds:${seconds}`;
  }
  let fromLatLng = from
    .split(",")
    .map((numStr) => parseFloat(numStr))
    .reverse();
  let toLatLng = to
    .split(",")
    .map((numStr) => parseFloat(numStr))
    .reverse();

  function handleSelectChange(e) {
    setinputValue(e.target.value);
  }
  return (
    <>
      <div>
        <form className="Form" onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            name="from"
            placeholder="Origin"
            label="From"
            value={UserData?.from}
            onChange={handleChanges}
          />
          &nbsp; &nbsp;
          <input
            className="input"
            type="text"
            name="to"
            placeholder="Destination"
            label="To"
            value={UserData?.to}
            onChange={handleChanges}
          />
          {/* <select
            className="select_inputValue"
            id="mySelect"
            onChange={handleSelectChange}
          >
            <option value="0">Box with Dynamic Input Fields</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          {inputValue >= 1 && (
            <input
              className="inputValue"
              type="text"
              name="location_1"
              placeholder="Location 1"
              label="To"
              value={UserData?.location_1}
              onChange={handleChanges}
            />
          )}
          &nbsp; &nbsp;
          {inputValue >= 2 && (
            <input
              className="inputValue"
              type="text"
              name="location_2"
              placeholder="Location 2"
              label="To"
              value={UserData?.location_2}
              onChange={handleChanges}
            />
          )}
          {inputValue >= 3 && (
            <input
              className="inputValue"
              type="text"
              name="location_3"
              placeholder="Location 3"
              label="To"
              value={UserData?.location_3}
              onChange={handleChanges}
            />
          )}
          {inputValue >= 4 && (
            <input
              className="inputValue"
              type="text"
              name="location_4"
              placeholder="Location 4"
              label="To"
              value={UserData?.location_4}
              onChange={handleChanges}
            />
          )}
          &nbsp; &nbsp;
          <select className="select_input" onChange={handleChangeRate}>
            <option value="0">--Select--</option>
            <option value="38">MXL - 38</option>
            <option value="48">SXL - 48 </option>
            <option value="58">Traile - 58</option>
          </select> */}
          <button className="btnSubmit"> submit</button>
        </form>
      </div>

            {Loadings && (
              <div>
                Loading ......
                </div>
            )}

      {Response && !Loadings && (
        <>
          <div className="info">
            <p>
              <span>Distance: </span>
              {Math.ceil(Response.properties.summary.distance / 1000)} Kms
            </p>
            <p>
              <span> Amount:</span>
              {Math.ceil(Response.properties.summary.distance / 1000) *
                multiplier}
              ₹.
            </p>
            <p>{convertSecondsToTime(Response.properties.summary.duration)}</p>
          </div>

          <MapContainer
            className="mapContainer"
            center={[22.0752, 72.8777]}
            zoom={5}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {from && <Marker position={fromLatLng} />}
            {to && <Marker position={toLatLng} />}
            <GeoJSON data={Response} />
          </MapContainer>
        </>
      )}
    </>
  );
}

export default MapComponent;
