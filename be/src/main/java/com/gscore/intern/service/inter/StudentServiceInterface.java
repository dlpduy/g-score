package com.gscore.intern.service.inter;

import java.util.List;

import com.gscore.intern.dto.response.StudentResponse;
import com.gscore.intern.dto.response.StudentScoreResponse;

public interface StudentServiceInterface {
    StudentResponse getStudentById(String id);
    List<StudentScoreResponse> getStudentsTopGroupA(int n);
    List<StudentScoreResponse> getStudentsTopGroupB(int n);
    List<StudentScoreResponse> getStudentsTopGroupC(int n);
    List<StudentScoreResponse> getStudentsTopGroupD(int n);
    Integer getNumberStudentNot12();
    Integer getNumberStudent();
}