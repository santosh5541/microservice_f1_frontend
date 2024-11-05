import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

interface Student {
  id: number;
  name: string;
  age: number;
  gender: string;
  schoolId: number | null;
}

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {
  student: Student | null = null;
  errorMessage: string | null = null;
  studentId: number | null = null;

  // Change private to public
  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    public router: Router // Router is now public
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

  updateStudent(): void {
    if (this.student) {
      const apiUrl = `http://localhost:8848/student/${this.student.id}`;
      this.httpClient.put(apiUrl, this.student).subscribe({
        next: () => {
          console.log('Student updated successfully');
          this.router.navigate(['/show-student']); // You can now access router in the template too
        },
        error: (err) => {
          console.error('Error updating student:', err);
          this.errorMessage = 'Failed to update student. Please try again later.';
        }
      });
    }
  }
}
