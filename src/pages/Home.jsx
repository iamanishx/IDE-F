import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../api/axiosConfig";
import { FaPlus, FaSearch } from "react-icons/fa";
import "./Home.css";



const Home = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    url: "",
    description: "",
    language: "",
    visibility: "public",
  });
 // Fetch projects from backend
useEffect(() => {
    
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects"); // Use the Axios instance
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  // Add a new project
  const handleAddProject = async () => {

    try {
      const response = await api.post("/projects", newProject);
      setProjects([...projects, response.data]);
      setNewProject({ name: "", url: "", description: "" });
      setShowModal(false);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  // Delete a project
  const handleDeleteProject = async (id) => {
    try {
      await api.delete(`/projects/${id}`); // Use the Axios instance
      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Search and sort projects
  const filteredProjects = projects
    .filter((project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {

      if (sortOption === "name") return a.name.localeCompare(b.name);
      if (sortOption === "date") return new Date(b.updatedAt) - new Date(a.updatedAt);
      return 0;
    });

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="home-search-bar">
          <FaSearch className="xd" />
          <input
            type="text"
            placeholder="Search Projects"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="mb">
          <select
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
            className="home-sort-select"
            onClick={() => {
              if (sortOption === "") setSortOption("name");
            }}
          >
            {sortOption === "" && (
              <option value="" disabled>
                Sort By
              </option>
            )}
            <option value="name">Name</option>
            <option value="date">Last Updated</option>
          </select>

          <button onClick={() => setShowModal(true)} className="home-add-btn">
            <FaPlus /> Add New
          </button>
        </div>
      </header>

      <main>
        <div className="home-project-list">
          {filteredProjects.map((project) => (
            <div key={project.id} className="home-project-card">
              <h2 className="project-name">{project.name}</h2>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">
                {project.url}
              </a>
              <p className="project-description">{project.description}</p>
              <button
                onClick={() => handleDeleteProject(project.id)}
                className="home-delete-btn"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </main>

      {showModal && (
        <div className="home-modal">
          <div className="modal-content">


            {/* Project Name */}
            <input
              type="text"
              placeholder="Project Name"
              value={newProject.name}
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
              className="modal-input"
            />

            {/* Programming Language */}
            <input
              type="text"
              placeholder="Programming Language (e.g., JavaScript, Python)"
              value={newProject.language}
              onChange={(e) =>
                setNewProject({ ...newProject, language: e.target.value })
              }
              className="modal-input"
            />

            {/* Project Description */}
            <textarea
              placeholder="Project Description (Optional)"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              className="modal-textarea"
            ></textarea>

            {/* Visibility */}
            <select
              value={newProject.visibility}
              onChange={(e) =>
                setNewProject({ ...newProject, visibility: e.target.value })
              }
              className="modal-select"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>

            {/* Actions */}
            <div className="modal-actions">
              <button onClick={handleAddProject} className="modal-save-btn">
                Save
              </button>
              <button
                onClick={() => {
                  setNewProject({
                    name: "",
                    url: "",
                    description: "",
                    language: "",
                    visibility: "public",
                  });
                  setShowModal(false);
                }}
                className="modal-cancel-btn"
              >
                Cancel
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
