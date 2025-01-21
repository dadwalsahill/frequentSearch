const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    height: "40px",
    minHeight: "40px",
    width: "100%",
    borderRadius: "5px",
    padding: "5px",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(66, 133, 244, 0.5)" : "none",
    transition: "all 0.3s ease",
    borderColor: state.isFocused ? "#4285f4" : "#ccc",
    backgroundColor: "#fff",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "5px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    marginTop: "5px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#4285f4"
      : state.isFocused
      ? "#f1f3f4"
      : "transparent",
    color: state.isSelected ? "white" : "#333",
    padding: "10px",
    borderRadius: "5px",
    transition: "background-color 0.2s ease",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#999",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#333",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#4285f4",
  }),
};

export default customSelectStyles;
