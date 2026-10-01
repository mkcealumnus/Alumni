export const SERVER_HOST = typeof window !== 'undefined'
  ? `http://${window.location.hostname}:5000`
  : 'http://localhost:5000';

const API_BASE = `${SERVER_HOST}/api`;

export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${SERVER_HOST}${path.startsWith('/') ? '' : '/'}${path}`;
};

// ──────────────── TOKEN MANAGEMENT ────────────────
export const getToken = () => localStorage.getItem('nextstep_token');
export const setToken = (token) => localStorage.setItem('nextstep_token', token);
export const removeToken = () => localStorage.removeItem('nextstep_token');

export const getUser = () => {
  try {
    const user = localStorage.getItem('nextstep_user');
    return user ? JSON.parse(user) : null;
  } catch {
    localStorage.removeItem('nextstep_user');
    return null;
  }
};
export const setUser = (user) => localStorage.setItem('nextstep_user', JSON.stringify(user));
export const removeUser = () => localStorage.removeItem('nextstep_user');

export const logout = () => {
  removeToken();
  removeUser();
  window.location.href = '/auth';
};

export const isAuthenticated = () => !!getToken();

// ──────────────── API HELPER ────────────────
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers
  };

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });

    const json = await response.json();

    if (response.status === 401) {
      logout();
      return json;
    }

    // Unwrap the `data` wrapper: spread data properties to top-level
    // so frontend can read e.g. res.students, res.stats directly
    if (json.success && json.data !== undefined) {
      // If data is an object (not array), spread its keys to top level
      if (json.data && typeof json.data === 'object' && !Array.isArray(json.data)) {
        return { success: true, message: json.message, ...json.data };
      }
      // If data is an array or primitive, keep as-is but also add as 'data'
      return { success: true, message: json.message, data: json.data };
    }

    return json;
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, message: 'Network error. Please check your connection.' };
  }
};

// ──────────────── AUTH API ────────────────
export const authApi = {
  login: (body) => apiCall('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  register: (body) => apiCall('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  forgotPassword: (body) => apiCall('/auth/forgot-password', { method: 'POST', body: JSON.stringify(body) }),
  verifyOtp: (body) => apiCall('/auth/verify-otp', { method: 'POST', body: JSON.stringify(body) }),
  resetPassword: (body) => apiCall('/auth/reset-password', { method: 'POST', body: JSON.stringify(body) }),
  getMe: () => apiCall('/auth/me'),
  refreshToken: () => apiCall('/auth/refresh-token', { method: 'POST' }),
  updateProfile: (body) => apiCall('/auth/profile', { method: 'PUT', body: JSON.stringify(body) }),
  changePassword: (body) => apiCall('/auth/change-password', { method: 'PUT', body: JSON.stringify(body) }),
  uploadProfileImage: async (file, rollNumber) => {
    const token = getToken();
    const formData = new FormData();
    formData.append('profileImage', file);
    if (rollNumber) formData.append('rollNumber', rollNumber);
    try {
      const res = await fetch(`${API_BASE}/auth/upload-profile`, {
        method: 'POST',
        body: formData,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const json = await res.json();
      if (json.success && json.data) return { success: true, ...json.data };
      return json;
    } catch (error) {
      return { success: false, message: 'Upload failed.' };
    }
  },
};

// ──────────────── ADMIN API ────────────────
export const adminApi = {
  getDashboard: () => apiCall('/admin/dashboard'),
  // Students
  getStudents: (params = '') => apiCall(`/admin/students${params ? '?' + params : ''}`),
  getStudent: (id) => apiCall(`/admin/students/${id}`),
  createStudent: (body) => apiCall('/admin/students', { method: 'POST', body: JSON.stringify(body) }),
  updateStudent: (id, body) => apiCall(`/admin/students/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteStudent: (id) => apiCall(`/admin/students/${id}`, { method: 'DELETE' }),
  // Alumnis
  getAlumnis: (params = '') => apiCall(`/admin/alumnis${params ? '?' + params : ''}`),
  getAlumni: (id) => apiCall(`/admin/alumnis/${id}`),
  createAlumni: (body) => apiCall('/admin/alumnis', { method: 'POST', body: JSON.stringify(body) }),
  updateAlumni: (id, body) => apiCall(`/admin/alumnis/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteAlumni: (id) => apiCall(`/admin/alumnis/${id}`, { method: 'DELETE' }),
  // Courses
  getCourses: () => apiCall('/admin/courses'),
  getCourse: (id) => apiCall(`/admin/courses/${id}`),
  approveCourse: (id) => apiCall(`/admin/courses/${id}/approve`, { method: 'PUT' }),
  rejectCourse: (id, reason) => apiCall(`/admin/courses/${id}/reject`, { method: 'PUT', body: JSON.stringify({ reason }) }),
  deleteCourse: (id) => apiCall(`/admin/courses/${id}`, { method: 'DELETE' }),
  updateCourseStatus: (id, status) => apiCall(`/admin/courses/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  // Course Management (Full CRUD)
  createCourse: (body) => apiCall('/admin/courses', { method: 'POST', body: JSON.stringify(body) }),
  updateCourse: (id, body) => apiCall(`/admin/courses/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  getCourseDetail: (id) => apiCall(`/admin/courses/${id}/detail`),
  addSubject: (courseId, body) => apiCall(`/admin/courses/${courseId}/subjects`, { method: 'POST', body: JSON.stringify(body) }),
  updateSubject: (id, body) => apiCall(`/admin/subjects/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteSubject: (id) => apiCall(`/admin/subjects/${id}`, { method: 'DELETE' }),
  addTopic: (subjectId, body) => apiCall(`/admin/subjects/${subjectId}/topics`, { method: 'POST', body: JSON.stringify(body) }),
  deleteTopic: (id) => apiCall(`/admin/topics/${id}`, { method: 'DELETE' }),
  getCourseContent: (courseId) => apiCall(`/admin/courses/${courseId}/content`),
  addContent: (courseId, body) => apiCall(`/admin/courses/${courseId}/content`, { method: 'POST', body: JSON.stringify(body) }),
  updateContent: (id, body) => apiCall(`/admin/content/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteContent: (id) => apiCall(`/admin/content/${id}`, { method: 'DELETE' }),
  // Doubts
  getDoubts: () => apiCall('/admin/doubts'),
  // Analytics
  getAnalytics: () => apiCall('/admin/analytics'),
  // Reports
  getReports: () => apiCall('/admin/reports'),
  // Settings
  getSettings: () => apiCall('/admin/settings'),
  updateSettings: (body) => apiCall('/admin/settings', { method: 'PUT', body: JSON.stringify(body) }),
  // Notifications
  getNotifications: () => apiCall('/admin/notifications'),
  markAllRead: () => apiCall('/admin/notifications/read-all', { method: 'PUT' }),
  // Contact Messages
  getContactMessages: () => apiCall('/admin/contact-messages'),
  markMessageRead: (id) => apiCall(`/admin/contact-messages/${id}/read`, { method: 'PUT' }),
  // Upload management
  listUploads: () => apiCall('/admin/list-uploads'),
  downloadUploads: () => `${API_BASE}/admin/download-uploads`,
  // Profile Requests
  getProfileRequests: () => apiCall('/admin/profile-requests'),
  approveProfileRequest: (id, body = {}) => apiCall(`/admin/profile-requests/${id}/approve`, { method: 'PUT', body: JSON.stringify(body) }),
  rejectProfileRequest: (id, body) => apiCall(`/admin/profile-requests/${id}/reject`, { method: 'PUT', body: JSON.stringify(body) }),
  // Revenue & Pricing
  getRevenueAnalytics: () => apiCall('/admin/revenue-analytics'),
  updatePricingPlan: (id, body) => apiCall(`/admin/pricing-plans/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
};

// ──────────────── ALUMNI API ────────────────
export const alumniApi = {
  getDashboard: () => apiCall('/alumni/dashboard'),
  // Courses
  getCourses: () => apiCall('/alumni/courses'),
  createCourse: (body) => apiCall('/alumni/courses', { method: 'POST', body: JSON.stringify(body) }),
  updateCourse: (id, body) => apiCall(`/alumni/courses/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteCourse: (id) => apiCall(`/alumni/courses/${id}`, { method: 'DELETE' }),
  getCourseDetail: (id) => apiCall(`/alumni/courses/${id}/detail`),
  // Subjects (Units)
  getSubjects: (courseId) => apiCall(`/alumni/courses/${courseId}/subjects`),
  addSubject: (courseId, body) => apiCall(`/alumni/courses/${courseId}/subjects`, { method: 'POST', body: JSON.stringify(body) }),
  updateSubject: (id, body) => apiCall(`/alumni/subjects/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteSubject: (id) => apiCall(`/alumni/subjects/${id}`, { method: 'DELETE' }),
  // Topics
  getTopics: (subjectId) => apiCall(`/alumni/subjects/${subjectId}/topics`),
  addTopic: (subjectId, body) => apiCall(`/alumni/subjects/${subjectId}/topics`, { method: 'POST', body: JSON.stringify(body) }),
  deleteTopic: (id) => apiCall(`/alumni/topics/${id}`, { method: 'DELETE' }),
  // Course Content
  getCourseContent: (courseId) => apiCall(`/alumni/courses/${courseId}/content`),
  addContent: (courseId, body) => apiCall(`/alumni/courses/${courseId}/content`, { method: 'POST', body: JSON.stringify(body) }),
  updateContent: (id, body) => apiCall(`/alumni/content/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteContent: (id) => apiCall(`/alumni/content/${id}`, { method: 'DELETE' }),
  // Students Progress
  getStudentsProgress: () => apiCall('/alumni/students-progress'),

  // Problems
  getProblems: () => apiCall('/alumni/problems'),
  createProblem: (body) => apiCall('/alumni/problems', { method: 'POST', body: JSON.stringify(body) }),
  updateProblem: (id, body) => apiCall(`/alumni/problems/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteProblem: (id) => apiCall(`/alumni/problems/${id}`, { method: 'DELETE' }),
  // Aptitude Tests
  getAptitudeTests: () => apiCall('/alumni/aptitude-tests'),
  createAptitudeTest: (body) => apiCall('/alumni/aptitude-tests', { method: 'POST', body: JSON.stringify(body) }),
  updateAptitudeTest: (id, body) => apiCall(`/alumni/aptitude-tests/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  getAptitudeTest: (id) => apiCall(`/alumni/aptitude-tests/${id}`),
  deleteAptitudeTest: (id) => apiCall(`/alumni/aptitude-tests/${id}`, { method: 'DELETE' }),
  // Events
  getEvents: () => apiCall('/alumni/events'),
  createEvent: (body) => apiCall('/alumni/events', { method: 'POST', body: JSON.stringify(body) }),
  updateEvent: (id, body) => apiCall(`/alumni/events/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteEvent: (id) => apiCall(`/alumni/events/${id}`, { method: 'DELETE' }),
  // Discussions
  getDiscussions: () => apiCall('/alumni/discussions'),
  createDiscussion: (body) => apiCall('/alumni/discussions', { method: 'POST', body: JSON.stringify(body) }),
  getDiscussion: (id) => apiCall(`/alumni/discussions/${id}`),
  replyDiscussion: (id, body) => apiCall(`/alumni/discussions/${id}/reply`, { method: 'POST', body: JSON.stringify(body) }),
  // Study Materials
  getStudyMaterials: () => apiCall('/alumni/study-materials'),
  createStudyMaterial: (body) => apiCall('/alumni/study-materials', { method: 'POST', body: JSON.stringify(body) }),
  updateStudyMaterial: (id, body) => apiCall(`/alumni/study-materials/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteStudyMaterial: (id) => apiCall(`/alumni/study-materials/${id}`, { method: 'DELETE' }),
  // Doubts
  getDoubts: () => apiCall('/alumni/doubts'),
  getDoubt: (id) => apiCall(`/alumni/doubts/${id}`),
  replyDoubt: (id, body) => apiCall(`/alumni/doubts/${id}/reply`, { method: 'POST', body: JSON.stringify(body) }),
  resolveDoubt: (id) => apiCall(`/alumni/doubts/${id}/resolve`, { method: 'PUT' }),
};

// ──────────────── STUDENT API ────────────────
export const studentApi = {
  getDashboard: () => apiCall('/student/dashboard'),
  // Courses
  getCourses: () => apiCall('/student/courses'),
  browseCourses: (params = '') => apiCall(`/student/courses/browse${params ? '?' + params : ''}`),
  enrollCourse: (id) => apiCall(`/student/courses/${id}/enroll`, { method: 'POST' }),
  unenrollCourse: (id) => apiCall(`/student/courses/${id}/unenroll`, { method: 'POST' }),
  getCourseView: (id) => apiCall(`/student/courses/${id}/view`),
  updateCourseProgress: (id, body) => apiCall(`/student/courses/${id}/progress`, { method: 'PUT', body: JSON.stringify(body) }),
  getCourseMaterials: (id) => apiCall(`/student/courses/${id}/materials`),
  // Grades
  getGrades: () => apiCall('/student/grades'),

  // Progress
  getProgress: () => apiCall('/student/progress'),
  getCertificate: (courseId) => apiCall(`/student/certificate/${courseId}`),
  // Coding
  getCodingProblems: (params = '') => apiCall(`/student/coding-problems${params ? '?' + params : ''}`),
  getCodingProblem: (id) => apiCall(`/student/coding-problems/${id}`),
  submitCode: (id, body) => apiCall(`/student/coding-problems/${id}/submit`, { method: 'POST', body: JSON.stringify(body) }),
  executeCode: (body) => apiCall('/student/execute', { method: 'POST', body: JSON.stringify(body) }),
  // Game Challenges
  getGameChallenges: () => apiCall('/student/game-challenges'),
  getGameChallenge: (slug) => apiCall(`/student/game-challenges/${slug}`),
  submitGameChallenge: (slug, body) => apiCall(`/student/game-challenges/${slug}/submit`, { method: 'POST', body: JSON.stringify(body) }),
  getGameUnlocks: () => apiCall('/student/game-unlocks'),
  // Aptitude
  getAptitudeTests: () => apiCall('/student/aptitude-tests'),
  startAptitudeTest: (id) => apiCall(`/student/aptitude-tests/${id}/start`, { method: 'POST' }),
  submitAptitudeTest: (attemptId, body) => apiCall(`/student/aptitude-tests/${attemptId}/submit`, { method: 'POST', body: JSON.stringify(body) }),
  getAptitudeResult: (attemptId) => apiCall(`/student/aptitude-tests/attempts/${attemptId}`),
  // Study Materials
  getStudyMaterials: (params = '') => apiCall(`/student/study-materials${params ? '?' + params : ''}`),
  // Events
  getEvents: () => apiCall('/student/events'),
  registerEvent: (id) => apiCall(`/student/events/${id}/register`, { method: 'POST' }),
  // Discussions
  getDiscussions: () => apiCall('/student/discussions'),
  replyDiscussion: (id, body) => apiCall(`/student/discussions/${id}/reply`, { method: 'POST', body: JSON.stringify(body) }),
  // Notifications
  getNotifications: () => apiCall('/student/notifications'),
  // Doubts
  getDoubts: () => apiCall('/student/doubts'),
  createDoubt: (body) => apiCall('/student/doubts', { method: 'POST', body: JSON.stringify(body) }),
  getDoubt: (id) => apiCall(`/student/doubts/${id}`),
  replyDoubt: (id, body) => apiCall(`/student/doubts/${id}/reply`, { method: 'POST', body: JSON.stringify(body) }),
  // Subscriptions & Billing
  getSubscriptionStatus: () => apiCall('/student/subscription-status'),
  subscribePlan: (body) => apiCall('/student/subscribe', { method: 'POST', body: JSON.stringify(body) }),
  buyCourse: (body) => apiCall('/student/buy-course', { method: 'POST', body: JSON.stringify(body) }),
  getBillingHistory: () => apiCall('/student/billing-history'),
};

// ──────────────── PUBLIC API ────────────────
export const publicApi = {
  getCourses: () => apiCall('/public/courses'),
  getPricingPlans: () => apiCall('/public/pricing-plans'),
  submitContact: (body) => apiCall('/public/contact', { method: 'POST', body: JSON.stringify(body) }),
  subscribeNewsletter: (body) => apiCall('/public/newsletter', { method: 'POST', body: JSON.stringify(body) }),
  searchColleges: (keyword) => apiCall('/public/colleges/search', { method: 'POST', body: JSON.stringify({ keyword }) }),
  searchDepartments: (keyword) => apiCall('/public/departments/search', { method: 'POST', body: JSON.stringify({ keyword }) }),
  getAcademicYear: () => apiCall('/public/academic-year'),
};
