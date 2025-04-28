
import React from 'react';
import { Table as TableIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableSectionProps {
  content: string;
}

const TableSection: React.FC<TableSectionProps> = ({ content }) => {
  const lines = content.trim().split('\n');
  const headers = lines[0]
    .split('|')
    .filter(cell => cell.trim() !== '')
    .map(header => header.trim());
  
  const dataRows = lines.slice(2).map(row => 
    row.split('|')
      .filter(cell => cell.trim() !== '')
      .map(cell => cell.trim())
  );

  return (
    <div className="flex items-start gap-2 my-4">
      <TableIcon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
      <div className="w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, i) => (
                <TableHead key={i}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataRows.map((row, i) => (
              <TableRow key={i}>
                {row.map((cell, j) => (
                  <TableCell key={j}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TableSection;
