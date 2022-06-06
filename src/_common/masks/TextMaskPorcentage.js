import React from "react";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";

const char = "\u2000";

function TextMaskPorcentage({ inputRef, ...other }) {
  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      placeholderChar={char}
      mask={[/[0-9]/, /\d/, /\d/, "%"]}
    />
  );
}

TextMaskPorcentage.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export default TextMaskPorcentage;
