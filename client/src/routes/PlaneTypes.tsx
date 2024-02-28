import { useEffect, useState } from "react";
import Axios from 'axios';

function PlaneTypes() {
  const [planeTypes, setPlaneTypes] = useState([]);  
  
  // receive data from get request
    useEffect(() => {
      Axios.get(`http://localhost:55767/plane-types`).then((response) => {
        setPlaneTypes(response.data)
      });
  }, []);

  return (
    <div>
      <h1>Plane Types</h1>
      <div id="browse">
        <p>
          <strong>Browse Plane Types</strong>
        </p>
        <table>
          <thead>
            <tr>
              <th>New</th>
              <th></th>
              <th>Plane Type ID</th>
              <th>Type Name</th>
              <th>Capacity</th>
              <th>Range (hrs)</th>
            </tr>
          </thead>
          <tbody>
            {planeTypes.map((planeType) => (
              <tr>
                <td>
                  <a href="#">Edit</a>
                </td>
                <td>
                  <a href="#">Delete</a>
                </td>
                <td>{planeType.plane_type_id}</td>
                <td>{planeType.type_name}</td>
                <td>{planeType.capacity}</td>
                <td>{planeType.range_in_hrs}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>&nbsp;</p>
      </div>

      <div id="insert">
        <form id="addPlaneType" method="post">
          <legend>
            <strong>Add Plane Type</strong>
          </legend>
          <fieldset className="fields">
            <label>Type Name</label>
            <input type="text" name="type_name" />
            <label>Capacity</label>
            <input type="number" name="capacity" />
            <label>Range (hrs)</label>
            <input type="number" name="range_in_hrs" />
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Add Plane Type" />
            <input className="btn" type="button" value="Cancel" />
          </div>
        </form>
      </div>

      <div id="update">
        <form id="updatePlaneType" method="post">
          <legend>
            <strong>Update Plane Type</strong>
          </legend>
          <fieldset className="fields">
            <span>Plane Type ID: 1</span>
            <label>Type Name</label>
            <input type="text" value="Airbus A320-200" name="type_name" />
            <label>Capacity</label>
            <input type="number" name="capacity" value="180" />
            <label>Range (hrs)</label>
            <input type="number" name="range_in_hrs" value="5" />
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Save Update Plane Type" />
            <input className="btn" type="button" value="Cancel" />
          </div>
        </form>
      </div>

      <div id="delete">
        <form id="deletePlaneType" method="post">
          <legend>
            <strong>Delete Plane Type</strong>
          </legend>
          <fieldset className="fields">
            <p>Are you sure you wish to delete the following?</p>
            <span>Plane Type ID: 1</span>
            <span>Type Name: Airbus A320-200</span>
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Delete Plane Type" />
            <input className="btn" type="button" value="Cancel" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default PlaneTypes;
