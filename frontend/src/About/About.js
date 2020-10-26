import React from "react";
import Card from "../shared/components/UIElements/Card";
import "./About.css";

const About = (props) => {
  return (
    <div className="center">
      <Card className="about-card ">
        <h1 className="about-title">Project Overview</h1>
        <div className="about-info">
          <h3>⭐ What this Project is about.</h3>
          <p>
            It is a Featured MERN Project to Share Places you Visited around the
            world with Geocoding ( You enter the address and coordinates will be
            automatically generated ), and Map Rendering is done by Google."
          </p>
          <br />
          <h3>⭐ What you can do in this Application.</h3>
          <p>
            1) Without signing In you can view other people's added Places on
            map, but you can't add place without signing in.
            <br /> <br />
            2) During signing Up, You have to provide a image as your dp. after
            making an account you can Sign-In and add Place of your own which
            will be shown in your 'My Place' page. ( providing an image while
            adding place is also compulsory, images are advised to be of minimum
            size as possible )
            <br /> <br />
            3)You can edit title and description of your added place, not the
            address. Not to mention option to delete a place is also given.
          </p>
          <br />
          <h3>⭐ What are the Technologies Used.</h3>
          <p>
            1) React (Frontend) <br />
            2) Node and Express (Backend) <br />
            3) MongoDB (Database)
            <br />
            4) Firebase (Image-upload only)
            <br />
            <br />
            [Note: Initially image were uploaded on server in Heroku, but as
            Heroku restarts it's dyno after every 30 minutes in free
            service...Uploaded Image were getting lost, so I moved the image
            uploading to Firebase bucket.]
            <br />
            <br />
          </p>
          <h3>⭐ Notable Features in Project.</h3>
          <p>
            <h4> 1) Geocoding</h4>When user enter address of a place for eg."Tah
            mahal, India", through Geocoding coordinates will be generated
            automatically and saved in the Database, to be later used in map
            rendering. <br />
            [Note: Geocoding is done by Esri Maps which provides as accurate
            results as Google Geocoding]
            <br />
            <h4>2) Map Rendering </h4> Map Rendering is done by Google, although
            you'll se a black overlay because Google needs a billing account to
            render maps like it usually does. Nonetheless coordinates will be
            shown without any issues.
            <br />
            <h4> 3) UI Elements and Security</h4>This Project uses Material UI
            Elements, it is also completly mobile friendly. It's form has basic
            validation, and User Authentication Feature is also there. <br />
          </p>
        </div>
      </Card>
    </div>
  );
};

export default About;
