import { useSearchParams } from 'react-router-dom';

function useCustomSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Function to add or update query parameters
  const updateQueryParams = (params) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const updatedParams = { ...currentParams, ...params }; // Merge the current parameters with the new ones
    setSearchParams(updatedParams); // Set the updated query parameters
  };

  return [searchParams, updateQueryParams, setSearchParams];
}

export default useCustomSearchParams;
