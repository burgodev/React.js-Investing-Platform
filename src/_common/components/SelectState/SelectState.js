import React, { useState, useEffect } from "react";
import { MenuItem } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import axios from "axios";
import { Loading, TextField } from "../";
import { useFormikContext } from "formik";

const SelectState = ({ formik, onChange, initialValue, ...props }) => {
  const i18n = useTranslation().t;
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const { setFieldValue } = useFormikContext();


  useEffect(() => {
    getStatesByCountryCode(formik.values?.country);
  }, [formik.values?.country]);

  useEffect(() => {
    setSelectedState(initialValue)
  }, [initialValue]);

  const getStatesByCountryCode = async (selectedState) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://api.countrystatecity.in/v1/countries/${selectedState}/states`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "WmkyZzdPWlhNTTB4dkdvRzl1Y0Z4UVZxa2FXdGs0WlNhakg1bUR3WQ==",
          },
        }
      );
      setStates(data);
    } catch (e) {
      console.log("API ERROR - SelectState.js", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TextField
      variant="outlined"
      fullWidth
      id="state"
      name="state"
      label={i18n("select.state")}
      select
      // InputLabelProps={{ shrink: true }}
      size="small"
      // value={formik.values.state}
      // onChange={onChange}
      value={selectedState}
      onChange={(e) => {
        setSelectedState(e.target.value);
        setFieldValue("state", e.target.value)
      }}
      error={formik.touched.state && Boolean(formik.errors.state)}
      helperText={formik.touched.state && formik.errors.state}
      InputProps={{
        startAdornment: (
          <Loading size={18} isLoading={loading} style={{ width: "auto" }} />
        ),
      }}
      {...props}
    >
      {
        states.length > 0 ? (
          states.map((state) => (
            <MenuItem value={state.iso2} key={state.iso2}>
              {state.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem>{i18n("select.noData")}</MenuItem>
        )
      }
    </TextField >
  );
};

SelectState.propTypes = {
  formik: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  initialValue: PropTypes.string.isRequired,
};

export default SelectState;
