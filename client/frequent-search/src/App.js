import React, { useState, useEffect } from "react";
import "./App.css";
import Select from "react-select";
import axios from "axios";
import { API_URLS } from "./urls/urls";
import { validateForm } from "./validations/validations";
import { useNavigate } from "react-router-dom";
import customStyles from "./styles/customStyles";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    gender: "",
    dob: "",
    age: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(API_URLS.COUNTRIES);

      if (Array.isArray(response.data)) {
        const countryOptions = response.data.map((item) => ({
          value: item?.country || "Unknown",
          label: item?.country || "Unknown",
        }));
        setCountries(countryOptions);
      } else {
        console.error("Unexpected API response format. Expected an array.");
      }
    } catch (error) {
      console.error("Error fetching countries:", error.message);
    }
  };

  const fetchStates = async (countryCode) => {
    try {
      const response = await axios.get(`${API_URLS.GEONAME}/${countryCode}`);
      console.log("States API Response:", response.data);
      const stateOptions = response.data.map((state) => ({
        value: state.geonameId,
        label: state.name,
      }));
      setStates(stateOptions);
      setCities([]);
    } catch (error) {
      console.error("Error fetching states:", error.message);
    }
  };

  const fetchCities = async (country, state) => {
    try {
      if (!country || !state) {
        console.error("Country and state must be provided.");
        return;
      }

      const response = await axios.get(
        `${API_URLS.CITIES}/${country}/${state}`
      );
      console.log("Cities API Response:", response.data);

      const cityOptions = response.data.map((city) => ({
        value: city,
        label: city,
      }));

      setCities(cityOptions);
    } catch (error) {
      console.error("Error fetching cities:", error.message);
    }
  };

  const handleCountryChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      country: selectedOption?.label || "",
    }));
    fetchStates(selectedOption?.value);
  };

  const handleStateChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      state: selectedOption?.label || "",
    }));
    fetchCities(formData.country, selectedOption?.label);
  };

  const handleCityChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      city: selectedOption?.label || "",
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "country") {
      fetchStates(value);
      setFormData((prevData) => ({ ...prevData, state: "", city: "" }));
    } else if (name === "state") {
      fetchCities(value);
      setFormData((prevData) => ({ ...prevData, city: "" }));
    }

    if (name === "dob") {
      const age = calculateAge(value);
      setFormData((prevData) => ({ ...prevData, age }));
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post(API_URLS.REGISTER, formData);
        alert("Form submitted successfully!");
        navigate("/displayData", { state: { formData } });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="App">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          {errors.firstName && <p>{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          {errors.lastName && <p>{errors.lastName}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <Select
            id="country"
            name="country"
            options={countries}
            onChange={handleCountryChange}
            styles={customStyles}
            value={
              countries.find((country) => country.label === formData.country) ||
              null
            }
            placeholder="Select Country"
          />
          {errors.country && <p>{errors.country}</p>}
        </div>

        <div>
          <label htmlFor="state">State</label>
          <Select
            id="state"
            name="state"
            options={states}
            onChange={handleStateChange}
            styles={customStyles}
            value={
              states.find((state) => state.label === formData.state) || null
            }
            placeholder="Select State"
          />

          {errors.state && <p>{errors.state}</p>}
        </div>

        <div>
          <label htmlFor="city">City</label>
          <Select
            id="city"
            name="city"
            options={cities}
            onChange={handleCityChange}
            styles={customStyles}
            value={cities.find((city) => city.label === formData.city) || null}
            placeholder="Select City"
          />

          {errors.city && <p>{errors.city}</p>}
        </div>

        <div>
          <label>Gender</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleInputChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleInputChange}
              />
              Female
            </label>
          </div>
          {errors.gender && <p>{errors.gender}</p>}
        </div>

        <div>
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
          />
          {errors.dob && <p>{errors.dob}</p>}
        </div>

        <div>
          <label>Age: {formData.age}</label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
