import React from "react";
import Layout from "./Layout";
import "../css/LoginPage.css";
import { useCurrentUser } from "./userState";
// import { userId } from "./GetUserID";
import { useState } from "react";

function CreateEvent() {
  const [eLink, seteLink] = useState("your-link");
  const [priceField, setpriceField] = useState(true);
  const [privacyField, setprivacyField] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [regBtnClicked, setRegBtnClicked] = useState(false);
  const [buttonIcon, setButtonIcon] = useState("bi bi-person-plus");
  const { currentUser } = useCurrentUser();
  const [imageFields, setImageFields] = useState([]);
  const [speakerFields, setSpeakerFields] = useState([]);
  const addImageField = () => {
    setImageFields([...imageFields, <input key={imageFields.length} type="file" placeholder="Event Image" className="input-field form-control dark" />]);
  };
  // const dateControl = document.querySelector('input[type="date"]');
  // dateControl.value = "2023-11-09";
  const addSpeakerField = () => {
    const newSpeakerFields = [
      ...speakerFields,
      <>
        <div key={speakerFields.length}>
          <div className="row">
            <div className="col-lg-6">
              <input type="text" placeholder={`Speaker ${speakerFields.length + 1} Name`} className="form-field" />
            </div>
            <div className="col-lg-6">
              <input type="file" placeholder={`Speaker ${speakerFields.length + 1} Image`} className="input-field form-control dark" />
            </div>
          </div>
        </div>
      </>,
    ];
    setSpeakerFields(newSpeakerFields);
  };

  console.log(currentUser);
  if (!currentUser) {
    var username = "Guest";
  } else {
    username = currentUser.username;
  }
  return (
    <Layout>
      <div className="pcontainer">
        <h2 className="mb-4 mt-3">Post an Event </h2>
        {/* <h6> Hello, ${username} </h6> */}
        <input type="text" placeholder="Event Name" className="form-field" />
        <input type="file" id="thumb" placeholder="Event Image" className="input-field form-control dark" />
        {/* <label for="thumb">Select file</label> */}
        <textarea rows="4" placeholder="Event Description" className="form-field" />
        <input type="text" placeholder="Event Location" className="form-field" />

        <input type="text" class="form-field" list="datalistOptions" id="exampleDataList" placeholder="City" />
        <datalist id="datalistOptions" className="form-field">
          <option value="Dhaka">Dhaka</option>
          <option value="Faridpur">Faridpur</option>
          <option value="Gazipur">Gazipur</option>
          <option value="Gopalganj">Gopalganj</option>
          <option value="Jamalpur">Jamalpur</option>
          <option value="Kishoreganj">Kishoreganj</option>
          <option value="Madaripur">Madaripur</option>
          <option value="Manikganj">Manikganj</option>
          <option value="Munshiganj">Munshiganj</option>
          <option value="Mymensingh">Mymensingh</option>
          <option value="Narayanganj">Narayanganj</option>
          <option value="Narsingdi">Narsingdi</option>
          <option value="Netrokona">Netrokona</option>
          <option value="Rajbari">Rajbari</option>
          <option value="Shariatpur">Shariatpur</option>
          <option value="Sherpur">Sherpur</option>
          <option value="Tangail">Tangail</option>
          <option value="Bogra">Bogra</option>
          <option value="Joypurhat">Joypurhat</option>
          <option value="Naogaon">Naogaon</option>
          <option value="Natore">Natore</option>
          <option value="Nawabganj">Nawabganj</option>
          <option value="Pabna">Pabna</option>
          <option value="Rajshahi">Rajshahi</option>
          <option value="Sirajgonj">Sirajgonj</option>
          <option value="Dinajpur">Dinajpur</option>
          <option value="Gaibandha">Gaibandha</option>
          <option value="Kurigram">Kurigram</option>
          <option value="Lalmonirhat">Lalmonirhat</option>
          <option value="Nilphamari">Nilphamari</option>
          <option value="Panchagarh">Panchagarh</option>
          <option value="Rangpur">Rangpur</option>
          <option value="Thakurgaon">Thakurgaon</option>
          <option value="Barguna">Barguna</option>
          <option value="Barisal">Barisal</option>
          <option value="Bhola">Bhola</option>
          <option value="Jhalokati">Jhalokati</option>
          <option value="Patuakhali">Patuakhali</option>
          <option value="Pirojpur">Pirojpur</option>
          <option value="Bandarban">Bandarban</option>
          <option value="Brahmanbaria">Brahmanbaria</option>
          <option value="Chandpur">Chandpur</option>
          <option value="Chittagong">Chittagong</option>
          <option value="Comilla">Comilla</option>
          <option value="Cox's Bazar">Cox's Bazar</option>
          <option value="Feni">Feni</option>
          <option value="Khagrachari">Khagrachari</option>
          <option value="Lakshmipur">Lakshmipur</option>
          <option value="Noakhali">Noakhali</option>
          <option value="Rangamati">Rangamati</option>
          <option value="Habiganj">Habiganj</option>
          <option value="Maulvibazar">Maulvibazar</option>
          <option value="Sunamganj">Sunamganj</option>
          <option value="Sylhet">Sylhet</option>
          <option value="Bagerhat">Bagerhat</option>
          <option value="Chuadanga">Chuadanga</option>
          <option value="Jessore">Jessore</option>
          <option value="Jhenaidah">Jhenaidah</option>
          <option value="Khulna">Khulna</option>
          <option value="Kushtia">Kushtia</option>
          <option value="Magura">Magura</option>
          <option value="Meherpur">Meherpur</option>
          <option value="Narail">Narail</option>
          <option value="Satkhira">Satkhira</option>
        </datalist>
        <input type="date" className="form-field" id="start" name="trip-start" value="2023-11-09" min="2023-11-09" max="2028-12-31" />
        <input type="text" placeholder="Event Date" className="form-field" />
        <input type="text" placeholder="Event Time" className="form-field" />
        {/* <input type="text" placeholder="Event Image" className="form-field" /> */}
        <div class="form-check form-switch py-2">
          <input onChange={(e) => setpriceField(!e.target.checked)} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
          <label className="form-check-label" for="flexSwitchCheckDefault">
            This is a free event
          </label>
        </div>
        <input disabled={!priceField} type="text" placeholder="Ticket Price" className="form-field" />
        <div class="form-check form-switch py-2">
          <input onChange={(e) => setprivacyField(!e.target.checked)} className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
          <label className="form-check-label" for="flexSwitchCheckDefault">
            This is a private event
          </label>
        </div>
        <input disabled={privacyField} type="text" placeholder="Password" className="form-field" />
        <input type="text" name="query" value={eLink} onChange={(e) => seteLink(e.target.value)} placeholder="Link to the Event" className="form-field" />
        <div class="alert alert-info" role="alert" data-bs-theme="dark">
          This will set your event sharing link to <strong>seatfinder.xyz/{eLink}</strong>
        </div>
        <div>
          {imageFields.map((imageField, index) => (
            <div key={index}>{imageField}</div>
          ))}
          <button onClick={addImageField} disabled={imageFields.length > 9} className="add-button">
            Add Event Images ({10 - imageFields.length} Left)
          </button>
        </div>
        <div>
          {speakerFields.map((speakerField, indexq) => (
            <div key={indexq}>{speakerField}</div>
          ))}
          <button onClick={addSpeakerField} disabled={speakerFields.length > 9} className="add-button">
            Add Event Speakers ({10 - speakerFields.length} Left)
          </button>
        </div>

        <button type="submit" className="form-button">
          Post Event
        </button>
      </div>
    </Layout>
  );
}

export default CreateEvent;
