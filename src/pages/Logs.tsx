
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Monitor, ServerCog, FileText, SearchCheck, Activity, AlertTriangle } from "lucide-react";

const logs = [
  {
    id: 1,
    event: "User login",
    details: "John Doe logged in from 192.168.1.100",
    time: "2025-06-14 10:10:23",
    status: "Success",
    severity: "info",
    icon: <Monitor className="w-4 h-4" />,
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: 2,
    event: "Image uploaded",
    details: "Ubuntu 22.04 LTS image added for Kibera Secondary",
    time: "2025-06-14 09:58:11",
    status: "Success",
    severity: "info",
    icon: <FileText className="w-4 h-4" />,
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: 3,
    event: "License renewed",
    details: "Premium license renewed for Bridges School (1 year)",
    time: "2025-06-14 09:42:10",
    status: "Success",
    severity: "info",
    icon: <ServerCog className="w-4 h-4" />,
    color: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    id: 4,
    event: "Data export",
    details: "Client registry CSV exported by admin@edvirons.com",
    time: "2025-06-14 08:30:37",
    status: "Success",
    severity: "info",
    icon: <SearchCheck className="w-4 h-4" />,
    color: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  {
    id: 5,
    event: "Failed login attempt",
    details: "Multiple failed attempts for jane@school.edu",
    time: "2025-06-14 07:28:05",
    status: "Warning",
    severity: "warning",
    icon: <AlertTriangle className="w-4 h-4" />,
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    id: 6,
    event: "System maintenance",
    details: "Scheduled database optimization completed",
    time: "2025-06-14 03:00:00",
    status: "Success",
    severity: "info",
    icon: <Activity className="w-4 h-4" />,
    color: "bg-slate-50 text-slate-700 border-slate-200",
  },
];

const getSeverityBadge = (severity: string, status: string) => {
  if (status === "Success") {
    return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100">Success</Badge>;
  } else if (severity === "warning") {
    return <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100">Warning</Badge>;
  } else {
    return <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-100">Error</Badge>;
  }
};

export default function Logs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/20 to-cyan-50/20 dark:from-slate-900 dark:via-purple-900/10 dark:to-cyan-900/10 py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl overflow-hidden">
          {/* Modern Header */}
          <div className="border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-700/80 p-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 shadow-xl flex items-center justify-center">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  System Event Logs
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 mt-1">
                  Real-time monitoring of system activities, user actions, and security events
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Table */}
          <div className="p-8">
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="border-slate-200/50 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50">
                    <TableHead className="font-bold text-slate-900 dark:text-slate-100 py-4">Event</TableHead>
                    <TableHead className="font-bold text-slate-900 dark:text-slate-100">Details</TableHead>
                    <TableHead className="font-bold text-slate-900 dark:text-slate-100">Timestamp</TableHead>
                    <TableHead className="font-bold text-slate-900 dark:text-slate-100">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow 
                      key={log.id} 
                      className="border-slate-200/30 dark:border-slate-700/30 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all duration-200 group"
                    >
                      <TableCell className="py-4">
                        <div className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border ${log.color} font-medium transition-all duration-200 group-hover:scale-105`}>
                          {log.icon}
                          <span>{log.event}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          {log.details}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-mono text-slate-600 dark:text-slate-400">
                            {log.time}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-500">
                            Just now
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getSeverityBadge(log.severity, log.status)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Modern Footer */}
          <div className="border-t border-slate-200/50 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 p-6">
            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
              <span>Showing {logs.length} recent events</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live monitoring active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
