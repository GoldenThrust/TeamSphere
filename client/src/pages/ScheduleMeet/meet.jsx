import React from "react";
import { toast } from "react-hot-toast";
import { sendMeet } from "../../utils/request";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { v1 as uuid } from "uuid";
import { useAuth } from "../../context/useContext";
function MeetMe() {
  const auth = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!auth?.isLoggedIn) {
    return navigate("/login");
  }

  const onSubmit = (data) => {
    console.log(data);
    const { email } = data;

    try {
      const id = uuid();

      toast.loading("Sending mail", { id: "mail" });
      sendMeet(email, id);
      toast.success("mail sent", { id: "mail" });
      navigate(`/room/${id}`);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <>
    <header style={{ padding: "20px"}}>
      <div>
        <Link to={"/"}>
          <img src="/TeamSphere.svg" alt="TeamSphere Logo" />
        </Link>
      </div>
    </header>
    <div className="center w-100">
      <h2 style={{ textAlign: "center" }}>Meet me</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="FormDesign">
        <label>
          Email Address(es): <br />
          <input
            {...register("email")}
            required
            type="text"
            placeholder="Enter Email Address(es) separated by comma"
          />
        </label>
        {errors.email && <p>Email is required</p>}
        <input type="submit" value="Send Meet" className="button" />
      </form>
    </div>
    </>
  );
}

export default MeetMe;
