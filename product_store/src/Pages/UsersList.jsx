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
import { format } from 'date-fns';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of users per page

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/users");
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="m-3">
      <Typography
        variant="h1"
        color="blue-gray"
        className=" flex justify-center text-3xl  w-auto uppercase underline text-white mb-4"
      >
        Users List
      </Typography>
      <Typography
        variant="h1"
        color="blue-gray"
        className="flex justify-center text-3xl  w-auto uppercase font-bold text-gray-400 mb-4"
      >
        Total Users : {users.length}
      </Typography>
      <List>
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <Card
                key={index}
                className="w-auto rounded-lg bg-gray-900 text-white mb-4"
                style={{ background: "#202120" }}
              >
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
          : currentUsers.map((user) => (
              <Card
                key={user.id}
                className="w-auto sm:w-full bg-gray-900 text-white mb-4"
                style={{ background: "#202120" }}
              >
                <ListItem className="flex flex-wrap text-start items-left gap-4 sm:gap-8 md:gap-12">
                  <ListItemPrefix>
                    {user.avatar ? (
                      <Avatar
                        variant="circular"
                        className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
                        alt={user.avatar}
                        src={user.avatar}
                      />
                    ) : (
                      <Avatar
                        variant="circular"
                        className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
                        alt={user.avatar}
                        src="./assets/placeholder.jpeg"
                      />
                    )}
                  </ListItemPrefix>

                  <div className="flex-grow w-full text-start sm:w-auto">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="text-center sm:text-left"
                    >
                      {user.name}
                    </Typography>
                  </div>
                  <div className="flex-grow text-start w-full sm:w-auto lg:text-center">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="text-center sm:text-left"
                    >
                      {user.email}
                    </Typography>
                  </div>
                  <div className="flex-grow text-center w-full sm:w-auto ">
                    <Typography variant="h6" color="blue-gray">
                      {user.role}
                    </Typography>
                  </div>
                  <div className="flex-grow">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="text-center "
                    >
                       {format(new Date(user.creationAt), "dd MMMM yyyy")}
                    </Typography>
                  </div>
                  <div className="flex-grow">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="text-center "
                    >
                       Updated at {format(new Date(user.creationAt), "dd MMMM yyyy")}
                    </Typography>
                  </div>
                </ListItem>
              </Card>
            ))}
      </List>
      {/* Pagination */}
      <div className="flex justify-center mt-4 ">
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className= " border border-gray-500 hover:border-white text-white font-bold py-2 px-4 mx-1 rounded">
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
