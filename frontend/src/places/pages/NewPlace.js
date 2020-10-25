import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/utils/validators";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/components/hooks/form-hooks";
import "./PlaceForm.css";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import { AuthContext } from "../../shared/components/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { uploadImage } from "../../firebase/config";

const NewPlace = () => {
  const [uploading, setUploading] = useState(false);

  const uploadingFile = async (imageFile) => {
    setUploading(true);
    const url = await uploadImage(imageFile);
    setUploading(false);
    console.log(url);
    return url;
  };
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );
  const history = useHistory();
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      // when using multer to send formdata to backend
      // const formData = new FormData();
      // formData.append("title", formState.inputs.title.value);
      // formData.append("description", formState.inputs.description.value);
      // formData.append("address", formState.inputs.address.value);
      // formData.append("image", formState.inputs.image.value);

      //when using firebase to send direct link
      const newFormData = JSON.stringify({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
        address: formState.inputs.address.value,
        image: await uploadingFile(formState.inputs.image.value),
      });

      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/api/places",
        "POST",
        newFormData,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={submitHandler}>
        {isLoading || uploading ? <LoadingSpinner asOverlay />:null}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          placeholder="Enter the Title"
          errorText="Please Enter Valid Title"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          placeholder="Enter the Description"
          errorText="Please Enter Valid Description (at least 5 characters)."
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          placeholder="Enter the Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Address."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText={"Please Provide an Image"}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add Place
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
