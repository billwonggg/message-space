import { useState } from "react";
import { List, ListItemText, IconButton, Popover, ListItem } from "@mui/material";
import { Avatar, ListItemAvatar, Typography } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PersonIcon from "@mui/icons-material/Person";

const ChatUsersList = ({ getUsersList, usersList }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    getUsersList();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <IconButton onClick={handleClick} aria-describedby={id}>
        <FormatListBulletedIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        onClose={handleClose}
        timeout="auto"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Typography sx={{ pt: 2, pl: 2, fontWeight: 600, fontSize: { xs: "16px", md: "20px" } }}>
          Members - {usersList.length}
        </Typography>
        <List sx={{ minWidth: { xs: "180px", md: "250px" } }}>
          {usersList.map((user, i) => (
            <ListItem key={i}>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user} />
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
};

export default ChatUsersList;
