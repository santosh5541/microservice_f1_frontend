import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

interface School {
  id: number;
  schoolName: string | null;
  location: string | null;
  principalName: string | null;
}

interface Student {
  id: number;
  name: string;
  age: number;
  gender: string;
  schoolId : number;
  school: School | null;
}

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  student: Student | null = null;
  errorMessage: string | null = null;
  studentId: number | null = null;

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.studentId = +this.route.snapshot.paramMap.get('id')!;
    this.getStudentDetails();
  }

  getStudentDetails(): void {
    const apiUrl = `http://localhost:8848/student/${this.studentId}`;
    this.httpClient.get<Student>(apiUrl).subscribe({
      next: (data) => {
        this.student = data;
      },
      error: (err) => {
        console.error('Error fetching student details:', err);
        this.errorMessage = 'Failed to load student details. Please try again later.';
      }
    });
  }
}
