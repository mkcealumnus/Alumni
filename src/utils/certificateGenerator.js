import { jsPDF } from 'jspdf';

/**
 * Generate and download a course completion certificate PDF.
 * @param {Object} data
 * @param {string} data.studentName
 * @param {string} data.courseTitle
 * @param {string} [data.courseCode]
 * @param {string} [data.category]
 * @param {string} [data.mentorName]
 * @param {string} [data.completedAt]
 * @param {string} [data.enrolledAt]
 */
export const generateCertificate = (data) => {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();

  // Background  
  doc.setFillColor(255, 253, 248); // cream
  doc.rect(0, 0, w, h, 'F');

  // Decorative border
  doc.setDrawColor(201, 100, 66); // #c96442 primary
  doc.setLineWidth(2);
  doc.rect(10, 10, w - 20, h - 20);
  doc.setLineWidth(0.5);
  doc.rect(14, 14, w - 28, h - 28);

  // Corner decorations
  const cornerSize = 20;
  const corners = [[14, 14], [w - 14, 14], [14, h - 14], [w - 14, h - 14]];
  doc.setDrawColor(201, 100, 66);
  doc.setLineWidth(1);
  corners.forEach(([cx, cy]) => {
    const xd = cx < w / 2 ? 1 : -1;
    const yd = cy < h / 2 ? 1 : -1;
    doc.line(cx, cy, cx + cornerSize * xd, cy);
    doc.line(cx, cy, cx, cy + cornerSize * yd);
  });

  // Top decorative line
  doc.setDrawColor(201, 100, 66);
  doc.setLineWidth(0.8);
  doc.line(w / 2 - 60, 35, w / 2 + 60, 35);

  // "CERTIFICATE" heading
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(36);
  doc.setTextColor(201, 100, 66);
  doc.text('CERTIFICATE', w / 2, 52, { align: 'center' });

  // "OF COMPLETION"
  doc.setFontSize(16);
  doc.setTextColor(100, 100, 100);
  doc.text('OF COMPLETION', w / 2, 62, { align: 'center' });

  // Decorative line
  doc.setDrawColor(201, 100, 66);
  doc.setLineWidth(0.4);
  doc.line(w / 2 - 40, 67, w / 2 + 40, 67);

  // "This certificate is proudly presented to"
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(120, 120, 120);
  doc.text('This certificate is proudly presented to', w / 2, 80, { align: 'center' });

  // Student Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(40, 40, 40);
  doc.text(data.studentName || 'Student', w / 2, 96, { align: 'center' });

  // Underline for name
  const nameWidth = doc.getTextWidth(data.studentName || 'Student');
  doc.setDrawColor(201, 100, 66);
  doc.setLineWidth(0.6);
  doc.line(w / 2 - nameWidth / 2 - 5, 99, w / 2 + nameWidth / 2 + 5, 99);

  // "for successfully completing"
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(120, 120, 120);
  doc.text('for successfully completing the course', w / 2, 112, { align: 'center' });

  // Course Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(201, 100, 66);
  const courseText = data.courseTitle || 'Course';
  doc.text(courseText, w / 2, 126, { align: 'center' });

  // Course code + category
  if (data.courseCode || data.category) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(140, 140, 140);
    const subText = [data.courseCode, data.category].filter(Boolean).join(' • ');
    doc.text(subText, w / 2, 134, { align: 'center' });
  }

  // Dates
  const completedDate = data.completedAt ? new Date(data.completedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const enrolledDate = data.enrolledAt ? new Date(data.enrolledAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  if (enrolledDate) {
    doc.text(`Enrolled: ${enrolledDate}  •  Completed: ${completedDate}`, w / 2, 145, { align: 'center' });
  } else {
    doc.text(`Completed on: ${completedDate}`, w / 2, 145, { align: 'center' });
  }

  // Bottom section - Instructor & Platform
  const bottomY = h - 45;

  // Instructor signature area
  doc.setDrawColor(160, 160, 160);
  doc.setLineWidth(0.3);
  doc.line(w / 2 - 90, bottomY, w / 2 - 30, bottomY);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(data.mentorName || 'Instructor', w / 2 - 60, bottomY + 6, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(140, 140, 140);
  doc.text('Course Instructor', w / 2 - 60, bottomY + 12, { align: 'center' });

  // Platform signature area
  doc.line(w / 2 + 30, bottomY, w / 2 + 90, bottomY);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(201, 100, 66);
  doc.text('Sowberry', w / 2 + 60, bottomY + 6, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(140, 140, 140);
  doc.text('Learning Platform', w / 2 + 60, bottomY + 12, { align: 'center' });

  // Certificate ID (hash-like)
  const certId = `SOW-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(180, 180, 180);
  doc.text(`Certificate ID: ${certId}`, w / 2, h - 18, { align: 'center' });

  // Download
  const fileName = `Sowberry_Certificate_${(data.courseTitle || 'Course').replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  doc.save(fileName);
};
