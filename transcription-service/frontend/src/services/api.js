import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  },
  timeout: 30000, // 30 second timeout
});

export const transcriptionAPI = {
  // Upload audio file for transcription
  uploadFile: async (file, options = {}) => {
    const formData = new FormData();
    formData.append('file', file);
    
    // Add optional parameters
    if (options.model) {
      formData.append('model', options.model);
    }
    if (options.set_list) {
      formData.append('set_list', options.set_list);
    }
    if (options.custom_prompt) {
      formData.append('custom_prompt', options.custom_prompt);
    }
    
    console.log('FRONTEND: Making API request to /v1/transcripts');
    console.log('FRONTEND: FormData contents:', {
      file: file.name,
      model: options.model,
      set_list: options.set_list?.substring(0, 100) + '...',
      custom_prompt: options.custom_prompt?.substring(0, 100) + '...'
    });
    
    try {
      const response = await api.post('/v1/transcripts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('FRONTEND: Upload successful!', response.data);
      return response.data;
    } catch (error) {
      console.error('FRONTEND: Upload failed:', error.response?.data || error.message);
      
      // Provide more helpful error messages
      if (error.code === 'ECONNABORTED') {
        throw new Error('Upload timeout - please try a smaller file or check your connection');
      } else if (error.response?.status === 413) {
        throw new Error('File too large - please use a file smaller than 25MB');
      } else if (error.response?.status === 415) {
        throw new Error('Unsupported file type - please use MP3, WAV, M4A, FLAC, MP4, or WebM');
      } else if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      } else {
        throw new Error(`Upload failed: ${error.message}`);
      }
    }
  },

  // Get job status
  getJobStatus: async (jobId) => {
    const response = await api.get(`/v1/transcripts/${jobId}`);
    return response.data;
  },

  // List all jobs (for development)
  listJobs: async () => {
    const response = await api.get('/v1/jobs');
    return response.data;
  },

  // Run Gemini analysis on existing transcript
  runGeminiAnalysis: async (jobId, setList = '', customPrompt = '') => {
    console.log('FRONTEND: Running Gemini analysis for job:', jobId);
    try {
      const formData = new FormData();
      formData.append('job_id', jobId);
      formData.append('set_list', setList);
      formData.append('custom_prompt', customPrompt);

      const response = await api.post('/v1/gemini-analysis', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('FRONTEND: Gemini analysis successful!', response.data);
      return response.data;
    } catch (error) {
      console.error('FRONTEND: Gemini analysis failed:', error.message);
      console.error('   Error details:', error.response?.data || error);
      
      // Provide more helpful error messages
      if (error.code === 'ECONNABORTED') {
        throw new Error('Analysis timeout - the analysis is taking too long, please try again');
      } else if (error.response?.status === 400) {
        throw new Error(error.response.data.detail || 'Invalid request - please check your input');
      } else if (error.response?.status === 500) {
        throw new Error('Analysis service error - please try again later');
      } else if (error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      } else {
        throw new Error(`Analysis failed: ${error.message}`);
      }
    }
  },

  // Health check
  healthCheck: async () => {
    console.log('FRONTEND: Attempting to connect to backend at', API_BASE);
    try {
      const response = await api.get('/health');
      console.log('FRONTEND: Backend connection successful!', response.data);
      return response.data;
    } catch (error) {
      console.error('FRONTEND: Backend connection failed:', error.message);
      console.error('   Error details:', error.response?.data || error);
      throw error;
    }
  },
};

export default transcriptionAPI;