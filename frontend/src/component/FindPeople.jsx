import React, { useEffect, useState } from "react";
import auth from "./../auth/auth-help";
import jwt1 from "jwt-decode";
import { findPeoplee } from "../api/api-post";
import { follow } from "../api/api-post";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const FindPeople = () => {
  const nav = useNavigate();
  const [values, setValues] = useState({
    users: [],
    open: false,
    followMessage: "ERROR",
  });

  const jwt = auth.isAuthenticated();
  const user1 = jwt1(jwt.token);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    findPeoplee(
      {
        userId: user1.id,
      },
      {
        t: jwt.token,
      },
      signal
    ).then((data) => {
      if (data) setValues({ ...values, users: data });
    });

    return () => {
      // Cleanup function to abort fetch request
      abortController.abort();
    };
  }, []);

  const clickFollow = (user, index) => {
    const jwt = auth.isAuthenticated();
    const user1 = jwt1(jwt.token);

    follow(
      {
        userId: user1.id,
      },
      {
        t: jwt.token,
      },
      user._id
    ).then((data) => {
      let toFollow = values.users.slice(); // Create a copy of the users array
      toFollow.splice(index, 1);

      setValues({
        ...values,
        users: toFollow,
        open: true,
        followMessage: `Following ${user.name}!`,
      });
      toast.success(`Following ${user.name}!`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    });
  };

  return (
    <>
      <div className="right col-lg-4 d-lg-block d-sm-none d-none border rounded border-info border_radius d-flex flex-column  p-3 mt-3 white border mt-5 ">
        <div>
          <p className="fw-bold fs-5">Suggestions for you</p>
        </div>
        <hr />
        <div className="max_height overflow-auto">
          {values.users.map((user2, idx) => (
            <div className="d-flex align-items-center p-2  mb-3" key={idx}>
              <div>
                <img
                  src="images/user (3).png"
                  alt="profile"
                  style={{ width: 50, height: 50 }}
                  className="me-3"
                />
              </div>
              <h6
                onClick={() => {
                  nav("/user/" + user2._id);
                }}
                className=" fw-bold"
              >
                {user2.name}
              </h6>
              <i
                onClick={() => {
                  clickFollow(user2, idx);
                }}
                className="fa-solid fa-user-plus ms-auto fs-4"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FindPeople;
