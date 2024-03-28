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
import { formatDistanceToNow } from 'date-fns';

export default function CategoryList() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategory = async () => {
    try {
      const res = await axiosInstance.get('/categories');
      setCategory(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="m-3">
      <Typography variant="h1" color="blue-gray" className="flex justify-center text-3xl w-auto uppercase underline text-white mb-4">Category List</Typography>
      <Typography variant="h1" color="blue-gray" className="flex justify-center text-3xl w-auto uppercase font-bold text-gray-400 mb-4">Total Categories: {category.length}</Typography>
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
          category.map(item => (
            <Card key={item.id} className="w-auto bg-gray-900 text-white mb-4" style={{ background: "#202120" }}>
              <ListItem className="flex items-center gap-4 sm:gap-8 md:gap-12">
                <ListItemPrefix>
                  {item.image ? (
                    <Avatar
                      variant="circular"
                      className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
                      alt={item.name}
                      src={item.image}
                    />
                  ) : (
                    <Avatar
                      variant="circular"
                      className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14"
                      alt={item.name}
                      src="./assets/placeholder.jpeg"
                    />
                  )}
                </ListItemPrefix>
                <div className="flex-grow">
                  <Typography variant="h6" color="blue-gray" className="text-left">
                    {item.name}
                  </Typography>
                </div>
                <div className="flex-grow">
                  <Typography variant="h6" color="blue-gray" className="text-center ">
                    Posted {formatDistanceToNow(new Date(item.creationAt), { addSuffix: true })}
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
