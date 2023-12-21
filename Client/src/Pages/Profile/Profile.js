import { useEffect, useState } from "react";
import { useUserContext } from "../../Context/UserContext";
import "./Profile.css";
import axios from "../../Constant/axios";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [userData] = useUserContext();
  const [user, setUser] = useState([]);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  //importing global state from context
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  console.log(form.email);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.post("/users/id", {
        id: userData.user.id,
      });
      // console.log(request)
      setUser(request.data.data);
      return request;
    }
    fetchData();
  }, [userData.user]);
  //   console.log(user);

  return (
    <div className="profile  flex align-center justify-center">
      {user ? (
        <div className="profile__card flex-column align-center justify-center" key={user.user_id}>
          <img src="/avatar.png" alt="user avatar" />
          <div className="profile__info">
            <form>
              <p className="flex align-center">
                <span className="left">Email</span>{" "}
                <span className="right">
                  <input
                    className="input email"
                    name="email"
                    type="text"
                    value={user.user_email}
                    disabled
                    onChange={handleChange}
                  />
                  <EditIcon
                    className="edit_icon"
                  />
                </span>
              </p>
              <p className="flex align-center">
                <span className="left">Username</span>{" "}
                <span className="right">
                  <input
                    className="input username"
                    type="text"
                    name="username"
                    value={user.user_name}
                    onChange={handleChange}
                    disabled
                  />
                  <EditIcon
                    className="edit_icon"
                  />
                </span>
              </p>
              <p className="flex align-center">
                <span className="left">Fullname</span>{" "}
                <span className="right">
                  <input
                    className="input fullname"
                    name="fullname"
                    type="text"
                    value={`${user.first_name} ${user.last_name}`}
                    onChange={handleChange}
                    disabled
                  />
                  <EditIcon
                    className="edit_icon"
                  />
                </span>
              </p>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Profile;
