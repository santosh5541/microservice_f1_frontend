import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  schoolId: number;
  school: School | null;
}

@Component({
  selector: 'app-show-student',
  templateUrl: './show-student.component.html',
  styleUrls: ['./show-student.component.css']
})
export class ShowStudentComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchTerm: string = '';
  errorMessage: string | null = null;

  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents() {
    const apiUrl = 'http://localhost:8848/student';
    this.httpClient.get<Student[]>(apiUrl).subscribe({
      next: (data) => {
        this.students = data;
        this.filteredStudents = data;
        this.errorMessage = null;
      },
      error: (err) => {
        console.error('Error fetching students:', err);
        this.errorMessage = 'Failed to load students. Please try again later.';
      }
    });
  }

  searchStudents(): void {
    if (this.searchTerm) {
      this.filteredStudents = this.students.filter(student =>
        student.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredStudents = this.students;
    }
  }

  editStudent(id: number): void {
    this.router.navigate(['/update-student', id]);
  }

  deleteStudent(id: number): void {
    const apiUrl = `http://localhost:8848/student/${id}`;
    this.httpClient.delete(apiUrl).subscribe({
      next: () => {
        console.log(`Student with ID ${id} deleted successfully`);
        this.students = this.students.filter(student => student.id !== id);
        this.searchStudents();
      },
      error: (err) => {
        console.error('Error deleting student:', err);
        this.errorMessage = 'Failed to delete student. Please try again later.';
      }
    });
  }

  showStudentProfile(id: number): void {
    this.router.navigate(['/student-profile', id]);
  }
}
