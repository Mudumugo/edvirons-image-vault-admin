
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Monitor, ServerCog, FileText, SearchCheck } from "lucide-react";

const logs = [
  {
    id: 1,
    event: "User login",
    details: "John Doe logged in",
    time: "2025-04-23 10:10:23",
    status: "Success",
    icon: <Monitor className="text-vividPurple" />,
    color: "bg-softBlue/60",
  },
  {
    id: 2,
    event: "Image uploaded",
    details: "Passport image added for Anna Smith",
    time: "2025-04-23 09:58:11",
    status: "Success",
    icon: <FileText className="text-oceanBlue" />,
    color: "bg-softGreen/70",
  },
  {
    id: 3,
    event: "License renewed",
    details: "Renewed license for Bridges School",
    time: "2025-04-22 19:42:10",
    status: "Success",
    icon: <ServerCog className="text-brightOrange" />,
    color: "bg-softYellow/70",
  },
  {
    id: 4,
    event: "Data export",
    details: "CSV file downloaded by admin",
    time: "2025-04-22 18:00:37",
    status: "Success",
    icon: <SearchCheck className="text-primary" />,
    color: "bg-softPurple/70",
  },
  {
    id: 5,
    event: "Password attempt",
    details: "Failed login for jane@school.edu",
    time: "2025-04-22 16:28:05",
    status: "Failed",
    icon: <Monitor className="text-red-500" />,
    color: "bg-softPink/70",
  },
];

export default function Logs() {
  return (
    <div className="min-h-screen py-10 px-4 md:px-12 bg-gradient-to-tl from-[#FDE1D3] via-[#E5DEFF] to-[#D3E4FD]">
      <div className="max-w-4xl mx-auto bg-white/80 dark:bg-[#221F26] shadow-xl rounded-xl p-7 border-t-8 border-primary animate-fade-in">
        {/* Fancy Edvirons Registry Logo & Title */}
        <div className="flex items-center gap-4 mb-7">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-indigo-600 shadow flex items-center justify-center">
            <span className="text-3xl font-extrabold text-white select-none drop-shadow">
              ER
            </span>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary tracking-tight">Event & Audit Logs</div>
            <div className="text-[15px] text-muted-foreground">All user actions, logins, uploads, renewals & more</div>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl">
          <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow className="bg-[#f5f1ff]">
                <TableHead className="w-12"></TableHead>
                <TableHead className="font-semibold text-secondaryPurple">Event</TableHead>
                <TableHead className="font-semibold text-secondaryPurple">Details</TableHead>
                <TableHead className="font-semibold text-secondaryPurple">Time</TableHead>
                <TableHead className="font-semibold text-secondaryPurple">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id} className="transition-colors hover:bg-softBlue/30">
                  <TableCell className="text-center">{log.icon}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg font-medium text-sm ${log.color}`}>
                      {log.event}
                    </span>
                  </TableCell>
                  <TableCell>{log.details}</TableCell>
                  <TableCell>
                    <span className="text-xs text-gray-500">{log.time}</span>
                  </TableCell>
                  <TableCell>
                    {log.status === "Success" ? (
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold shadow">Success</span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold shadow">Failed</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

