import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import { getUserList } from "./api/request";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const styles = {
    width: "100%",
  };

  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    const resp = await getUserList();
    const users = resp.data.data;
    setUsers(users);
  };

  return (
    <Layout>
      <div style={styles}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, i) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{i + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.year}</td>
                  <td>{item.color}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Dashboard;

// Dashboard.getInitialProps = async (context) => {
//   const resp = await getUserList();
//   const users = resp.data.data;

//   return { users: users };
// };
