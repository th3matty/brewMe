import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/sidebar/sidebar";


export default function Dashboard() {

  return (
    <div>
      <Header displayName="brewer" />
      <p>Hello from Dashboard</p>
      <Sidebar />
    </div>
  );
}
