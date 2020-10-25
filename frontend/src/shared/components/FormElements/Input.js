import React, { useReducer,useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import {validate} from "../utils/validators";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};


const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initialValid || false,
    isTouched: false,
  });

  const {id,onInput}=props;
  const {value,isValid}=inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, onInput, value, isValid]);

  const useStyles = makeStyles((theme) => ({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "97.5%",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      rowsMax: "1",
      "& .MuiInput-underline:after": {
        borderBottomColor: `${!inputState.isValid ? "red" : "#056b72"}`,
      },
    },
  }));
    
  const changeHandler = (event) => {
      dispatch({
        type: "CHANGE",
        val: event.target.value,
        validators: props.validators,
      });
    };

    const touchHandler = () => {
      dispatch({
        type: "TOUCH",
      });
    };

  const classes = useStyles();

  const element =
    props.element === "input" ? (
      <TextField
        autoComplete="off"
        label={props.label}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        helperText={
          !inputState.isValid && inputState.isTouched && props.errorText
        }
        disabled={props.disabled}
        error={!inputState.isValid && inputState.isTouched ? true : false}
        className={classes.textField}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
        spellCheck="false"
        fullWidth
        InputLabelProps={{
          shrink: true,
          style: {
            fontSize: "110%",
            width: "100%",
            color: `${
              !inputState.isValid && inputState.isTouched ? "red" : "#056b72"
            }`,
          },
        }}
      />
    ) : (
      //   <textarea id={props.id} rows={props.rows || 3} />
      <TextField
        type={props.type}
        placeholder={props.placeholder}
        helperText={
          !inputState.isValid && inputState.isTouched && props.errorText
        }
        id={props.id}
        label={props.label}
        className={classes.textField}
        disabled={props.disabled}
        error={!inputState.isValid && inputState.isTouched ? true : false}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
        multiline
        autoComplete="off"
        spellCheck="false"
        fullWidth
        InputLabelProps={{
          shrink: true,
          style: {
            fontSize: "110%",
            width: "100%",
            color: `${
              !inputState.isValid && inputState.isTouched ? "red" : "#056b72"
            }`,
          },
        }}
      />
    );

  return <div>{element}</div>;
};

export default Input;
