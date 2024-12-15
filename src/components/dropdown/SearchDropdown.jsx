import { useState } from "react";
import Select from "react-select";
import { components } from "react-select";

const NoOptionsMessage = (props) => {
   const inputLength = props.selectProps.inputValue.length;
   const message =
      inputLength > 0 && inputLength < 2 ? `Please type ${2 - inputLength} more character(s)` : "Not found.";
   return (
      <components.NoOptionsMessage {...props}>
         <div>{message}</div>
      </components.NoOptionsMessage>
   );
};

const customStyles = {
   control: (styles) => ({
      ...styles,
      border: "1px s",
      boxShadow: "none",
      width: "100%",
   }),
   input: (styles) => ({
      ...styles,
      border: "none",
      textAlign: "center",
   }),
   indicatorSeparator: (styles) => ({
      display: "none",
   }),
   valueContainer: (styles) => ({
      ...styles,
   }),
   dropdownIndicator: (styles) => ({
      ...styles,
   }),
};

export const SearchDropdown = ({ optionData, placeHolder, value, setValue }) => {
   const [inputValue, setInputValue] = useState("");

   const handleChange = (selectedOption) => {
      setValue(selectedOption);
   };


   const filteredOptions =
      inputValue.length >= 2
         ? optionData.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()))
         : optionData;

   return (
      <div>
         <Select
            placeholder={placeHolder}
            className="border w-[250px] border-gray-300 rounded-md primary-shadow !hover:border-1 border-opacity-70 hover:border-blue-800"
            classNamePrefix=""
            value={value}
            onChange={handleChange}
            onInputChange={(input) => setInputValue(input)}

            isSearchable={true}
            formatCreateLabel={(inputValue) => `${inputValue}`}
            styles={customStyles}
            components={{ NoOptionsMessage }}
            inputValue={inputValue}
            noOptionsMessage={() => NoOptionsMessage({ selectProps: { inputValue } })}
            options={filteredOptions}
         />
      </div>
   );
};
