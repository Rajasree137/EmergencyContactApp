import { useEffect, useState } from "react";

const useLocation = () => {
  const [country, setCountry] = useState("India");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => setCountry(data.country_name))
      .catch(() => setCountry("India"));
  }, []);

  return country;
};

export default useLocation;
