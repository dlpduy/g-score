package com.gscore.intern.service.inter;

import java.util.List;

import com.gscore.intern.dto.response.StudentResponse;
import com.gscore.intern.dto.response.StudentScoreResponse;

public interface StudentServiceInterface {
    List<StudentResponse> getAllStudents();
    StudentResponse getStudentById(String id);
    List<StudentScoreResponse> getStudentsTopGroup(String group, int n);
    Object[] getNumberStudent();
}