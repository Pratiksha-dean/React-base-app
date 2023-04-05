import React from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  sidebarClasses,
} from "react-pro-sidebar";
import { NavLink } from "react-router-dom";

export default function SidebarComponent() {
  return (
    <Sidebar>
      <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            // only apply styles on first level elements of the tree
            if (level === 0)
              return {
                color: disabled ? "#f5d9ff" : "#000000",
                backgroundColor: active ? "black" : undefined,
              };
          },
        }}
      >
        <MenuItem>
          <NavLink to="/dasboard">Dashboard</NavLink>{" "}
        </MenuItem>
        <MenuItem> Users</MenuItem>
        <MenuItem> Information</MenuItem>
      </Menu>
    </Sidebar>
  );
}
