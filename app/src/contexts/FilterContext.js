import { createContext, useReducer, useEffect } from "react";

const INITIAL_STATE = {
  priceRange: undefined,
  selectedType: undefined,
  selectedProvince: undefined,
  selectedCity: undefined,
};

export const FilterContext = createContext(INITIAL_STATE);

const FilterReducer = (state, action) => {
  switch (action.type) {
    case "NEW_FILTER":
      return action.payload;
    case "RESET_FILTER":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const FilterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(FilterReducer, INITIAL_STATE);

  useEffect(() => {
    // Retrieve filter values from localStorage
    const savedFilters = localStorage.getItem("filters");
    if (savedFilters) {
      dispatch({ type: "NEW_FILTER", payload: JSON.parse(savedFilters) });
    }
  }, []);

  useEffect(() => {
    // Save filter values to localStorage
    localStorage.setItem("filters", JSON.stringify(state));
  }, [state]);

  return (
    <FilterContext.Provider
      value={{
        priceRange: state.priceRange,
        selectedType: state.selectedType,
        selectedProvince: state.selectedProvince,
        selectedCity: state.selectedCity,
        dispatch,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
