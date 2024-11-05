import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { ShowStudentComponent } from './show-student/show-student.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';

const routes: Routes = [
  { path: 'add-student', component: AddStudentComponent },
  { path: 'show-student', component: ShowStudentComponent },
  { path: 'student-profile/:id', component: StudentProfileComponent },
  { path: 'update-student/:id', component: UpdateStudentComponent },
  { path: '', redirectTo: '/show-student', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
