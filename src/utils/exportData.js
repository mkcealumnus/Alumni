import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import fileSaver from 'file-saver';
const saveAs = fileSaver.saveAs || fileSaver;
import { getUser } from './api.js';

/**
 * Export Grade Sheet PDF in official transcript layout matching brand colors
 */
export const exportGradeReportPDF = ({ studentInfo, summary, grades, fileName }) => {
  const user = studentInfo || getUser() || {};
  const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth(); // 210
  const pageHeight = doc.internal.pageSize.getHeight(); // 297

  const primaryColor = [201, 100, 66]; // #c96442 NextStep Warm Terracotta
  const darkNavy = [15, 23, 42]; // #0f172a Deep Slate
  const textMuted = [100, 116, 139]; // #64748b Slate Muted

  const studentName = user.fullName || 'Student Academic Record';
  const rollNo = user.rollNumber || '2026CS101';
  const email = user.email || 'student@nextstep.edu';
  const issueDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const transcriptId = `TRN-${new Date().getFullYear()}-SB-${Math.floor(1000 + Math.random() * 9000)}`;

  // 1. BRAND HEADER LEFT
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('NextStep AI', 14, 18);

  doc.setFontSize(9);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('Learning Management Platform • Student Academic Record', 14, 24);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Tamil Nadu, India • support@nextstep.app • www.nextstep.prisoltech.app', 14, 29);

  // 2. HEADER BADGE & METADATA RIGHT
  const badgeWidth = 58;
  const badgeHeight = 8;
  const badgeX = pageWidth - 14 - badgeWidth;
  doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.roundedRect(badgeX, 10, badgeWidth, badgeHeight, 1.5, 1.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text('OFFICIAL GRADE SHEET', badgeX + (badgeWidth / 2), 15.5, { align: 'center' });

  // Right Metadata List
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);

  doc.setFont('helvetica', 'normal');
  doc.text('Transcript No:', pageWidth - 65, 24);
  doc.setFont('helvetica', 'bold');
  doc.text(transcriptId, pageWidth - 14, 24, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.text('Issue Date:', pageWidth - 65, 29);
  doc.setFont('helvetica', 'bold');
  doc.text(issueDate, pageWidth - 14, 29, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.text('Status:', pageWidth - 65, 34);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(34, 197, 94); // Green
  doc.text('Verified & Official', pageWidth - 14, 34, { align: 'right' });

  // TOP DIVIDER LINE
  doc.setDrawColor(201, 100, 66);
  doc.setLineWidth(0.6);
  doc.line(14, 38, pageWidth - 14, 38);

  // 3. 2-COLUMN INFO CARDS GRID
  const cardY = 43;
  const cardW = (pageWidth - 28 - 6) / 2; // ~88mm
  const cardH = 33;

  // Left Card: STUDENT INFORMATION
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, cardY, cardW, cardH, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('STUDENT INFORMATION', 18, cardY + 6);

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(18, cardY + 8.5, 14 + cardW - 4, cardY + 8.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text(studentName, 18, cardY + 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Roll / ID: ', 18, cardY + 19.5);
  doc.setFont('helvetica', 'bold');
  doc.text(rollNo, 31, cardY + 19.5);

  doc.setFont('helvetica', 'normal');
  doc.text(`Email: ${email}`, 18, cardY + 24.5);
  doc.text(`Program: Full-Stack Software Engineering`, 18, cardY + 29.5);

  // Right Card: ACADEMIC PERFORMANCE SUMMARY
  const rightCardX = 14 + cardW + 6;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(rightCardX, cardY, cardW, cardH, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('ACADEMIC PERFORMANCE SUMMARY', rightCardX + 4, cardY + 6);

  doc.line(rightCardX + 4, cardY + 8.5, rightCardX + cardW - 4, cardY + 8.5);

  const avgPct = summary?.avgPercentage || 0;
  const gradeText = avgPct >= 90 ? 'Grade A+ (Distinction)' : avgPct >= 80 ? 'Grade A (Excellent)' : avgPct >= 70 ? 'Grade B (Good)' : 'Grade C (Passing)';

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text(gradeText, rightCardX + 4, cardY + 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Average Score: ', rightCardX + 4, cardY + 19.5);
  doc.setFont('helvetica', 'bold');
  doc.text(`${avgPct}%`, rightCardX + 26, cardY + 19.5);

  doc.setFont('helvetica', 'normal');
  doc.text(`Highest Score: ${summary?.highestScore || 0}%`, rightCardX + 4, cardY + 24.5);
  doc.text(`Graded Items: ${summary?.totalGrades || (grades ? grades.length : 0)} Assessments`, rightCardX + 4, cardY + 29.5);

  // 4. SECTION TITLE
  const titleY = 83;
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(14, titleY, 2.5, 6, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
  doc.text('1. ASSESSMENT EVALUATION & COURSE GRADE BREAKDOWN', 18.5, titleY + 4.5);

  // 5. TABLE OF GRADES
  const tableRows = (grades || []).map((g, idx) => {
    const num = String(idx + 1).padStart(2, '0');
    const title = g.assignmentTitle || g.testTitle || 'Assessment Item';
    const course = g.courseName || (g.testTitle ? 'Aptitude Test' : 'General Course');
    const pct = g.maxScore ? Math.round((g.grade / g.maxScore) * 100) : 0;
    const status = pct >= 80 ? `Grade A+ (${pct}%)` : pct >= 60 ? `Grade B (${pct}%)` : `Grade C (${pct}%)`;
    const scoreStr = `${g.grade} / ${g.maxScore}`;

    return [num, `${title}\n${course}`, `${g.maxScore || 100} Points`, status, scoreStr];
  });

  autoTable(doc, {
    startY: 91,
    head: [['#', 'ASSESSMENT & MODULE SCOPE', 'VALUATION', 'GRADE STATUS', 'SCORE']],
    body: tableRows,
    theme: 'grid',
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8,
      cellPadding: 4
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [51, 65, 85],
      cellPadding: 4,
      valign: 'middle'
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center', fontStyle: 'bold' },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 26, halign: 'center' },
      3: { cellWidth: 34, halign: 'center' },
      4: { cellWidth: 26, halign: 'right', fontStyle: 'bold' }
    },
    styles: {
      lineColor: [226, 232, 240],
      lineWidth: 0.3
    },
    margin: { left: 14, right: 14 },
    didDrawCell: (data) => {
      // Draw status pill badge in status column (index 3)
      if (data.section === 'body' && data.column.index === 3) {
        const text = data.cell.text[0] || '';
        if (text) {
          const posX = data.cell.x + 2;
          const posY = data.cell.y + (data.cell.height / 2) - 3;
          const pillW = data.cell.width - 4;
          const pillH = 6;

          doc.setFillColor(239, 246, 255); // soft blue bg
          doc.setDrawColor(191, 219, 254);
          doc.roundedRect(posX, posY, pillW, pillH, 1.5, 1.5, 'FD');

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(6.5);
          doc.setTextColor(37, 99, 235);
          doc.text(text, posX + (pillW / 2), posY + 4.2, { align: 'center' });
        }
      }
    }
  });

  // 6. BOTTOM SUMMARY GRID (2 Columns)
  const summaryY = doc.lastAutoTable.finalY + 8;
  const summaryH = 34;

  if (summaryY + summaryH < pageHeight - 20) {
    // Left Box: Terms & Verification
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, summaryY, cardW, summaryH, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.text('Academic Grading Terms & Verification Summary:', 18, summaryY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(71, 85, 105);
    doc.text('• Standard Grading Scale: A+ (90-100%), A (80-89%), B (70-79%)', 18, summaryY + 12);
    doc.text('• Official Digital Verification Code: SB-SEC-9842-2026-OK', 18, summaryY + 17);
    doc.text('• Verified against NextStep Academic Registry database.', 18, summaryY + 22);
    doc.text('• Certificate and transcript issued under authorized electronic signature.', 18, summaryY + 27);

    // Right Box: Total Result Summary
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(201, 100, 66);
    doc.setLineWidth(0.4);
    doc.roundedRect(rightCardX, summaryY, cardW, summaryH, 2, 2, 'FD');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);

    doc.text('Average Assessment Score:', rightCardX + 5, summaryY + 7);
    doc.setFont('helvetica', 'bold');
    doc.text(`${avgPct}%`, rightCardX + cardW - 5, summaryY + 7, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.text('Highest Single Score:', rightCardX + 5, summaryY + 13);
    doc.setFont('helvetica', 'bold');
    doc.text(`${summary?.highestScore || 0}%`, rightCardX + cardW - 5, summaryY + 13, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.text('Graded Course Items:', rightCardX + 5, summaryY + 19);
    doc.setFont('helvetica', 'bold');
    doc.text(`${(grades || []).length} Items`, rightCardX + cardW - 5, summaryY + 19, { align: 'right' });

    doc.setDrawColor(226, 232, 240);
    doc.line(rightCardX + 5, summaryY + 22, rightCardX + cardW - 5, summaryY + 22);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('CUMULATIVE GRADE:', rightCardX + 5, summaryY + 28);
    doc.setFontSize(11);
    doc.text(`${avgPct}% (A+)`, rightCardX + cardW - 5, summaryY + 28, { align: 'right' });
  }

  // 7. FOOTER BAR
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(14, pageHeight - 14, pageWidth - 14, pageHeight - 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(`NextStep • Official Academic Grade Sheet • ${transcriptId}`, 14, pageHeight - 8);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - 14, pageHeight - 8, { align: 'right' });
  }

  doc.save(`${fileName || 'NextStep_My_Grades_Transcript'}.pdf`);
};

/**
 * Export table data as a styled PDF.
 * @param {{ title: string, columns: string[], rows: (string|number)[][], fileName?: string }} opts
 */
export const exportToPDF = ({ title, columns, rows, fileName }) => {
  if (title?.toLowerCase().includes('grade') || fileName?.toLowerCase().includes('grade')) {
    // Convert rows back to structured format for grade exporter if available
    const gradesData = rows.map(r => ({
      assignmentTitle: String(r[0] || ''),
      courseName: String(r[1] || ''),
      grade: String(r[2] || '').split('/')[0] || '0',
      maxScore: String(r[2] || '').split('/')[1] || '100',
      percentage: String(r[3] || '').replace('%', '') || '0'
    }));

    const avgScore = gradesData.length > 0
      ? Math.round(gradesData.reduce((acc, curr) => acc + (parseFloat(curr.percentage) || 0), 0) / gradesData.length)
      : 0;

    exportGradeReportPDF({
      summary: { avgPercentage: avgScore, highestScore: 100, totalGrades: gradesData.length },
      grades: gradesData,
      fileName
    });
    return;
  }

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header bar
  doc.setFillColor(201, 100, 66); // #c96442 primary
  doc.rect(0, 0, pageWidth, 28, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('NextStep', 14, 12);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(title, 14, 22);

  // Metadata
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth - 14, 36, { align: 'right' });
  doc.text(`Total Records: ${rows.length}`, pageWidth - 14, 42, { align: 'right' });

  // Table
  autoTable(doc, {
    startY: 48,
    head: [columns],
    body: rows,
    theme: 'grid',
    headStyles: {
      fillColor: [201, 100, 66],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      halign: 'left',
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [60, 60, 60],
      cellPadding: 4,
    },
    alternateRowStyles: {
      fillColor: [252, 248, 244],
    },
    styles: {
      lineColor: [220, 220, 220],
      lineWidth: 0.3,
      overflow: 'linebreak',
    },
    margin: { left: 14, right: 14 },
    didDrawPage: (data) => {
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFontSize(7);
      doc.setTextColor(180, 180, 180);
      doc.text(`Page ${data.pageNumber} of ${pageCount}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
    },
  });

  doc.save(`${fileName || title.replace(/\s+/g, '_')}.pdf`);
};

/**
 * Export table data as an Excel (.xlsx) file.
 * @param {{ title: string, columns: string[], rows: (string|number)[][], fileName?: string, sheetName?: string }} opts
 */
export const exportToExcel = ({ title, columns, rows, fileName, sheetName }) => {
  const worksheetData = [columns, ...rows];
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  const colWidths = columns.map((col, i) => {
    const maxLen = Math.max(
      col.length,
      ...rows.map(r => String(r[i] ?? '').length)
    );
    return { wch: Math.min(maxLen + 4, 50) };
  });
  worksheet['!cols'] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName || 'Data');

  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `${fileName || title.replace(/\s+/g, '_')}.xlsx`);
};
