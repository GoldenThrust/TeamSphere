import React from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { sendMeet } from "../../utils/request";
import { useNavigate } from "react-router-dom";
import { v1 as uuid } from "uuid";
import { useEffect } from "react";
import { useAuth } from "../../context/useContext";

function MeetMe() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, errors } = useForm();


  useEffect(() => {
    if (!auth?.isLoggedIn) {
      return navigate("/login");
    }
  });
  const onSubmit = async (data) => {
    const { emails } = data;

    try {
      const id = uuid();
      
      toast.loading("Sending mail", { id: "mail" });
      await sendMeet(emails, id);
      toast.success("mail sent", { id: "mail" });
      navigate(`/room/${id}`);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <div>
      <h2>Send Meet me</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="emails">Email Address(es):</label>
        <input
          type="text"
          id="emails"
          name="emails"
          ref={register({ required: true })}
          placeholder="Enter Email Address(es) separated by comma"
        />
        {errors.emails && <span>This field is required</span>}

        <input type="submit" value="Generate HTML" />
      </form>
    </div>
  );
}

export default MeetMe;
