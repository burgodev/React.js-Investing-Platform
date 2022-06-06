import React, { useState, useEffect } from "react";
import { MenuItem } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import axios from "axios";
import { useFormikContext } from "formik";
import { Loading, TextField } from "../";

const SelectCountry = ({ formik, initialValue, onChange, ...props }) => {
  const i18n = useTranslation().t;
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    getAllCountries();
  }, []);

  useEffect(() => {
    setSelectedCountry(initialValue)
  }, [initialValue]);


  const getAllCountries = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://api.countrystatecity.in/v1/countries",
        {
          headers: {
            "X-CSCAPI-KEY":
              "WmkyZzdPWlhNTTB4dkdvRzl1Y0Z4UVZxa2FXdGs0WlNhakg1bUR3WQ==",
          },
        }
      );
      setCountries(data);
    } catch (e) {
      console.log("API ERROR - SelectCountry.js", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TextField
      variant="outlined"
      fullWidth
      id="country"
      name="country"
      label={i18n("select.country")}
      select
      // InputLabelProps={{ shrink: false }}
      size="small"
      // value={formik.values.country}
      // onChange={onChange}
      value={selectedCountry}
      onChange={(e) => {
        setSelectedCountry(e.target.value);
        setFieldValue("country", e.target.value)
      }}
      error={formik.touched.country && Boolean(formik.errors.country)}
      helperText={formik.touched.country && formik.errors.country}
      InputProps={{
        startAdornment: (
          <Loading size={18} isLoading={loading} style={{ width: "auto" }} />
        ),
      }}
      {...props}
    >
      {countries.length > 0 ? (
        countries.map((country) => (
          <MenuItem value={country.iso2} key={country.iso2}>
            {country.name}
          </MenuItem>
        ))
      ) : (
        <MenuItem>{i18n("select.noData")}</MenuItem>
      )}
    </TextField>
  );
};

SelectCountry.propTypes = {
  formik: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  initialValue: PropTypes.string.isRequired,
};

export default SelectCountry;
