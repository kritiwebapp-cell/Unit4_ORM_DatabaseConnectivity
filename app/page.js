
"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  // POST: Add employee
  async function addEmployee(e) {
    e.preventDefault();

    const res = await fetch("/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        department,
        salary: Number(salary),
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Employee added successfully!");

      setName("");
      setEmail("");
      setDepartment("");
      setSalary("");
    } else {
      alert(data.message);
    }
  }

  return (
    <main>
      <h1>Employee Management System</h1>

      <h2>Add Employee</h2>

      <form onSubmit={addEmployee}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />

        <button type="submit">Add Employee</button>
      </form>
    </main>
  );
}
