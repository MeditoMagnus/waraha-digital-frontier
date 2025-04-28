
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const generateResponsePDF = (content: string, title?: string): void => {
  // Initialize PDF document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  // Add branding
  const currentDate = new Date().toLocaleString();
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text("Waraha Group Technical Consultation", 20, 20);
  doc.text(currentDate, 20, 25);
  doc.setLineWidth(0.5);
  doc.line(20, 27, 190, 27);
  
  // Add title
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text(title || "Technical Analysis", 20, 35);

  // Process content for better formatting
  let processedContent = content;
  
  // Handle code blocks - identify them with ``` markers
  const codeBlockRegex = /```([\s\S]*?)```/g;
  processedContent = processedContent.replace(codeBlockRegex, (match, code) => {
    return `[CODE]\n${code}\n[/CODE]`;
  });
  
  // Handle bullet points
  const bulletRegex = /^[-*•] (.*)/gm;
  processedContent = processedContent.replace(bulletRegex, '• $1');
  
  // Handle headers - convert markdown headers to styled text
  const headerRegex = /^#{1,6} (.+)$/gm;
  processedContent = processedContent.replace(headerRegex, (match, header) => {
    const level = match.split(' ')[0].length;
    return `[HEADER${level}]${header}[/HEADER${level}]`;
  });
  
  // Split content into paragraphs
  const parts = processedContent.split('\n\n');
  
  let yPos = 45;
  const lineHeight = 7;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  const textWidth = pageWidth - (margin * 2);

  // Add content
  doc.setFontSize(11);
  
  parts.forEach(part => {
    // Check page space
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    
    // Handle different content types
    if (part.startsWith('[HEADER')) {
      const level = parseInt(part.charAt(7));
      const headerText = part.substring(9, part.indexOf('[/HEADER'));
      
      doc.setFontSize(16 - level);
      doc.setFont('helvetica', 'bold');
      
      const splitHeader = doc.splitTextToSize(headerText, textWidth);
      doc.text(splitHeader, margin, yPos);
      yPos += lineHeight * splitHeader.length;
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
    }
    else if (part.startsWith('[CODE]') && part.endsWith('[/CODE]')) {
      const code = part.substring(6, part.length - 7);
      doc.setFont('courier', 'normal');
      
      // Draw code background
      doc.setFillColor(245, 245, 245);
      const codeLines = code.split('\n');
      const codeHeight = lineHeight * codeLines.length;
      doc.rect(margin - 2, yPos - 5, textWidth + 4, codeHeight + 10, 'F');
      
      // Add code text
      doc.setTextColor(80, 80, 80);
      codeLines.forEach(line => {
        const splitLine = doc.splitTextToSize(line, textWidth - 5);
        doc.text(splitLine, margin, yPos);
        yPos += lineHeight * splitLine.length;
      });
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      yPos += 5;
    }
    else if (part.trim().startsWith('•')) {
      // Handle bullet points
      const bulletPoints = part.split('\n');
      bulletPoints.forEach(point => {
        const trimmedPoint = point.trim();
        if (trimmedPoint) {
          const splitPoint = doc.splitTextToSize(trimmedPoint, textWidth - 5);
          doc.text(splitPoint, margin, yPos);
          yPos += lineHeight * splitPoint.length;
        }
      });
    }
    else {
      // Regular paragraph
      const splitParagraph = doc.splitTextToSize(part, textWidth);
      doc.text(splitParagraph, margin, yPos);
      yPos += lineHeight * splitParagraph.length;
    }
    
    yPos += 3; // Add space between paragraphs
  });

  // Save the PDF
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  doc.save(`technical-analysis-${timestamp}.pdf`);
};
