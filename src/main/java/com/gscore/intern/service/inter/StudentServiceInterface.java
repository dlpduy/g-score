package com.gscore.intern.service.inter;

import java.util.List;

import com.gscore.intern.dto.response.StudentResponse;

public interface StudentServiceInterface {
    List<StudentResponse> getAllStudents();
    StudentResponse getStudentById(String id);
    List<StudentResponse> getStudentsTopGroupA(int n);
    List<StudentResponse> getStudentsTopGroupB(int n);
    List<StudentResponse> getStudentsTopGroupC(int n);
    List<StudentResponse> getStudentsTopGroupD(int n);
}