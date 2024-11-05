import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface Student {
  name: string;
  age: number;
  gender: string;
  schoolId: number | null; // Assuming schoolId can be null
}

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  student: FormGroup;
  successMessage: string | null = null;

  constructor(private httpClient: HttpClient) {
    this.student = new FormGroup({
      name: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(1)]),
      gender: new FormControl('', [Validators.required]),
      schoolId: new FormControl(null)
    });
  }

  handleSubmit() {
    if (this.student.valid) {
      const newStudent: Student = {
        name: this.student.value.name,
        age: this.student.value.age,
        gender: this.student.value.gender,
        schoolId: this.student.value.schoolId || null
      };
      const apiUrl = 'http://localhost:8848/student';
      this.httpClient.post<Student>(apiUrl, newStudent).subscribe({
        next: (response) => {
          console.log('Student successfully added:', response);
          this.successMessage = 'Student added successfully!';
          this.student.reset();
          setTimeout(() => {
            this.successMessage = null; // Clear the success message after 3 seconds
          }, 3000);
        },
        error: (err) => {
          console.error('Error adding student:', err);
          let errorMessage = 'An unknown error occurred.';
          if (err.error && err.error.message) {
            errorMessage = err.error.message;
          } else if (err.status) {
            errorMessage = `Error ${err.status}: ${err.statusText}`;
          }
          alert(errorMessage); // Show the error to the user
        }
      });
    } else {
      console.log('Form is invalid');
      alert('Please fill out the form correctly.');
    }
  }
}
