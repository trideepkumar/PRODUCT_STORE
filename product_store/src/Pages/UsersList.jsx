import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
import axiosInstance from "../api/axiosInstance.jsx";
import { useEffect, useState } from "react";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get('/users');
      setUsers(res.data); 
      setLoading(false); 
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="m-3">

      <Typography variant="h1" color="blue-gray" className=" flex justify-center text-3xl  w-auto uppercase underline text-white mb-4">Users List</Typography>
      <Typography variant="h1" color="blue-gray" className="flex justify-center text-3xl  w-auto uppercase font-bold text-gray-400 mb-4">Total Users : {users.length}</Typography>
      <List>
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <Card key={index} className="w-auto rounded-lg bg-gray-900 text-white mb-4" style={{ background: "#202120" }}>
              <ListItem className="flex items-center gap-4 sm:gap-8 md:gap-12">
                <ListItemPrefix>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full bg-gray-500"></div>
                </ListItemPrefix>
                <div className="flex-grow">
                  <div className="h-4 w-32 bg-gray-500"></div>
                  <div className="h-4 w-56 bg-gray-500 mt-1"></div>
                </div>
                <div className="flex-grow">
                  <div className="h-4 w-56 bg-gray-500"></div>
                  <div className="h-4 w-80 bg-gray-500 mt-1"></div>
                </div>
              </ListItem>
            </Card>
          ))
        ) : (
          users.map(user => (
            <Card key={user.id} className="w-auto bg-gray-900 text-white mb-4" style={{ background: "#202120" }}>
              <ListItem className="flex items-center gap-4 sm:gap-8 md:gap-12">
                <ListItemPrefix>
                  {user.avatar  ? (
                    <Avatar
                      variant="circular"
                      className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
                      alt={user.name}
                      src={user.avatar}
                    />
                  ) : (
                    <Avatar
                      variant="circular"
                      className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
                      alt={user.name}
                      src="./assets/placeholder.jpeg"
                    />
                  )}
                </ListItemPrefix>
                <div className="flex-grow">
                  <Typography variant="h6" color="blue-gray" className="text-center sm:text-left">
                    {user.name}
                  </Typography>
                </div>
                <div className="flex-grow">
                  <Typography variant="h6" color="blue-gray" className="text-center sm:text-left">
                    {user.email}
                  </Typography>
                </div>
              </ListItem>
            </Card>
          ))
        )}
      </List>
    </div>
  );
}
