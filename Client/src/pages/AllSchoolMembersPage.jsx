import { useEffect, useState } from "react";
import { getAllStudentsAndTeachers } from "../services/api";

export default function AllSchoolMembersPage() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    try {
      setError("");
      const data = await getAllStudentsAndTeachers();
      setMembers(data);
      setFilteredMembers(data);
    } catch (err) {
      setError(err.message || "Failed to load members.");
    }
  }

  function handleSearch(e) {
    e.preventDefault();

    if (!searchId.trim()) {
      setFilteredMembers(members);
      setError("");
      return;
    }

    const filtered = members.filter(
      (member) => member.id_number === searchId.trim()
    );

    setFilteredMembers(filtered);

    if (filtered.length === 0) {
      setError("No member found with this ID number.");
    } else {
      setError("");
    }
  }

  function handleClear() {
    setSearchId("");
    setError("");
    setFilteredMembers(members);
  }

  return (
    <div className="page page-md">
      <h1 className="page-title">All School Members</h1>

      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search by ID number"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="input search-input"
        />

        <button type="submit" className="btn btn-primary">
          Search
        </button>

        <button type="button" className="btn btn-secondary" onClick={handleClear}>
          Clear
        </button>
      </form>

      {error && <p className="text-error">{error}</p>}

      <div className="table-card">
        <table className="table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>ID Number</th>
              <th>Class Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member, index) => (
              <tr key={index}>
                <td>{member.full_name}</td>
                <td>{member.id_number}</td>
                <td>{member.class_name}</td>
                <td>{member.type}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredMembers.length === 0 && !error && <p>No school members found.</p>}
      </div>
    </div>
  );
}