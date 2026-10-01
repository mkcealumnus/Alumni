import React, { useState, useEffect, useCallback, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { Link, useNavigate } from 'react-router-dom';
import Swal, { getSwalOpts } from '../../utils/swal';
import { authApi, publicApi } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';



const FALLBACK_DEPARTMENTS = [
  { code: 'AIDS', degree: 'B.Tech.', name: 'Artificial Intelligence and Data Science', label: 'B.Tech. - Artificial Intelligence and Data Science' },
  { code: 'AIML', degree: 'B.Tech.', name: 'Artificial Intelligence and Machine Learning', label: 'B.Tech. - Artificial Intelligence and Machine Learning' },
  { code: 'AUTO', degree: 'B.E.', name: 'Automobile Engineering', label: 'B.E. - Automobile Engineering' },
  { code: 'BME', degree: 'B.E.', name: 'Biomedical Engineering', label: 'B.E. - Biomedical Engineering' },
  { code: 'BIOTECH', degree: 'B.Tech.', name: 'Biotechnology', label: 'B.Tech. - Biotechnology' },
  { code: 'CHEM', degree: 'B.Tech.', name: 'Chemical Engineering', label: 'B.Tech. - Chemical Engineering' },
  { code: 'CIVIL', degree: 'B.E.', name: 'Civil Engineering', label: 'B.E. - Civil Engineering' },
  { code: 'CSE', degree: 'B.E.', name: 'Computer Science and Engineering', label: 'B.E. - Computer Science and Engineering' },
  { code: 'CSBS', degree: 'B.Tech.', name: 'Computer Science and Business Systems', label: 'B.Tech. - Computer Science and Business Systems' },
  { code: 'CSE(AIML)', degree: 'B.E.', name: 'Artificial Intelligence and Machine Learning', label: 'B.E. - Artificial Intelligence and Machine Learning' },
  { code: 'CYBER', degree: 'B.E.', name: 'Computer Science and Engineering (Cyber Security)', label: 'B.E. - Computer Science and Engineering (Cyber Security)' },
  { code: 'CSD', degree: 'B.E.', name: 'Computer Science and Design', label: 'B.E. - Computer Science and Design' },
  { code: 'ECE', degree: 'B.E.', name: 'Electronics and Communication Engineering', label: 'B.E. - Electronics and Communication Engineering' },
  { code: 'EEE', degree: 'B.E.', name: 'Electrical and Electronics Engineering', label: 'B.E. - Electrical and Electronics Engineering' },
  { code: 'EIE', degree: 'B.E.', name: 'Electronics and Instrumentation Engineering', label: 'B.E. - Electronics and Instrumentation Engineering' },
  { code: 'FOOD', degree: 'B.Tech.', name: 'Food Technology', label: 'B.Tech. - Food Technology' },
  { code: 'GEO', degree: 'B.E.', name: 'Geo Informatics', label: 'B.E. - Geo Informatics' },
  { code: 'IT', degree: 'B.E.', name: 'Information Technology', label: 'B.E. - Information Technology' },
  { code: 'MARINE', degree: 'B.E.', name: 'Marine Engineering', label: 'B.E. - Marine Engineering' },
  { code: 'MECH', degree: 'B.E.', name: 'Mechanical Engineering', label: 'B.E. - Mechanical Engineering' },
  { code: 'MECT', degree: 'B.E.', name: 'Mechatronics Engineering', label: 'B.E. - Mechatronics Engineering' },
  { code: 'MINING', degree: 'B.E.', name: 'Mining Engineering', label: 'B.E. - Mining Engineering' },
  { code: 'PETRO', degree: 'B.Tech.', name: 'Petroleum Engineering', label: 'B.Tech. - Petroleum Engineering' },
  { code: 'PRINT', degree: 'B.E.', name: 'Printing Technology', label: 'B.E. - Printing Technology' },
  { code: 'PROD', degree: 'B.E.', name: 'Production Engineering', label: 'B.E. - Production Engineering' },
  { code: 'RUBBER', degree: 'B.Tech.', name: 'Rubber and Plastics Technology', label: 'B.Tech. - Rubber and Plastics Technology' },
  { code: 'SAFETY', degree: 'B.E.', name: 'Safety and Fire Engineering', label: 'B.E. - Safety and Fire Engineering' },
  { code: 'TEXTILE', degree: 'B.Tech.', name: 'Textile Technology', label: 'B.Tech. - Textile Technology' },
  { code: 'VLSI', degree: 'B.E.', name: 'Electronics Engineering (VLSI Design)', label: 'B.E. - Electronics Engineering (VLSI Design)' },
  { code: 'AERO', degree: 'B.E.', name: 'Aeronautical Engineering', label: 'B.E. - Aeronautical Engineering' },
  { code: 'AGRI', degree: 'B.Tech.', name: 'Agricultural Engineering', label: 'B.Tech. - Agricultural Engineering' },
  { code: 'ARCH', degree: 'B.Arch.', name: 'Architecture', label: 'B.Arch. - Architecture' },
  { code: 'CERAMIC', degree: 'B.Tech.', name: 'Ceramic Technology', label: 'B.Tech. - Ceramic Technology' },
  { code: 'ENV', degree: 'B.E.', name: 'Environmental Engineering', label: 'B.E. - Environmental Engineering' },
  { code: 'FASHION', degree: 'B.Tech.', name: 'Fashion Technology', label: 'B.Tech. - Fashion Technology' },
  { code: 'HANDLOOM', degree: 'B.Tech.', name: 'Handloom and Textile Technology', label: 'B.Tech. - Handloom and Textile Technology' },
  { code: 'INDUST', degree: 'B.E.', name: 'Industrial Engineering', label: 'B.E. - Industrial Engineering' },
  { code: 'LEATHER', degree: 'B.Tech.', name: 'Leather Technology', label: 'B.Tech. - Leather Technology' },
  { code: 'MANUF', degree: 'B.E.', name: 'Manufacturing Engineering', label: 'B.E. - Manufacturing Engineering' },
  { code: 'MATSC', degree: 'B.Tech.', name: 'Material Science and Engineering', label: 'B.Tech. - Material Science and Engineering' },
  { code: 'NANO', degree: 'B.Tech.', name: 'Nanotechnology', label: 'B.Tech. - Nanotechnology' },
  { code: 'PHARM', degree: 'B.Pharm.', name: 'Pharmaceutical Engineering', label: 'B.Pharm. - Pharmaceutical Engineering' },
  { code: 'PLASTIC', degree: 'B.Tech.', name: 'Plastic Technology', label: 'B.Tech. - Plastic Technology' },
  { code: 'POLYMER', degree: 'B.Tech.', name: 'Polymer Technology', label: 'B.Tech. - Polymer Technology' },
  { code: 'POWER', degree: 'B.E.', name: 'Power Electronics and Drives', label: 'B.E. - Power Electronics and Drives' },
  { code: 'ROBOTICS', degree: 'B.E.', name: 'Robotics and Automation', label: 'B.E. - Robotics and Automation' },
  { code: 'SUGAR', degree: 'B.Tech.', name: 'Sugar Technology', label: 'B.Tech. - Sugar Technology' },
  { code: 'TELECOM', degree: 'B.E.', name: 'Telecommunication Engineering', label: 'B.E. - Telecommunication Engineering' },
  { code: 'AIDS_M', degree: 'M.E.', name: 'Artificial Intelligence and Data Science', label: 'M.E. - Artificial Intelligence and Data Science' },
  { code: 'AIML_M', degree: 'M.E.', name: 'Artificial Intelligence and Machine Learning', label: 'M.E. - Artificial Intelligence and Machine Learning' },
  { code: 'APPLY', degree: 'M.E.', name: 'Applied Electronics', label: 'M.E. - Applied Electronics' },
  { code: 'CAD', degree: 'M.E.', name: 'Computer Aided Design', label: 'M.E. - Computer Aided Design' },
  { code: 'COMM', degree: 'M.E.', name: 'Communication Systems', label: 'M.E. - Communication Systems' },
  { code: 'CONST', degree: 'M.E.', name: 'Construction Engineering and Management', label: 'M.E. - Construction Engineering and Management' },
  { code: 'CONTROL', degree: 'M.E.', name: 'Control and Instrumentation Engineering', label: 'M.E. - Control and Instrumentation Engineering' },
  { code: 'CSE_M', degree: 'M.E.', name: 'Computer Science and Engineering', label: 'M.E. - Computer Science and Engineering' },
  { code: 'CYBER_M', degree: 'M.E.', name: 'Cyber Security', label: 'M.E. - Cyber Security' },
  { code: 'EMBED', degree: 'M.E.', name: 'Embedded System Technologies', label: 'M.E. - Embedded System Technologies' },
  { code: 'ENERGY', degree: 'M.E.', name: 'Energy Engineering', label: 'M.E. - Energy Engineering' },
  { code: 'ENV_M', degree: 'M.E.', name: 'Environmental Engineering', label: 'M.E. - Environmental Engineering' },
  { code: 'GEOTECH', degree: 'M.E.', name: 'Geotechnical Engineering', label: 'M.E. - Geotechnical Engineering' },
  { code: 'HIGHWAY', degree: 'M.E.', name: 'Highway Engineering', label: 'M.E. - Highway Engineering' },
  { code: 'INDUST_M', degree: 'M.E.', name: 'Industrial Engineering', label: 'M.E. - Industrial Engineering' },
  { code: 'MANUF_M', degree: 'M.E.', name: 'Manufacturing Engineering', label: 'M.E. - Manufacturing Engineering' },
  { code: 'MECH_M', degree: 'M.E.', name: 'Mechanical Engineering (CAD/CAM)', label: 'M.E. - Mechanical Engineering (CAD/CAM)' },
  { code: 'POWER_M', degree: 'M.E.', name: 'Power Electronics and Drives', label: 'M.E. - Power Electronics and Drives' },
  { code: 'PROD_M', degree: 'M.E.', name: 'Production Engineering', label: 'M.E. - Production Engineering' },
  { code: 'PSE', degree: 'M.E.', name: 'Power Systems Engineering', label: 'M.E. - Power Systems Engineering' },
  { code: 'SE', degree: 'M.E.', name: 'Software Engineering', label: 'M.E. - Software Engineering' },
  { code: 'SOIL', degree: 'M.E.', name: 'Soil Mechanics and Foundation Engineering', label: 'M.E. - Soil Mechanics and Foundation Engineering' },
  { code: 'STRUCT', degree: 'M.E.', name: 'Structural Engineering', label: 'M.E. - Structural Engineering' },
  { code: 'THERMAL', degree: 'M.E.', name: 'Thermal Engineering', label: 'M.E. - Thermal Engineering' },
  { code: 'VLSI_M', degree: 'M.E.', name: 'VLSI Design', label: 'M.E. - VLSI Design' },
  { code: 'WATER', degree: 'M.E.', name: 'Water Resources Engineering', label: 'M.E. - Water Resources Engineering' },
  { code: 'WELD', degree: 'M.E.', name: 'Welding Technology', label: 'M.E. - Welding Technology' },
  { code: 'BIOTECH_M', degree: 'M.Tech.', name: 'Biotechnology', label: 'M.Tech. - Biotechnology' },
  { code: 'CHEM_M', degree: 'M.Tech.', name: 'Chemical Engineering', label: 'M.Tech. - Chemical Engineering' },
  { code: 'FOOD_M', degree: 'M.Tech.', name: 'Food Technology', label: 'M.Tech. - Food Technology' },
  { code: 'IT_M', degree: 'M.Tech.', name: 'Information Technology', label: 'M.Tech. - Information Technology' },
  { code: 'NANO_M', degree: 'M.Tech.', name: 'Nanotechnology', label: 'M.Tech. - Nanotechnology' },
  { code: 'REMOTE', degree: 'M.Tech.', name: 'Remote Sensing', label: 'M.Tech. - Remote Sensing' },
  { code: 'TEXTILE_M', degree: 'M.Tech.', name: 'Textile Technology', label: 'M.Tech. - Textile Technology' },
  { code: 'MBA', degree: 'MBA', name: 'Master of Business Administration', label: 'MBA - Master of Business Administration' },
  { code: 'MCA', degree: 'MCA', name: 'Master of Computer Applications', label: 'MCA - Master of Computer Applications' }
];

let clientCollegeCache = null;
async function getClientColleges() {
  if (clientCollegeCache) return clientCollegeCache;
  try {
    const res = await fetch('/college.csv');
    if (!res.ok) throw new Error('Failed to fetch college.csv');
    const text = await res.text();
    const lines = text.split('\n').slice(1);
    const names = new Set();
    for (const line of lines) {
      if (!line.trim()) continue;
      const cols = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (inQuotes) {
          if (ch === '"' && line[i + 1] === '"') { current += '"'; i++; }
          else if (ch === '"') { inQuotes = false; }
          else { current += ch; }
        } else {
          if (ch === '"') { inQuotes = true; }
          else if (ch === ',') { cols.push(current); current = ''; }
          else { current += ch; }
        }
      }
      cols.push(current);
      if (cols.length >= 3) {
        let name = cols[2].trim().replace(/^["']+|["']+$/g, '').replace(/\s*\(Id:\s*[CU]-\d+\)\s*$/i, '').replace(/^["']+|["']+$/g, '').trim();
        if (name) names.add(name);
      }
    }
    clientCollegeCache = Array.from(names).sort((a, b) => a.localeCompare(b));
    return clientCollegeCache;
  } catch {
    return [
      'M.Kumarasamy College of Engineering',
      'Anna University',
      'PSG College of Technology',
      'College of Engineering, Guindy',
      'Coimbatore Institute of Technology',
      'SRM Institute of Science and Technology',
      'Vellore Institute of Technology',
      'SSN College of Engineering',
      'Thiagarajar College of Engineering',
      'Kongu Engineering College',
      'KPR Institute of Engineering and Technology',
      'Bannari Amman Institute of Technology',
      'Kumaraguru College of Technology'
    ];
  }
}

const AuthPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      let redirectPath = '/student';
      if (user.role === 'admin') redirectPath = '/admin';
      else if (user.role === 'instructor' || user.role === 'mentor') redirectPath = '/mentor';
      else if (user.role === 'creator') redirectPath = '/creator';
      else if (user.role === 'manager') redirectPath = '/manager';
      else if (user.role === 'observer') redirectPath = '/observer';

      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);
  const [activeForm, setActiveForm] = useState('login');
  const [forgotStep, setForgotStep] = useState(1);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    remember: false
  });
  const [registerData, setRegisterData] = useState({
    // Step 1: Personal
    fullName: '', college: '', department: '', year: '', rollNumber: '', email: '', phone: '', countryCode: '+91',
    // Step 2: Additional
    gender: '', dateOfBirth: '', address: '', bio: '', github: '', linkedin: '', hackerrank: '', leetcode: '',
    // Step 3: Profile
    profileImage: null, profilePreview: null,
    // Step 4: Account
    username: '', password: '', confirmPassword: ''
  });
  const [registerStep, setRegisterStep] = useState(1);
  // Crop modal state
  const [cropModal, setCropModal] = useState(false);
  const [cropImage, setCropImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  // College search state
  const [collegeSearch, setCollegeSearch] = useState('');
  const [collegeResults, setCollegeResults] = useState([]);
  const [collegeLoading, setCollegeLoading] = useState(false);
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);
  const collegeInputRef = useRef(null);
  const collegeDropdownRef = useRef(null);
  // Department search state
  const [deptSearch, setDeptSearch] = useState('');
  const [deptResults, setDeptResults] = useState([]);
  const [deptLoading, setDeptLoading] = useState(false);
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);
  const [selectedDeptLabel, setSelectedDeptLabel] = useState('');
  const deptInputRef = useRef(null);
  const deptDropdownRef = useRef(null);
  // Dynamic academic year config (fetched from API)
  const [academicConfig, setAcademicConfig] = useState(null);
  const [forgotData, setForgotData] = useState({
    email: '',
    otp: ['', '', '', '', '', ''],
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    login: false,
    register: false,
    registerConfirm: false,
    newPassword: false,
    confirmPassword: false
  });

  const validTLDs = [
    'com', 'org', 'net', 'edu', 'gov', 'mil',
    'info', 'biz', 'name', 'mobi', 'pro',
    'int', 'museum', 'travel', 'xyz', 'app',
    'dev', 'io', 'co', 'me', 'tv', 'us', 'uk',
    'ca', 'au', 'de', 'fr', 'jp', 'ru', 'in',
    'edu.in', 'ac.in', 'gov.in', 'org.in', 'res.in',
    'tech', 'online', 'site', 'web', 'cloud',
    'ai', 'blog', 'design', 'studio', 'email'
  ];

  useEffect(() => {
    const loadParticles = async () => {
      if (window.particlesJS) {
        const leftConfig = {
          particles: {
            number: { value: 60 },
            color: { value: '#ffffff' },
            opacity: { value: 0.7 },
            size: { value: 3 },
            line_linked: {
              enable: true,
              distance: 150,
              color: '#ffffff',
              opacity: 0.1,
              width: 1
            },
            move: {
              enable: true,
              speed: 2
            }
          }
        };

        const rightConfig = {
          particles: {
            number: { value: 60 },
            color: { value: '#c96442' },
            opacity: { value: 0.8 },
            size: { value: 3 },
            line_linked: {
              enable: true,
              distance: 150,
              color: '#c96442',
              opacity: 0.1,
              width: 1
            },
            move: {
              enable: true,
              speed: 2
            }
          }
        };

        setTimeout(() => {
          try {
            window.particlesJS('particles-left', leftConfig);
            window.particlesJS('particles-right', rightConfig);
            console.log('Particles initialized successfully');
          } catch (error) {
            console.error('Particles initialization error:', error);
          }
        }, 100);
      }
    };

    loadParticles();
  }, []);

  const toggleForm = (formType) => {
    setActiveForm(formType);
    if (formType === 'forgot') {
      setForgotStep(1);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'department') {
      // CYBER only allows I year
      const newYear = value === 'CYBER' ? 'I year' : registerData.year;
      if (isMKC) {
        // Recalculate roll prefix for MKC
        const yCode = yearCodes[newYear] || '';
        const dCode = getDeptCode(value, newYear);
        const prefix = (yCode && dCode) ? yCode + dCode : '';
        setRegisterData(prev => ({ ...prev, department: value, year: newYear, rollNumber: prefix }));
      } else {
        setRegisterData(prev => ({ ...prev, department: value, year: newYear }));
      }
      return;
    }

    if (name === 'year') {
      if (isMKC) {
        // Recalc roll prefix when year changes for MKC
        const yCode = yearCodes[value] || '';
        const dCode = getDeptCode(registerData.department, value);
        const prefix = (yCode && dCode) ? yCode + dCode : '';
        setRegisterData(prev => ({ ...prev, year: value, rollNumber: prefix }));
      } else {
        setRegisterData(prev => ({ ...prev, year: value }));
      }
      return;
    }

    if (name === 'rollNumber') {
      if (isMKC) {
        // Enforce prefix lock for MKC — user cannot delete the auto-generated prefix
        const currentPrefix = generateRollPrefix();
        if (currentPrefix && !value.startsWith(currentPrefix)) return;
        if (value.length > 12) return;
      } else {
        // Free-form for other colleges (max 20 chars)
        if (value.length > 20) return;
      }
      setRegisterData(prev => ({ ...prev, rollNumber: value }));
      return;
    }

    setRegisterData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      Swal.fire({ ...getSwalOpts(), icon: 'warning', title: 'File Too Large', text: 'Max file size is 5MB'});
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setCropImage(reader.result);
      setCropModal(true);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const removeProfileImage = () => {
    setRegisterData(prev => ({ ...prev, profileImage: null, profilePreview: null }));
  };

  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const getCroppedImg = (imageSrc, pixelCrop) => {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
        canvas.toBlob((blob) => {
          resolve({ blob, url: URL.createObjectURL(blob) });
        }, 'image/jpeg', 0.95);
      };
    });
  };

  const handleCropConfirm = async () => {
    if (!croppedAreaPixels || !cropImage) return;
    try {
      const { blob, url } = await getCroppedImg(cropImage, croppedAreaPixels);
      const croppedFile = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
      setRegisterData(prev => ({ ...prev, profileImage: croppedFile, profilePreview: url }));
    } catch (err) {
      console.error('Crop failed:', err);
    }
    setCropModal(false);
    setCropImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleCropCancel = () => {
    setCropModal(false);
    setCropImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  // College/Department/Year lists
  // College search with debounce and robust fallback
  useEffect(() => {
    setCollegeLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await publicApi.searchColleges(collegeSearch.trim());
        const list = res?.colleges || res?.data?.colleges;
        if (Array.isArray(list) && list.length > 0) {
          setCollegeResults(list);
        } else {
          // Fallback to client-side search from public/college.csv
          const allColleges = await getClientColleges();
          const query = collegeSearch.trim().toLowerCase();
          if (!query) {
            setCollegeResults(['M.Kumarasamy College of Engineering', ...allColleges.filter(c => c !== 'M.Kumarasamy College of Engineering').slice(0, 25)]);
          } else {
            const matches = allColleges.filter(c => c.toLowerCase().includes(query));
            matches.sort((a, b) => {
              const aStarts = a.toLowerCase().startsWith(query);
              const bStarts = b.toLowerCase().startsWith(query);
              if (aStarts && !bStarts) return -1;
              if (!aStarts && bStarts) return 1;
              return a.localeCompare(b);
            });
            setCollegeResults(matches.slice(0, 50));
          }
        }
      } catch (err) {
        console.error('College search fallback triggered:', err);
        const allColleges = await getClientColleges();
        const query = collegeSearch.trim().toLowerCase();
        if (!query) {
          setCollegeResults(['M.Kumarasamy College of Engineering', ...allColleges.filter(c => c !== 'M.Kumarasamy College of Engineering').slice(0, 25)]);
        } else {
          setCollegeResults(allColleges.filter(c => c.toLowerCase().includes(query)).slice(0, 50));
        }
      } finally {
        setCollegeLoading(false);
      }
    }, collegeSearch ? 200 : 0);
    return () => clearTimeout(timer);
  }, [collegeSearch]);

  // Click outside to close college dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        collegeInputRef.current && !collegeInputRef.current.contains(e.target) &&
        collegeDropdownRef.current && !collegeDropdownRef.current.contains(e.target)
      ) {
        setShowCollegeDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Department search with debounce and robust fallback
  useEffect(() => {
    setDeptLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await publicApi.searchDepartments(deptSearch.trim());
        const list = res?.departments || res?.data?.departments;
        if (Array.isArray(list) && list.length > 0) {
          setDeptResults(list);
        } else {
          // Fallback to FALLBACK_DEPARTMENTS
          const query = deptSearch.trim().toLowerCase();
          if (!query) {
            setDeptResults(FALLBACK_DEPARTMENTS);
          } else {
            const matches = FALLBACK_DEPARTMENTS.filter(d =>
              d.name.toLowerCase().includes(query) ||
              d.code.toLowerCase().includes(query) ||
              d.degree.toLowerCase().includes(query) ||
              d.label.toLowerCase().includes(query)
            );
            setDeptResults(matches);
          }
        }
      } catch (err) {
        console.error('Dept search fallback triggered:', err);
        const query = deptSearch.trim().toLowerCase();
        if (!query) {
          setDeptResults(FALLBACK_DEPARTMENTS);
        } else {
          setDeptResults(FALLBACK_DEPARTMENTS.filter(d =>
            d.name.toLowerCase().includes(query) ||
            d.code.toLowerCase().includes(query) ||
            d.degree.toLowerCase().includes(query) ||
            d.label.toLowerCase().includes(query)
          ));
        }
      } finally {
        setDeptLoading(false);
      }
    }, deptSearch ? 150 : 0);
    return () => clearTimeout(timer);
  }, [deptSearch]);

  // Click outside to close department dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        deptInputRef.current && !deptInputRef.current.contains(e.target) &&
        deptDropdownRef.current && !deptDropdownRef.current.contains(e.target)
      ) {
        setShowDeptDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const years = ['I year', 'II year', 'III year', 'IV year'];

  // Fetch academic year config from API
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await publicApi.getAcademicYear();
        if (res.success) {
          setAcademicConfig(res);
        }
      } catch (err) {
        console.error('Failed to fetch academic year config:', err);
      }
    };
    fetchConfig();
  }, []);

  // Dynamic codes from API (with fallbacks)
  const targetCollege = academicConfig?.targetCollege || 'M.Kumarasamy College of Engineering';
  const isMKC = registerData.college === targetCollege;
  const deptCodes = academicConfig?.deptCodes || {
    'AIDS': 'BAD', 'AIML': 'BAM', 'CSE': 'BCS', 'CSBS': 'BCB',
    'CYBER': 'BSC', 'ECE': 'BEC', 'EEE': 'BEE', 'MECH': 'BME',
    'CIVIL': 'BCE', 'IT': 'BIT', 'VLSI': 'BEV'
  };
  const yearCodes = academicConfig?.yearCodes || {
    'I year': '927625', 'II year': '927624', 'III year': '927623', 'IV year': '927622'
  };
  // Per-academic-year dept code overrides (e.g. AIML IV year = BAL only in 2025-2026)
  const specialDeptOverrides = academicConfig?.specialDeptOverrides || {};

  // Get effective dept code, applying any year-specific overrides
  const getDeptCode = (dept, yr) => {
    const override = specialDeptOverrides[dept]?.[yr];
    if (override) return override;
    return deptCodes[dept] || '';
  };

  // Get filtered years based on department (CYBER = I year only)
  const getFilteredYears = () => {
    if (registerData.department === 'CYBER') return ['I year'];
    return years;
  };

  // Generate roll number prefix from dept + year codes (MKC only)
  const generateRollPrefix = () => {
    if (!isMKC) return '';
    if (!registerData.department || !registerData.year) return '';
    const yCode = yearCodes[registerData.year];
    if (!yCode) return '';
    const dCode = getDeptCode(registerData.department, registerData.year);
    return dCode ? yCode + dCode : '';
  };

  // Roll number validity: MKC = 12 chars, others = at least 1 char
  const isRollNumberValid = isMKC ? registerData.rollNumber.length === 12 : registerData.rollNumber.trim().length > 0;
  const rollPrefix = generateRollPrefix();

  // Password strength
  const pwChecks = {
    length: registerData.password?.length >= 6,
    upper: /[A-Z]/.test(registerData.password || ''),
    lower: /[a-z]/.test(registerData.password || ''),
    number: /[0-9]/.test(registerData.password || ''),
    special: /[^A-Za-z0-9]/.test(registerData.password || ''),
    match: registerData.password && registerData.password === registerData.confirmPassword
  };

  const canProceedStep = (step) => {
    if (step === 1) {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email);
      const phoneValid = /^\d{10,15}$/.test(registerData.phone.replace(/\D/g, ''));
      const rollValid = isMKC ? registerData.rollNumber.length === 12 : registerData.rollNumber.trim().length > 0;
      return registerData.fullName.trim() && registerData.college && registerData.department && registerData.year && rollValid && emailValid && phoneValid;
    }
    if (step === 2) return true; // all optional
    if (step === 3) return true; // photo optional
    return false;
  };

  const nextStep = () => {
    if (canProceedStep(registerStep)) {
      setRegisterStep(prev => Math.min(prev + 1, 4));
    } else {
      Swal.fire({ ...getSwalOpts(), icon: 'warning', title: 'Incomplete', text: 'Please fill all required fields before proceeding.', timer: 2000, showConfirmButton: false });
    }
  };
  const prevStep = () => setRegisterStep(prev => Math.max(prev - 1, 1));

  const handleOTPChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOTP = [...forgotData.otp];
    newOTP[index] = value;
    setForgotData(prev => ({ ...prev, otp: newOTP }));
    
    if (value && index < 5) {
      const nextInput = document.querySelectorAll('.otp-input')[index + 1];
      if (nextInput) nextInput.focus();
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !forgotData.otp[index] && index > 0) {
      const prevInput = document.querySelectorAll('.otp-input')[index - 1];
      if (prevInput) prevInput.focus();
    }
  };

  const handleForgotChange = (e) => {
    const { name, value } = e.target;
    setForgotData(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await authApi.login({ username: loginData.username, password: loginData.password });
      if (res.success) {
        login(res.token, res.user);
        await Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Welcome back!', text: `Logged in as ${res.user.fullName}`, timer: 1500, showConfirmButton: false});
        const path = res.user.role === 'admin' ? '/admin' : res.user.role === 'mentor' ? '/mentor' : '/student';
        navigate(path);
      } else {
        Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Login Failed', text: res.message || 'Invalid credentials'});
      }
    } catch {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: 'Something went wrong. Please try again.'});
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    // Validate step 4 fields
    if (!registerData.username || registerData.username.length < 4) {
      Swal.fire({ ...getSwalOpts(), icon: 'warning', title: 'Invalid Username', text: 'Username must be at least 4 characters'}); return;
    }
    if (!pwChecks.length || !pwChecks.upper || !pwChecks.lower || !pwChecks.number || !pwChecks.special) {
      Swal.fire({ ...getSwalOpts(), icon: 'warning', title: 'Weak Password', text: 'Password must meet all requirements'}); return;
    }
    if (!pwChecks.match) {
      Swal.fire({ ...getSwalOpts(), icon: 'warning', title: 'Mismatch', text: 'Passwords do not match'}); return;
    }
    setIsSubmitting(true);
    try {
      // Upload profile image first if exists
      let profileImageUrl = null;
      if (registerData.profileImage) {
        const uploadRes = await authApi.uploadProfileImage(registerData.profileImage, registerData.rollNumber);
        if (uploadRes.success) profileImageUrl = uploadRes.imageUrl;
      }
      const phone = registerData.countryCode + registerData.phone.replace(/\D/g, '');
      const res = await authApi.register({
        email: registerData.email,
        username: registerData.username,
        fullName: registerData.fullName,
        password: registerData.password,
        phone,
        countryCode: registerData.countryCode,
        college: registerData.college,
        department: registerData.department,
        year: registerData.year,
        rollNumber: registerData.rollNumber,
        gender: registerData.gender,
        dateOfBirth: registerData.dateOfBirth,
        address: registerData.address,
        bio: registerData.bio,
        github: registerData.github,
        linkedin: registerData.linkedin,
        hackerrank: registerData.hackerrank,
        leetcode: registerData.leetcode,
        profileImage: profileImageUrl
      });
      if (res.success) {
        await Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Account Created!', text: 'You can now sign in with your credentials.'});
        setRegisterStep(1);
        toggleForm('login');
      } else {
        Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Registration Failed', text: res.message || 'Could not create account'});
      }
    } catch {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: 'Something went wrong. Please try again.'});
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotEmailSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    const email = forgotData.email;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setIsSubmitting(true);
    try {
      const res = await authApi.forgotPassword({ email });
      if (res.success) {
        await Swal.fire({ ...getSwalOpts(), icon: 'info', title: 'OTP Sent', text: res.message || 'Check your email for the OTP code.'});
        setForgotStep(2);
      } else {
        Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message || 'Could not send OTP'});
      }
    } catch {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: 'Network error. Try again.'});
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    const otp = forgotData.otp.join('');
    if (!/^\d{6}$/.test(otp)) return;
    setIsSubmitting(true);
    try {
      const res = await authApi.verifyOtp({ email: forgotData.email, otp });
      if (res.success) {
        await Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'OTP Verified!', text: 'Set your new password.', timer: 1500, showConfirmButton: false});
        setForgotStep(3);
      } else {
        Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Invalid OTP', text: res.message || 'Please check and try again.'});
      }
    } catch {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: 'Network error.'});
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (forgotData.newPassword !== forgotData.confirmPassword) {
      Swal.fire({ ...getSwalOpts(), icon: 'warning', title: 'Mismatch', text: 'Passwords do not match!'});
      return;
    }
    if (forgotData.newPassword.length < 6) {
      Swal.fire({ ...getSwalOpts(), icon: 'warning', title: 'Too Short', text: 'Password must be at least 6 characters.'});
      return;
    }
    setIsSubmitting(true);
    try {
      const otp = forgotData.otp.join('');
      const res = await authApi.resetPassword({ email: forgotData.email, otp, newPassword: forgotData.newPassword });
      if (res.success) {
        await Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Password Reset!', text: 'You can now sign in with your new password.'});
        toggleForm('login');
      } else {
        Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message || 'Could not reset password.'});
      }
    } catch {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: 'Network error.'});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Brand Side */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-950 flex-col items-center justify-center overflow-hidden">
        <div id="particles-left" className="absolute inset-0 z-0"></div>
        {/* Decorative shapes */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-white/5"></div>

        <div className="relative z-10 text-center text-white space-y-6 p-8">
          <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm mb-8">
            <i className="ri-arrow-left-line"></i> Home
          </Link>
          <div className="w-20 h-20 mx-auto rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mb-4">
            <i className="ri-seedling-fill text-4xl"></i>
          </div>
          <h1 className="text-4xl font-bold">Sowberry</h1>
          <p className="text-white/70 text-lg">Grow your skills, bloom your future</p>
        </div>
      </div>

      {/* Forms Side */}
      <div className="flex-1 flex items-center justify-center bg-cream dark-theme:bg-gray-950 relative overflow-hidden">
        <div id="particles-right" className="absolute inset-0 z-0"></div>

        <div className="relative z-10 w-full max-w-lg px-6 py-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <i className="ri-seedling-fill text-white text-xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">Sowberry</h1>
          </div>

          {/* Login Form */}
          {activeForm === 'login' && (
            <div className="animate-fade-in-up">
              <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-8 border border-sand dark-theme:border-gray-800">
                <h2 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100 mb-1">Welcome back!</h2>
                <p className="text-gray-500 dark-theme:text-gray-400 text-sm mb-6">Please enter your details to sign in</p>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <input
                    type="text" name="username" placeholder="Username, Email or Roll Number"
                    value={loginData.username} onChange={handleLoginChange} required
                    className="w-full px-4 py-3 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm text-gray-700 dark-theme:text-gray-200 transition-colors"
                  />
                  <div className="relative">
                    <input
                      type={passwordVisibility.login ? 'text' : 'password'}
                      name="password" placeholder="Password" autoComplete="current-password"
                      value={loginData.password} onChange={handleLoginChange} required
                      className="w-full px-4 py-3 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm text-gray-700 dark-theme:text-gray-200 transition-colors pr-10"
                    />
                    <button type="button" onClick={() => togglePasswordVisibility('login')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark-theme:hover:text-gray-300">
                      <i className={passwordVisibility.login ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-gray-600 dark-theme:text-gray-400 cursor-pointer">
                      <input type="checkbox" name="remember" checked={loginData.remember} onChange={handleLoginChange}
                        className="rounded border-gray-300 text-primary focus:ring-primary" />
                      Remember me
                    </label>
                    <button type="button" onClick={() => toggleForm('forgot')}
                      className="text-primary hover:underline font-medium">Forgot password?</button>
                  </div>
                  <button type="submit" disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-primary text-white font-semibold shadow-sm hover:bg-primary-dark transition-all duration-200 disabled:opacity-60">
                    {isSubmitting ? 'Signing in...' : 'Sign in'}
                  </button>
                </form>

                <div className="mt-6">
                  <p className="text-center text-sm text-gray-400 mb-4">Or continue with</p>
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-sand dark-theme:border-gray-700 text-sm font-medium text-gray-700 dark-theme:text-gray-200 hover:bg-cream dark-theme:hover:bg-gray-800 transition-colors">
                      <i className="ri-google-fill text-red-500"></i> Google
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-sand dark-theme:border-gray-700 text-sm font-medium text-gray-700 dark-theme:text-gray-200 hover:bg-cream dark-theme:hover:bg-gray-800 transition-colors">
                      <i className="ri-github-fill"></i> GitHub
                    </button>
                  </div>
                </div>

                <p className="text-center text-sm text-gray-500 dark-theme:text-gray-400 mt-6">
                  Don't have an account?{' '}
                  <button onClick={() => toggleForm('register')} className="text-primary font-semibold hover:underline">Sign up</button>
                </p>
              </div>
            </div>
          )}

          {/* Registration Form */}
          {activeForm === 'register' && (
            <div className="animate-fade-in-up">
              <div className="bg-white dark-theme:bg-gray-900 rounded-2xl border border-sand dark-theme:border-gray-800 w-full overflow-hidden">
                {/* Header */}
                <div className="px-6 pt-6 pb-4 border-b border-sand dark-theme:border-gray-800">
                  <h2 className="text-xl font-semibold text-gray-800 dark-theme:text-gray-100 tracking-tight">Create your account</h2>
                  <p className="text-gray-500 dark-theme:text-gray-400 text-sm mt-1">Fill in each section to complete registration</p>
                </div>

                {/* Step Indicator */}
                <div className="px-6 pt-4 pb-2">
                  <div className="flex items-center justify-between mb-4">
                    {[{n:1,l:'Personal',icon:'ri-user-line'},{n:2,l:'Details',icon:'ri-file-list-line'},{n:3,l:'Photo',icon:'ri-camera-line'},{n:4,l:'Security',icon:'ri-lock-line'}].map((s, i) => (
                      <React.Fragment key={s.n}>
                        <button type="button"
                          onClick={() => {
                            if (s.n < registerStep) { setRegisterStep(s.n); }
                            else if (s.n > registerStep) {
                              let canGo = true;
                              for (let i = 1; i < s.n; i++) { if (!canProceedStep(i)) { canGo = false; break; } }
                              if (canGo) setRegisterStep(s.n);
                              else Swal.fire({ ...getSwalOpts(), icon: 'warning', title: 'Incomplete', text: 'Please fill all required fields before proceeding.', timer: 2000, showConfirmButton: false });
                            }
                          }}
                          className={`flex flex-col items-center gap-1 group cursor-pointer`}>
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-300
                            ${registerStep === s.n ? 'bg-primary text-white shadow-lg shadow-primary/20' : registerStep > s.n ? 'bg-primary/20 text-primary' : 'bg-cream-dark dark-theme:bg-gray-800 text-gray-400 dark-theme:text-gray-500'}`}>
                            {registerStep > s.n ? <i className="ri-check-line text-sm"></i> : <i className={`${s.icon} text-sm`}></i>}
                          </div>
                          <span className={`text-[10px] font-medium tracking-wide uppercase
                            ${registerStep === s.n ? 'text-primary' : registerStep > s.n ? 'text-gray-500 dark-theme:text-gray-400' : 'text-gray-400 dark-theme:text-gray-500'}`}>{s.l}</span>
                        </button>
                        {i < 3 && <div className={`flex-1 h-[1px] mx-2 mt-[-12px] transition-colors duration-300 ${registerStep > s.n ? 'bg-primary/40' : 'bg-sand dark-theme:bg-gray-800'}`}></div>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="px-6 pb-6">
                  {/* Step 1: Personal */}
                  {registerStep === 1 && (
                    <div className="space-y-4 animate-fade-in-up">
                      <div>
                        <label className="text-xs font-medium text-gray-600 dark-theme:text-gray-400 mb-1.5 block tracking-wide">Full Name <span className="text-primary">*</span></label>
                        <input type="text" name="fullName" placeholder="Enter your full name" value={registerData.fullName} onChange={handleRegisterChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-sm text-gray-700 dark-theme:text-gray-200 placeholder-gray-400 dark-theme:placeholder-gray-500 transition-all" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="relative">
                          <label className="text-xs font-medium text-gray-600 dark-theme:text-gray-400 mb-1.5 block tracking-wide">College <span className="text-primary">*</span></label>
                        <div className="relative">
                          <i className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm transition-all duration-300 ${
                            registerData.college
                              ? 'ri-checkbox-circle-fill text-green-500'
                              : collegeSearch
                                ? 'ri-search-line text-primary animate-pulse'
                                : 'ri-search-line text-gray-400 dark-theme:text-gray-500'
                          }`}></i>
                          <input
                            ref={collegeInputRef}
                            type="text"
                            placeholder="Search your college..."
                            value={collegeSearch !== '' ? collegeSearch : registerData.college}
                            onChange={(e) => {
                              setCollegeSearch(e.target.value);
                              setRegisterData(prev => ({ ...prev, college: '', rollNumber: '' }));
                              setShowCollegeDropdown(true);
                            }}
                            onFocus={() => setShowCollegeDropdown(true)}
                            className={`w-full pl-9 pr-9 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border outline-none text-sm text-gray-700 dark-theme:text-gray-200 placeholder-gray-400 dark-theme:placeholder-gray-500 transition-all duration-300 ${
                              registerData.college
                                ? 'border-green-400 dark-theme:border-green-500 ring-1 ring-green-200 dark-theme:ring-green-500/20'
                                : collegeSearch
                                  ? 'border-primary ring-1 ring-primary/20'
                                  : 'border-sand dark-theme:border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary/20'
                            }`}
                            autoComplete="off"
                          />
                          {collegeSearch && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <i className="ri-search-line text-gray-400 text-sm"></i>
                            </div>
                          )}
                          {registerData.college && !collegeLoading && (
                            <button type="button" onClick={() => { setRegisterData(prev => ({ ...prev, college: '', rollNumber: '' })); setCollegeSearch(''); }}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark-theme:hover:text-gray-300 transition-colors cursor-pointer">
                              <i className="ri-close-circle-line text-sm"></i>
                            </button>
                          )}
                        </div>
                        {showCollegeDropdown && collegeResults.length > 0 && (
                          <div ref={collegeDropdownRef} className="absolute z-50 w-full mt-1 max-h-48 overflow-y-auto rounded-xl bg-white dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 shadow-lg">
                            {collegeResults.map((c, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => {
                                  setRegisterData(prev => ({ ...prev, college: c }));
                                  setCollegeSearch('');
                                  setShowCollegeDropdown(false);
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark-theme:text-gray-200 hover:bg-primary/10 dark-theme:hover:bg-primary/20 transition-colors cursor-pointer flex items-center gap-2"
                              >
                                <i className="ri-building-2-line text-xs text-gray-400"></i>
                                {c}
                              </button>
                            ))}
                          </div>
                        )}
                        {showCollegeDropdown && !collegeLoading && collegeSearch.trim().length > 0 && collegeResults.length === 0 && (
                          <div ref={collegeDropdownRef} className="absolute z-50 w-full mt-1 rounded-xl bg-white dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 shadow-lg px-4 py-3 text-sm text-gray-400">
                            No colleges found
                          </div>
                        )}
                        </div>
                        <div className="relative">
                          <label className="text-xs font-medium text-gray-600 dark-theme:text-gray-400 mb-1.5 block tracking-wide">Department <span className="text-primary">*</span></label>
                          <div className="relative">
                            <i className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm transition-all duration-300 ${
                              registerData.department
                                ? 'ri-checkbox-circle-fill text-green-500'
                                : deptSearch
                                  ? 'ri-search-line text-primary animate-pulse'
                                  : 'ri-search-line text-gray-400 dark-theme:text-gray-500'
                            }`}></i>
                            <input
                              ref={deptInputRef}
                              type="text"
                              placeholder="Search department..."
                              value={deptSearch !== '' ? deptSearch : selectedDeptLabel}
                              onChange={(e) => {
                                setDeptSearch(e.target.value);
                                setSelectedDeptLabel('');
                                // Clear department so roll number recalculates
                                setRegisterData(prev => ({ ...prev, department: '', ...(isMKC ? { rollNumber: '' } : {}) }));
                                setShowDeptDropdown(true);
                              }}
                              onFocus={() => setShowDeptDropdown(true)}
                              className={`w-full pl-9 pr-9 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border outline-none text-sm text-gray-700 dark-theme:text-gray-200 placeholder-gray-400 dark-theme:placeholder-gray-500 transition-all duration-300 ${
                                registerData.department
                                  ? 'border-green-400 dark-theme:border-green-500 ring-1 ring-green-200 dark-theme:ring-green-500/20'
                                  : deptSearch
                                    ? 'border-primary ring-1 ring-primary/20'
                                    : 'border-sand dark-theme:border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary/20'
                              }`}
                              autoComplete="off"
                            />
                          {deptSearch && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <i className="ri-search-line text-gray-400 text-sm"></i>
                            </div>
                          )}
                            {registerData.department && !deptLoading && (
                              <button type="button" onClick={() => { setRegisterData(prev => ({ ...prev, department: '', year: '', rollNumber: '' })); setDeptSearch(''); setSelectedDeptLabel(''); }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark-theme:hover:text-gray-300 transition-colors cursor-pointer">
                                <i className="ri-close-circle-line text-sm"></i>
                              </button>
                            )}
                          </div>
                          {showDeptDropdown && deptResults.length > 0 && (
                            <div ref={deptDropdownRef} className="absolute z-50 w-full mt-1 max-h-48 overflow-y-auto rounded-xl bg-white dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 shadow-lg">
                              {deptResults.map((d, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => {
                                    let rollUpdate = {};
                                    if (isMKC) {
                                      const yCode = yearCodes[registerData.year] || '';
                                      const dCode = getDeptCode(d.code, registerData.year);
                                      const prefix = (yCode && dCode) ? yCode + dCode : '';
                                      rollUpdate = { rollNumber: prefix };
                                    }
                                    setRegisterData(prev => ({ ...prev, department: d.code, ...rollUpdate }));
                                    setSelectedDeptLabel(d.label);
                                    setDeptSearch('');
                                    setShowDeptDropdown(false);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark-theme:text-gray-200 hover:bg-primary/10 dark-theme:hover:bg-primary/20 transition-colors cursor-pointer flex items-center gap-2"
                                >
                                  <i className="ri-graduation-cap-line text-xs text-gray-400"></i>
                                  <span><span className="font-medium text-primary">{d.degree}</span> - {d.name}</span>
                                </button>
                              ))}
                            </div>
                          )}
                          {showDeptDropdown && !deptLoading && deptSearch.trim().length > 0 && deptResults.length === 0 && (
                            <div ref={deptDropdownRef} className="absolute z-50 w-full mt-1 rounded-xl bg-white dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 shadow-lg px-4 py-3 text-sm text-gray-400">
                              No departments found
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-medium text-gray-600 dark-theme:text-gray-400 mb-1.5 block tracking-wide">Year <span className="text-primary">*</span></label>
                          <select name="year" value={registerData.year} onChange={handleRegisterChange}
                            className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm text-gray-700 dark-theme:text-gray-200 transition-all appearance-none cursor-pointer">
                            <option value="">Select</option>
                            {getFilteredYears().map(y => <option key={y} value={y}>{y}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-600 dark-theme:text-gray-400 mb-1.5 block tracking-wide">Register Number <span className="text-primary">*</span></label>
                          <div className="relative">
                            <input type="text" name="rollNumber"
                              placeholder={isMKC ? (rollPrefix ? rollPrefix + '...' : 'Select dept & year first') : 'Enter your Register number'}
                              value={registerData.rollNumber} onChange={handleRegisterChange} maxLength={isMKC ? 12 : 20}
                              className={`w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border outline-none text-sm text-gray-700 dark-theme:text-gray-200 placeholder-gray-400 dark-theme:placeholder-gray-500 transition-all pr-16
                                ${registerData.rollNumber && (isRollNumberValid ? 'border-emerald-500/50 focus:border-emerald-500' : 'border-amber-500/50 focus:border-amber-500') || 'border-sand dark-theme:border-gray-700 focus:border-primary'}`} />
                            {isMKC && (
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-gray-400 dark-theme:text-gray-500">
                                {registerData.rollNumber.length}/12
                              </span>
                            )}
                          </div>
                          {isMKC && rollPrefix && <p className="text-[10px] text-gray-500 dark-theme:text-gray-500 mt-1 font-mono">Prefix: {rollPrefix} (auto-filled) &middot; {academicConfig?.academicYear || ''}</p>}
                          {!isMKC && registerData.college && <p className="text-[10px] text-gray-500 dark-theme:text-gray-500 mt-1">Enter your college roll number</p>}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-medium text-gray-600 dark-theme:text-gray-400 mb-1.5 block tracking-wide">Email <span className="text-primary">*</span></label>
                          <input type="email" name="email" placeholder="you@example.com" value={registerData.email} onChange={handleRegisterChange}
                            className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm text-gray-700 dark-theme:text-gray-200 placeholder-gray-400 dark-theme:placeholder-gray-500 transition-all" />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-600 dark-theme:text-gray-400 mb-1.5 block tracking-wide">Phone <span className="text-primary">*</span></label>
                          <input type="tel" name="phone" placeholder="9876543210" value={registerData.phone} onChange={handleRegisterChange} maxLength="15"
                            className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm text-gray-700 dark-theme:text-gray-200 placeholder-gray-400 dark-theme:placeholder-gray-500 transition-all" />
                        </div>
                      </div>

                      <button type="button" onClick={nextStep} disabled={!canProceedStep(1)}
                        className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm shadow-lg shadow-primary/10">
                        Continue <i className="ri-arrow-right-line text-base"></i>
                      </button>
                    </div>
                  )}

                  {/* Step 2: Additional */}
                  {registerStep === 2 && (
                    <div className="space-y-4 animate-fade-in-up">
                      <p className="text-xs text-gray-500 dark-theme:text-gray-500 flex items-center gap-1.5"><i className="ri-information-line text-primary"></i> All fields below are optional</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-medium text-gray-600 dark-theme:text-gray-400 mb-1.5 block tracking-wide">Gender</label>
                          <select name="gender" value={registerData.gender} onChange={handleRegisterChange}
                            className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm text-gray-700 dark-theme:text-gray-200 transition-all appearance-none cursor-pointer">
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-600 dark-theme:text-gray-400 mb-1.5 block tracking-wide">Date of Birth</label>
                          <input type="date" name="dateOfBirth" value={registerData.dateOfBirth} onChange={handleRegisterChange}
                            className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm text-gray-700 dark-theme:text-gray-200 transition-all" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 dark-theme:text-gray-400 mb-1.5 block tracking-wide">Address</label>
                        <textarea name="address" placeholder="Your address" value={registerData.address} onChange={handleRegisterChange} rows="2"
                          className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm text-gray-700 dark-theme:text-gray-200 placeholder-gray-400 dark-theme:placeholder-gray-500 transition-all resize-none"></textarea>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 dark-theme:text-gray-400 mb-1.5 block tracking-wide">Bio / Tagline</label>
                        <input type="text" name="bio" placeholder="A short line about you" value={registerData.bio} onChange={handleRegisterChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm text-gray-700 dark-theme:text-gray-200 placeholder-gray-400 dark-theme:placeholder-gray-500 transition-all" />
                      </div>

                      <div className="border-t border-sand dark-theme:border-gray-800 pt-3 mt-2">
                        <p className="text-xs font-medium text-gray-600 dark-theme:text-gray-400 mb-3 flex items-center gap-1.5 tracking-wide"><i className="ri-links-line text-primary"></i> Social Profiles</p>
                        <div className="space-y-2.5">
                          {[
                            { name: 'github', icon: 'ri-github-fill', color: 'text-gray-800 dark-theme:text-gray-200', placeholder: 'github.com/username' },
                            { name: 'linkedin', icon: 'ri-linkedin-box-fill', color: 'text-[#0a66c2]', placeholder: 'linkedin.com/in/username' },
                            { name: 'hackerrank', icon: 'ri-code-box-fill', color: 'text-[#2ec866]', placeholder: 'hackerrank.com/username' },
                            { name: 'leetcode', icon: 'ri-terminal-box-fill', color: 'text-[#ffa116]', placeholder: 'leetcode.com/u/username' }
                          ].map(s => (
                            <div key={s.name} className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 flex items-center justify-center flex-shrink-0">
                                <i className={`${s.icon} ${s.color} text-sm`}></i>
                              </div>
                              <input type="url" name={s.name} placeholder={s.placeholder} value={registerData[s.name]} onChange={handleRegisterChange}
                                className="flex-1 px-3 py-2 rounded-lg bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-xs text-gray-700 dark-theme:text-gray-200 placeholder-gray-400 dark-theme:placeholder-gray-500 transition-all" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button type="button" onClick={prevStep}
                          className="flex-1 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 text-gray-600 dark-theme:text-gray-400 font-medium hover:bg-cream-dark dark-theme:hover:bg-gray-700 transition-all flex items-center justify-center gap-2 text-sm">
                          <i className="ri-arrow-left-line"></i> Back
                        </button>
                        <button type="button" onClick={nextStep}
                          className="flex-[2] py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-primary/10">
                          Continue <i className="ri-arrow-right-line"></i>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Profile Photo */}
                  {registerStep === 3 && (
                    <div className="space-y-6 animate-fade-in-up">
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                          <i className="ri-camera-fill text-primary text-xl"></i>
                        </div>
                        <p className="text-sm font-medium text-gray-800 dark-theme:text-gray-100">Profile Photo</p>
                        <p className="text-xs text-gray-500 dark-theme:text-gray-500 mt-1">Optional — you can always add one later</p>
                      </div>
                      <div className="flex justify-center">
                        <label className="relative cursor-pointer group">
                          <div className={`w-32 h-32 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-all duration-300
                            ${registerData.profilePreview ? 'border-primary bg-cream dark-theme:bg-gray-800' : 'border-sand dark-theme:border-gray-700 bg-cream dark-theme:bg-gray-800 group-hover:border-gray-400 dark-theme:group-hover:border-gray-600 group-hover:bg-cream-dark dark-theme:group-hover:bg-gray-700'}`}>
                            {registerData.profilePreview ? (
                              <img src={registerData.profilePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                            ) : (
                              <div className="text-center">
                                <i className="ri-upload-2-line text-2xl text-gray-400 dark-theme:text-gray-500 group-hover:text-gray-600 dark-theme:group-hover:text-gray-300 transition-colors"></i>
                                <p className="text-[10px] text-gray-400 dark-theme:text-gray-500 mt-1 group-hover:text-gray-600 dark-theme:group-hover:text-gray-300">Click to upload</p>
                              </div>
                            )}
                          </div>
                          <input type="file" accept="image/*" onChange={handleProfileImageChange} className="hidden" />
                          {registerData.profilePreview && (
                            <button type="button" onClick={(e) => { e.preventDefault(); removeProfileImage(); }}
                              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500/90 text-white flex items-center justify-center text-xs hover:bg-red-600 transition-colors shadow-lg">
                              <i className="ri-close-line"></i>
                            </button>
                          )}
                        </label>
                      </div>
                      <div className="text-center space-y-1">
                        <p className="text-[11px] text-gray-500 dark-theme:text-gray-500">Square image, at least 200×200px</p>
                        <p className="text-[10px] text-gray-400 dark-theme:text-gray-500">Max 5MB — JPG, PNG, or WebP</p>
                      </div>
                      <div className="flex gap-3">
                        <button type="button" onClick={prevStep}
                          className="flex-1 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 text-gray-600 dark-theme:text-gray-400 font-medium hover:bg-cream-dark dark-theme:hover:bg-gray-700 transition-all flex items-center justify-center gap-2 text-sm">
                          <i className="ri-arrow-left-line"></i> Back
                        </button>
                        <button type="button" onClick={nextStep}
                          className="flex-[2] py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-primary/10">
                          Continue <i className="ri-arrow-right-line"></i>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Account Security */}
                  {registerStep === 4 && (
                    <form onSubmit={handleRegisterSubmit} className="space-y-4 animate-fade-in-up">
                      <div>
                        <label className="text-xs font-medium text-gray-600 dark-theme:text-gray-400 mb-1.5 block tracking-wide">Username <span className="text-primary">*</span></label>
                        <input type="text" name="username" placeholder="Choose a unique username" value={registerData.username} onChange={handleRegisterChange}
                          className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm text-gray-700 dark-theme:text-gray-200 placeholder-gray-400 dark-theme:placeholder-gray-500 transition-all" />
                        <p className="text-[10px] text-gray-400 dark-theme:text-gray-500 mt-1">Min 4 characters — letters, numbers, underscores</p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 dark-theme:text-gray-400 mb-1.5 block tracking-wide">Password <span className="text-primary">*</span></label>
                        <div className="relative">
                          <input type={passwordVisibility.register ? 'text' : 'password'} name="password" placeholder="Create a strong password" autoComplete="new-password" value={registerData.password} onChange={handleRegisterChange}
                            className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm text-gray-700 dark-theme:text-gray-200 placeholder-gray-400 dark-theme:placeholder-gray-500 transition-all pr-10" />
                          <button type="button" onClick={() => togglePasswordVisibility('register')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark-theme:hover:text-gray-300 transition-colors">
                            <i className={passwordVisibility.register ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 dark-theme:text-gray-400 mb-1.5 block tracking-wide">Confirm Password <span className="text-primary">*</span></label>
                        <div className="relative">
                          <input type={passwordVisibility.registerConfirm ? 'text' : 'password'} name="confirmPassword" placeholder="Re-enter your password" autoComplete="new-password" value={registerData.confirmPassword} onChange={handleRegisterChange}
                            className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm text-gray-700 dark-theme:text-gray-200 placeholder-gray-400 dark-theme:placeholder-gray-500 transition-all pr-10" />
                          <button type="button" onClick={() => togglePasswordVisibility('registerConfirm')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark-theme:hover:text-gray-300 transition-colors">
                            <i className={passwordVisibility.registerConfirm ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                          </button>
                        </div>
                      </div>

                      {/* Password strength */}
                      <div className="bg-cream dark-theme:bg-gray-800 rounded-xl p-3 border border-sand dark-theme:border-gray-700">
                        <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                          {[
                            { key: 'length', label: '6+ characters' },
                            { key: 'upper', label: 'Uppercase' },
                            { key: 'number', label: 'Number' },
                            { key: 'lower', label: 'Lowercase' },
                            { key: 'special', label: 'Special char' },
                            { key: 'match', label: 'Passwords match' }
                          ].map(c => (
                            <div key={c.key} className="flex items-center gap-1.5">
                              <i className={`text-xs ${pwChecks[c.key] ? 'ri-checkbox-circle-fill text-emerald-500' : 'ri-checkbox-blank-circle-line text-gray-300 dark-theme:text-gray-600'}`}></i>
                              <span className={`text-[10px] font-medium ${pwChecks[c.key] ? 'text-gray-600 dark-theme:text-gray-400' : 'text-gray-400 dark-theme:text-gray-500'}`}>{c.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-1">
                        <button type="button" onClick={prevStep}
                          className="flex-1 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 text-gray-600 dark-theme:text-gray-400 font-medium hover:bg-cream-dark dark-theme:hover:bg-gray-700 transition-all flex items-center justify-center gap-2 text-sm">
                          <i className="ri-arrow-left-line"></i> Back
                        </button>
                        <button type="submit" disabled={isSubmitting || !pwChecks.length || !pwChecks.upper || !pwChecks.lower || !pwChecks.number || !pwChecks.special || !pwChecks.match || !registerData.username || registerData.username.length < 4}
                          className="flex-[2] py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm shadow-lg shadow-primary/10">
                          {isSubmitting ? (
                            <><i className="ri-user-add-line"></i> Creating...</>
                          ) : (
                            <><i className="ri-user-add-line"></i> Create Account</>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-sand dark-theme:border-gray-800 bg-cream-dark/50 dark-theme:bg-gray-950/50">
                  <p className="text-center text-xs text-gray-500 dark-theme:text-gray-500">
                    Already have an account?{' '}
                    <button onClick={() => { toggleForm('login'); setRegisterStep(1); }} className="text-primary font-medium hover:underline">Sign in</button>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Forgot Password Form */}
          {activeForm === 'forgot' && (
            <div className="animate-fade-in-up">
              <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-8 border border-sand dark-theme:border-gray-800">
                {/* Step 1: Email */}
                {forgotStep === 1 && (
                  <>
                    <h2 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100 mb-1">Reset Password</h2>
                    <p className="text-gray-500 dark-theme:text-gray-400 text-sm mb-6">Enter your email to receive OTP</p>
                    <form onSubmit={handleForgotEmailSubmit} className="space-y-4">
                      <input type="email" name="email" placeholder="Enter your email address"
                        value={forgotData.email} onChange={handleForgotChange} required
                        className="w-full px-4 py-3 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm text-gray-700 dark-theme:text-gray-200 transition-colors" />
                      <button type="submit" disabled={isSubmitting}
                        className="w-full py-3 rounded-xl bg-primary text-white font-semibold shadow-sm hover:bg-primary-dark transition-all duration-200 disabled:opacity-60">
                        {isSubmitting ? 'Sending...' : 'Send OTP'}
                      </button>
                    </form>
                  </>
                )}

                {/* Step 2: OTP */}
                {forgotStep === 2 && (
                  <>
                    <h2 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100 mb-1">Enter OTP</h2>
                    <p className="text-gray-500 dark-theme:text-gray-400 text-sm mb-6">Please enter the OTP sent to your email</p>
                    <form onSubmit={handleOTPSubmit} className="space-y-4">
                      <div className="flex justify-center gap-3">
                        {forgotData.otp.map((digit, index) => (
                          <input key={index} type="text" maxLength="1" pattern="[0-9]" inputMode="numeric"
                            value={digit}
                            onChange={(e) => handleOTPChange(index, e.target.value)}
                            onKeyDown={(e) => handleOTPKeyDown(index, e)}
                            required
                            className="otp-input w-12 h-12 text-center text-lg font-bold rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-gray-700 dark-theme:text-gray-200 transition-colors" />
                        ))}
                      </div>
                      <button type="submit" disabled={isSubmitting}
                        className="w-full py-3 rounded-xl bg-primary text-white font-semibold shadow-sm hover:bg-primary-dark transition-all duration-200 disabled:opacity-60">
                        {isSubmitting ? 'Verifying...' : 'Verify OTP'}
                      </button>
                    </form>
                  </>
                )}

                {/* Step 3: New Password */}
                {forgotStep === 3 && (
                  <>
                    <h2 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100 mb-1">Set New Password</h2>
                    <p className="text-gray-500 dark-theme:text-gray-400 text-sm mb-6">Enter your new password</p>
                    <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                      <div className="relative">
                        <input type={passwordVisibility.newPassword ? 'text' : 'password'}
                          name="newPassword" placeholder="New password" autoComplete="new-password"
                          value={forgotData.newPassword} onChange={handleForgotChange} required
                          className="w-full px-4 py-3 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm text-gray-700 dark-theme:text-gray-200 transition-colors pr-10" />
                        <button type="button" onClick={() => togglePasswordVisibility('newPassword')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark-theme:hover:text-gray-300">
                          <i className={passwordVisibility.newPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                        </button>
                      </div>
                      <div className="relative">
                        <input type={passwordVisibility.confirmPassword ? 'text' : 'password'}
                          name="confirmPassword" placeholder="Confirm password" autoComplete="new-password"
                          value={forgotData.confirmPassword} onChange={handleForgotChange} required
                          className="w-full px-4 py-3 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm text-gray-700 dark-theme:text-gray-200 transition-colors pr-10" />
                        <button type="button" onClick={() => togglePasswordVisibility('confirmPassword')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark-theme:hover:text-gray-300">
                          <i className={passwordVisibility.confirmPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
                        </button>
                      </div>
                      <button type="submit" disabled={isSubmitting}
                        className="w-full py-3 rounded-xl bg-primary text-white font-semibold shadow-sm hover:bg-primary-dark transition-all duration-200 disabled:opacity-60">
                        {isSubmitting ? 'Resetting...' : 'Reset Password'}
                      </button>
                    </form>
                  </>
                )}

                <p className="text-center text-sm text-gray-500 dark-theme:text-gray-400 mt-6">
                  Remember your password?{' '}
                  <button onClick={() => toggleForm('login')} className="text-primary font-semibold hover:underline">Sign in</button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Crop Modal */}
      {cropModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleCropCancel}></div>
          <div className="relative bg-white dark-theme:bg-gray-900 rounded-2xl border border-sand dark-theme:border-gray-700 w-[90vw] max-w-lg mx-4 overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-sand dark-theme:border-gray-700">
              <div className="flex items-center gap-2">
                <i className="ri-crop-line text-primary text-lg"></i>
                <h3 className="text-gray-800 dark-theme:text-gray-100 font-semibold text-sm">Crop Profile Photo</h3>
              </div>
              <button onClick={handleCropCancel} className="w-7 h-7 rounded-lg bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 flex items-center justify-center text-gray-500 dark-theme:text-gray-400 hover:text-gray-800 dark-theme:hover:text-white hover:border-gray-400 dark-theme:hover:border-gray-500 transition-all">
                <i className="ri-close-line text-sm"></i>
              </button>
            </div>
            {/* Cropper */}
            <div className="relative w-full" style={{ height: '350px', background: '#111' }}>
              <Cropper
                image={cropImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            {/* Zoom Slider */}
            <div className="px-5 py-3 border-t border-sand dark-theme:border-gray-700 bg-white dark-theme:bg-gray-900">
              <div className="flex items-center gap-3">
                <i className="ri-subtract-line text-gray-500 dark-theme:text-gray-400 text-sm"></i>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.05}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="flex-1 h-1 appearance-none rounded-full bg-sand dark-theme:bg-gray-700 outline-none cursor-pointer"
                  style={{
                    accentColor: '#d4a574'
                  }}
                />
                <i className="ri-add-line text-gray-500 dark-theme:text-gray-400 text-sm"></i>
              </div>
            </div>
            {/* Actions */}
            <div className="flex gap-3 px-5 py-4 border-t border-sand dark-theme:border-gray-700">
              <button type="button" onClick={handleCropCancel}
                className="flex-1 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 text-gray-600 dark-theme:text-gray-400 font-medium hover:bg-cream-dark dark-theme:hover:bg-gray-700 hover:border-gray-400 dark-theme:hover:border-gray-500 transition-all text-sm">
                Cancel
              </button>
              <button type="button" onClick={handleCropConfirm}
                className="flex-[2] py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all text-sm shadow-lg shadow-primary/10 flex items-center justify-center gap-2">
                <i className="ri-check-line"></i> Apply Crop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
