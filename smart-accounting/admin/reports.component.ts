import { Component, OnInit } from '@angular/core';

interface Report {
  report_id: number;
  user_id: number;
  message: string;
  status: 'Pending' | 'Resolved' | 'Dismissed';
  created_at: Date;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports: Report[] = [];
  filteredReports: Report[] = [];
  searchTerm: string = '';
  statusFilter: string = 'All';

  constructor() { }

  ngOnInit(): void {
    // Mock data generation based on your requirements
    this.reports = [
      {
        report_id: 1001,
        user_id: 45,
        message: 'System generated alert: Monthly budget exceeded for Marketing.',
        status: 'Pending',
        created_at: new Date('2023-10-25T10:30:00')
      },
      {
        report_id: 1002,
        user_id: 12,
        message: 'User reported issue with transaction #9988.',
        status: 'Resolved',
        created_at: new Date('2023-10-24T14:15:00')
      },
      {
        report_id: 1003,
        user_id: 8,
        message: 'Suspicious login attempt detected from IP 192.168.1.1.',
        status: 'Dismissed',
        created_at: new Date('2023-10-23T09:00:00')
      },
      {
        report_id: 1004,
        user_id: 45,
        message: 'Recurring payment failed for subscription ID #554.',
        status: 'Pending',
        created_at: new Date('2023-10-22T16:45:00')
      },
      {
        report_id: 1005,
        user_id: 102,
        message: 'Data export requested by admin.',
        status: 'Resolved',
        created_at: new Date('2023-10-20T11:20:00')
      }
    ];
    this.filteredReports = this.reports;
  }

  filterReports() {
    this.filteredReports = this.reports.filter(report => {
      const matchesSearch = report.message.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            report.user_id.toString().includes(this.searchTerm) ||
                            report.report_id.toString().includes(this.searchTerm);
      const matchesStatus = this.statusFilter === 'All' || report.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Resolved': return 'badge-success';
      case 'Pending': return 'badge-warning';
      case 'Dismissed': return 'badge-danger';
      default: return 'badge-secondary';
    }
  }
  
  deleteReport(id: number) {
      if(confirm('Are you sure you want to delete this report?')) {
          this.reports = this.reports.filter(r => r.report_id !== id);
          this.filterReports();
      }
  }
}