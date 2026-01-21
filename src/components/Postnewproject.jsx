import React, { useState } from "react";
import Card from "./ui/Card";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Button from "./ui/Button";
import { projectAPI } from "../utils/api";

const Postnewproject = (props) => {
  const [projectType, setProjectType] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requiredSkills: [],
    budget: "",
    duration: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");

  const availableSkills = [
    'Web Development',
    'App Development',
    'UI/UX Design',
    'Video Editing',
    'Content Writing',
    'Graphic Design',
    'Marketing',
    'Web Design',
    'Data Analysis',
    'SEO'
  ];

  // Get clientId from user object in localStorage
  const getClientId = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.profileId;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = () => {
    if (!selectedSkill) return;

    if (formData.requiredSkills.includes(selectedSkill)) {
      setError("This skill is already added");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setFormData(prev => ({
      ...prev,
      requiredSkills: [...prev.requiredSkills, selectedSkill]
    }));
    setSelectedSkill("");
    // Clear any previous errors
    if (error && error.includes("skill")) {
      setError("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validation
      if (!formData.title || !formData.description || formData.requiredSkills.length === 0 || !formData.duration || !projectType) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }

      if (projectType === "paid" && !formData.budget) {
        setError("Budget is required for paid projects");
        setLoading(false);
        return;
      }

      // Get clientId from props or localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const clientId = props.clientId || user.profileId;

      if (!clientId) {
        setError("Client ID not found. Please login again.");
        setLoading(false);
        return;
      }

      // Create project
      const projectData = {
        title: formData.title,
        description: formData.description,
        requiredSkills: formData.requiredSkills,
        projectType: projectType === "unpaid" ? "learning" : "paid",
        budget: projectType === "paid" ? parseFloat(formData.budget) : null,
        duration: formData.duration,
        clientId: clientId,
      };

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projectData)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to create project');
      }

      // Safely access matched freelancers
      const matchedCount = responseData.data?.matchedFreelancers?.length || 0;
      setSuccess(`Project created successfully! ${matchedCount} freelancer${matchedCount !== 1 ? 's' : ''} matched.`);

      // Reset form
      setFormData({
        title: "",
        description: "",
        requiredSkills: [],
        budget: "",
        duration: "",
      });
      setProjectType("");

      // Trigger refresh of projects and matched freelancers
      if (window.onProjectCreated) {
        window.onProjectCreated(responseData.data);
      }

      // Trigger project list refresh
      if (window.refreshProjects) {
        window.refreshProjects();
      }
    } catch (err) {
      setError(err.message || "Failed to create project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full" padding="lg" hover>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Post a New Project</h2>
          <p className="text-sm text-gray-600">Get matched with talented freelancers</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          <Input
            type="text"
            label="Project Title"
            placeholder="e.g., Build a modern website for my startup"
            required
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your project in detail..."
              rows="3"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Skills Needed <span className="text-red-500">*</span>
            </label>

            {/* Skill Selection Interface */}
            <div className="space-y-3">
              <div className="flex gap-2">
                <select
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                >
                  <option value="">Select a skill to add</option>
                  {availableSkills
                    .filter(skill => !formData.requiredSkills.includes(skill))
                    .map(skill => (
                      <option key={skill} value={skill}>
                        {skill}
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  onClick={handleAddSkill}
                  disabled={!selectedSkill}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>

              {/* Display Selected Skills */}
              {formData.requiredSkills.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-xs text-gray-600 font-medium">Selected Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.requiredSkills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-lg text-sm"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="text-blue-600 hover:text-blue-800 font-bold ml-1"
                          aria-label={`Remove ${skill}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">No skills selected yet. Add skills using the dropdown above.</p>
              )}
            </div>
          </div>

          <Input
            type="text"
            label="Duration"
            placeholder="e.g., 2 weeks, 1 month"
            required
            value={formData.duration}
            onChange={(e) => handleInputChange("duration", e.target.value)}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Project Type
            </label>
            <div className="space-y-3">
              <label className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${projectType === "unpaid"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                }`}>
                <input
                  type="radio"
                  name="projectType"
                  value="unpaid"
                  checked={projectType === "unpaid"}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Learning/Unpaid</div>
                  <div className="text-xs text-gray-500">Great for learning opportunities</div>
                </div>
              </label>

              <label className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${projectType === "paid"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                }`}>
                <input
                  type="radio"
                  name="projectType"
                  value="paid"
                  checked={projectType === "paid"}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <div className="ml-3 flex-1">
                  <div className="text-sm font-medium text-gray-900">Paid Project</div>
                  <div className="text-xs text-gray-500">Enter your budget below</div>
                </div>
              </label>
            </div>
          </div>

          {projectType === "paid" && (
            <div className="space-y-4 pt-2">
              <Input
                type="number"
                label="Budget"
                placeholder="e.g., 2500"
                className="w-full"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
              />
            </div>
          )}

          <Button
            variant="primary"
            size="lg"
            className="w-full mt-6"
            type="submit"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Project"}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default Postnewproject;
