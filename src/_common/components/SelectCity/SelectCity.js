import React, { useState, useEffect } from "react";
import { MenuItem } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import axios from "axios";
import { useFormikContext } from "formik";
import { Loading, TextField } from "../";

const SelectCity = ({ formik, initialValue, onChange, ...props }) => {
  const i18n = useTranslation().t;
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    setSelectedCity(initialValue)
  }, [initialValue]);

  const getCities = async (country, state) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "WmkyZzdPWlhNTTB4dkdvRzl1Y0Z4UVZxa2FXdGs0WlNhakg1bUR3WQ==",
          },
        }
      );
      setCities(data);
    } catch (e) {
      console.log("API ERROR - SelectCity.js", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCities(formik.values?.country, formik.values?.state);
  }, [formik.values?.country, formik.values?.state]);

  return (
    <TextField
      variant="outlined"
      fullWidth
      id="city"
      name="city"
      label={i18n("select.city")}
      select
      // InputLabelProps={{ shrink: true }}
      size="small"
      // value={formik.values.city}
      // onChange={onChange}
      value={selectedCity}
      onChange={(e) => {
        setSelectedCity(e.target.value);
        setFieldValue("city", e.target.value)
      }}
      error={formik.touched.city && Boolean(formik.errors.city)}
      helperText={formik.touched.city && formik.errors.city}
      InputProps={{
        startAdornment: (
          <Loading size={18} isLoading={loading} style={{ width: "auto" }} />
        ),
      }}
      {...props}
    >
      {cities.length > 0 ? (
        cities.map((city) => (
          <MenuItem value={city.name} key={city.name}>
            {city.name}
          </MenuItem>
        ))
      ) : (
        <MenuItem>{i18n("select.noData")}</MenuItem>
      )}
    </TextField>
  );
};

SelectCity.propTypes = {
  formik: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  initialValue: PropTypes.string.isRequired,
};

export default SelectCity;
