// API Base URL - adjust based on your backend setup
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI(endpoint, options = {}) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    });

    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      // If response is not JSON, throw with response text
      const text = await response.text();
      throw new Error(`Invalid JSON response: ${text.substring(0, 100)}`);
    }

    if (!response.ok) {
      const errorMessage = data.message || data.error || `API request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('API Error:', {
      endpoint,
      message: error.message,
      ...(error.response && { status: error.response.status })
    });
    throw error;
  }
}

// ==================== PROJECT API ====================

export const projectAPI = {
  // Create a new project
  create: async (projectData) => {
    return fetchAPI('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  },

  // Get all projects (with optional filters)
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return fetchAPI(`/projects${queryParams ? `?${queryParams}` : ''}`);
  },

  // Get single project by ID
  getById: async (projectId) => {
    return fetchAPI(`/projects/${projectId}`);
  },

  // Get matched freelancers for a project
  getMatchedFreelancers: async (projectId) => {
    return fetchAPI(`/projects/${projectId}/matched-freelancers`);
  },

  // Update project status
  updateStatus: async (projectId, status) => {
    return fetchAPI(`/projects/${projectId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  // Assign freelancer to project
  assignFreelancer: async (projectId, freelancerId) => {
    return fetchAPI(`/projects/${projectId}/assign`, {
      method: 'PATCH',
      body: JSON.stringify({ freelancerId }),
    });
  },
};

// ==================== FREELANCER API ====================

export const freelancerAPI = {
  // Create a new freelancer
  create: async (freelancerData) => {
    return fetchAPI('/freelancers', {
      method: 'POST',
      body: JSON.stringify(freelancerData),
    });
  },

  // Get all freelancers (with optional filters)
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return fetchAPI(`/freelancers${queryParams ? `?${queryParams}` : ''}`);
  },

  // Get single freelancer by ID
  getById: async (freelancerId) => {
    return fetchAPI(`/freelancers/${freelancerId}`);
  },

  // Get suggested projects for a freelancer
  getSuggestedProjects: async (freelancerId) => {
    return fetchAPI(`/freelancers/${freelancerId}/suggested-projects`);
  },

  // Update freelancer
  update: async (freelancerId, updateData) => {
    return fetchAPI(`/freelancers/${freelancerId}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData),
    });
  },
};

// ==================== CLIENT API ====================

export const clientAPI = {
  // Create a new client
  create: async (clientData) => {
    return fetchAPI('/clients', {
      method: 'POST',
      body: JSON.stringify(clientData),
    });
  },

  // Get all clients
  getAll: async () => {
    return fetchAPI('/clients');
  },

  // Get single client by ID
  getById: async (clientId) => {
    return fetchAPI(`/clients/${clientId}`);
  },
};

