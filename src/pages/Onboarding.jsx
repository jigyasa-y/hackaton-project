import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Onboarding = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    role: '',
    city: '',
    country: '',
    skills: [], // Array of {skillName, level}
    projectPreference: '',
    availabilityHours: '',
    projectLink: '',
    collegeEmail: ''
  });

  const [currentSkill, setCurrentSkill] = useState({ skillName: '', level: '' });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSkill = () => {
    if (currentSkill.skillName && currentSkill.level) {
      // Check if skill already exists
      const skillExists = formData.skills.some(
        s => s.skillName.toLowerCase() === currentSkill.skillName.toLowerCase()
      );
      
      if (!skillExists) {
        setFormData(prev => ({
          ...prev,
          skills: [...prev.skills, { ...currentSkill }]
        }));
        setCurrentSkill({ skillName: '', level: '' });
      } else {
        alert('This skill is already added');
      }
    }
  };

  const handleRemoveSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleNext = () => {
    if (formData.skills.length === 0) {
      alert('Please add at least one skill');
      return;
    }
    // Save data to localStorage as backup
    localStorage.setItem('freelancerOnboardingData', JSON.stringify(formData));
    // Navigate to review page with form data
    navigate('/freelancerreview', { state: { formData } });
  };

  return (
    <>
    <div className="flex flex-col justify-center items-center bg-white gap-12 min-h-screen py-8">
      <h1 className="text-5xl mt-8">Onboarding</h1>
      <div className="flex flex-col p-10 rounded gap-8 max-w-2xl w-full">
      
        <div className="flex flex-col justify-center items-center gap-12 p-4 bg-blue-300 rounded-xl">
          <h2 className="text-2xl text-center">Personal Details</h2>
          <input 
            type="text" 
            name="name"
            placeholder="Name"  
            className="w-full p-3 text-xl rounded bg-white"
            value={formData.name}
            onChange={handleInputChange}
          />

          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            className="w-full p-3 text-xl rounded bg-white"
            value={formData.email}
            onChange={handleInputChange}
          />
          
          <input 
            type="tel" 
            name="contact"
            placeholder="Contact"  
            className="w-full p-3 text-xl rounded bg-white"
            value={formData.contact}
            onChange={handleInputChange}
          />

          <div className="relative w-full">
            <select
              className="w-full p-3 rounded-lg bg-white"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="student">Student</option>
              <option value="beginner">Beginner Freelancer</option>
            </select>
          </div>

          <input 
            type="text" 
            name="city"
            placeholder="City" 
            className="w-full p-3 text-xl rounded bg-white"
            value={formData.city}
            onChange={handleInputChange}
          />
          
          <input 
            type="text" 
            name="country"
            placeholder="Country" 
            className="w-full p-3 text-xl rounded bg-white"
            value={formData.country}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-12 p-4 bg-blue-300 rounded-xl">
          <h1 className="text-2xl">Skill Selection</h1>
          
          {/* Add Skill Section */}
          <div className="w-full space-y-4">
            <div className="flex gap-3">
              <select
                className="flex-1 p-3 rounded-lg text-gray-700 bg-white"
                value={currentSkill.skillName}
                onChange={(e) => setCurrentSkill(prev => ({ ...prev, skillName: e.target.value }))}
              >
                <option value="" disabled>
                  Select a skill
                </option>
                {availableSkills.map(skill => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>

              <select
                className="w-48 p-3 rounded-lg bg-white"
                value={currentSkill.level}
                onChange={(e) => setCurrentSkill(prev => ({ ...prev, level: e.target.value }))}
              >
                <option value="" disabled>
                  Experience Level
                </option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
              </select>

              <button
                type="button"
                onClick={handleAddSkill}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Add
              </button>
            </div>

            {/* Display Added Skills */}
            {formData.skills.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Your Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-300"
                    >
                      <span className="text-sm font-medium">{skill.skillName}</span>
                      <span className="text-xs text-gray-500">({skill.level})</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(index)}
                        className="text-red-500 hover:text-red-700 ml-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <select 
            className="w-full p-3 rounded-lg bg-white" 
            name="projectPreference"
            value={formData.projectPreference}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Project preference
            </option>
            <option value="paid">Paid Projects</option>
            <option value="learning">Learning (Unpaid) Projects</option>
            <option value="both">Both</option>
          </select>

          <select 
            className="w-full p-3 rounded-lg bg-white"
            name="availabilityHours"
            value={formData.availabilityHours}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select availability (hours per week)
            </option>
            <option value="5">5 hours/week</option>
            <option value="10">10 hours/week</option>
            <option value="15">15 hours/week</option>
            <option value="20">20 hours/week</option>
            <option value="30">30+ hours/week</option>
          </select>
        </div>

        <div className="flex flex-col justify-center items-center gap-12 p-4 bg-blue-300 rounded-xl">
          <input 
            type="text" 
            name="projectLink"
            placeholder="Enter project link (optional)" 
            className="w-full p-3 text-xl rounded bg-white"
            value={formData.projectLink}
            onChange={handleInputChange}
          />
          
          <a href="#" className="w-20 h-8 bg-white text-center rounded p-2">Skill test</a>
          
          <input 
            type="email" 
            name="collegeEmail"
            placeholder="College email (optional)" 
            className="w-full p-3 text-xl rounded bg-white"
            value={formData.collegeEmail}
            onChange={handleInputChange}
          />
        </div>
      </div>
      
      <button 
        type="button" 
        onClick={handleNext}
        className="bg-blue-500 text-center p-3 w-40 text-xl mt-5 rounded-2xl hover:bg-gray-700 text-white"
      >
        Next
      </button>
    </div>
    </>
  );
};

export default Onboarding;
