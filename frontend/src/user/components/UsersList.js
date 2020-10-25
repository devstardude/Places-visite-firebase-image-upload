import React from "react";

import  './UsersList.css';

import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";

const UsersList = (props) => {
  let userList;
  if (props.items.length === 0) {
    userList = (
      <div className="center">
        <Card>
          <h2>No Users Found.</h2>
        </Card>
      </div>
    );
  } else {
    userList = (
      <ul className="users-list">
        {props.items.map((user) => (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            placeCount={user.places.length}
          />
        ))}
      </ul>
    );
  }
  return userList ;
};

export default UsersList;
